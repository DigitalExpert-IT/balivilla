import { ChainInfo } from "@/config/constantine.config";
import { NFT_MARKET } from "@/constant/contractAddress";
import { ArchwayClient } from "@archwayhq/arch3.js";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useCW20 } from "./useCW20";
import { useWallet } from "./useWallet";
import { emitter } from "@/config/eventEmitter";

interface VillaDetail {
  price: BigNumber;
  id: number;
  max_lot: number;
  sold: number;
}
const CONTRACT_ADDRESS = NFT_MARKET[ChainInfo.chainId as "constantine-3"];

export const useNFTMarket = () => {
  const [loading, setLoading] = useState(false);
  const [villaList, setVillaList] = useState<VillaDetail[]>();
  const { increaseAllowance, allowance, balance } = useCW20();
  const { accounts, signWallet } = useWallet();

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
    if (!accounts?.walet.address) return;
    const approve = await allowance(accounts?.walet.address, CONTRACT_ADDRESS);

    if (balance?.balance.gte(approve.allowance)) {
      const msg = {
        buy: {
          id: villa.id.toString(),
          amount: amount.toString(),
        },
      };
      const tx = await signWallet?.execute(
        accounts.walet.address,
        CONTRACT_ADDRESS,
        msg,
        "auto"
      );

      if (tx?.transactionHash) {
        emitter.emit("buy-villa", tx);
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
    loading,
    villaList,
    buyVilla,
  };
};
