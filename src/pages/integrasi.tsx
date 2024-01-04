import { Layout } from "@/components/Layout";
import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useWallet } from "@/hooks/useWallet";
import { formatBigNumb } from "@/lib";
import { useCW20 } from "@/hooks/useCW20";

const Integrasi = () => {
  const { connect, accounts, isLoading, isConnect, disconnect } = useWallet();
  const { balance, tokenInfo } = useCW20();
  console.log("balance cok", tokenInfo, balance);

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
            <Button onClick={disconnect} my={4} isLoading={isLoading}>
              Disconnet keplr
            </Button>
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
