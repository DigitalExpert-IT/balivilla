import { Layout } from "@/components/Layout";
import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useWallet } from "@/hooks/useWallet";
import { formatBigNumb } from "@/lib";
import { useCW20 } from "@/hooks/useCW20";
import { fromBn, toBn } from "evm-bn";
import { BigNumber } from "ethers";

const Integrasi = () => {
  const { connect, accounts, isLoading, isConnect, disconnect } = useWallet();
  const { balance, tokenInfo } = useCW20();
  console.log("balance cok", accounts);

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
              balance : {fromBn(BigNumber.from(accounts?.balance.amount))}
            </Text>
            <Text>Symbol : {accounts?.balance.denom}</Text>
            <Button onClick={disconnect} my={4} isLoading={isLoading}>
              Disconnet keplr
            </Button>
          </Stack>
        ) : (
          <Button onClick={connect} my={4} isLoading={isLoading}>
            Connect Keplr
          </Button>
        )}

        <Stack
          py="1rem"
          border={"1px solid"}
          borderRadius={"10px"}
          my={4}
          px={4}
        >
          <Heading>USDT</Heading>
          {Object.values(tokenInfo ?? {}).map((e, idx) => {
            return (
              <Text key={idx}>
                {Object.keys(tokenInfo ?? {}).at(idx)} : {e}
              </Text>
            );
          })}
          <Text>balance : {fromBn(balance?.balance ?? toBn("0"), 6)}</Text>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Integrasi;
