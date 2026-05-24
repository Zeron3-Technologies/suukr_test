import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGlobalPage, getLocationData, getSiteData } from "@/lib/publicContent";
import type { ContactPage } from "@/payload-types";

export const dynamic = "force-dynamic";

export default async function ContactRoute() {
  const [site, location, page] = await Promise.all([
    getSiteData(),
    getLocationData(),
    getGlobalPage<ContactPage>("contact-page").catch(() => undefined),
  ]);

  return (
    <main className="min-h-screen bg-[#FEF2F2] text-[#721011]">
      <Navbar brandName={site.brandName} navigation={site.navigation} orderLabel={site.orderLabel} orderUrl={site.orderUrl} />
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 sm:pt-40">
        <p className="mb-3 font-bold uppercase tracking-[0.28em] text-[#D5AF34]">{page?.hero?.eyebrow || "Contact"}</p>
        <h1 className="font-heading text-5xl font-bold sm:text-7xl">{page?.hero?.heading || "Talk To Us"}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#721011]/75">
          {page?.formIntro || "Questions, catering, feedback, or sweet ideas. Send us a note and we will get back to you."}
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </section>
      <Footer location={location} site={site} />
    </main>
  );
}
