"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEFAULT_LOCATION, DEFAULT_SITE, type PublicLocationData, type PublicSiteData } from "@/lib/publicDefaults";

export type MenuItemView = {
    name: string;
    desc: string;
    image: string;
    category: string;
    tag?: string;
};

type MenuClientProps = {
    categories: string[];
    location?: PublicLocationData;
    menuItems: MenuItemView[];
    site?: PublicSiteData;
};

function MenuCard({ item }: { item: MenuItemView }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {item.tag && (
                    <div className="absolute top-3 left-3 bg-[#D5AF34] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow">
                        {item.tag}
                    </div>
                )}
            </div>

            <div className="px-4 py-3 flex flex-col gap-1">
                <h3 className="font-heading font-bold text-base leading-tight text-[#721011]">
                    {item.name}
                </h3>
                <p className="text-black/50 text-xs leading-relaxed">{item.desc}</p>
            </div>
        </motion.div>
    );
}

export default function MenuClient({
    categories,
    location = DEFAULT_LOCATION,
    menuItems,
    site = DEFAULT_SITE,
}: MenuClientProps) {
    const [activeCategory, setActiveCategory] = useState("All Menu");

    const filtered = (activeCategory === "All Menu"
        ? menuItems
        : menuItems.filter((i) => i.category === activeCategory)
    ).sort((a, b) => {
        const aHasImage = !a.image.includes("no-image");
        const bHasImage = !b.image.includes("no-image");
        if (aHasImage && !bHasImage) return -1;
        if (!aHasImage && bHasImage) return 1;
        return 0;
    });

    return (
        <main className="min-h-screen bg-[#FEF2F2] flex flex-col font-body">
            <Navbar
                brandName={site.brandName}
                navigation={site.navigation}
                orderLabel={site.orderLabel}
                orderUrl={site.orderUrl}
            />

            <div className="relative pt-28 sm:pt-36 pb-10 px-4 text-center overflow-hidden">
                <div
                    className="absolute -top-20 left-1/2 -translate-x-1/2 w-[140%] h-[340px] rounded-[50%] pointer-events-none z-0"
                    style={{ background: "radial-gradient(ellipse at center, #FFDEDE 60%, transparent 100%)" }}
                />
                <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[#D5AF34] font-body font-bold tracking-widest text-sm sm:text-base uppercase mb-3">
                        Our Menu
                    </span>
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#721011] mb-4">
                        Delicious Treats Await
                    </h1>
                    <svg viewBox="0 0 320 24" fill="none" className="w-48 sm:w-72 mb-5">
                        <path d="M4 14 C40 4, 80 22, 120 12 C160 2, 200 20, 240 10 C270 4, 300 16, 316 10"
                            stroke="#D5AF34" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                    </svg>
                    <p className="text-black/45 font-body text-sm sm:text-base">
                        Handcrafted with love, served with a smile
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4 mb-10 mt-2">
                {categories.map((cat) => (
                    <motion.button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2 rounded-full font-body font-semibold text-sm border-2 transition-all duration-200
                            ${activeCategory === cat
                                ? "bg-[#721011] text-white border-[#721011] shadow-md"
                                : "bg-transparent text-[#721011] border-[#721011]/40 hover:border-[#721011]"
                            }`}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((item, idx) => (
                            <MenuCard key={`${item.category}-${item.name}-${idx}`} item={item} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <div className="text-center py-24 text-[#721011]/40 font-body text-lg">
                        Nothing here yet. Check back soon.
                    </div>
                )}
            </div>

            <Footer location={location} site={site} />
        </main>
    );
}
