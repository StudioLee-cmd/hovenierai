"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";

import SectionTitle from "./SectionTitle";
import { footerDetails } from '@/data/footer';
import { faqs } from "@/data/faq";

const FAQ: React.FC = () => {
    return (
        <section id="faq" className="py-10 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="">
                    <p className="hidden lg:block text-foreground-accent">FAQ&apos;S</p>
                    <SectionTitle>
                        <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">Veelgestelde Vragen</h2>
                    </SectionTitle>
                    {/* Contact Card */}
                    <div className="mt-8 bg-[var(--card-background)] rounded-2xl p-6 shadow-xl border border-[var(--card-border)] text-center lg:text-left">
                        <p className="text-[var(--foreground-accent)] font-medium mb-2">
                            Staat je vraag er niet bij?
                        </p>
                        <a href={`mailto:${footerDetails.email}`} className="text-xl lg:text-2xl text-primary font-bold hover:text-primary-accent transition-colors">
                            {footerDetails.email}
                        </a>
                    </div>

                    {/* Integrated CTA Card */}
                    <div className="mt-8 lg:mt-10 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-2xl p-8 text-center text-white shadow-2xl relative overflow-hidden border border-yellow-500/30">
                        {/* Decorative shine */}
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-500/20 blur-xl rounded-full"></div>

                        <h3 className="text-xl font-bold mb-3 relative z-10">Klaar om je bedrijf te transformeren?</h3>
                        <p className="text-gray-300 mb-6 text-sm leading-relaxed relative z-10">
                            Gemiddeld besparen onze klanten 10+ uur per week aan administratie en telefoontjes. Daarnaast heb je geen gaten meer in je agenda door no-shows of gemiste oproepen. Eén extra gevulde stoel per week dekt vaak de kosten al.
                        </p>
                        <a href="#pricing" className="relative z-10 inline-block w-full">
                            <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all shadow-lg transform hover:scale-[1.02]">
                                Start gratis
                            </button>
                        </a>
                    </div>
                </div>

                <div className="w-full lg:max-w-2xl mx-auto border-b">
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-7">
                            <Disclosure>
                                {({ open }) => (
                                    <div className="w-full">
                                        <DisclosureButton className="flex items-center justify-between w-full px-4 pt-7 text-lg text-left border-t">
                                            <span className="text-2xl font-semibold">{faq.question}</span>
                                            {open ? <BiMinus className="w-5 h-5 text-secondary" /> : <BiPlus className="w-5 h-5 text-secondary" />}
                                        </DisclosureButton>
                                        <DisclosurePanel className="px-4 pt-4 pb-2 text-foreground-accent">
                                            {faq.answer}
                                        </DisclosurePanel>
                                    </div>
                                )}
                            </Disclosure>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;