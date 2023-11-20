import { useTranslation } from "react-i18next";
import { VStack, Text, Box, Flex, Image, Container } from "@chakra-ui/react";
import PropertyCard from "./PropertyCard";

const property = {
  mainImgUrl:
    "https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_main.png?updatedAt=1700463296482",
  imgListUrl: [
    "https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_3.png?updatedAt=1700463292170",
    "https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_2.png?updatedAt=1700463291642",
    "https://ik.imagekit.io/msxxxaegj/Bali_Vila/bali_1.png?updatedAt=1700463290368",
  ],
  title: "Villa Ubud",
  location: "Ubud, Bali, Indonesia",
  totalInvestor: 100,
};

const SectionProperty = () => {
  const { t } = useTranslation();

  return (
    <Container maxW={"container.xl"}>
      <VStack py={10}>
        <Text>{t("pages.home.propertySection.title")}</Text>
        <Text fontSize={28} fontWeight={"800"} marginBottom={8}>
          {t("pages.home.propertySection.subTitle")}
        </Text>
        <Flex
          gap={{ base: 10, md: 5 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <PropertyCard
            imgListUrl={property.imgListUrl}
            location={property.location}
            mainImgUrl={property.mainImgUrl}
            title={property.title}
            totalInvestor={property.totalInvestor}
          />
          <PropertyCard
            imgListUrl={property.imgListUrl}
            location={property.location}
            mainImgUrl={property.mainImgUrl}
            title={property.title}
            totalInvestor={property.totalInvestor}
          />
          <PropertyCard
            imgListUrl={property.imgListUrl}
            location={property.location}
            mainImgUrl={property.mainImgUrl}
            title={property.title}
            totalInvestor={property.totalInvestor}
          />
        </Flex>
      </VStack>
    </Container>
  );
};

export default SectionProperty;
