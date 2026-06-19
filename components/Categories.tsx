"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    {
        title: "Desserts",
        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_tripple_chocolate_waffle_2880x2304_Y10L4MED8.jpg",
        icon: (
            <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mb-8 sm:mb-12" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                {/* Top pancake */}
                <ellipse cx="50" cy="35" rx="35" ry="12" />
                {/* Middle pancake rim */}
                <path d="M 15 50 Q 15 62 50 62 Q 85 62 85 50" />
                {/* Bottom pancake rim */}
                <path d="M 15 65 Q 15 77 50 77 Q 85 77 85 65" />
                {/* Syrup Blob */}
                <path d="M 45 47 L 45 65 A 5 5 0 0 0 55 65 L 55 50 A 5 5 0 0 1 65 50 L 65 60 A 5 5 0 0 0 75 60 L 75 42" fill="currentColor" stroke="currentColor" strokeWidth="2" />
            </svg>
        )
    },
    {
        title: "Self-Serve Frozen Yoghurt",
        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/softserve_AH5H7-Tur.png",
        icon: (
            <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mb-8 sm:mb-12" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                {/* Bowl Rim */}
                <path d="M 10 65 L 90 65" />
                {/* Bowl Body */}
                <path d="M 18 65 L 24 85 C 30 92 70 92 76 85 L 82 65" />
                {/* Froyo Outline */}
                <path d="M 22 65 C 10 50 35 42 42 52" /> 
                <path d="M 36 45 C 30 30 50 25 52 35" />
                <path d="M 48 30 C 40 10 65 10 60 30" />
                <path d="M 60 30 C 75 25 75 45 62 50" />
                <path d="M 60 43 C 80 40 85 60 78 65" />
            </svg>
        )
    },
    {
        title: "Coffee",
        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_vanilla_cold_foam_cold_brew_2880x2304_kqwcgYi_u.jpg",
        icon: (
            <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mb-8 sm:mb-12" fill="currentColor">
                {/* Top Bean */}
                <g transform="translate(50, 30) rotate(-15) scale(1.1)">
                    <path d="M 0 -20 C -30 -20 -30 20 0 20 C -15 5 15 -5 0 -20 Z" />
                    <path d="M 6 20 C 36 20 36 -20 6 -20 C 21 -5 -9 5 6 20 Z" />
                </g>
                {/* Bottom Left Bean */}
                <g transform="translate(30, 65) rotate(-60) scale(1)">
                    <path d="M 0 -20 C -30 -20 -30 20 0 20 C -15 5 15 -5 0 -20 Z" />
                    <path d="M 6 20 C 36 20 36 -20 6 -20 C 21 -5 -9 5 6 20 Z" />
                </g>
                {/* Bottom Right Bean */}
                <g transform="translate(70, 65) rotate(45) scale(1)">
                    <path d="M 0 -20 C -30 -20 -30 20 0 20 C -15 5 15 -5 0 -20 Z" />
                    <path d="M 6 20 C 36 20 36 -20 6 -20 C 21 -5 -9 5 6 20 Z" />
                </g>
            </svg>
        )
    },
    {
        title: "Shakes",
        image: "https://ik.imagekit.io/3rpgznkyd/suukr/site-assets/SUUKR_maltease_shake_2880x2304_klBub4KIx.jpg",
        icon: (
            <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mb-8 sm:mb-12" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                {/* Cup Bottom */}
                <path d="M 30 55 L 35 85 Q 50 90 65 85 L 70 55" />
                {/* Cup Rim */}
                <path d="M 20 55 Q 50 60 80 55 Q 50 50 20 55 Z" />
                {/* Dome Lid */}
                <path d="M 25 53 C 25 20 75 20 75 53" />
                <path d="M 40 30 C 40 20 60 20 60 30" />
                {/* Straw */}
                <line x1="50" y1="23" x2="50" y2="5" />
            </svg>
        )
    }
];

export default function Categories() {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

    return (
        <section id="shop-merch" className="relative w-full bg-[#FFDEDE] border-t border-deepRed/10 overflow-hidden">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
                {categories.map((category, idx) => (
                    <div
                        key={idx}
                        className={`relative flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 cursor-pointer group min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] border-[#721011]
                        ${idx === 0 ? 'border-b sm:border-r sm:border-b lg:border-b-0 lg:border-r' : ''}
                        ${idx === 1 ? 'border-b sm:border-b lg:border-b-0 lg:border-r' : ''}
                        ${idx === 2 ? 'border-b sm:border-b-0 sm:border-r lg:border-b-0 lg:border-r' : ''}
                        `}
                        onMouseEnter={() => setHoveredCategory(idx)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        {/* Background overlay on hover */}
                        <div className="absolute inset-0 bg-deepRed/5 opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10" />

                        {/* Image background revealed on hover */}
                        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                            <Image
                                src={category.image}
                                alt={category.title}
                                fill
                                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                            />
                            {/* Dark gradient for text readability */}
                            <div className="absolute inset-0 bg-black/40" />
                        </div>

                        <div className="relative z-20 text-deepRed group-hover:text-whiteOff transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                            {category.icon}
                        </div>
                        <h3 className="relative z-20 text-deepRed group-hover:text-whiteOff font-heading font-bold text-xl sm:text-2xl md:text-3xl text-center leading-tight tracking-wide max-w-[200px] sm:max-w-[220px] transition-colors duration-300">
                            {category.title === "Self-Serve Frozen Yoghurt" ? (
                                <>
                                    <span className="block sm:hidden">Self-Serve Frozen Yoghurt</span>
                                    <span className="hidden sm:block">Self-Serve<br />Frozen Yoghurt</span>
                                </>
                            ) : category.title}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
