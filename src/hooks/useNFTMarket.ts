import { ChainInfo } from "@/config/constantine.config";
import { NFT_MARKET } from "@/constant/contractAddress";
import { ArchwayClient } from "@archwayhq/arch3.js";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useCW20 } from "./useCW20";
import { useWallet } from "./useWallet";
import { emitter } from "@/config/eventEmitter";
import { create } from "zustand";

interface VillaDetail {
  price: BigNumber;
  id: number;
  max_lot: number;
  sold: number;
}

interface Store {
  isLoading: boolean;
  villaList: VillaDetail[];
}

interface Action {
  setLoading: (data: boolean) => void;
  setVillaList: (data: VillaDetail[]) => void;
}

const useStore = create<Store & Action>()((set) => ({
  isLoading: false,
  villaList: [],
  setLoading: (data) =>
    set((currentState) => ({ ...currentState, isLoading: data })),
  setVillaList: (data) =>
    set((currentState) => ({ ...currentState, villaList: data })),
}));

const CONTRACT_ADDRESS = NFT_MARKET[ChainInfo.chainId as "constantine-3"];

export const useNFTMarket = () => {
  const { setLoading, setVillaList, ...rest } = useStore();
  const { increaseAllowance, allowance, balance } = useCW20();
  const { account, signWallet } = useWallet();

  const getTotalList = async () => {
    setLoading(true);
    const msg = {
      get_total_list: {},
    };
    try {
      const archwayClient = await ArchwayClient.connect(ChainInfo.rpc);
      const getlist: { value: string } = await archwayClient.queryContractSmart(
        CONTRACT_ADDRESS,
        msg
      );

      const promises = new Array(Number(getlist.value))
        .fill(null)
        .map(async (_, i) => {
          const msg = {
            get_villa: {
              id: String(i),
            },
          };
          const villaDetail: VillaDetail =
            await archwayClient.queryContractSmart(CONTRACT_ADDRESS, msg);
          return villaDetail;
        });

      const villas = await Promise.all(promises);
      setVillaList(villas);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const buyVilla = async (villa: VillaDetail, amount: number) => {
    if (!account?.walet.address) return;
    const approve = await allowance(account?.walet.address, CONTRACT_ADDRESS);

    if (balance.gte(BigNumber.from(approve.allowance))) {
      const msg = {
        buy: {
          id: villa.id.toString(),
          amount: amount.toString(),
        },
      };
      try {
        const tx = await signWallet?.execute(
          account.walet.address,
          CONTRACT_ADDRESS,
          msg,
          "auto"
        );

        if (tx?.transactionHash) {
          emitter.emit("buy-villa", tx);
        }
      } catch (e) {
        console.log("buy villa err", e);
      }
    } else {
      await increaseAllowance(
        CONTRACT_ADDRESS,
        Number(villa.price.mul(amount))
      );
      buyVilla(villa, amount);
    }
  };

  useEffect(() => {
    getTotalList();
  }, []);

  return {
    ...rest,
    buyVilla,
  };
};
