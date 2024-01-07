import { ChainInfo } from "@/config/constantine.config";
import { NFT_MARKET } from "@/constant/contractAddress";
import { ArchwayClient } from "@archwayhq/arch3.js";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useCW20 } from "./useCW20";
import { useWallet } from "./useWallet";
import { emitter } from "@/config/eventEmitter";
import { create } from "zustand";
import { useNetwork } from "./useNetwork";
import { useCW1155 } from "./useCW1155";
import { AccountData } from "@keplr-wallet/types";

export interface VillaDetail {
  price: BigNumber;
  id: number;
  max_lot: number;
  sold: number;
}

interface Bonus {
  last_claim_at: string;
  total_claim: string;
}

// #[cw_serde]
// pub struct Pool {
//     pub total_pool: Uint128,
//     pub bonus_per_nft: Uint128,
//     pub start_at: Timestamp,
// }

interface Pool {
  total_pool: string;
  bonus_per_nft: string;
  start_at: string;
}

interface Store {
  isLoading: boolean;
  isReady: boolean;
  bonus: { [keys: string]: Bonus };
  pool: { [keys: string]: Pool };
  villaList: VillaDetail[];
}

interface Action {
  setLoading: (data: boolean) => void;
  setVillaList: (data: VillaDetail[]) => void;
  setIsReady: (data: boolean) => void;
  setBonus: (data: Bonus, keys: string) => void;
  setPool: (data: Pool, keys: string) => void;
}

const useStore = create<Store & Action>()((set) => ({
  isLoading: false,
  isReady: false,
  villaList: [],
  bonus: {},
  pool: {},
  setLoading: (data) =>
    set((currentState) => ({ ...currentState, isLoading: data })),
  setVillaList: (data) =>
    set((currentState) => ({ ...currentState, villaList: data })),
  setIsReady: (data) =>
    set(() => ({
      isReady: data,
    })),
  setBonus: (data, keys) =>
    set((currentState) => ({ bonus: { ...currentState.bonus, [keys]: data } })),
  setPool: (data, keys) =>
    set((currentState) => ({ pool: { ...currentState.pool, [keys]: data } })),
}));

const CONTRACT_ADDRESS = NFT_MARKET[ChainInfo.chainId as "constantine-3"];

export const useNFTMarket = () => {
  const { setLoading, setVillaList, setIsReady, setPool, setBonus, ...rest } =
    useStore();
  const { increaseAllowance, allowance, balance } = useCW20();
  const { account, signWallet } = useWallet();
  const { profile } = useNetwork();

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
          setBonus({ last_claim_at: "0", total_claim: "0" }, i.toString());
          const poolMsg = {
            get_pool: {
              nft_id: i.toString(),
            },
          };
          const pool: Pool = await archwayClient.queryContractSmart(
            CONTRACT_ADDRESS,
            poolMsg
          );
          setPool(pool, i.toString());

          return villaDetail;
        });

      const villas = await Promise.all(promises);
      setVillaList(villas);
      setIsReady(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const buyVilla = async (villa: VillaDetail, amount: number) => {
    if (!account?.walet.address) return;
    const get_approve = await allowance(
      account?.walet.address,
      CONTRACT_ADDRESS
    );

    const total_allowance = BigNumber.from(get_approve.allowance);
    const total_price = BigNumber.from(villa.price).mul(amount);

    if (!profile?.is_register)
      throw {
        code: "should Register first",
      };

    if (!balance.gte(total_price))
      throw {
        code: "not enought balance",
      };

    if (total_allowance.gte(total_price)) {
      const msg = {
        buy: {
          id: villa.id.toString(),
          amount: amount.toString(),
        },
      };

      const tx = await signWallet?.execute(
        account.walet.address,
        CONTRACT_ADDRESS,
        msg,
        "auto"
      );

      if (tx?.transactionHash) {
        emitter.emit("buy-villa", tx);
      }
      return;
    } else {
      await increaseAllowance(CONTRACT_ADDRESS, Number(total_price));
      buyVilla(villa, amount);
    }
  };

  // todo share dividen
  const shareDividen = () => {};

  // todo claim dividen
  const claimDividen = () => {};

  const getBonus = async (account: AccountData) => {
    if (rest.villaList.length > 0) {
      const archClient = await ArchwayClient.connect(ChainInfo.rpc);
      rest.villaList.forEach(async (e, i) => {
        const msg = {
          get_bonus: {
            nft_id: e.id.toString(),
            address: account.address,
          },
        };
        const bonus: Bonus = await archClient.queryContractSmart(
          CONTRACT_ADDRESS,
          msg
        );
        setBonus(bonus, e.id.toString());
      });
    }
  };

  useEffect(() => {
    getTotalList();

    emitter.on("connect-wallet", getBonus);

    return () => {
      emitter.removeListener("connect-wallet", getBonus);
    };
  }, [rest.villaList.length]);

  return {
    ...rest,
    buyVilla,
    shareDividen,
    claimDividen,
  };
};
