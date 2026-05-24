import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisitUs from "@/components/VisitUs";
import { getLocationData, getSiteData } from "@/lib/publicContent";

export const dynamic = "force-dynamic";

export default async function LocationRoute() {
  const [site, location] = await Promise.all([getSiteData(), getLocationData()]);

  return (
    <main className="min-h-screen bg-[#FEF2F2] text-[#721011]">
      <Navbar brandName={site.brandName} navigation={site.navigation} orderLabel={site.orderLabel} orderUrl={site.orderUrl} />
      <div className="pt-20">
        <VisitUs location={location} />
      </div>
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h1 className="font-heading text-3xl font-bold">Parking Info</h1>
        <div className="mt-4 space-y-3 text-[#721011]/75">
          {location.parkingParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <Footer location={location} site={site} />
    </main>
  );
}
