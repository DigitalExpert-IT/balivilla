import { ChainInfo } from "@/config/constantine.config";
import { NFT1155_BALI } from "@/constant/contractAddress";
import { ArchwayClient } from "@archwayhq/arch3.js";
import { useState } from "react";
import { create } from "zustand";

const CONTRACT_ADDRESS = NFT1155_BALI["constantine-3"];
export const useCW1155 = () => {
  const [loading, setIsloading] = useState();

  const getBalance = async (owner: string, tokenId: string) => {
    const archClient = await ArchwayClient.connect(ChainInfo.rpc);
    const msg = {
      balance: {
        owner: owner,
        token_id: tokenId,
      },
    };
    const data = await archClient.queryContractSmart(CONTRACT_ADDRESS, msg);

    console.log("ey nik ", data);
  };

  return {
    getBalance,
  };
};
