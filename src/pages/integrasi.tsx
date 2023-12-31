import { Layout } from "@/components/Layout";
import { Button, Heading } from "@chakra-ui/react";
import { SigningArchwayClient } from "@archwayhq/arch3.js";
import BigNumber from "bignumber.js";
import { ChainInfo } from "@/config/constantine.config";
import { useEffect, useState } from "react";

const chainId = ChainInfo.chainId;
const Integrasi = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  const connect = async () => {
    if (!isReady) return;
    try {
      if (window.keplr) {
        await window.keplr.experimentalSuggestChain(ChainInfo);
        window.keplr.defaultOptions = { sign: { preferNoSetFee: true } };
        await window.keplr.enable(chainId);
        const offlineSigner = await window.keplr.getOfflineSignerAuto(chainId);
        const signingClient = await SigningArchwayClient.connectWithSigner(
          ChainInfo.rpc,
          offlineSigner
        );
        const accounts = await offlineSigner.getAccounts();
        console.log("apa ini boss", accounts[0]);
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
        setIsReady((ready) => !ready);
      }
    }
  }, []);

  return (
    <Layout>
      <Heading>Integrasi</Heading>
      <Button onClick={connect}>Connect Keplr</Button>
    </Layout>
  );
};

export default Integrasi;
