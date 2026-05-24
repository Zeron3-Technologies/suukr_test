"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ORDER_NOW_URL } from "@/lib/links";

export default function MobileOrder() {
    return (
        <section className="w-full bg-[#FEF2F2] py-16 sm:py-24 overflow-hidden relative z-10">
            {/* Scrolling Marquee */}
            <div className="w-full flex mb-8 sm:mb-12 md:mb-16">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                    className="flex whitespace-nowrap text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold"
                    style={{ WebkitTextStroke: "2px #D5AF34", color: "transparent" }}
                >
                    {Array.from({ length: 12 }).map((_, i) => (
                        <span key={i} className="mx-2 sm:mx-4 md:mx-8 flex items-center">
                            Order Now <span className="mx-2 sm:mx-4 md:mx-8 font-light tracking-tighter">○</span>
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Main Red Card Container */}
            <div className="relative w-[95%] sm:w-[90%] max-w-6xl mx-auto rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] bg-[#721011] mt-8 sm:mt-16 py-12 sm:py-16 px-6 sm:px-8 md:px-16 flex flex-col md:flex-row items-center border border-[#721011]/5 shadow-2xl">

                {/* Logo watermark top-right */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-8 text-[#D5AF34]/30 font-heading font-bold text-lg sm:text-2xl tracking-widest select-none pointer-events-none z-10">
                    SUÜKR
                </div>

                {/* Left Side: Mockup */}
                <div className="w-full md:w-1/2 relative flex items-center h-[250px] sm:h-[300px] md:h-[450px] order-2 md:order-1">
                    <div className="absolute left-1/2 md:left-auto md:-left-[15%] lg:-left-[25%] xl:-left-[35%] top-1/2 transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-[120%] sm:w-[140%] h-[140%] sm:h-[160%] z-10 pointer-events-none">

                        {/* Simulated Floor Shadow */}
                        <motion.div
                            animate={{ scale: [1, 0.8, 1], opacity: [0.5, 0.2, 0.5] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute bottom-[5%] left-[20%] w-[60%] h-[30px] sm:h-[40px] bg-black blur-[15px] sm:blur-[20px] rounded-[100%] mix-blend-multiply"
                        />

                        {/* Floating Phone Image */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="relative w-full h-full drop-shadow-2xl"
                        >
                            <Image
                                src="https://res.cloudinary.com/dmzeehrbh/image/upload/v1778778280/suukr/site-assets/iphone-mockup2.png"
                                fill
                                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 600px"
                                className="object-contain scale-x-[-1]"
                                alt="Suukr App Mockup"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Copy and Button */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20 order-1 md:order-2 mb-8 md:mb-0">
                    <h3 className="text-[#FEF2F2] font-heading font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight md:leading-snug mb-6 sm:mb-8 md:mb-10 tracking-wide max-w-md">
                        Your favorite desserts are just one click away. Order now and enjoy the sweetness of Suukr.
                    </h3>
                    <button
                        onClick={() => window.open(ORDER_NOW_URL, "_blank")}
                        className="px-8 sm:px-10 py-3 sm:py-4 bg-[#FEF2F2] text-[#721011] font-heading font-bold text-lg sm:text-xl rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer min-h-[44px] w-full sm:w-auto max-w-xs"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </section>
    );
}
