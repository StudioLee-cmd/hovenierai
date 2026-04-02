export interface IMenuItem {
    text: string;
    url: string;
    children?: IMenuItem[];
}

export interface IBenefit {
    title: string;
    description: string;
    imageSrc?: string;
    videoSrc?: string;
    tier?: 'basis' | 'pro' | 'elite';
    bullets: IBenefitBullet[];
    buttonText?: string;
    buttonUrl?: string;
}

export interface IBenefitBullet {
    title: string;
    description: string;
    icon: JSX.Element;
    isHighlighted?: boolean;
}

export interface IPricing {
    name: string;
    price: number | string;
    priceMonthly?: number; // Optional monthly price for comparison
    features: string[];
    focus: string;
    savings: string;
    hasSlider?: boolean;
    pricePrefix?: string;
    ctaType?: 'trial' | 'call' | 'options'; // Type of CTA button
    guarantee?: boolean; // Whether the guarantee applies
    stripeMonthly?: string;
    stripeYearly?: string;
}

export interface IFAQ {
    question: string;
    answer: string;
}

export interface ITestimonial {
    name: string;
    role: string;
    message: string;
    avatar: string;
    stars?: number;
}

export interface IStats {
    title: string;
    icon: JSX.Element;
    description: string;
}

export interface ISocials {
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    threads?: string;
    twitter?: string;
    youtube?: string;
    x?: string;
    [key: string]: string | undefined;
}