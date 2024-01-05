import { useEffect, useState } from "react";
import { ArchwayClient } from "@archwayhq/arch3.js";
import { ChainInfo } from "@/config/constantine.config";
import { USDT } from "@/constant/contractAddress";
import { emitter } from "@/config/eventEmitter";
import { AccountData } from "@keplr-wallet/types";
import { BigNumber } from "ethers";
import { useWallet } from "./useWallet";
import { create } from "zustand";

interface ITokenInfo {
  decimals: number;
  name: string;
  symbol: string;
  total_supply: string;
}

interface IBalance {
  balance: BigNumber;
}

interface IAllowance {
  allowance: BigNumber;
  expires: string;
}

interface IStore {
  isLoading: boolean;
  tokenInfo: ITokenInfo;
  balance: BigNumber;
}

interface Action {
  setTokenInfo: (data: ITokenInfo) => void;
  setLoading: (data: boolean) => void;
  setBalance: (data: BigNumber) => void;
  reset: () => void;
}

const CONTRACT_ADDRESS = USDT[ChainInfo.chainId as "constantine-3"];

const initialState = {
  isLoading: false,
  balance: BigNumber.from(0),
  tokenInfo: { decimals: 0, name: "", symbol: "", total_supply: "" },
};

const useStore = create<IStore & Action>()((set) => ({
  ...initialState,
  setTokenInfo: (data) =>
    set((currenState) => ({ ...currenState, tokenInfo: data })),
  setLoading: (data) =>
    set((currenState) => ({ ...currenState, isLoading: data })),
  setBalance: (data) =>
    set((currenState) => ({ ...currenState, balance: data })),
  reset: () => {
    set(initialState);
  },
}));

export const useCW20 = () => {
  const { setLoading, setTokenInfo, setBalance, reset, ...res } = useStore();
  const { signWallet } = useWallet();
  const getTokenInfo = async () => {
    setLoading(true);
    const msg = { token_info: {} };

    try {
      const arcwayClient = await ArchwayClient.connect(ChainInfo.rpc);
      const tokenInfoData: ITokenInfo = await arcwayClient.queryContractSmart(
        CONTRACT_ADDRESS,
        msg
      );
      setTokenInfo(tokenInfoData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getBalance = async (account: AccountData) => {
    const msg = {
      balance: {
        address: account.address,
      },
    };
    try {
      const arcwayClient = await ArchwayClient.connect(ChainInfo.rpc);
      const query: IBalance = await arcwayClient?.queryContractSmart(
        CONTRACT_ADDRESS,
        msg
      );

      setBalance(query.balance);
    } catch (e) {
      console.log(e);
    }
  };

  const increaseAllowance = async (spender: string, amount: number) => {
    let msg = {
      increase_allowance: {
        spender: spender,
        amount: amount,
        expires: "",
      },
    };

    const tx = await signWallet?.execute(
      spender,
      CONTRACT_ADDRESS,
      msg,
      "auto"
    );
    if (tx?.transactionHash) {
      emitter.emit("increase-allowance", tx);
      return tx;
    }
  };

  const allowance = async (owner: string, spender: string) => {
    let msg = {
      allowance: {
        owner,
        spender,
      },
    };
    const arcwayClient = await ArchwayClient.connect(ChainInfo.rpc);
    const res: IAllowance = await arcwayClient?.queryContractSmart(
      CONTRACT_ADDRESS,
      msg
    );
    return res;
  };

  useEffect(() => {
    getTokenInfo();

    emitter.on("connect-wallet", getBalance);
    emitter.on("disconnect-wallet", () => {
      setBalance(BigNumber.from(0));
    });

    return () => {
      emitter.removeListener("connect-wallet", getBalance);
      emitter.removeListener("disconnect-wallet", () => {
        setBalance(BigNumber.from(0));
      });
    };
  }, []);

  return {
    increaseAllowance,
    allowance,
    ...res,
  };
};
