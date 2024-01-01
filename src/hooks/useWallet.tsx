import { ChainInfo } from "@/config/constantine.config";
import { SigningArchwayClient } from "@archwayhq/arch3.js";
import {
  AccountData,
  Coin,
  Keplr,
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
  const [walet, setWallet] = useState<Keplr>();

  const connect = async () => {
    setIsLoading((status) => !status);
    if (!isReady) return;
    try {
      if (walet) {
        await walet.experimentalSuggestChain(ChainInfo);
        walet.defaultOptions = { sign: { preferNoSetFee: true } };
        await walet.enable(ChainInfo.chainId);
        const offlineSigner = await walet.getOfflineSignerAuto(
          ChainInfo.chainId
        );
        const client = await SigningArchwayClient.connectWithSigner(
          ChainInfo.rpc,
          offlineSigner
        );

        const getAccounts = await offlineSigner.getAccounts();

        const getBalance = await client.getBalance(
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

  const disconnect = async () => {
    const offlineSigner = await walet?.getOfflineSignerAuto(ChainInfo.chainId);
    const client = await SigningArchwayClient.connectWithSigner(
      ChainInfo.rpc,
      offlineSigner!
    );
    client.disconnect();
    setAccounts(undefined);
    setIsConnect(false);
  };

  useEffect(() => {
    if (!window.getOfflineSignerAuto || !window.keplr) {
      alert("Please install keplr extension");
    } else {
      if (window.keplr) {
        setIsReady((curr) => (curr = !isReady));
        setWallet(window.keplr);
      }
    }
  }, []);

  return {
    accounts,
    isReady,
    isConnect,
    connect,
    disconnect,
    isLoading,
    walet,
  };
};
