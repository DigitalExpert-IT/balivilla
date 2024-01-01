import { Layout } from "@/components/Layout";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { SigningArchwayClient, ArchwayClient } from "@archwayhq/arch3.js";
import BigNumber from "bignumber.js";
import { ChainInfo } from "@/config/constantine.config";
import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";

const formatBigNumb = (value: any) => {
  if (isNaN(value)) return;
  return (Number(value) / 10 ** 18).toFixed(2);
};

const Integrasi = () => {
  const { connect, accounts, isLoading, isConnect } = useWallet();
  return (
    <Layout>
      <Container maxW={"container.xl"}>
        {isConnect ? (
          <Stack
            py="1rem"
            border={"1px solid"}
            borderRadius={"10px"}
            my={4}
            px={4}
          >
            <Heading>Wallet</Heading>
            <Text>address : {accounts?.walet?.address}</Text>
            <Text>
              balance : {formatBigNumb(accounts?.balance.amount ?? "0")}
            </Text>
            <Text>Symbol : {accounts?.balance.denom}</Text>
          </Stack>
        ) : (
          <Button onClick={connect} my={4} isLoading={isLoading}>
            Connect Keplr
          </Button>
        )}
      </Container>
    </Layout>
  );
};

export default Integrasi;
