import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGlobalPage, getLocationData, getSiteData } from "@/lib/publicContent";
import { richTextToParagraphs } from "@/lib/richText";
import type { AboutPage } from "@/payload-types";

export const dynamic = "force-dynamic";

const fallbackStory = [
  "Suükr is a dessert cafe built around small rituals: creamy frozen yoghurt, rich shakes, waffles, cold brew, and treats made for sharing.",
  "Every detail is designed to feel playful, polished, and a little bit indulgent.",
];

export default async function AboutRoute() {
  const [site, location, page] = await Promise.all([
    getSiteData(),
    getLocationData(),
    getGlobalPage<AboutPage>("about-page").catch(() => undefined),
  ]);

  const story = richTextToParagraphs(page?.brandStory).length
    ? richTextToParagraphs(page?.brandStory)
    : fallbackStory;
  const philosophy = richTextToParagraphs(page?.philosophy);

  return (
    <main className="min-h-screen bg-[#FEF2F2] text-[#721011]">
      <Navbar brandName={site.brandName} navigation={site.navigation} orderLabel={site.orderLabel} orderUrl={site.orderUrl} />
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-32 sm:pt-40">
        <p className="mb-3 font-bold uppercase tracking-[0.28em] text-[#D5AF34]">{page?.hero?.eyebrow || "About Suükr"}</p>
        <h1 className="font-heading text-5xl font-bold sm:text-7xl">{page?.hero?.heading || "A Sweeter Daily Ritual"}</h1>
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_0.8fr]">
          <div className="space-y-5 text-lg leading-8 text-[#721011]/80">
            {story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {philosophy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold">Behind the scenes</h2>
            <div className="mt-6 space-y-5">
              {(page?.behindTheScenes?.length ? page.behindTheScenes : [
                { title: "Handcrafted", body: "Desserts and drinks prepared with care, texture, and a strong sense of fun." },
                { title: "Community first", body: "A neighbourhood stop for celebrations, catch-ups, and after-dinner cravings." },
              ]).map((item) => (
                <article key={item.title}>
                  <h3 className="font-heading text-xl font-bold">{item.title}</h3>
                  <p className="mt-1 text-[#721011]/70">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer location={location} site={site} />
    </main>
  );
}
