import { Layout } from "@/components/Layout";
import SectionBestDeal from "@/components/SectionBestDeal";
import SectionHeader from "@/components/SectionHeader";
export default function Home() {
  return (
    <Layout>
      <SectionHeader />
      <SectionBestDeal />
    </Layout>
  );
}
