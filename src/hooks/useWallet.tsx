import { ChainInfo } from "@/config/constantine.config";
import { emitter } from "@/config/eventEmitter";
import { SigningArchwayClient } from "@archwayhq/arch3.js";
import { AccountData, Coin, Keplr } from "@keplr-wallet/types";
import { useEffect, useState } from "react";
import { create } from "zustand";

interface IWalletPerson {
  walet: AccountData;
  balance: Coin;
}

interface IStore {
  isReady: boolean;
  isLoading: boolean;
  isConnect: boolean;
  account?: IWalletPerson;
  wallet?: Keplr;
  signWallet?: SigningArchwayClient;
}

interface IAction {
  setIsLoading: (data: boolean) => void;
  setIsReady: (data: boolean) => void;
  setIsConnect: (data: boolean) => void;
  setAccount: (data: IWalletPerson) => void;
  setWallet: (data: Keplr) => void;
  setSignWallet: (data: SigningArchwayClient) => void;
  reset: () => void;
}

const initialState: IStore = {
  account: undefined,
  wallet: undefined,
  isConnect: false,
  isLoading: false,
  isReady: false,
  signWallet: undefined,
};

const useStore = create<IStore & IAction>((set) => ({
  ...initialState,
  setIsLoading: (data) =>
    set((currentState) => ({ ...currentState, isLoading: data })),
  setIsReady: (data) =>
    set((currentState) => ({ ...currentState, isReady: data })),
  setIsConnect: (data) =>
    set((currentState) => ({ ...currentState, isConnect: data })),
  setAccount: (data) =>
    set((currentState) => ({ ...currentState, account: data })),
  setWallet: (data) =>
    set((currentState) => ({ ...currentState, wallet: data })),
  setSignWallet: (data) =>
    set((currentState) => ({ ...currentState, signWallet: data })),
  reset: () => set(initialState),
}));

export const useWallet = () => {
  const {
    setIsLoading,
    setAccount,
    setIsConnect,
    setSignWallet,
    setIsReady,
    setWallet,
    reset,
    isReady,
    wallet,
    ...rest
  } = useStore();
  const connect = async () => {
    setIsLoading(true);
    if (!isReady) return;
    try {
      if (wallet) {
        await wallet.experimentalSuggestChain(ChainInfo);
        wallet.defaultOptions = { sign: { preferNoSetFee: true } };
        await wallet.enable(ChainInfo.chainId);
        const offlineSigner = await wallet.getOfflineSignerAuto(
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

        setAccount({ walet: getAccounts[0], balance: getBalance });
        setIsConnect(true);
        setSignWallet(client);
        emitter.emit("connect-wallet", getAccounts[0]);
      }
    } catch {
      alert("Failed to suggest the chain");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    reset();
    emitter.emit("disconnect-wallet", () => {});
  };

  useEffect(() => {
    if (!window.getOfflineSignerAuto || !window.keplr) {
      alert("Please install keplr extension");
    } else {
      if (window.keplr) {
        setIsReady(true);
        setWallet(window.keplr);
      }
    }
  }, []);

  return {
    ...rest,
    wallet,
    isReady,
    connect,
    disconnect,
  };
};
