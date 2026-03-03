"use client"
import Image from "next/image";
import clsx from "clsx";
import { motion, Variants } from "framer-motion"

import BenefitBullet from "./BenefitBullet";
import SectionTitle from "../SectionTitle";
import { IBenefit } from "@/types";

interface Props {
    benefit: IBenefit;
    imageAtRight?: boolean;
}

const containerVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 100
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 0.9,
            delayChildren: 0.2,
            staggerChildren: 0.1,
        }
    }
};

export const childVariants = {
    offscreen: {
        opacity: 0,
        x: -50,
    },
    onscreen: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 1,
        }
    },
};

const BenefitSection: React.FC<Props> = ({ benefit, imageAtRight }: Props) => {
    const { title, description, imageSrc, videoSrc, bullets, buttonText, buttonUrl } = benefit;

    return (
        <section className="benefit-section">
            <motion.div
                className="flex flex-wrap flex-col items-center justify-center gap-2 lg:flex-row lg:gap-20 lg:flex-nowrap mb-24"
                variants={containerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
            >
                <div
                    className={clsx("flex flex-wrap items-center w-full max-w-lg", {
                        "justify-start": imageAtRight && (imageSrc || videoSrc),
                        "lg:order-1 justify-end": !imageAtRight && (imageSrc || videoSrc),
                        "justify-center mx-auto": !imageSrc && !videoSrc
                    })}
                >
                    <div className={clsx("w-full text-center", { "lg:text-left": imageSrc || videoSrc })}>
                        <motion.div
                            className="flex flex-col w-full"
                            variants={childVariants}
                        >
                            <SectionTitle>
                                <h3 className="lg:max-w-2xl">
                                    {title}
                                </h3>
                            </SectionTitle>

                            <p className={clsx("mt-1.5 mx-auto leading-normal text-foreground-accent", { "lg:ml-0": imageSrc || videoSrc })}>
                                {description}
                            </p>

                            {/* Optional CTA Button */}
                            {buttonText && buttonUrl && (
                                <div className={clsx("mt-6 flex justify-center", { "lg:justify-start": imageSrc || videoSrc })}>
                                    <a
                                        href={buttonUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                                    >
                                        {buttonText}
                                    </a>
                                </div>
                            )}
                        </motion.div>

                        <div className={clsx("mx-auto w-full", { "lg:ml-0": imageSrc || videoSrc })}>
                            {bullets.map((item, index) => (
                                <BenefitBullet key={index} title={item.title} icon={item.icon} description={item.description} />
                            ))}
                        </div>
                    </div>
                </div>

                {(imageSrc || videoSrc) && (
                    <motion.div
                        key={videoSrc || imageSrc}
                        className={clsx("mt-5 lg:mt-0", { "lg:order-2": imageAtRight })}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className={clsx("w-fit flex", { "justify-start": imageAtRight, "justify-end": !imageAtRight })}>
                            {videoSrc ? (
                                <div className="relative w-full max-w-[384px] h-auto rounded-[30px] overflow-hidden">
                                    <video
                                        src={videoSrc}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                        width="384"
                                        height="762"
                                    />
                                    <div className="absolute inset-0 shadow-[inset_0_0_20px_-5px_white] pointer-events-none rounded-[30px]" />
                                </div>
                            ) : (
                                <div className="relative w-full max-w-[384px] h-auto">
                                    <Image
                                        src={imageSrc!}
                                        alt={title}
                                        width={384}
                                        height={762}
                                        quality={100}
                                        className="lg:ml-0 w-full h-auto object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}

export default BenefitSection