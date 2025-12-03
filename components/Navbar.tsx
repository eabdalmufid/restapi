'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 lg:px-24">
            <nav className="bg-background/20 border-border/50 m-6 flex items-center justify-between rounded-full border px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                <Link
                    href="/"
                    className="text-foreground text-xl font-semibold tracking-wide drop-shadow-sm"
                >
                    Seaavey
                </Link>

                <div className="hidden items-center space-x-8 md:flex">
                    {NAV_LINKS.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-foreground/70 hover:text-primary text-sm transition-colors duration-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden md:block">
                    <Button className="bg-primary/90 hover:bg-primary rounded-md px-4 py-1.5 text-sm shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]">
                        Try It
                    </Button>
                </div>

                <button
                    className="text-foreground z-50 md:hidden"
                    onClick={() => setIsMobileMenuOpen(true)}
                    aria-label="Open mobile menu"
                >
                    <div className="flex w-6 flex-col gap-[5px]">
                        <span className="bg-foreground h-0.5 w-full"></span>
                        <span className="bg-foreground h-0.5 w-full"></span>
                        <span className="bg-foreground h-0.5 w-full"></span>
                    </div>
                </button>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.div
                            className="bg-background/80 border-border/20 fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm border-l shadow-xl backdrop-blur-xl"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ ease: 'easeOut', duration: 0.3 }}
                        >
                            <div className="flex h-full flex-col">
                                <div className="border-border/20 flex items-center justify-between border-b p-5">
                                    <div className="text-foreground text-lg font-semibold">
                                        Seaavey
                                    </div>

                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        aria-label="Close menu"
                                        className="text-foreground"
                                    >
                                        <div className="flex w-6 flex-col gap-[5px]">
                                            <span className="bg-foreground h-0.5 w-full translate-y-1 rotate-45"></span>
                                            <span className="bg-foreground h-0.5 w-full -translate-y-1 -rotate-45"></span>
                                        </div>
                                    </button>
                                </div>

                                <div className="flex flex-1 flex-col gap-1.5 p-5">
                                    {NAV_LINKS.map(link => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-foreground/80 hover:text-primary border-border/10 border-b py-3 text-base transition-all duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className="border-border/20 border-t p-5">
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="bg-primary hover:bg-primary/90 w-full rounded-md py-2.5 text-white shadow-sm transition-all duration-300 hover:shadow-md"
                                    >
                                        Try
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
