import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestNews } from "@/components/home/LatestNews";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { AdvertiseCTA } from "@/components/home/AdvertiseCTA";
import { Newsletter } from "@/components/home/Newsletter";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <LatestNews />
      <CategoriesSection />
      <AdvertiseCTA />
      <Newsletter />
    </Layout>
  );
};

export default Index;
