import { Layout } from "@/components/Layout";
import { Button, Heading } from "@chakra-ui/react";
import { SigningArchwayClient, ArchwayClient } from "@archwayhq/arch3.js";
import BigNumber from "bignumber.js";
import { ChainInfo } from "@/config/constantine.config";
import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";

const Integrasi = () => {
  const { connect, accounts } = useWallet();
  console.log(accounts);
  return (
    <Layout>
      <Heading>Integrasi</Heading>
      <Button onClick={connect}>Connect Keplr</Button>
      {/* <Button onClick={getList}>getList</Button> */}
    </Layout>
  );
};

export default Integrasi;
