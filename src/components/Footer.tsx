import Link from 'next/link';
import Image from 'next/image';
import React from 'react';


import { siteDetails } from '@/data/siteDetails';
import { footerDetails } from '@/data/footer';
import { getPlatformIconByName } from '@/utils';

const Footer: React.FC = () => {
    return (
        <footer className="bg-hero-background text-foreground py-10">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={siteDetails.siteLogo}
                            alt={siteDetails.siteName}
                            width={300}
                            height={100}
                            className="h-32 md:h-44 w-auto object-contain logo-dark-filter"
                        />
                    </Link>
                    <p className="mt-3.5 text-foreground-accent">
                        {footerDetails.subheading}
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="text-foreground-accent">
                        {footerDetails.quickLinks.map(link => (
                            <li key={link.text} className="mb-2">
                                <Link href={link.url} className="hover:text-foreground">{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Contact & Info</h4>
                    <ul className="text-foreground-accent space-y-2">
                        {footerDetails.email && <li><a href={`mailto:${footerDetails.email}`} className="hover:text-foreground">Email: {footerDetails.email}</a></li>}
                    </ul>

                    {footerDetails.socials && (
                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                            {Object.keys(footerDetails.socials).map(platformName => {
                                if (platformName && footerDetails.socials[platformName]) {
                                    return (
                                        <Link
                                            href={footerDetails.socials[platformName]}
                                            key={platformName}
                                            aria-label={platformName}
                                        >
                                            {getPlatformIconByName(platformName)}
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 md:text-center text-foreground-accent px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. Alle rechten voorbehouden. <span className="mx-2">|</span> <a href="https://studiolee.nl" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Speciaal voor hoveniers door Studiolee.nl</a></p>
                <div className="flex gap-6 text-sm flex-wrap justify-center md:justify-end">
                    <Link href="/algemene-voorwaarden" className="hover:text-foreground">Algemene Voorwaarden</Link>
                    <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                    <Link href="/legal" className="hover:text-foreground">Bedrijfsgegevens</Link>
                    <Link href="mailto:tim@studiolee.nl?subject=Feature%20Request" className="hover:text-foreground">✨ Features Aanvragen</Link>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
