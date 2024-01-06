import { create } from "zustand";
import { useWallet } from "./useWallet";
import { useEffect } from "react";
import { ArchwayClient } from "@archwayhq/arch3.js";
import { ChainInfo } from "@/config/constantine.config";
import { NETWORK } from "@/constant/contractAddress";
import { emitter } from "@/config/eventEmitter";
import { AccountData } from "@keplr-wallet/types";

interface Profile {
  is_register: boolean;
  referral: string;
}
interface Store {
  isLoading: boolean;
  profile?: Profile;
}

interface Action {
  setLoading: (data: boolean) => void;
  setProfile: (data: Profile) => void;
}
const useStore = create<Store & Action>((set) => ({
  isLoading: false,
  profile: undefined,
  setLoading: (data) =>
    set(() => ({
      isLoading: data,
    })),
  setProfile: (data) => set(() => ({ profile: data })),
}));

const CONTRACT_ADDRESS = NETWORK["constantine-3"];

export const useNetwork = () => {
  const { profile, isLoading, setProfile, setLoading } = useStore();

  const getProfile = async (account: AccountData) => {
    setLoading(true);
    try {
      const archwayClient = await ArchwayClient.connect(ChainInfo.rpc);
      const msg = {
        profile: {
          address: account?.address,
        },
      };

      const res = await archwayClient.queryContractSmart(CONTRACT_ADDRESS, msg);
      setProfile(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    emitter.on("connect-wallet", getProfile);

    return () => {
      emitter.removeListener("connect-wallet", getProfile);
    };
  }, []);

  return {
    profile,
    isLoading,
  };
};
