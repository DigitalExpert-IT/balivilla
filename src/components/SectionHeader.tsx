import {
  Box,
  Text,
  Heading,
  VStack,
  Container,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SectionHeader = () => {
  const { t } = useTranslation();
  return (
    <Box
      background={
        "linear-gradient(180deg, #0D0F1B 20%, #0d0f1b6e 50%, #292F89 100%)"
      }
    >
      <Box
        bgImage={"bg-header.png"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        bgPosition={"top"}
        overflowX={"hidden"}
        backgroundPosition={{
          base: "center 250px",
          md: "center 150px",
          lg: "center 0px",
        }}
      >
        <Container maxW={"7xl"}>
          <Flex alignItems={"center"} gap={25}>
            <VStack
              h={"90vh"}
              alignItems={{ base: "center", md: "flex-start" }}
              justifyContent={"center"}
              color={"#FFF"}
              gap={3}
              flex={1}
              textAlign={{ base: "center", md: "left" }}
            >
              <Heading size={"4xl"}>{t("common.header.title")}</Heading>
              <Heading size={"3xl"}>{t("common.header.subTitle")}</Heading>
              <Text textAlign={{ base: "center", md: "left" }} fontSize={15}>
                {t("common.header.description")}
              </Text>
            </VStack>
            {/* CARD SECTION */}
            <Flex
              flex={1}
              justifyContent={"center"}
              position={"relative"}
              display={{ base: "none", md: "flex" }}
            >
              <Box
                border={"1px solid white"}
                background={"#9292a3e6"}
                w={"410px"}
                h={"378px"}
                borderRadius={"15px"}
                transform={"rotate(7deg)"}
                position={"relative"}
              />
              <Box
                position={"absolute"}
                border={"1px solid white"}
                background={"#9292a3e6"}
                w={"410px"}
                h={"378px"}
                borderRadius={"15px"}
                p={4}
                _before={{
                  content: '""',
                  position: "absolute",
                  width: "300px",
                  height: "400px",
                  right: "-110px",
                  top: "80px",
                  bgGradient: "radial(#f266ed21 20%, #9198e500 70%)",
                }}
                _after={{
                  content: '""',
                  position: "absolute",
                  width: "300px",
                  height: "400px",
                  left: "-110px",
                  top: "80px",
                  bgGradient: "radial(#8593e829 20%, #9198e500 70%)",
                }}
              >
                <VStack h={"100%"}>
                  <Box
                    h={"100%"}
                    bgColor={"blue"}
                    bgGradient={"linear(to-b, #29378D 0%, #3F0F74 100%)"}
                    borderRadius={10}
                    w={"full"}
                    flex={"2 1 0"}
                  >
                    <Image
                      src={"dummy-villa.png"}
                      alt={"vila"}
                      h={"100%"}
                      objectFit={"contain"}
                    />
                  </Box>
                  <Flex w={"full"} gap={2} h={"full"} flex={1} color={"white"}>
                    <VStack
                      bgColor={"#FFFFFF45"}
                      h={"100%"}
                      w={"full"}
                      flex={"1 1 0"}
                      borderRadius={14}
                      gap={0}
                      justifyContent={"center"}
                    >
                      <Text fontSize={20} fontWeight={"800"}>
                        100
                      </Text>
                      <Text fontSize={12}>Total Investor</Text>
                    </VStack>
                    <VStack
                      bgColor={"#FFFFFF45"}
                      h={"100%"}
                      w={"full"}
                      flex={1}
                      borderRadius={14}
                      gap={0}
                      justifyContent={"center"}
                    >
                      <Text fontSize={12}>Fraction Price</Text>
                      <Text fontSize={17} fontWeight={"800"}>
                        200 USDT
                      </Text>
                    </VStack>
                    <VStack
                      bgColor={"#FFFFFF45"}
                      h={"100%"}
                      w={"full"}
                      flex={1}
                      borderRadius={14}
                      gap={0}
                      justifyContent={"center"}
                    >
                      <Text fontSize={12}>Total Price</Text>
                      <Text fontSize={17} fontWeight={"800"}>
                        200 USDT
                      </Text>
                    </VStack>
                  </Flex>
                </VStack>
              </Box>
            </Flex>
            {/* CARD SECTION END*/}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default SectionHeader;
