import { Layout } from "@/components/Layout";
import SectionBestDeal from "@/components/SectionBestDeal";
import SectionFounder from "@/components/SectionFounder";
import SectionHeader from "@/components/SectionHeader";
import SectionProperty from "@/components/SectionProperty";
import SectionReferral from "@/components/SectionReferral";
import { Box } from "@chakra-ui/react";
import SectionTourist from "@/components/SectionTourist";

export default function Home() {
  return (
    <Layout>
      <SectionHeader />
      <SectionBestDeal />
      <SectionProperty />
      <Box bg={"#3B1165"}>
        <SectionReferral />
        <SectionFounder />
      </Box>
      <SectionTourist />
    </Layout>
  );
}
