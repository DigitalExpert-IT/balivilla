import { ChainInfo } from "@/config/constantine.config";
import { SigningArchwayClient } from "@archwayhq/arch3.js";
import {
  AccountData,
  Coin,
  OfflineAminoSigner,
  OfflineDirectSigner,
} from "@keplr-wallet/types";
import { useEffect, useState } from "react";

interface IWalletPerson {
  walet: AccountData;
  balance: Coin;
}

export const useWallet = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<IWalletPerson>();

  const connect = async () => {
    setIsLoading((status) => !status);
    if (!isReady) return;
    try {
      if (window.keplr) {
        await window.keplr.experimentalSuggestChain(ChainInfo);
        window.keplr.defaultOptions = { sign: { preferNoSetFee: true } };
        await window.keplr.enable(ChainInfo.chainId);
        const offlineSigner = await window.keplr.getOfflineSignerAuto(
          ChainInfo.chainId
        );
        const data = await SigningArchwayClient.connectWithSigner(
          ChainInfo.rpc,
          offlineSigner
        );

        const getAccounts = await offlineSigner.getAccounts();

        const getBalance = await data.getBalance(
          getAccounts[0].address,
          "aconst"
        );

        setAccounts((data) => {
          return { walet: getAccounts[0], balance: getBalance };
        });
        setIsConnect(true);
      }
    } catch {
      alert("Failed to suggest the chain");
    } finally {
      setIsLoading((status) => !status);
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
  }, []);

  return {
    accounts,
    isReady,
    isConnect,
    connect,
    isLoading,
  };
};
