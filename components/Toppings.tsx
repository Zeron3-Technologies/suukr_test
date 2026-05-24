"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Data ─────────────────────────────────────────────────────── */
type Topping = {
    name: string;
    desc: string;
    emoji: string;
    color: string; // bowl accent colour
};

type Category = {
    id: string;
    label: string;
    items: Topping[];
};

const categories: Category[] = [
    {
        id: "crunch",
        label: "Crunch",
        items: [
            { name: "Oreo Crumble",     desc: "Crunchy chocolate cookie bits that add the perfect bite",         emoji: "🍪", color: "#2d2d2d" },
            { name: "Brownie Chunks",   desc: "Fudgy, rich chocolate brownie pieces",                            emoji: "🍫", color: "#5c3317" },
            { name: "Biscoff Crumble",  desc: "Caramelised spiced cookie crumble",                               emoji: "🫙", color: "#c8860a" },
            { name: "KitKat Pieces",    desc: "Crispy wafer fingers coated in milk chocolate",                   emoji: "🍬", color: "#c0392b" },
            { name: "Kinder Bueno",     desc: "Hazelnut cream wafer in smooth chocolate",                        emoji: "🎀", color: "#d4a017" },
            { name: "Granola",          desc: "Toasted oats and honey clusters",                                 emoji: "🌾", color: "#b8860b" },
            { name: "Cookie Dough",     desc: "Soft, unbaked cookie dough bites",                                emoji: "🍡", color: "#e8c99a" },
            { name: "Pretzels",         desc: "Salty-sweet mini pretzel twists",                                 emoji: "🥨", color: "#c8a96e" },
        ],
    },
    {
        id: "colour",
        label: "Colour & Joy",
        items: [
            { name: "Rainbow Sprinkles", desc: "Colourful sugar strands for a fun finish",                      emoji: "🌈", color: "#ff6b9d" },
            { name: "Gummies",           desc: "Chewy fruity gummy bears",                                      emoji: "🐻", color: "#ff4757" },
            { name: "Mochi",             desc: "Soft Japanese rice cake bites",                                  emoji: "🍡", color: "#ffa8cc" },
            { name: "Popping Pearls",    desc: "Juice-filled pearls that pop in your mouth",                    emoji: "🫧", color: "#7bed9f" },
            { name: "Marshmallows",      desc: "Fluffy mini marshmallows",                                       emoji: "☁️", color: "#dfe6e9" },
        ],
    },
    {
        id: "fresh",
        label: "Fresh",
        items: [
            { name: "Strawberries",   desc: "Sliced fresh strawberries, sweet and tangy",                       emoji: "🍓", color: "#e84393" },
            { name: "Blueberries",    desc: "Plump antioxidant-rich blueberries",                               emoji: "🫐", color: "#6c5ce7" },
            { name: "Lychee",         desc: "Delicate floral lychee pieces",                                    emoji: "🍈", color: "#b2f5ea" },
            { name: "Passionfruit",   desc: "Tropical tangy passionfruit pulp",                                 emoji: "🌟", color: "#fdcb6e" },
            { name: "Mango",          desc: "Juicy diced fresh mango",                                          emoji: "🥭", color: "#f9ca24" },
        ],
    },
    {
        id: "nuts",
        label: "Nuts",
        items: [
            { name: "Pistachios",  desc: "Crushed roasted pistachios — rich and earthy",                        emoji: "🌿", color: "#6ab04c" },
            { name: "Cashews",     desc: "Lightly salted whole cashews",                                        emoji: "🥜", color: "#f0932b" },
            { name: "Pecans",      desc: "Buttery caramelised pecan halves",                                    emoji: "🍂", color: "#a0522d" },
            { name: "Almonds",     desc: "Superfood containing vitamin E, riboflavin (GF & V)",                 emoji: "🤍", color: "#d4a574" },
        ],
    },
    {
        id: "sauces",
        label: "Sauces",
        items: [
            { name: "Biscoff Drizzle",    desc: "Warm caramelised Biscoff spread drizzled on top",              emoji: "🫙", color: "#c8860a" },
            { name: "Chocolate Fudge",    desc: "Thick, rich dark chocolate fudge sauce",                       emoji: "🍫", color: "#3d1c02" },
            { name: "Caramel",            desc: "Silky smooth golden caramel drizzle",                          emoji: "🍯", color: "#f9ca24" },
            { name: "Nutella",            desc: "Creamy hazelnut chocolate spread",                             emoji: "💛", color: "#7b3f00" },
            { name: "Oreo Sauce",         desc: "Crushed Oreo blended into a creamy sauce",                     emoji: "🖤", color: "#2d2d2d" },
        ],
    },
];

