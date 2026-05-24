"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const baseFlavours = [
    {
        name: "Summer Mango",
        desc: "Perfect for summer",
        image: "https://res.cloudinary.com/dmzeehrbh/image/upload/v1778778335/suukr/site-assets/mango-froyo.png"
    },
    {
        name: "Classic Vanilla",
        desc: "Light and heavenly",
        image: "https://res.cloudinary.com/dmzeehrbh/image/upload/v1778778830/suukr/site-assets/vanilla-froyo.png"
    },
    {
        name: "Fresh Strawberry",
        desc: "Seasonal sweet",
        image: "https://res.cloudinary.com/dmzeehrbh/image/upload/v1778778794/suukr/site-assets/strawberry-froyo.png"
    }
];

const flavours = [...baseFlavours, ...baseFlavours].map((f, i) => ({ ...f, id: i }));

export default function SwirlSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % flavours.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getCardProps = (index: number) => {
        const diff = (index - activeIndex + flavours.length) % flavours.length;
        let x = "0vw";
        let scale = 1;
        let opacity = 1;
        let zIndex = 10;

        if (diff === 0) {
            x = "0vw";
            scale = 1.15;
            opacity = 1;
            zIndex = 20;
        } else if (diff === 1) {
            x = "32vw";
            scale = 0.75;
            opacity = 1;
            zIndex = 10;
        } else if (diff === flavours.length - 1) {
            x = "-32vw";
            scale = 0.75;
            opacity = 1;
            zIndex = 10;
        } else {
            x = diff > flavours.length / 2 ? "-64vw" : "64vw";
            scale = 0.5;
            opacity = 0;
            zIndex = 0;
        }

        return { x, scale, opacity, zIndex };
    };

    return (
        <section className="relative w-full h-[650px] md:h-[850px] bg-[#FFDEDE] flex items-center justify-center overflow-hidden z-10">

            {/* Top Curve */}
            <div className="absolute top-0 left-0 w-full z-[1] pointer-events-none transform -translate-y-1">
                <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-[100px] md:h-[180px]">
                    <path fill="#ffffff" d="M0,0 L1440,0 Q720,400 0,0 Z"></path>
                </svg>
            </div>

            {/* Bottom Curve */}
            <div className="absolute bottom-0 left-0 w-full z-[1] pointer-events-none transform translate-y-1">
                <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-[100px] md:h-[180px] rotate-180">
                    <path fill="#ffffff" d="M0,0 L1440,0 Q720,400 0,0 Z"></path>
                </svg>
            </div>

            {/* Heading */}
            <div className="absolute top-[60px] md:top-[90px] left-0 w-full text-center z-20 flex flex-col items-center">
                <h2 className="font-heading text-3xl sm:text-4xl md:text-[44px] text-[#721011] font-bold uppercase tracking-widest drop-shadow-sm">
                    OUR FLAVOURS
                </h2>

                <div className="mt-2 text-[#D5AF34]">
                    <svg width="220" height="24" viewBox="0 0 280 24" fill="none">
                        <path d="M2.5 13.5C28.5 6.5 76 2.5 140 10.5C204 18.5 252.5 11.5 277 5.5" stroke="#D5AF34" strokeWidth="4" strokeLinecap="round" />
                        <path d="M120 20C135 18 165 18 185 20" stroke="#D5AF34" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            {/* Carousel */}
            <div className="relative w-full h-full flex items-center justify-center z-20">
                {flavours.map((flavour, index) => {
                    const props = getCardProps(index);

                    return (
                        <motion.div
                            key={flavour.id}
                            animate={{
                                x: props.x,
                                scale: props.scale,
                                opacity: props.opacity,
                                zIndex: props.zIndex,
                            }}
                            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                            className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] bg-white rounded-full shadow-[0_12px_50px_rgba(0,0,0,0.08)] flex flex-col items-center justify-start pt-2 border border-gray-100 overflow-visible"
                        >

                            {/* Image */}
                            <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] -mt-2 md:-mt-4">
                                <Image
                                    src={flavour.image}
                                    fill
                                    alt={flavour.name}
                                    className="object-contain scale-110 md:scale-120 drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                                    sizes="(max-width: 640px) 200px, (max-width: 768px) 260px, 320px"
                                    priority={index === 0 || index === 1 || index === 5}
                                />
                            </div>

                            {/* Name */}
                            <h3 className="text-[#721011] font-heading text-xl sm:text-2xl md:text-[28px] font-bold -mt-6 md:-mt-8 text-center px-4">
                                {flavour.name}
                            </h3>

                            {/* Description */}
                            <p className={`text-[#D5AF34] font-body text-xs sm:text-sm md:text-base font-medium text-center -mt-2 transition-all duration-300 ${
                                props.scale < 1 ? "opacity-0" : "opacity-100"
                            }`}>
                                {flavour.desc}
                            </p>

                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
