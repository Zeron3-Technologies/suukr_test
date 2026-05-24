import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLegalPage, getLocationData, getSiteData } from "@/lib/publicContent";
import { richTextToParagraphs } from "@/lib/richText";

export const dynamic = "force-dynamic";

export default async function TermsRoute() {
  const [site, location, page] = await Promise.all([
    getSiteData(),
    getLocationData(),
    getLegalPage("terms").catch(() => undefined),
  ]);
  const paragraphs = richTextToParagraphs(page?.body);

  return (
    <main className="min-h-screen bg-[#FEF2F2] text-[#721011]">
      <Navbar brandName={site.brandName} navigation={site.navigation} orderLabel={site.orderLabel} orderUrl={site.orderUrl} />
      <article className="mx-auto max-w-4xl px-6 pb-20 pt-32 sm:pt-40">
        <h1 className="font-heading text-5xl font-bold">{page?.title || "Terms & Conditions"}</h1>
        <div className="mt-8 space-y-5 text-lg leading-8 text-[#721011]/75">
          {(paragraphs.length ? paragraphs : ["This page is editable in Payload CMS. Add your terms content in the Legal Pages collection."]).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
      <Footer location={location} site={site} />
    </main>
  );
}
