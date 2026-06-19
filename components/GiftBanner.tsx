"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GiftBanner({ giftUrl = "https://suukr.myshopify.com/" }: { giftUrl?: string | null }) {
    const clipPath = useMemo(() => {
        const rows = 12; // Number of jagged teeth on each side
        const teethDepth = 24; // Pixel depth of teeth
        const points = [];

        // Top edge
        points.push(`${teethDepth}px 0%`);
        points.push(`calc(100% - ${teethDepth}px) 0%`);

        // Right jagged edge
        const step = 100 / rows;
        for (let i = 0; i < rows; i++) {
            points.push(`100% ${i * step + step / 2}%`);
            points.push(`calc(100% - ${teethDepth}px) ${(i + 1) * step}%`);
        }

        // Bottom edge
        points.push(`${teethDepth}px 100%`);

        // Left jagged edge (going bottom to top)
        for (let i = rows - 1; i >= 0; i--) {
            points.push(`0% ${i * step + step / 2}%`);
            points.push(`${teethDepth}px ${i * step}%`);
        }

        return `polygon(${points.join(', ')})`;
    }, []);

    return (
        <section id="e-gift" className="py-8 sm:py-12 w-full bg-whiteOff flex items-center justify-center relative z-20">
            {/* The Gift Ticket Banner */}
            <div
                className="relative w-[96%] sm:w-[98%] max-w-7xl h-[160px] sm:h-[200px] md:h-[240px] shadow-2xl flex flex-col md:flex-row items-center justify-between px-8 sm:px-16 md:px-32 overflow-hidden"
                style={{ clipPath }}
            >
                {/* Background Color */}
                <div className="absolute inset-0 bg-[#721011] z-0"></div>

                {/* Background Pattern - Low opacity dessert icons */}
                <div
                    className="absolute inset-0 z-0 bg-[url('https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/dessert_pattern_bNO6czGFL.png')] bg-cover bg-center opacity-10 mix-blend-lighten"
                ></div>

                {/* Content Container with Golden Ratio spacing */}
                <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">

                    {/* Left Typography Section */}
                    <div className="text-white w-full md:w-3/5 flex flex-col items-center md:items-start">
                        <div className="text-center md:text-left">
                            {/* Main Headline - Rounded Sans-Serif */}
                            <h2 className="font-sans font-bold text-xl sm:text-2xl md:text-4xl leading-[1.1] mb-1">
                                <span className="block">Give The Gift</span>
                                <span className="block ml-[15%] sm:ml-[25%] text-base sm:text-lg md:text-3xl font-medium my-1">Of</span>
                            </h2>

                            {/* Brand Logo - Using consistent logo font styling */}
                            <div className="text-[#D5AF34] text-2xl sm:text-3xl md:text-5xl font-heading font-bold tracking-widest uppercase mt-2">
                                SUÜKR
                            </div>
                        </div>
                    </div>

                    {/* Right CTA Section - Golden Ratio spacing */}
                    <div className="w-full md:w-2/5 flex justify-center md:justify-end relative">
                        {/* Human Illustration Pointing */}
                        <motion.div 
                            className="absolute hidden md:flex flex-col items-center gap-0 right-[160px] lg:right-[180px] top-[-10px] pointer-events-none z-30"
                            animate={{ x: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="font-heading text-[#D5AF34] font-bold text-xl lg:text-2xl uppercase tracking-widest drop-shadow-md -rotate-6 mb-[-20px] z-10">
                                Get Yours!
                            </span>
                            <div className="relative w-[140px] h-[140px]">
                                <Image
                                    src="https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/pointing-hand_I1_iXgIZh.png"
                                    alt="Pointing Hand"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>

                        <button
                            onClick={() => window.open(giftUrl || "https://suukr.myshopify.com/", "_blank")}
                            className="group w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px] bg-[#D5AF34] rounded-full flex flex-col items-center justify-center text-white font-sans transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:scale-95 cursor-pointer shadow-lg min-w-[44px] min-h-[44px]"
                            aria-label="Purchase E-Gift Card"
                        >
                            <span className="text-sm sm:text-lg md:text-xl font-bold group-hover:text-[#721011] transition-colors duration-300">
                                Tap Here
                            </span>
                            <span className="text-xs sm:text-sm md:text-base font-normal mt-1 group-hover:text-[#721011] transition-colors duration-300">
                                for E-Gift
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
