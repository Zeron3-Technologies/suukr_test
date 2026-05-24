import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import GiftBanner from "@/components/GiftBanner";
import Categories from "@/components/Categories";
import OrderMarquee from "@/components/OrderMarquee";
import VisitUs from "@/components/VisitUs";
import Footer from "@/components/Footer";
import { getHomeData, getLocationData, getSiteData } from "@/lib/publicContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [home, location, site] = await Promise.all([
    getHomeData(),
    getLocationData(),
    getSiteData(),
  ]);

  return (
    <main className="min-h-screen bg-[#FEF2F2]">
      <Hero hero={home.hero} site={site} />
      <div className="py-8 sm:py-12"><ProductCarousel items={home.products.length ? home.products : undefined} /></div>
      <div className="py-8 sm:py-12"><GiftBanner giftUrl={site.shopifyMerchUrl} /></div>
      <div className="py-8 sm:py-12"><Categories /></div>
      <OrderMarquee />
      <div className="py-8 sm:py-12"><VisitUs location={location} /></div>
      <Footer location={location} site={site} />
    </main>
  );
}
