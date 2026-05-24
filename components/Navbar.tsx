"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { WaveButton } from "@/components/Hero";
import { DEFAULT_SITE, type PublicLink } from "@/lib/publicDefaults";

type NavItem =
    | { label: string; action: "route" | "link"; href: string }
    | { label: string; action: "scroll"; id: string };

type NavbarProps = {
    brandName?: string;
    navigation?: PublicLink[];
    orderLabel?: string;
    orderUrl?: string;
};

export default function Navbar({
    brandName = DEFAULT_SITE.brandName,
    navigation = DEFAULT_SITE.navigation,
    orderLabel = DEFAULT_SITE.orderLabel,
    orderUrl = DEFAULT_SITE.orderUrl,
}: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems: NavItem[] = navigation.map((item) => {
        if (item.url.startsWith("/#")) {
            return { label: item.label, action: "scroll", id: item.url.replace("/#", "") };
        }

        if (item.url.startsWith("/")) {
            return { label: item.label, action: "route", href: item.url };
        }

        return { label: item.label, action: "link", href: item.url };
    });

    const handleNavClick = (item: NavItem) => {
        setIsMenuOpen(false);
        if (item.action === "route") {
            router.push(item.href);
        } else if (item.action === "link") {
            window.open(item.href, "_blank");
        } else if (item.action === "scroll") {
            if (pathname !== "/") {
                router.push(`/#${item.id}`);
            } else {
                const element = document.getElementById(item.id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#F8EFE6]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
                {/* Navbar content without background */}
                <div className="relative">
                    <div className={`flex items-center justify-between px-4 sm:px-6 md:px-16 transition-all duration-300 ${scrolled ? 'py-3 sm:py-4' : 'py-4 sm:py-6'}`}>
                        {/* Logo */}
                        <button
                            onClick={() => router.push('/')}
                            className="text-[#D5AF34] font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-widest cursor-pointer hover:opacity-80 hover:scale-105 transition-all"
                        >
                            {brandName}
                        </button>

                        {/* Desktop Links */}
                        <nav className="hidden lg:flex gap-8 items-center">
                            {navItems.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleNavClick(item)}
                                    className="text-[#721011] font-body font-bold text-base lg:text-lg tracking-wide relative group transition-all duration-300 cursor-pointer hover:scale-105"
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-[#721011] transition-all duration-300 group-hover:w-1/2" />
                                    <span className="absolute bottom-0 right-1/2 h-[2px] w-0 bg-[#721011] transition-all duration-300 group-hover:w-1/2" />
                                </button>
                            ))}
                        </nav>

                        {/* Mobile Menu Button & Desktop CTA */}
                        <div className="flex items-center gap-3">
                            {/* Desktop CTA */}
                            <WaveButton
                                onClick={() => handleNavClick({ label: orderLabel, action: "link", href: orderUrl })}
                                color="#D5AF34"
                                waveColor="#8a6a00"
                                textColor="#fff"
                                label={orderLabel}
                                className="hidden sm:block px-4 sm:px-6 py-2 text-sm sm:text-base"
                            />

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 text-[#721011] hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Decorative bottom curve removed for clean transparent design */}
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            router.push('/');
                                        }}
                                        className="text-[#D5AF34] font-heading font-bold text-3xl tracking-widest cursor-pointer hover:opacity-80 hover:scale-105 transition-all text-left"
                                    >
                                        {brandName}
                                    </button>
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-2 text-[#721011] hover:bg-gray-100 rounded-full transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex-1 px-6 py-8">
                                    <ul className="space-y-6">
                                        {navItems.map((item, idx) => (
                                            <li key={idx}>
                                                <button
                                                    onClick={() => handleNavClick(item)}
                                                    className="w-full text-left text-[#721011] font-body font-bold text-lg tracking-wide py-3 border-b border-transparent hover:border-[#721011]/20 transition-all duration-300"
                                                >
                                                    {item.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>

                                {/* Mobile CTA */}
                                <div className="p-6 border-t border-gray-100">
                                    <WaveButton
                                        onClick={() => handleNavClick({ label: orderLabel, action: "link", href: orderUrl })}
                                        color="#D5AF34"
                                        waveColor="#8a6a00"
                                        textColor="#fff"
                                        label={orderLabel}
                                        className="w-full px-6 py-4 text-lg"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
