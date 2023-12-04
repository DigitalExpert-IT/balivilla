import React from "react";
import { Box, Text, Stack, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { PARTNERSHIPDATA } from "@/constant/partnership";
import Link from "next/link";

export const SectionPartnership = () => {
  const { t } = useTranslation();
  return (
    <Box textAlign="center" py="2rem">
      <Box>
        <Text fontSize="xl" textTransform="capitalize">
          {t("pages.home.partnershipSection.title")}
        </Text>
        <Text fontSize="5xl" fontWeight="bold" textTransform="capitalize">
          {t("pages.home.partnershipSection.subtitle")}
        </Text>
      </Box>
      <Stack
        direction="row"
        align="center"
        justify="center"
        mt="2rem"
        spacing="3rem"
      >
        {PARTNERSHIPDATA.map((item, idx) => (
          <Link href={item.link} key={idx}>
            <Box w="100%">
              <Image src={item.image} alt="image" objectFit="cover" />
            </Box>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};
