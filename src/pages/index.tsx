import { Layout } from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Layout>
      <SectionHeader />
      <Box w={"full"} height={"100vh"}></Box>
    </Layout>
  );
}
