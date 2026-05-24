"use client";

import Image from "next/image";
import { DEFAULT_LOCATION, type PublicLocationData } from "@/lib/publicDefaults";

export default function VisitUs({ location = DEFAULT_LOCATION }: { location?: PublicLocationData }) {
    return (
        <section id="contact-us" className="relative py-16 sm:py-24 w-full bg-[#FEF2F2] flex flex-col items-center overflow-hidden z-10">
            {/* Background elegant curve decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="none" className="w-full h-full opacity-70">
                    <path
                        d="M -100 800 C 400 300, 800 600, 1500 -100"
                        stroke="#FFDEDE"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Header section */}
            <div className="text-center mb-12 sm:mb-16 z-20 px-4 flex flex-col items-center relative">
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-deepRed font-bold capitalize tracking-wide">
                    Visit Us
                </h2>
                {/* Small curvy thing below the title */}
                <div className="mt-2 text-[#D5AF34]">
                    <svg width="280" height="24" viewBox="0 0 280 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[320px]">
                        <path d="M2.5 13.5C28.5 6.5 76 2.5 140 10.5C204 18.5 252.5 11.5 277 5.5" stroke="#D5AF34" strokeWidth="3" strokeLinecap="round" />
                        <path d="M120 20C135 18 165 18 185 20" stroke="#D5AF34" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            {/* Content Container */}
            <div className="relative w-[95%] sm:w-[90%] max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center z-10 mt-4 sm:mt-8">

                {/* Map Box */}
                <a 
                    href={location.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full lg:w-[550px] xl:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg flex-shrink-0 z-10 block group"
                >
                    <Image
                        src={location.mapImageUrl}
                        fill
                        sizes="(max-width: 1024px) 95vw, 600px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Suükr Live Location Map"
                        priority
                    />
                    
                    {/* Hover overlay for better UX */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none z-20">
                        <div className="bg-white/95 text-[#721011] px-6 py-3 rounded-full font-heading font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl transform scale-95 group-hover:scale-100">
                            Open in Maps
                        </div>
                    </div>
                </a>

                {/* Overlapping Info Card and Button */}
                <div className="relative w-[90%] sm:w-[80%] lg:w-[450px] lg:-ml-16 xl:-ml-24 mt-[-40px] sm:mt-[-60px] lg:mt-[80px] xl:lg:mt-[100px] flex flex-col items-center z-20">

                    {/* The Info Card */}
                    <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 flex flex-col border border-black/5">

                        {/* Brand mark */}
                        <div className="text-[#D5AF34] font-heading font-bold text-lg sm:text-xl tracking-widest mb-4 sm:mb-6 opacity-80">
                            SUÜKR
                        </div>

                        <div className="mb-4 sm:mb-6">
                            <h4 className="text-deepRed font-heading font-bold text-lg md:text-xl mb-3 sm:mb-4">Opening Hours</h4>
                            {location.hours.map((entry) => (
                                <p key={entry.day} className="text-deepRed/80 font-body text-sm sm:text-base md:text-[17px] mb-1 tracking-wide font-medium">
                                    {entry.day}: {entry.hours}
                                </p>
                            ))}
                        </div>

                        <div className="w-full h-px bg-[#721011]/20 mb-4 sm:mb-6"></div>

                        <div>
                            <h4 className="text-deepRed font-heading font-bold text-lg md:text-xl mb-3 sm:mb-4">Location</h4>
                            {location.addressLines.map((line) => (
                                <p key={line} className="text-deepRed/80 font-body text-sm sm:text-base md:text-[17px] mb-1 tracking-wide font-medium">{line}</p>
                            ))}
                        </div>

                    </div>

                    {/* Get Directions Button */}
                    <a
                        href={location.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 sm:mt-12 px-8 sm:px-10 py-4 sm:py-5 bg-[#721011] text-[#FEF2F2] font-heading text-center font-bold text-lg sm:text-xl md:text-2xl rounded-xl sm:rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto min-h-[44px] block"
                    >
                        Get Directions
                    </a>

                </div>
            </div>
        </section>
    );
}
