import { useTranslation } from "react-i18next";
import { VStack, Text, Box, Flex, Image, Container } from "@chakra-ui/react";
import PropertyCard from "./PropertyCard";

const property = {
  mainImgUrl: "villa.jpg",
  imgListUrl: ["villa.jpg", "villa2.jpg", "villa3.jpg"],
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
