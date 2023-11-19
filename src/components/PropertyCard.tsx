import { Text, Box, Flex, Image } from "@chakra-ui/react";

interface IPropertyCard {
  mainImgUrl: string;
  imgListUrl: string[];
  title: string;
  location: string;
  totalInvestor: number;
}

const PropertyCard = (props: IPropertyCard) => {
  const { imgListUrl, location, mainImgUrl, title, totalInvestor } = props;

  return (
    <Box>
      <Box
        p={5}
        background={"#57467275"}
        borderRadius={"20px"}
        border={"2px solid #A4A4BE"}
      >
        <Box overflow={"hidden"} borderRadius={"20px"} marginBottom={2}>
          <Image src={mainImgUrl} alt="" />
        </Box>
        <Flex gap={3}>
          {imgListUrl.map((url, i) => (
            <Box flex={1} key={i}>
              <Image
                src={url}
                alt="villa-img"
                borderRadius={10}
                height={"100%"}
              />
            </Box>
          ))}
        </Flex>
      </Box>
      <Box
        p={5}
        background={"#57467275"}
        borderRadius={"20px"}
        border={"2px solid #A4A4BE"}
        marginTop={4}
      >
        <Flex justifyContent={"space-between"}>
          <Box>
            <Text mb={1}>{title}</Text>
            <Flex gap={2}>
              <Image
                src="icons/pinpoint.png"
                objectFit={"contain"}
                alt="pin point"
              />
              <Text fontSize={12} alignSelf={"flex-end"}>
                {location}
              </Text>
            </Flex>
          </Box>
          <Flex
            background={"#57467275"}
            borderRadius={"20px"}
            border={"2px solid #A4A4BE"}
            px={2}
            alignItems={"center"}
            fontSize={13}
            textAlign={"center"}
          >
            Total {totalInvestor} Investor
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default PropertyCard;
