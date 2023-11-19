import { Layout } from "@/components/Layout";
import SectionBestDeal from "@/components/SectionBestDeal";
import SectionHeader from "@/components/SectionHeader";
import SectionProperty from "@/components/SectionProperty";

export default function Home() {
  return (
    <Layout>
      <SectionHeader />
      <SectionBestDeal />
      <SectionProperty />
    </Layout>
  );
}
