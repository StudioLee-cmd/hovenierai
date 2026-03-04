'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';

import Container from './Container';
import FreeTrialModal from './FreeTrialModal';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import { siteDetails } from '@/data/siteDetails';
import { menuItems } from '@/data/menuItems';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-transparent fixed top-0 left-0 right-0 z-50 mx-auto w-full pointer-events-none">
            <Container className="!px-0">
                <nav className="shadow-md md:shadow-none bg-transparent mx-auto flex justify-between items-start py-2 px-5 md:py-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 -ml-6 md:-ml-12 -mt-4 md:-mt-8 pointer-events-auto">
                        <Image
                            src={siteDetails.siteLogo}
                            alt={siteDetails.siteName}
                            width={400}
                            height={120}
                            className="h-24 md:h-48 w-auto object-contain logo-dark-filter"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center space-x-4 mt-2 pointer-events-auto">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link href={item.url} className="text-foreground hover:text-foreground-accent transition-colors whitespace-nowrap text-[15px] font-medium">
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-black bg-primary hover:bg-primary-accent px-6 py-2 rounded-full transition-colors flex items-center justify-center whitespace-nowrap"
                            >
                                Start Gratis
                            </button>
                        </li>
                        <li>
                            <AnimatedThemeToggler />
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2 pointer-events-auto">
                        <AnimatedThemeToggler className="w-9 h-9" />
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiBars3 className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </nav>
            </Container>

            {/* Mobile Menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="md:hidden bg-[var(--card-background)] shadow-lg pointer-events-auto">
                    <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link href={item.url} className="text-foreground hover:text-primary block" onClick={toggleMenu}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => { setIsModalOpen(true); toggleMenu(); }}
                                className="text-black bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit"
                            >
                                Start Gratis
                            </button>
                        </li>
                    </ul>
                </div>
            </Transition>

            <FreeTrialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isAnnual={false} />
        </header>
    );
};

export default Header;

