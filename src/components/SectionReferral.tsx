import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SectionReferral = () => {
  const { t } = useTranslation();

  return (
    <Container maxW={"container.xl"} py={10}>
      <Heading textAlign={"center"} marginBottom={10}>
        {t("pages.home.referralSection.title")}
      </Heading>
      <Flex
        p={8}
        background={"#0A0A0A"}
        borderRadius={10}
        gap={10}
        boxShadow={"0px 0px 10px 0px #FFFFFF"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Image
          src="astronaut.jpg"
          borderRadius={20}
          objectFit={"cover"}
          w={{ base: "100%", md: "50%" }}
          alt="astronaut"
        />
        <VStack
          flex={1}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          gap={5}
        >
          <Box>
            <Text
              fontWeight={"800"}
              fontSize={{ base: "xl", md: "2xl" }}
              marginBottom={3}
              background={
                "linear-gradient(90.19deg, #8143FD 2.45%, #FFFFFF 95.58%)"
              }
              bgClip={"text"}
              letterSpacing={2}
            >
              {t("pages.home.referralSection.subTitle")}
            </Text>
            <Text> {t("pages.home.referralSection.description")}</Text>
          </Box>
          <Flex
            w={"100%"}
            bg={"white"}
            h={10}
            justifyContent={"space-between"}
            alignItems={"center"}
            paddingLeft={5}
            borderRadius={20}
          >
            <Text color={"gray"}>0 BVI</Text>
            <Button
              h="100%"
              size="sm"
              bg={"red"}
              w={"5.5rem"}
              background={"#A259FF"}
              _hover={{
                background: "#6526b5",
              }}
            >
              Claim
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Container>
  );
};

export default SectionReferral;
