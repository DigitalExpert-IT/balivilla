import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  Image,
  Link,
} from "@chakra-ui/react";
import { Ref, forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface ILayout {
  children: React.ReactNode;
}

export const Layout = (props: ILayout) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Flex
        position={"relative"}
        background={"linear-gradient(180deg, #0D0F1B 100%, #292F89 100%)"}
        w={"full"}
        width={"full"}
        justifyContent={"center"}
        py={5}
        overflow={"hidden"}
        h={"100px"}
        _before={{
          content: '""',
          overflow: "hidden",
          position: "absolute",
          width: "100%",
          height: "100vh",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(123, 61, 138, 0.85) 0%, rgba(61, 63, 138, 0) 100%)",
        }}
      >
        <Heading
          fontWeight={"800"}
          bgGradient={"linear(to-r, #9393FF 36.1%, #FFFFFC 95.96%)"}
          bgClip={"text"}
        >
          {t("common.navbar.title")}
        </Heading>
      </Flex>
      {props.children}
      <Box
        bg={
          "linear-gradient(0deg, #1F0D41, #1F0D41),linear-gradient(0deg, #3C2E78, #3C2E78)"
        }
        h={"150px"}
        borderTop={"3px solid #3C2E78"}
        overflow={"hidden"}
      >
        <Container maxW={"container.xl"} h={"100%"} position={"relative"}>
          <Box
            position={"absolute"}
            width={"600px"}
            height={"500px"}
            left={"-110px"}
            top={"-20px"}
            bgGradient={"radial(#8593e829 20%, #9198e500 70%)"}
          />
          <Box
            position={"absolute"}
            width={"695px"}
            height={"400px"}
            left={"360px"}
            top={"-20px"}
            bgGradient={"radial(#5d6ef336 20%, #9198e500 70%)"}
          />
          <Box
            position={"absolute"}
            width={"537px"}
            height={"400px"}
            left={"811px"}
            top={"-2px"}
            bgGradient={"radial(#fc4ff621 20%, #9198e500 70%)"}
          />

          <Flex
            justifyContent={{ base: "center", md: "space-between" }}
            alignItems={"center"}
            h={"100%"}
            position={"relative"}
            flexDir={{ base: "column", md: "row" }}
            zIndex={10}
            gap={2}
          >
            <Text fontWeight={"600"} fontSize={{ base: "lg", md: "2xl" }}>
              {t("common.footer.title")}
            </Text>
            <Flex
              gap={5}
              alignItems={"center"}
              flexDir={{ base: "column", md: "row" }}
            >
              <Text
                fontSize={{ base: "12px", md: "sm" }}
                textAlign={{ base: "center", md: "left" }}
              >
                {t("common.footer.description")}
              </Text>
              <Flex gap={3}>
                <Link href={"#"}>
                  <Image src="/icons/facebook.png" alt="facebook" />
                </Link>
                <Link href={"#"}>
                  <Image src="/icons/twitter.png" alt="twitter" />
                </Link>
                <Link href={"#"}>
                  <Image src="/icons/linkedin.png" alt="linkedin" />
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
