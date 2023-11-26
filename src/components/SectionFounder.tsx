import { Container, Text, Box, Flex, Image, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SectionFounder = () => {
  const { t } = useTranslation();

  return (
    <Box overflow={"hidden"} py={20}>
      <Container maxW={"container.lg"}>
        <Flex
          w={"full"}
          justifyContent={"space-between"}
          gap={20}
          flexDir={{
            base: "column",
            md: "row",
          }}
          alignItems={"center"}
        >
          <Box
            flex={"0 0 300px"}
            h={{ base: "300px", md: "400px" }}
            w={{ base: "300px", md: "400px" }}
            position={"relative"}
            _before={{
              content: '""',
              position: "absolute",
              width: "400px",
              height: "500px",
              right: "-110px",
              top: "-30px",
              bgGradient: "radial(#f266ed21 20%, #9198e500 70%)",
            }}
            _after={{
              content: '""',
              position: "absolute",
              width: "400px",
              height: "500px",
              left: "-110px",
              top: "-20px",
              bgGradient: "radial(#8593e829 20%, #9198e500 70%)",
            }}
          >
            <Box
              bg={"#d9d9d97a"}
              h={{ base: "300px", md: "400px" }}
              w={{ base: "300px", md: "400px" }}
              borderRadius={"50%"}
              overflow={"hidden"}
              pos={"relative"}
              border={"2px solid #D9D9D9"}
            >
              <Image
                pos={"relative"}
                right={14}
                src="founder.png"
                alt="founder"
                h={{ base: "300px", md: "400px" }}
                w={{ base: "300px", md: "400px" }}
                objectFit={"cover"}
              />
            </Box>
          </Box>
          <VStack
            justifyContent={"center"}
            alignItems={{ base: "center", md: "flex-start" }}
          >
            <Text fontWeight={"600"} fontSize={"2xl"}>
              {t("pages.home.founderSection.title")}
            </Text>
            <Box mb={5}>
              <Text as="i" marginBottom={5}>
                {t("pages.home.founderSection.subTitle")}
              </Text>
            </Box>
            <Text as="i" textAlign={{ base: "center", md: "left" }}>
              {t("pages.home.founderSection.description")}
            </Text>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default SectionFounder;
