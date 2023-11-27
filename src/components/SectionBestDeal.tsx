import { Box, Flex, Text, Container, Image, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SectionBestDeal = () => {
  const { t } = useTranslation();
  return (
    <Container maxW={"8xl"} paddingY={20}>
      <Box>
        <Flex flexDirection={{ base: "column", md: "row" }} gap={10}>
          <Text
            fontWeight={"800"}
            fontSize={25}
            margin={"auto 0"}
            textAlign={{ base: "center", md: "left" }}
          >
            {t("pages.home.bestDealSection.title")}
          </Text>
          <Flex alignItems={"center"}>
            <Flex gap={2} position={"relative"}>
              {/* ICON */}
              <Box
                flex={"0 0 100px"}
                bgColor={"red"}
                background={
                  "radial-gradient(50% 50% at 50% 50%, #3C24B2 0%, #1C1050 100%)"
                }
                w={"140px"}
                h={"100px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Image
                  src="icons/checklist.png"
                  alt="checklist"
                  zIndex={10}
                  w={20}
                  height={"30px"}
                  width={"30px"}
                />
              </Box>
              <VStack justifyContent={"center"} alignItems={"flex-start"}>
                <Text fontWeight={"800"} marginBottom={4}>
                  {t("pages.home.bestDealSection.fastTransaction.title")}
                </Text>
                <Text fontSize={13}>
                  {t("pages.home.bestDealSection.fastTransaction.description")}
                </Text>
              </VStack>
            </Flex>
          </Flex>
          <Flex alignItems={"center"}>
            <Flex gap={2}>
              {/* ICON */}
              <Box
                flex={"0 0 100px"}
                background={
                  "radial-gradient(50% 50% at 50% 50%, #3C24B2 0%, #1C1050 100%)"
                }
                w={"100px"}
                h={"100px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Image
                  src="icons/graph.png"
                  alt="graph"
                  height={"50px"}
                  width={"50px"}
                />
              </Box>
              <VStack justifyContent={"center"} alignItems={"flex-start"}>
                <Text fontWeight={"800"} marginBottom={4}>
                  {t("pages.home.bestDealSection.growthCommunity.title")}
                </Text>
                <Text fontSize={13}>
                  {t("pages.home.bestDealSection.growthCommunity.description")}
                </Text>
              </VStack>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default SectionBestDeal;
