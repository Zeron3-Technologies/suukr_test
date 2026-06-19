"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Product = {
    id: number | string;
    name: string;
    description: string;
    image: string;
    tag?: string;
};

const products: Product[] = [
    {
        id: 1,
        name: "Vanilla Cold Foam Cold Brew",
        description: "Slow-steeped & topped with sweet vanilla cold foam",
        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_vanilla_cold_foam_cold_brew_2880x2304_kqwcgYi_u.jpg",
        tag: "Fan Favourite",
    },
    {
        id: 2,
        name: "Strawberry Cream Waffle",
        description: "Crispy waffle topped with fresh strawberries & whipped cream",
        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_straberry_with_cream_waffle_2880x2304_2a76LpQei.jpg",
        tag: "Signature",
    },
    {
        id: 3,
        name: "Cookie Monster Shake",
        description: "Oreo cookies, blue spirulina & sprinkles",
        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_blue_cookie_monster_shake_2880x2304_0e1sd_aD7.jpg",
        tag: "Bestseller",
    },
    {
        id: 4,
        name: "Pistachio Knafeh",
        description: "Sweet, cheesy, golden crunch with rich pistachio",
        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_kanafeh_pistachio_2880x2304_dFuPjdp3Z.jpg",
        tag: "New",
    },
    {
        id: 5,
        name: "Italian Hot Chocolate",
        description: "Thick creamy dark hot chocolate",
        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_italian_hot_chocolate_2880x2304_4NHgqrgQU.jpg",
        tag: "Chef's Pick",
    },
];

