import { Layout } from "@/components/Layout";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useWallet } from "@/hooks/useWallet";
import { useCW20 } from "@/hooks/useCW20";
import { fromBn, toBn } from "evm-bn";
import { BigNumber } from "ethers";
import { useNFTMarket } from "@/hooks/useNFTMarket";
import { useCW1155 } from "@/hooks/useCW1155";
import { useNetwork } from "@/hooks/useNetwork";
import { useRef } from "react";

const Integrasi = () => {
  const { connect, account, isLoading, isConnect, disconnect } = useWallet();
  const { balance, tokenInfo } = useCW20();
  const { isLoading: isLoadingNft, villaList, buyVilla } = useNFTMarket();
  const { profile, register } = useNetwork();
  const inputRef = useRef<HTMLInputElement>(null);
  const { balance: balanceCw1155 } = useCW1155();

  const handleRegister = async () => {
    if (!inputRef.current?.value) return;
    await register(inputRef.current?.value);
  };

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
            <Text>address : {account?.walet?.address}</Text>
            <Text>
              balance : {fromBn(BigNumber.from(account?.balance.amount))}
            </Text>
            <Text>Symbol : {account?.balance.denom}</Text>
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
          <Text>balance : {fromBn(balance ?? toBn("0"), 6)}</Text>
        </Stack>

        <Stack
          py="1rem"
          border={"1px solid"}
          borderRadius={"10px"}
          my={4}
          px={4}
        >
          <Heading>Network</Heading>
          <Stack direction={"row"}>
            <Stack>
              <FormControl mb={2} isRequired>
                <FormLabel>Referral</FormLabel>
                <Input
                  placeholder="Input Referral"
                  type="text"
                  ref={inputRef}
                ></Input>
              </FormControl>
              <Button type="submit" onClick={handleRegister}>
                Register
              </Button>
            </Stack>
            <Stack>
              <Text>Status</Text>
              <Text>is Register : {String(profile?.is_register)}</Text>
              <Text>
                Referral : {profile?.referral ? profile.referral : "no ref"}
              </Text>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          py="1rem"
          border={"1px solid"}
          borderRadius={"10px"}
          my={4}
          px={4}
        >
          <Heading>NFT Market</Heading>
          <Wrap>
            {villaList?.map((e) => {
              return (
                <WrapItem
                  key={e.id}
                  w="30%"
                  border="1px solid white"
                  rounded={"md"}
                  flexDir={"column"}
                  overflow={"hidden"}
                >
                  <Image
                    src="https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_full_1.jpg?updatedAt=1701536634690"
                    alt="bathroom"
                  />
                  <Stack spacing={1} px={4} py={2}>
                    {Object.values(e).map((j, i) => (
                      <Text key={i}>
                        {Object.keys(e).at(i)} : {j}
                      </Text>
                    ))}
                  </Stack>
                  <Stack padding={4} w="full">
                    <Button
                      w="full"
                      isLoading={isLoadingNft}
                      onClick={() => buyVilla(e, 1)}
                    >
                      Buy
                    </Button>
                  </Stack>
                </WrapItem>
              );
            })}
          </Wrap>
        </Stack>

        <Stack
          py="1rem"
          border={"1px solid"}
          borderRadius={"10px"}
          my={4}
          px={4}
        >
          <Heading>NFT Aset</Heading>

          {
            <Wrap>
              {villaList?.map((e) => {
                return (
                  <WrapItem
                    key={e.id}
                    w="30%"
                    border="1px solid white"
                    rounded={"md"}
                    flexDir={"column"}
                    overflow={"hidden"}
                  >
                    <Image
                      src="https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_full_1.jpg?updatedAt=1701536634690"
                      alt="bathroom"
                    />
                    <Stack spacing={1} px={4} py={2}>
                      <Text>Total : {balanceCw1155[e.id]}</Text>
                      <Text>Bonus : 0</Text>
                    </Stack>
                    <Stack padding={4} w="full">
                      <Button w="full" isLoading={isLoadingNft}>
                        Claim
                      </Button>
                    </Stack>
                  </WrapItem>
                );
              })}
            </Wrap>
          }
        </Stack>
      </Container>
    </Layout>
  );
};

export default Integrasi;