/* ── Topping Bowl ─────────────────────────────────────────────── */
function ToppingBowl({
    topping,
    active,
    onHover,
}: {
    topping: Topping;
    active: boolean;
    onHover: () => void;
}) {
    return (
        <motion.div
            onMouseEnter={onHover}
            onFocus={onHover}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            tabIndex={0}
            className={`relative flex flex-col items-center gap-2 cursor-pointer outline-none group`}
        >
            {/* Bowl circle */}
            <div
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl transition-all duration-300 shadow-md
                    ${active
                        ? "ring-[3px] ring-offset-2 shadow-lg scale-105"
                        : "ring-1 ring-black/10 hover:shadow-lg"
                    }`}
                style={{
                    background: `radial-gradient(circle at 35% 35%, ${topping.color}22, ${topping.color}55)`,
                    borderColor: active ? topping.color : `${topping.color}44`,
                    boxShadow: active ? `0 0 0 3px ${topping.color}88, 0 8px 24px ${topping.color}44` : undefined,
                    backgroundColor: `${topping.color}18`,
                    border: "2px solid",
                }}
            >
                <span role="img" aria-label={topping.name}>{topping.emoji}</span>
            </div>
            {/* Name below bowl */}
            <span className={`text-[10px] sm:text-xs font-semibold text-center leading-tight max-w-[72px] sm:max-w-[80px] transition-colors duration-200
                ${active ? "text-[#721011]" : "text-black/60 group-hover:text-[#721011]"}`}>
                {topping.name}
            </span>
        </motion.div>
    );
}

/* ── Main Component ───────────────────────────────────────────── */
export default function Toppings() {
    const [activeCat, setActiveCat] = useState(0);
    const [activeTopping, setActiveTopping] = useState(0);

    const currentItems = categories[activeCat].items;
    const featured = currentItems[activeTopping] ?? currentItems[0];

    const handleCatChange = (idx: number) => {
        setActiveCat(idx);
        setActiveTopping(0);
    };

    // Split items into pages of 6 for the grid
    const PAGE_SIZE = 6;
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(currentItems.length / PAGE_SIZE);
    const pageItems = currentItems.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

    const handleCatChangeWithReset = (idx: number) => {
        handleCatChange(idx);
        setPage(0);
    };

    return (
        <section className="w-full bg-[#FEF2F2] py-16 sm:py-20 md:py-24 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">

                {/* ── Header ── */}
                <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
                    <span className="inline-block text-[#D5AF34] text-lg sm:text-xl font-bold tracking-widest mb-2 font-body uppercase">
                        Customise
                    </span>
                    <div className="relative inline-flex flex-col items-center">
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#721011] font-bold text-center">
                            Build Your Bowl
                        </h2>
                        <div className="mt-2 text-[#D5AF34]">
                            <svg width="280" height="24" viewBox="0 0 280 24" fill="none" className="w-full max-w-[200px] sm:max-w-[280px]">
                                <path d="M2.5 13.5C28.5 6.5 76 2.5 140 10.5C204 18.5 252.5 11.5 277 5.5" stroke="#D5AF34" strokeWidth="3" strokeLinecap="round" />
                                <path d="M120 20C135 18 165 18 185 20" stroke="#D5AF34" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-4 text-black/50 font-body text-base sm:text-lg max-w-md">
                        Create your perfect swirl with our wide range of signature toppings
                    </p>
                </div>

                {/* ── Category Pills ── */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={cat.id}
                            onClick={() => handleCatChangeWithReset(idx)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 sm:px-6 py-2 rounded-full font-body font-semibold text-sm sm:text-base border-2 transition-all duration-200
                                ${activeCat === idx
                                    ? "bg-[#721011] text-white border-[#721011] shadow-md"
                                    : "bg-transparent text-[#721011] border-[#721011]/40 hover:border-[#721011] hover:bg-[#721011]/5"
                                }`}
                        >
                            {cat.label}
                        </motion.button>
                    ))}
                </div>

                {/* ── Main Layout: Grid + Featured ── */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">

                    {/* LEFT — Toppings grid */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeCat}-${page}`}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-sm sm:max-w-md"
                            >
                                {pageItems.map((topping, i) => {
                                    const globalIdx = page * PAGE_SIZE + i;
                                    return (
                                        <ToppingBowl
                                            key={topping.name}
                                            topping={topping}
                                            active={activeTopping === globalIdx}
                                            onHover={() => setActiveTopping(globalIdx)}
                                        />
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>

                        {/* Prev / Dots / Next */}
                        <div className="flex items-center gap-6 mt-8 sm:mt-10">
                            <button
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                disabled={page === 0}
                                className="flex items-center gap-1 text-sm font-semibold text-[#721011]/50 hover:text-[#721011] disabled:opacity-30 transition-colors"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
                                PREV
                            </button>

                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i)}
                                        className={`rounded-full transition-all duration-300 ${
                                            i === page
                                                ? "w-5 h-2 bg-[#721011]"
                                                : "w-2 h-2 bg-[#721011]/25 hover:bg-[#721011]/50"
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                disabled={page === totalPages - 1}
                                className="flex items-center gap-1 text-sm font-semibold text-[#721011]/50 hover:text-[#721011] disabled:opacity-30 transition-colors"
                            >
                                NEXT
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT — Featured topping */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={featured.name}
                                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: -20 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center text-center"
                            >
                                {/* Big featured bowl */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full flex items-center justify-center mb-6 shadow-2xl"
                                    style={{
                                        background: `radial-gradient(circle at 35% 30%, ${featured.color}33, ${featured.color}77)`,
                                        border: `3px solid ${featured.color}55`,
                                        boxShadow: `0 20px 60px ${featured.color}44`,
                                        backgroundColor: `${featured.color}22`,
                                    }}
                                >
                                    <span
                                        className="text-7xl sm:text-8xl md:text-9xl"
                                        role="img"
                                        aria-label={featured.name}
                                    >
                                        {featured.emoji}
                                    </span>
                                </motion.div>

                                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#721011] mb-3">
                                    {featured.name}
                                </h3>
                                <p className="font-body text-black/55 text-base sm:text-lg max-w-xs leading-relaxed">
                                    {featured.desc}
                                </p>

                                {/* Category badge */}
                                <span
                                    className="mt-5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                                    style={{
                                        backgroundColor: `${featured.color}22`,
                                        color: featured.color,
                                        border: `1px solid ${featured.color}55`,
                                    }}
                                >
                                    {categories[activeCat].label}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