export default function ProductCarousel({ items = products }: { items?: Product[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = items.length;

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % total);
    }, [total]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    // Auto-scroll logic every 1500ms
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 1500);
        return () => clearInterval(interval);
    }, [handleNext]);


    // Returns position config for each card relative to active
    const getConfig = (i: number) => {
        let d = ((i - activeIndex) % total + total) % total;
        if (d > Math.floor(total / 2)) d -= total;
        // Only render -2, -1, 0, 1, 2
        const abs = Math.abs(d);
        if (abs > 2) return null;

        const isCenter = d === 0;

        // Responsive positioning - smaller offsets for mobile
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
        const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;

        let xOffset, scale, opacity;

        if (isMobile) {
            const xMap: Record<string, number> = { "-2": -300, "-1": -150, "0": 0, "1": 150, "2": 300 };
            const scaleMap: Record<string, number> = { "-2": 0.7, "-1": 0.85, "0": 1, "1": 0.85, "2": 0.7 };
            const opacityMap: Record<string, number> = { "-2": 0.3, "-1": 0.7, "0": 1, "1": 0.7, "2": 0.3 };
            xOffset = xMap[String(d)] ?? 0;
            scale = scaleMap[String(d)] ?? 0.7;
            opacity = opacityMap[String(d)] ?? 0;
        } else if (isTablet) {
            const xMap: Record<string, number> = { "-2": -500, "-1": -250, "0": 0, "1": 250, "2": 500 };
            const scaleMap: Record<string, number> = { "-2": 0.75, "-1": 0.9, "0": 1.02, "1": 0.9, "2": 0.75 };
            const opacityMap: Record<string, number> = { "-2": 0.4, "-1": 0.8, "0": 1, "1": 0.8, "2": 0.4 };
            xOffset = xMap[String(d)] ?? 0;
            scale = scaleMap[String(d)] ?? 0.7;
            opacity = opacityMap[String(d)] ?? 0;
        } else {
            const xMap: Record<string, number> = { "-2": -680, "-1": -350, "0": 0, "1": 350, "2": 680 };
            const scaleMap: Record<string, number> = { "-2": 0.78, "-1": 0.9, "0": 1.05, "1": 0.9, "2": 0.78 };
            const opacityMap: Record<string, number> = { "-2": 0.45, "-1": 0.85, "0": 1, "1": 0.85, "2": 0.45 };
            xOffset = xMap[String(d)] ?? 0;
            scale = scaleMap[String(d)] ?? 0.7;
            opacity = opacityMap[String(d)] ?? 0;
        }

        const zMap: Record<string, number> = { "-2": 1, "-1": 2, "0": 5, "1": 2, "2": 1 };

        return {
            x: xOffset,
            scale,
            opacity,
            zIndex: zMap[String(d)] ?? 0,
            isCenter,
        };
    };

    return (
        <section
            id="best-sellers"
            className="pb-24 pt-4 bg-whiteOff relative flex flex-col items-center w-full overflow-hidden"
        >
            {/* Watermark - hidden on mobile, visible on md+ */}
            <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 text-deepRed/5 font-heading font-bold text-[10rem] lg:text-[14rem] tracking-widest select-none pointer-events-none z-0 whitespace-nowrap">
                SUÜKR
            </div>

            {/* Header */}
            <div className="text-center mb-12 sm:mb-16 z-20 px-4 flex flex-col items-center">
                <span className="inline-block text-gold text-lg sm:text-xl font-bold tracking-widest mb-2 font-inter">
                    Featured
                </span>
                <div className="relative inline-flex flex-col items-center">
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-deepRed font-bold text-center">
                        What We Make the Best
                    </h2>
                    <div className="mt-2 text-gold">
                        <svg width="280" height="24" viewBox="0 0 280 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px] sm:max-w-[280px]">
                            <path d="M2.5 13.5C28.5 6.5 76 2.5 140 10.5C204 18.5 252.5 11.5 277 5.5" stroke="#D5AF34" strokeWidth="3" strokeLinecap="round" />
                            <path d="M120 20C135 18 165 18 185 20" stroke="#D5AF34" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
                <p className="mt-4 sm:mt-6 text-black/60 font-body text-base sm:text-lg text-center max-w-md">
                    Handcrafted daily with the finest ingredients
                </p>
            </div>

            {/* Carousel */}
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] flex items-center justify-center">
                {items.map((product, index) => {
                    const cfg = getConfig(index);
                    if (!cfg) return null;

                    return (
                        <motion.div
                            key={product.id}
                            animate={{
                                x: cfg.x,
                                scale: cfg.scale,
                                opacity: cfg.opacity,
                                zIndex: cfg.zIndex,
                            }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            onClick={() => setActiveIndex(index)}
                            className={`absolute w-[200px] h-[280px] sm:w-[250px] sm:h-[350px] md:w-[300px] md:h-[400px] lg:w-[350px] lg:h-[450px] rounded-3xl sm:rounded-4xl overflow-hidden cursor-pointer transition-shadow duration-300
                                ${cfg.isCenter ? "shadow-2xl ring-2 ring-white/40" : "shadow-lg"}
                            `}
                            style={{ willChange: "transform, opacity" }}
                        >
                            {/* Photo */}
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 300px, 350px"
                                priority={cfg.isCenter}
                            />

                            {/* Subtle dark gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent z-[1]" />

                            {/* Tag badge */}
                            {product.tag && (
                                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex items-center gap-1.5 overflow-hidden rounded-full shadow-lg">
                                    {/* Glass base */}
                                    <div className="absolute inset-0 bg-white/8 backdrop-blur-2xl border border-white/25 rounded-full" />
                                    {/* Top shine */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                                    {/* Shimmer gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent rounded-full" />

                                    <div className="relative px-2 sm:px-3 py-1 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-sm animate-pulse" />
                                        <span className="text-white text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase drop-shadow-sm">{product.tag}</span>
                                    </div>
                                </div>
                            )}

                            {/* Glassmorphism text panel at bottom */}
                            <div className="absolute inset-x-0 bottom-0 z-10 px-4 pt-3 pb-3 text-center"
                                style={{
                                    background: "linear-gradient(to top, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
                                    backdropFilter: "blur(10px)",
                                    WebkitBackdropFilter: "blur(10px)",
                                    borderTop: "1px solid rgba(255,255,255,0.25)",
                                }}
                            >
                                <h3 className="text-white font-heading text-sm sm:text-base md:text-lg font-bold leading-tight drop-shadow-lg tracking-wide">
                                    {product.name}
                                </h3>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-8 z-20 items-center">
                {products.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${i === activeIndex
                            ? "w-7 h-2 bg-deepRed shadow-sm"
                            : "w-2 h-2 bg-deepRed/20 hover:bg-deepRed/50"
                            }`}
                    />
                ))}
            </div>

            {/* Edge fade overlays */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 sm:w-8 md:w-20 lg:w-40 bg-gradient-to-r from-whiteOff to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 sm:w-8 md:w-20 lg:w-40 bg-gradient-to-l from-whiteOff to-transparent z-20" />
        </section>
    );
}
