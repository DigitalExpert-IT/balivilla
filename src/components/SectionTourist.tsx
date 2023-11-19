import React from "react";
import { Box, Container, VStack, Text, Image, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SectionTourist = () => {
  const { t } = useTranslation();
  return (
    <Box background={"#161634"} position={"relative"} p={4}>
      <Container
        maxW={"container.xl"}
        h={"100vh"}
        backgroundImage={"maps.png"}
        bgRepeat={"no-repeat"}
        bgSize={"contain"}
        bgPosition={"center"}
        display={"flex"}
        justifyContent={"center"}
      >
        <VStack
          h={"100%"}
          justify={"center"}
          gap={10}
          w={"600px"}
          alignSelf={"center"}
        >
          <Text fontWeight={"800"} fontSize={24} textAlign={"center"}>
            {t("pages.home.touristSection.title")}
          </Text>
          <Text textAlign={"center"}>
            {t("pages.home.touristSection.description")}
          </Text>
          <Button background={"#546FFF"}>
            {t("pages.home.touristSection.button.register")}
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default SectionTourist;
