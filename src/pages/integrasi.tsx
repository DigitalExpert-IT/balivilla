import { Layout } from '@/components/Layout';
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
} from '@chakra-ui/react';
import { useWallet } from '@/hooks/useWallet';
import { useCW20 } from '@/hooks/useCW20';
import { fromBn, toBn } from 'evm-bn';
import { BigNumber } from 'ethers';
import { useNFTMarket } from '@/hooks/useNFTMarket';
import { useCW1155 } from '@/hooks/useCW1155';
import { useNetwork } from '@/hooks/useNetwork';

const Integrasi = () => {
  const { connect, account, isLoading, isConnect, disconnect } = useWallet();
  const { balance, tokenInfo } = useCW20();
  const { isLoading: isLoadingNft, villaList, buyVilla } = useNFTMarket();
  const { profile } = useNetwork();
  const { getBalance } = useCW1155();

  console.log(profile);

  return (
    <Layout>
      <Container maxW={'container.xl'}>
        {isConnect ? (
          <Stack
            py="1rem"
            border={'1px solid'}
            borderRadius={'10px'}
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
          border={'1px solid'}
          borderRadius={'10px'}
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
          <Text>balance : {fromBn(balance ?? toBn('0'), 6)}</Text>
        </Stack>

        <Stack
          py="1rem"
          border={'1px solid'}
          borderRadius={'10px'}
          my={4}
          px={4}
        >
          <Heading>Network</Heading>
          <Stack direction={'row'}>
            <Stack>
              <FormControl>
                <FormLabel>Referral</FormLabel>
                <Input placeholder="Input Referral"></Input>
              </FormControl>
              <Button>Register</Button>
            </Stack>
            <Stack>
              <Text>Status</Text>
              <Text>is Register : </Text>
              <Text>Referral : </Text>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          py="1rem"
          border={'1px solid'}
          borderRadius={'10px'}
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
                  rounded={'md'}
                  flexDir={'column'}
                  overflow={'hidden'}
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
          border={'1px solid'}
          borderRadius={'10px'}
          my={4}
          px={4}
        >
          <Heading>NFT Aset</Heading>
          <Text>nft1 : 0</Text>
          <Text>nft2 : 0</Text>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Integrasi;
