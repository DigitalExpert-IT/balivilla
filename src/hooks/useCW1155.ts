import { ChainInfo } from "@/config/constantine.config";
import { emitter } from "@/config/eventEmitter";
import { NFT1155_BALI, NFT_MARKET } from "@/constant/contractAddress";
import { ArchwayClient } from "@archwayhq/arch3.js";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { useWallet } from "./useWallet";
import { VillaDetail, useNFTMarket } from "./useNFTMarket";
import { AccountData } from "@keplr-wallet/types";

interface Balance {
  balance: string;
}

interface Store {
  isLoading: boolean;
  balance: { [keys: string]: number };
}

interface Action {
  setBalance: (data: number, key: string) => void;
  setLoading: (data: boolean) => void;
}
const useStore = create<Store & Action>()((set) => ({
  isLoading: false,
  balance: {},
  setBalance: (data, key) =>
    set((currentState) => ({
      balance: { ...currentState.balance, [key]: data },
    })),
  setLoading: (data) => set(() => ({ isLoading: data })),
}));

const CONTRACT_ADDRESS = NFT1155_BALI["constantine-3"];
export const useCW1155 = () => {
  const { isLoading, balance, setBalance, setLoading } = useStore();

  const getBalance = async (account: AccountData) => {
    if (!account?.address) return;
    setLoading(true);
    try {
      const archClient = await ArchwayClient.connect(ChainInfo.rpc);
      const getTotalList: { value: string } =
        await archClient.queryContractSmart(NFT_MARKET["constantine-3"], {
          get_total_list: {},
        });

      for (let i = 0; i < Number(getTotalList.value); i++) {
        const msg = {
          balance: {
            owner: account.address,
            token_id: i.toString(),
          },
        };
        const data: Balance = await archClient.queryContractSmart(
          CONTRACT_ADDRESS,
          msg
        );

        setBalance(+data.balance, i.toString());
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    emitter.on("connect-wallet", getBalance);

    return () => {
      emitter.removeListener("connect-wallet");
    };
  }, []);

  return {
    getBalance,
    balance,
  };
};
