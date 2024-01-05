import { ChainInfo } from "@/config/constantine.config";
import { NFT_MARKET } from "@/constant/contractAddress";
import { ArchwayClient } from "@archwayhq/arch3.js";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    getTotalList();
  }, []);

  return {
    loading,
    villaList,
  };
};
