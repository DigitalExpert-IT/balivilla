import { Box, Flex, Heading } from "@chakra-ui/react";
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
        // bgColor={"#0D0F1B"}
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
    </Box>
  );
};
