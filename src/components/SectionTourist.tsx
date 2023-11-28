import React, { useEffect, useRef, useState } from "react";
import { Box, Container, VStack, Text, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import MapChart from "./TouristMap";

const SectionTourist = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [refHeight, setRefHeight] = useState<number>(0);
  const [refOffsetTop, setRefOffsetTop] = useState<number>(0);
  const { scrollY } = useScroll();
  const textMove = useTransform(
    scrollY,
    [refOffsetTop - 200, refOffsetTop + 200],
    [0, refHeight / 6]
  );
  const textOpa = useTransform(
    scrollY,
    [
      refOffsetTop - 200,
      refOffsetTop + 200,
      refOffsetTop + 600,
      refOffsetTop + 800,
    ],
    [0, 1, 1, 0]
  );
  const mapOpa = useTransform(
    scrollY,
    [
      refOffsetTop + refHeight / 4 - 800,
      refOffsetTop + refHeight / 4 - 500,
      refOffsetTop + refHeight / 4 + 300,
    ],
    [0, 0, 1]
  );
  const mapEvent = useTransform(
    scrollY,
    [
      refOffsetTop + refHeight / 4 - 800,
      refOffsetTop + refHeight / 4 + 200,
      refOffsetTop + refHeight,
    ],
    ["none", "none", "visible"]
  );

  useEffect(() => {
    const getRefHeight = () => {
      if (scrollRef.current) {
        setRefHeight(scrollRef.current?.clientHeight);
        setRefOffsetTop(scrollRef.current?.offsetTop);
      }
    };

    getRefHeight();

    window.addEventListener("resize", getRefHeight);

    return () => window.removeEventListener("resize", getRefHeight);
  }, []);

  return (
    <Box background={"#161634"} position={"relative"} p={4} ref={scrollRef}>
      <Container maxW={"container.xl"} minH="200vh">
        {/* ======== TEXT START ======== */}
        <Box
          position={"sticky"}
          height={"100%"}
          width={"fit-content"}
          top={0}
          bottom={0}
          margin={"auto"}
          zIndex={2}
        >
          <motion.div
            style={{
              y: textMove,
              opacity: textOpa,
            }}
          >
            <VStack
              h={"100%"}
              justify={"center"}
              gap={10}
              w={{ base: "100%", md: "600px" }}
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
          </motion.div>
        </Box>
        {/* ======== TEXT END ======== */}

        {/* ======== MAP START ======== */}
        <Box
          position={"sticky"}
          height={"100%"}
          top={0}
          bottom={0}
          margin={"auto"}
          zIndex={1}
        >
          <motion.div style={{ opacity: mapOpa, pointerEvents: mapEvent }}>
            <MapChart />
          </motion.div>
        </Box>
        {/* ======== MAP END ======== */}
      </Container>
    </Box>
  );
};

export default SectionTourist;
