import { useEffect, useState } from "react";
import { ArchwayClient } from "@archwayhq/arch3.js";
import { ChainInfo } from "@/config/constantine.config";
import { USDT } from "@/constant/contractAddress";
import { emitter } from "@/config/eventEmitter";
import { AccountData } from "@keplr-wallet/types";
import { BigNumber } from "ethers";

interface ITokenInfo {
  decimals: 6;
  name: "United State Dolar";
  symbol: "USDT";
  total_supply: "1000000000000";
}

interface IBalance {
  balance: BigNumber;
}

interface IAllowance {
  allowance: BigNumber;
  expires: string;
}

const CONTRACT_ADDRESS = USDT[ChainInfo.chainId as "constantine-3"];

export const useCW20 = () => {
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<ITokenInfo>();
  const [balance, setBalance] = useState<IBalance>();

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
      const balance: IBalance = await arcwayClient?.queryContractSmart(
        CONTRACT_ADDRESS,
        msg
      );

      setBalance(balance);
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
    const arcwayClient = await ArchwayClient.connect(ChainInfo.rpc);
    const allowance = await arcwayClient.queryContractSmart(
      CONTRACT_ADDRESS,
      msg
    );

    emitter.emit("increase-allowance", allowance);
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

    return () => {
      emitter.removeListener("connect-wallet", getBalance);
    };
  }, []);

  return {
    tokenInfo,
    balance,
    loading,
    increaseAllowance,
    allowance,
  };
};