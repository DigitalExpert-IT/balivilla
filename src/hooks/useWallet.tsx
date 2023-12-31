import { ChainInfo } from "@/config/constantine.config";
import { SigningArchwayClient } from "@archwayhq/arch3.js";
import {
  AccountData,
  OfflineAminoSigner,
  OfflineDirectSigner,
} from "@keplr-wallet/types";
import { useEffect, useState } from "react";

export const useWallet = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<AccountData>();

  const connect = async () => {
    console.log("connecting...!!");
    if (!isReady) return;
    try {
      if (window.keplr) {
        await window.keplr.experimentalSuggestChain(ChainInfo);
        window.keplr.defaultOptions = { sign: { preferNoSetFee: true } };
        await window.keplr.enable(ChainInfo.chainId);
        const offlineSigner = await window.keplr.getOfflineSignerAuto(
          ChainInfo.chainId
        );
        await SigningArchwayClient.connectWithSigner(
          ChainInfo.rpc,
          offlineSigner
        );

        const getAccounts = await offlineSigner.getAccounts();
        setAccounts(getAccounts[0]);
        console.log("connected");
      }
    } catch {
      alert("Failed to suggest the chain");
    }
  };

  useEffect(() => {
    if (!window.getOfflineSignerAuto || !window.keplr) {
      alert("Please install keplr extension");
    } else {
      if (window.keplr) {
        setIsReady((curr) => (curr = !isReady));
      }
    }
  }, [accounts]);

  return {
    accounts,
    isReady,
    connect,
  };
};
