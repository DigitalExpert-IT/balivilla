import { Layout } from "@/components/Layout";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import NumericInput from "@/components/NumericInput";
import { detail } from "@/constant/dummy";
import { useTranslation } from "react-i18next";

const villaImages = [
  {
    src: "https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_full_1.jpg?updatedAt=1701536634690",
    description: "Bedroom",
  },
  {
    src: "https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_full_2.jpg?updatedAt=1701536632951",
    description: "Bathroom",
  },
  {
    src: "https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_full_3.jpg?updatedAt=1701536634137",
    description: "Kitchen",
  },
  {
    src: "https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_4.jpg?updatedAt=1701534669953",
    description: "Living Room",
  },
];

const Detail = () => {
  return (
    <Layout>
      <Header />
      <Container maxW={"container.xl"}>
        <Flex direction={"column"} gap={10} py={10}>
          <Status />
          <InvestmentScheme />
          <Description />
        </Flex>
      </Container>
    </Layout>
  );
};

const Header = () => {
  return (
    <>
      <Box>
        <Box
          h={"calc(100vh - 100px)"}
          bgColor={"blue"}
          backgroundImage={
            "https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_full_main.jpg?updatedAt=1701536634911"
          }
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
        >
          <Flex
            h={"100%"}
            background={
              "linear-gradient(75.46deg, #1F1540 4.86%, #7c729b78 30.86%, rgba(255, 255, 255, 0) 58.23%)"
            }
            flexDir={"column"}
            justifyContent={"flex-end"}
          >
            <Container maxW={"container.xl"}>
              <Box
                w={"40%"}
                pb={10}
                visibility={{ base: "hidden", md: "visible" }}
              >
                <Box>
                  <Text
                    fontSize={"5xl"}
                    fontWeight={"800"}
                    textShadow={"2px 1px 2px #161616"}
                  >
                    {detail.header.name}
                  </Text>
                  <Text fontSize={"2xl"} textShadow={"2px 1px 2px #161616"}>
                    {detail.header.location}
                  </Text>
                </Box>
                <Text mt={10} textAlign={"justify"}>
                  {detail.header.description}
                </Text>
              </Box>
            </Container>
          </Flex>
        </Box>
      </Box>
      <Box h={"20vh"} bgColor={"red"} w={"full"}>
        <Grid templateColumns="repeat(4, 1fr)" w={"full"}>
          {villaImages.map((villa, id) => (
            <GridItem key={id}>
              <Box position={"relative"}>
                <Flex
                  position={"absolute"}
                  h={"20vh"}
                  w={"100%"}
                  bgColor={"#00000091"}
                  opacity={0}
                  justify={"center"}
                  align={"center"}
                  transition={"0.2s"}
                  transitionTimingFunction={"ease-in"}
                  _hover={{
                    opacity: 100,
                  }}
                  fontWeight={600}
                >
                  {villa.description}
                </Flex>
                <Image
                  src={villa.src}
                  alt=""
                  h={"20vh"}
                  w={"100%"}
                  objectFit={"cover"}
                />
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

const Description = () => {
  const { t } = useTranslation();

  return (
    <Flex flexDir={{ base: "column", md: "row" }} gap={10}>
      <Flex flex={1} flexDir={"column"} gap={3}>
        <Text fontWeight={"800"} fontSize={"3xl"} mb={8}>
          {t("pages.detailVilla.description.title")}
        </Text>
        <Text>
          An amazing two-story 2+1 with sea view, private garage, and quiet area
          surrounded by nature. Just half a kilometer distance from the ancient
          city of ‘Iasos’. Kiyikislacik has known for its fisherman, olive
          trees, and great history. It is a rapidly growing area in terms of
          real estate investment. A few kilometers distances, there are many
          luxury development projects around.
        </Text>
        <Text>Exact location: 37° 17' 53.4163" N 27° 35' 39.1067" E</Text>
        <Text>
          Just 15 km distance to Milas Airport, this villa is in the Serenity
          Bodream villa project and offers a great stable income in one of the
          most sought-after locations on the Aegean coast. 35-minute distance to
          Bodrum and 1.1 km distance to the sea.
        </Text>
        <Text>Some specs:</Text>
        <UnorderedList>
          <ListItem>550 m2 land</ListItem>
          <ListItem>100 m2 villa area</ListItem>
          <ListItem>400 m2 garden</ListItem>
          <ListItem>Sea view</ListItem>
          <ListItem>Very close distance to Milas airport</ListItem>
          <ListItem>Basketball and tennis courts</ListItem>
          <ListItem>World cuisine restaurants & cafe’s</ListItem>
          <ListItem>Shops</ListItem>
          <ListItem>Social facility area with pool</ListItem>
          <ListItem>Private car park</ListItem>
          <ListItem>24/7 security all year</ListItem>
        </UnorderedList>
        <Text>Need more information? Reach us by our contact form here.</Text>
      </Flex>
      <Box flex={1}>
        <Text fontWeight={"800"} fontSize={"3xl"} mb={8}>
          {t("pages.detailVilla.details.title")}
        </Text>
        <Flex gap={2}>
          <Flex
            bgColor={"white"}
            p={2}
            borderRadius={10}
            w={10}
            h={10}
            align={"center"}
          >
            <Image src="/icons/deal.png" alt="deal" />
          </Flex>
          <Flex
            bgColor={"white"}
            p={2}
            borderRadius={10}
            w={10}
            h={10}
            align={"center"}
          >
            <Image src="/icons/home.png" alt="deal" />
          </Flex>
          <Flex
            bgColor={"white"}
            p={2}
            borderRadius={10}
            w={10}
            h={10}
            align={"center"}
          >
            <Image src="/icons/time.png" alt="deal" />
          </Flex>
        </Flex>
        <Grid templateColumns="repeat(2, 1fr)" mt={5}>
          <GridItem>{t("pages.detailVilla.details.contractAddress")}</GridItem>
          <GridItem>0xef0141...136c2aeb8</GridItem>
          <GridItem>{t("pages.detailVilla.details.fnftid")}</GridItem>
          <GridItem>1</GridItem>
          <GridItem>{t("pages.detailVilla.details.blockchain")}</GridItem>
          <GridItem>Binance Smart Chain </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

const InvestmentScheme = () => {
  const { t } = useTranslation();
  return (
    <>
      <Text fontWeight={"800"} fontSize={"3xl"} mb={8}>
        {t("pages.detailVilla.investmentScheme.title")}
      </Text>
      <Flex
        p={10}
        bgColor={"#57467275"}
        border={"1px solid #A4A4BE"}
        borderRadius={30}
      >
        <Grid
          templateColumns={{ base: "", md: "repeat(3, 1fr)" }}
          gap={6}
          w={"100%"}
        >
          <GridItem>
            <Text fontWeight={"700"} color={"#FFFFFF"}>
              {t("pages.detailVilla.investmentScheme.totalInvestment")}
            </Text>
            <Text color={"#A4A4BE"}>$295,000.00</Text>
          </GridItem>
          <GridItem>
            <Text fontWeight={"700"} color={"#FFFFFF"}>
              {t("pages.detailVilla.investmentScheme.avgReturn")}
            </Text>
            <Text color={"#A4A4BE"}>-</Text>
          </GridItem>
          <GridItem>
            <Text fontWeight={"700"} color={"#FFFFFF"}>
              {t("pages.detailVilla.investmentScheme.exitDate")}
            </Text>
            <Text color={"#A4A4BE"}>6/20/2024</Text>
          </GridItem>
          <GridItem>
            <Text fontWeight={"700"} color={"#FFFFFF"}>
              {t("pages.detailVilla.investmentScheme.estReturn")}
            </Text>
            <Text color={"#A4A4BE"}>22% / Year</Text>
          </GridItem>
          <GridItem>
            <Text fontWeight={"700"} color={"#FFFFFF"}>
              {t("pages.detailVilla.investmentScheme.investingPeriod")}
            </Text>
            <Text color={"#A4A4BE"}>10 Months</Text>
          </GridItem>
          <GridItem>
            <Text fontWeight={"700"} color={"#FFFFFF"}>
              {t("pages.detailVilla.investmentScheme.exitType")}
            </Text>
            <Text color={"#A4A4BE"}>USDT</Text>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

const Status = () => {
  const [nftAmount, setNFTAmount] = useState(0);
  const { t } = useTranslation();

  return (
    <>
      <Text fontWeight={"800"} fontSize={"3xl"} mb={8}>
        {t("pages.detailVilla.status.title")}
      </Text>
      <Flex
        borderRadius={30}
        p={10}
        bgColor={"#57467275"}
        border={"1px solid #A4A4BE"}
        justifyContent={{ base: "flex-start", md: "space-between" }}
        alignItems={{ base: "flex-start", md: "center" }}
        flexDir={{ base: "column", md: "row" }}
        gap={3}
      >
        <Box>
          <Text fontWeight={"600"}>
            {t("pages.detailVilla.status.fractionSold")}
          </Text>
          <Text fontWeight={"800"} fontSize={"xl"} color={"#D995FF"}>
            5900w
          </Text>
          <Text color={"#A4A4BE"} fontWeight={"600"}>
            100% (5900)
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"600"}>
            {t("pages.detailVilla.status.estimateReturn")}
          </Text>
          <Text fontWeight={"800"} fontSize={"xl"} color={"#D995FF"}>
            22%
          </Text>
          <Text color={"#A4A4BE"} fontWeight={"600"}>
            / {t("pages.detailVilla.status.year")}
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"600"}>{t("pages.detailVilla.status.price")}</Text>
          <Text fontWeight={"800"} fontSize={"xl"} color={"#D995FF"}>
            $50.00
          </Text>
          <Text color={"#A4A4BE"} fontWeight={"600"}>
            / {t("pages.detailVilla.status.fraction")}
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"600"}>
            {t("pages.detailVilla.status.investmentStatus")}
          </Text>
          <Text fontWeight={"800"} fontSize={"xl"} color={"#D995FF"}>
            Completed
          </Text>
        </Box>
      </Flex>
      <Flex
        justifyContent={"flex-end"}
        marginTop={7}
        gap={3}
        flexDir={{
          base: "column",
          md: "row",
        }}
      >
        <NumericInput
          onChange={(val) => {
            setNFTAmount(val);
          }}
        />
        <Button bgColor={"#4E64E7"} p={6} borderRadius={12} h={"100%"}>
          Buy 200 USDT
        </Button>
      </Flex>
    </>
  );
};

export default Detail;
