"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { DEFAULT_HOME_HERO, DEFAULT_SITE, type PublicHeroData, type PublicSiteData } from "@/lib/publicDefaults";

/* ── Wave-ripple button ─────────────────────────────────────── */
export function WaveButton({
    onClick,
    color,
    waveColor,
    textColor,
    label,
    className = "",
}: {
    onClick: () => void;
    color: string;
    waveColor: string;
    textColor: string;
    label: string;
    className?: string;
}) {
    const [hovered, setHovered] = useState(false);
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = btnRef.current!.getBoundingClientRect();
        setPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
        setHovered(true);
    };

    return (
        <motion.button
            ref={btnRef}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.18)" }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: color, color: textColor }}
            className={`relative overflow-hidden font-body font-semibold rounded-full shadow-md transition-shadow ${className}`}
        >
            <AnimatePresence>
                {hovered && (
                    <motion.span
                        key="wave"
                        initial={{ scale: 0, opacity: 0.7 }}
                        animate={{ scale: 5, opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            borderRadius: "50%",
                            width: "100%",
                            paddingBottom: "100%",
                            top: `${pos.y}%`,
                            left: `${pos.x}%`,
                            transform: "translate(-50%, -50%)",
                            backgroundColor: waveColor,
                            pointerEvents: "none",
                        }}
                    />
                )}
            </AnimatePresence>
            <span className="relative z-10 flex items-center gap-2">{label}</span>
        </motion.button>
    );
}

/* ── Hero ───────────────────────────────────────────────────── */
type HeroProps = {
    hero?: PublicHeroData;
    site?: PublicSiteData;
};

export default function Hero({ hero = DEFAULT_HOME_HERO, site = DEFAULT_SITE }: HeroProps) {
    const router = useRouter();
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
        typeof window === "undefined"
            ? false
            : window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const { scrollY } = useScroll();
    const imageY = useTransform(scrollY, [0, 600], [0, 120]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <section className="relative w-full min-h-[110vh] flex flex-col items-center justify-center overflow-hidden">
            <Navbar
                brandName={site.brandName}
                navigation={site.navigation}
                orderLabel={site.orderLabel}
                orderUrl={site.orderUrl}
            />

            {/* ── Background image with parallax ── */}
            <motion.div
                className="absolute inset-0 z-0 scale-110"
                style={{ y: prefersReducedMotion ? 0 : imageY }}
            >
                <Image
                    src={hero.imageUrl}
                    alt={hero.heading}
                    fill
                    priority
                    className="object-cover"
                />
            </motion.div>

            {/* ── Gradient overlay: barely-there at top, fades to cream at bottom ── */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.45) 50%, rgba(254,242,242,0.88) 100%)",
                }}
            />

            {/* ── Content ── */}
            <div className="relative z-20 flex flex-col items-center text-center px-4 pb-40 sm:pb-28 max-w-4xl mx-auto">

                {/* Tagline — above heading, same deepRed, light weight */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="font-body font-light text-xs sm:text-sm tracking-[0.28em] uppercase text-deepRed mb-5 sm:mb-6"
                >
                    {hero.eyebrow}
                </motion.p>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-deepRed font-semibold mb-6 sm:mb-8 tracking-tight leading-tight"
                >
                    {hero.heading.split("\n").map((line, index) => (
                        <span key={line}>
                            {index > 0 && <br />}
                            {line}
                        </span>
                    ))}
                </motion.h1>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                    className="flex justify-center"
                >
                    <WaveButton
                        onClick={() => {
                            const href = hero.primaryCTA?.url || "/menu";
                            if (hero.primaryCTA?.openInNewTab || href.startsWith("http")) {
                                window.open(href, "_blank");
                            } else {
                                router.push(href);
                            }
                        }}
                        color="#FFDEDE"
                        waveColor="#c45c5c"
                        textColor="#721011"
                        label={hero.primaryCTA?.label || "View Menu"}
                        className="px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base min-h-[44px] tracking-wide"
                    />
                </motion.div>
            </div>

            {/* ── Wavy partition ── */}
            <motion.div
                className="absolute bottom-[-1px] left-0 w-full overflow-visible z-30 origin-bottom"
                animate={prefersReducedMotion ? {} : { scaleY: [1, 1.4, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    className="block w-full h-[80px] sm:h-[110px] md:h-[160px] lg:h-[210px]"
                >
                    <path
                        d="M0,40 C320,80 420,0 720,40 C1020,80 1120,0 1440,40 V120 H0 Z"
                        fill="#FEF2F2"
                    />
                </svg>
            </motion.div>
        </section>
    );
}
