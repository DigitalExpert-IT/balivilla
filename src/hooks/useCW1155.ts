import { ChainInfo } from "@/config/constantine.config";
import { emitter } from "@/config/eventEmitter";
import { NFT1155_BALI } from "@/constant/contractAddress";
import { ArchwayClient } from "@archwayhq/arch3.js";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { useWallet } from "./useWallet";
import { useNFTMarket } from "./useNFTMarket";
import { AccountData } from "@keplr-wallet/types";
interface Store {
  isLoading: boolean;
  balance: { [keys: string]: number };
}

interface Action {
  setBalance: (data: number, key: string) => void;
}
const useStore = create<Store & Action>()((set) => ({
  isLoading: false,
  balance: {},
  setBalance: (data, key) =>
    set((currentState) => ({
      balance: { ...currentState.balance, [key]: data },
    })),
}));

const CONTRACT_ADDRESS = NFT1155_BALI["constantine-3"];
export const useCW1155 = () => {
  const { isLoading, balance, setBalance } = useStore();
  const { villaList } = useNFTMarket();

  const getBalance = async (account: AccountData) => {
    console.log(account?.address);
    if (!account?.address) return;
    const archClient = await ArchwayClient.connect(ChainInfo.rpc);
    try {
      console.log(villaList);
      villaList.forEach(async (e, i) => {
        console.log("ey boy", i);
        console.log(i);
        const msg = {
          balance: {
            owner: account.address,
            token_id: e.id.toString(),
          },
        };
        const data = await archClient.queryContractSmart(CONTRACT_ADDRESS, msg);
        console.log("isinya kayak gini cuy", data);
      });
    } catch (e) {}
  };

  useEffect(() => {
    emitter.on("connect-wallet", getBalance);

    return () => {
      emitter.removeListener("connect-wallet");
    };
  }, []);

  return {
    getBalance,
  };
};
