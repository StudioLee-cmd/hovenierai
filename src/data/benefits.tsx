import { FiMessageSquare, FiCalendar, FiVideo, FiCamera, FiEdit3, FiShare2, FiMail, FiFileText, FiStar, FiBell, FiImage, FiPhoneMissed, FiLayout, FiPenTool, FiUsers, FiClipboard, FiSmartphone, FiCpu, FiTrendingUp, FiCheckCircle, FiLifeBuoy, FiClock, FiTarget, FiCoffee, FiThumbsUp, FiGlobe, FiPlayCircle, FiTool, FiShield, FiZap, FiAward, FiMapPin, FiLayers, FiRefreshCw, FiCreditCard, FiUserCheck, FiPieChart, FiInbox, FiBarChart2, FiLink } from "react-icons/fi";

import { IBenefit } from "@/types"

// ⚑ PROPOSITIE-CONTRACT §① + §③.3 (alpha1/ventures/studiolee/projects/niche-sites-upgrade-programma.md):
// de homepage toont PRECIES VIER dingen — chatbot · telefoon die opneemt · marketing die vanzelf loopt ·
// een website die zichzelf bijwerkt. Tot 25-07 stonden hier 20 losse dienst-blokken naast elkaar; dat is
// een catalogus, geen propositie (⛔3 "geen vijfde ding"), en het is dezelfde vier-dingen-lijst die de
// primaire nav al draagt (src/data/menuItems.ts).
//
// ⚠️ Er is NIETS weggegooid. Alle 20 secties met hun bullets, beelden en video's staan er nog — ze vouwen
// als `details` ONDER het ding waar ze een onderdeel van zijn, en de bezoeker die doorleest ziet ze open
// klappen. Voeg je iets toe: hang het onder één van de vier, nooit als vijfde hoofdsectie ernaast.
//
// De managed-variant ("Alles volledig uit handen") is géén vijfde ding maar het SERVICE-NIVEAU op dezelfde
// vier — 'ie staat daarom apart als `managedService` en rendert als afsluitende strook, niet als tab.

const chatbotDetails: IBenefit[] = [
    {
        title: "Slimme Website Chat",
        tier: 'basis',
        description: "Beantwoordt de vragen van je bezoekers in jouw eigen toon en zet de afspraak klaar.",
        bullets: [
            {
                title: "24/7 Q&A",
                description: "Antwoordt vragen op basis van jouw Kennisbank.",
                icon: <FiMessageSquare size={26} />
            },
            {
                title: "Lead Capture",
                description: "Vangt leads direct op in je CRM.",
                icon: <FiUsers size={26} />
            },
            {
                title: "Design",
                description: "Pas de kleuren en begroeting aan op jouw huisstijl.",
                icon: <FiPenTool size={26} />
            },
            {
                title: "Conversie",
                description: "Zet websitebezoekers om in afspraken.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Altijd Bereikbaar",
                description: "Je website is nooit meer gesloten.",
                icon: <FiCheckCircle size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/chatbot-ai.png"
        },
    {
        title: "Centrale Inbox",
        tier: 'basis',
        description: "Bespaar tijd en mis nooit meer een lead. Al je communicatie en data slim op één plek.",
        bullets: [
            {
                title: "Alles-in-1",
                description: "Email, SMS, WhatsApp, FB Messenger, IG DM in één scherm.",
                icon: <FiInbox size={26} />
            },
            {
                title: "Team Chat",
                description: "Wijs gesprekken toe aan specifieke teamleden.",
                icon: <FiUsers size={26} />
            },
            {
                title: "Mobile App",
                description: "Reageer onderweg via de Native Mobile App.",
                icon: <FiSmartphone size={26} />
            },
            {
                title: "Templates & Snippets",
                description: "Gebruik snelle antwoorden op veelgestelde vragen.",
                icon: <FiZap size={26} />
            },
            {
                title: "Zero Missed",
                description: "Nooit meer inloggen op 5 verschillende platformen.",
                icon: <FiCheckCircle size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/centrale-inbox.png"
        },
    {
        title: "Klantrelatiebeheer",
        tier: 'basis',
        description: "Beheer al je relaties en verkoopkansen in één systeem.",
        bullets: [
            {
                title: "Smart Lists",
                description: "Filter klanten automatisch op gedrag, tags en status.",
                icon: <FiUsers size={26} />
            },
            {
                title: "Pipelines",
                description: "Visueel overzicht van waar elke lead zich bevindt.",
                icon: <FiTrendingUp size={26} />
            },
            {
                title: "Actie Historie",
                description: "Zie elk mailtje, belletje en notitie in één tijdlijn.",
                icon: <FiClock size={26} />
            },
            {
                title: "Automatisering",
                description: "Start workflows direct vanuit een contactkaart.",
                icon: <FiCpu size={26} />
            },
            {
                title: "Klantinzicht",
                description: "Leer je klant kennen en verkoop meer.",
                icon: <FiTarget size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/klantebeheer.jpg"
        },
]

const telefoonDetails: IBenefit[] = [
    {
        title: "AI Telefoniste",
        tier: 'basis',
        description: "Neemt de telefoon op, verstaat wat er gevraagd wordt en zet de afspraak meteen in je agenda.",
        bullets: [
            {
                title: "Meertalig & Accenten",
                description: "Spreekt en begrijpt meerdere talen vloeiend. Schakelt moeiteloos over tijdens het gesprek.",
                icon: <FiGlobe size={26} />
            },
            {
                title: "Workflows & Acties",
                description: "Volledige opties voor workflows, uitgaande calls en alle gewenste features.",
                icon: <FiCpu size={26} />
            },
            {
                title: "Slim Doorverbinden",
                description: "Schakelt gesprekken automatisch door naar andere nummers indien nodig.",
                icon: <FiSmartphone size={26} />
            },
            {
                title: "Multi-Agenda Booking",
                description: "Plant afspraken direct in meerdere agenda's en systemen tegelijk.",
                icon: <FiCalendar size={26} />
            },
            {
                title: "Alles Inclusief",
                description: "Alle features en updates zijn inbegrepen. Geen extra kosten.",
                icon: <FiCheckCircle size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/voice-ai.png"
        },
    {
        title: "Gemiste Oproep Service",
        tier: 'basis',
        description: "Wie je niet kon opnemen krijgt binnen een tel een berichtje terug.",
        bullets: [
            {
                title: "Direct Contact",
                description: "SMS klanten direct als je niet kunt opnemen.",
                icon: <FiMessageSquare size={26} />
            },
            {
                title: "Red de Lead",
                description: "Voorkom dat klanten naar de concurrent bellen.",
                icon: <FiLifeBuoy size={26} />
            },
            {
                title: "Gespreksstarter",
                description: "Start automatisch een conversatie om de afspraak alsnog te maken.",
                icon: <FiShare2 size={26} />
            },
            {
                title: "Altijd Aan",
                description: "Werkt 24/7, ook in het weekend.",
                icon: <FiCpu size={26} />
            },
            {
                title: "Omzetbehoud",
                description: "Elke geredde lead is extra omzet.",
                icon: <FiTrendingUp size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/call-back-ai.png"
        },
    {
        title: "Afspraak Herinneringen",
        tier: 'basis',
        description: "Herinnert je klanten aan hun afspraak, zodat er minder plekken leeg blijven.",
        bullets: [
            {
                title: "No-Show Reductie",
                description: "Bewezen SMS/Email sequenties om no-shows te voorkomen.",
                icon: <FiBell size={26} />
            },
            {
                title: "Sequenties",
                description: "Standaard 24u, 1u en 10min herinneringen.",
                icon: <FiClock size={26} />
            },
            {
                title: "Bevelliging",
                description: "Zorgt dat klanten hun afspraak niet vergeten.",
                icon: <FiShield size={26} />
            },
            {
                title: "Wachtlijst",
                description: "Kan geannuleerde plekken opvullen via wachtlijst.",
                icon: <FiUsers size={26} />
            },
            {
                title: "Volle Agenda",
                description: "Maximaliseer je declarabele uren.",
                icon: <FiCalendar size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/reminder-ai.png"
        },
]

const marketingDetails: IBenefit[] = [
    {
        title: "Teksten die je vindbaar maken",
        tier: 'basis',
        description: "Genereert hoog scorende Google artikelen door slim gebruik van AI.",
        bullets: [
            {
                title: "Slimme Ideeën",
                description: "Genereert onderwerpen gebaseerd op jouw specifieke Niche.",
                icon: <FiTool size={26} />
            },
            {
                title: "Elite Editor",
                description: "Geavanceerde tools voor perfectie en Interne Links.",
                icon: <FiEdit3 size={26} />
            },
            {
                title: "Zoekwoord Exploratie",
                description: "Vindt kansen met weinig concurrentie en veel volume.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Auto-Publishing",
                description: "Publiceert direct naar WordPress of jouw website.",
                icon: <FiGlobe size={26} />
            },
            {
                title: "Google Dominantie",
                description: "Wordt de autoriteit in jouw markt.",
                icon: <FiTrendingUp size={26} />,
                isHighlighted: true
            }
        ],


        videoSrc: "/videos/benefits/seo-blog-writer.mp4"
        },
    {
        title: "Dieper sturen op vindbaarheid",
        tier: 'pro',
        description: "Haalt meer uit de teksten die er al staan, zodat oudere pagina's blijven scoren. (Binnenkort beschikbaar.)",
        bullets: [
            {
                title: "One-Click Optimalisatie",
                description: "Verbeter je volledige tekst direct met één klik voor hogere rankings.",
                icon: <FiZap size={26} />
            },
            {
                title: "Smart Interne Links",
                description: "Plaats automatisch relevante interne links naar andere artikelen.",
                icon: <FiLink size={26} />
            },
            {
                title: "SEO Score",
                description: "Real-time feedback op je content kwaliteit.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Concurrentie Analyse",
                description: "Zie wat werkt voor de top 10 resultaten.",
                icon: <FiGlobe size={26} />
            },
            {
                title: "Pro Tool",
                description: "De ultieme tool voor SEO professionals.",
                icon: <FiAward size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/seo-editor-ai.png"
        },
    {
        title: "Zichtbaar blijven zonder eraan te denken",
        tier: 'basis',
        description: "Je posts staan klaar en gaan er vanzelf uit op Facebook, Instagram, LinkedIn, TikTok en X.",
        bullets: [
            {
                title: "Posting Engine",
                description: "Dit is de motor voor het plaatsen; creatie doe je met 'Social Media Content'.",
                icon: <FiShare2 size={26} />
            },
            {
                title: "Automatisering",
                description: "Plan en publiceer content automatisch op al je kanalen.",
                icon: <FiCalendar size={26} />
            },
            {
                title: "Visuele Kalender",
                description: "Houd overzicht met een handige drag-and-drop kalender.",
                icon: <FiLayout size={26} />
            },
            {
                title: "Cross-Platform",
                description: "Beheer Facebook, Instagram, LinkedIn, TikTok en Twitter vanuit één plek.",
                icon: <FiGlobe size={26} />
            },
            {
                title: "Gratis Inbegrepen",
                description: "Deze krachtige tool is standaard onderdeel van je licentie.",
                icon: <FiCheckCircle size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/social-media-planner.png"
        },
    {
        title: "Social Media Content",
        tier: 'basis',
        description: "Genereert indrukwekkende visuals en captions voor al je kanalen.",
        bullets: [
            {
                title: "Multi-Format",
                description: "Instagram (1:1, 4:5), TikTok (9:16), LinkedIn (16:9).",
                icon: <FiLayout size={26} />
            },
            {
                title: "Visuele Stijlen",
                description: "Kies uit Fotorealistisch, 3D Render, Minimalist of Artistiek.",
                icon: <FiImage size={26} />
            },
            {
                title: "Video Generatie",
                description: "Zet tekst om in korte video's met AI voiceovers.",
                icon: <FiVideo size={26} />
            },
            {
                title: "Captions & Hashtags",
                description: "Schrijft direct pakkende teksten en hashtags.",
                icon: <FiMessageSquare size={26} />
            },
            {
                title: "Content Machine",
                description: "Nooit meer zonder content zitten.",
                icon: <FiCamera size={26} />,
                isHighlighted: true
            }
        ],


        videoSrc: "/videos/benefits/reclame-ai.mp4"
        },
    {
        title: "Meer en betere reviews",
        tier: 'basis',
        description: "Automatiseert je Reputatie Management.",
        bullets: [
            {
                title: "Automatisering",
                description: "Verstuurt automatische SMS/Emails voor Google Reviews na een afspraak.",
                icon: <FiStar size={26} />
            },
            {
                title: "Review Widget",
                description: "Toont je laatste 5-sterren reviews direct op je website.",
                icon: <FiLayout size={26} />
            },
            {
                title: "Google Ranking",
                description: "Meer reviews = betere vindbaarheid in Google Maps.",
                icon: <FiMapPin size={26} />
            },
            {
                title: "Feedback Shield",
                description: "Vangt negatieve feedback af voordat het online komt.",
                icon: <FiShield size={26} />
            },
            {
                title: "Reputatie",
                description: "Bouw een 5-sterren reputatie op de automatische piloot.",
                icon: <FiThumbsUp size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/reputatie-manager.png"
        },
    {
        title: "Advertenties die blijven lopen",
        tier: 'basis',
        description: "Beheer en analyseer je Google & Facebook campagnes.",
        bullets: [
            {
                title: "Rapportage",
                description: "Zie exact wat je uitgeeft en wat het oplevert (ROI).",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Lead Tracking",
                description: "Zie precies welke advertentie de lead heeft gebracht.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Google & FB Sync",
                description: "Verbind beide platformen in één dashboard.",
                icon: <FiRefreshCw size={26} />
            },
            {
                title: "Live Inzicht",
                description: "Neem beslissingen op basis van real-time data.",
                icon: <FiTrendingUp size={26} />
            },
            {
                title: "Optimalisatie",
                description: "Stop met gokken, start met meten.",
                icon: <FiAward size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/ad-manager.jpg"
        },
    {
        title: "Je mail bijgehouden",
        tier: 'basis',
        description: "Leest en labelt inkomende mails en zet concepten klaar via workflows.",
        bullets: [
            {
                title: "Slim Labelen",
                description: "AI herkent of een mail een lead, spam of vraag is.",
                icon: <FiCheckCircle size={26} />
            },
            {
                title: "Auto-Drafting",
                description: "Zet automatisch een concept antwoord klaar in je drafts.",
                icon: <FiEdit3 size={26} />
            },
            {
                title: "Workflow Triggers",
                description: "Start specifieke acties op basis van de inhoud van de email.",
                icon: <FiCpu size={26} />
            },
            {
                title: "Tijdbesparing",
                description: "Bespaar uren per week aan email beheer.",
                icon: <FiClock size={26} />
            },
            {
                title: "Inbox Zero",
                description: "Houd je inbox schoon en georganiseerd.",
                icon: <FiInbox size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/email-draft-ai.png"
        },
    {
        title: "Sneller betaald krijgen",
        tier: 'basis',
        description: "Creëer professionele facturen en overtuigende sales presentaties binnen minuten. Volledig automatisch met AI-gegenereerde visuals.",
        bullets: [
            {
                title: "Sales Deck Generator",
                description: "Maak in 5 minuten een complete verkooppresentatie met custom AI-afbeeldingen.",
                icon: <FiImage size={26} />
            },
            {
                title: "Slimme Facturen",
                description: "Vul je pakketten en prijzen in, krijg direct een professionele factuur.",
                icon: <FiFileText size={26} />
            },
            {
                title: "Betalingsherinneringen",
                description: "Automatische herinneringen bij openstaande facturen verlichten je werkdruk.",
                icon: <FiBell size={26} />
            },
            {
                title: "Online Betalingen",
                description: "Klanten betalen direct via iDEAL, creditcard of bankoverschrijving.",
                icon: <FiCreditCard size={26} />
            },
            {
                title: "Sneller Betaald",
                description: "Professionele presentaties + automatische opvolging = minder gedoe.",
                icon: <FiCheckCircle size={26} />,
                isHighlighted: true
            }
        ],


        videoSrc: "/videos/benefits/sales-deck-ai.mp4"
        },
    {
        title: "Offertes & Contracten",
        tier: 'basis',
        description: "Genereert visuele verkooppresentaties en contracten die indruk maken.",
        bullets: [
            {
                title: "Dynamische Prijzen",
                description: "Ondersteunt '3 Pakketten' model of 'Vrije invoer'.",
                icon: <FiPieChart size={26} />
            },
            {
                title: "Visuele Presentaties",
                description: "Maakt een visuele slide deck i.p.v. een saaie PDF.",
                icon: <FiImage size={26} />
            },
            {
                title: "Digitale Handtekening",
                description: "Ingebouwde Digitale Handtekening en validatie voor snelle akkoorden.",
                icon: <FiPenTool size={26} />
            },
            {
                title: "Niche Pitching",
                description: "Schrijft Probleem/Oplossing slides op maat voor jouw klant.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Conversie",
                description: "Sluit meer deals met professionele presentaties.",
                icon: <FiCheckCircle size={26} />,
                isHighlighted: true
            }
        ],

        imageSrc: "/images/benefits/offerte-ai.png"
        },
    {
        title: "Workflow Automatisering",
        tier: 'basis',
        description: "Verbindt je agenda, mail, socials en facturatie, zodat het één het ander in gang zet.",
        bullets: [
            {
                title: "If This, Then That",
                description: "Triggers complexe acties over apps heen (Email -> Trello -> Slack).",
                icon: <FiCpu size={26} />
            },
            {
                title: "Lead Scraping",
                description: "Vindt en verrijkt leads automatisch.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Cross-Platform",
                description: "Sync Calendar, Email, Socials en Facturatie.",
                icon: <FiRefreshCw size={26} />
            },
            {
                title: "Email Outreach",
                description: "Automatische nurturing sequenties die stoppen bij antwoord.",
                icon: <FiMail size={26} />
            },
            {
                title: "Automatisering",
                description: "Bespaar uren werk door saaie taken te automatiseren.",
                icon: <FiZap size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/workflow-ai.png"
        },
]

const websiteDetails: IBenefit[] = [
    {
        title: "Websites & Funnels",
        tier: 'basis',
        description: "Bouw professionele websites en landingspagina's zonder code.",
        bullets: [
            {
                title: "Drag & Drop",
                description: "Eenvoudige editor: sleep elementen op hun plek.",
                icon: <FiLayout size={26} />
            },
            {
                title: "A/B Testen",
                description: "Test verschillende varianten om je conversie te verhogen.",
                icon: <FiTrendingUp size={26} />
            },
            {
                title: "Templates",
                description: "Start direct met bewezen, converterende layouts.",
                icon: <FiLayers size={26} />
            },
            {
                title: "Snelheid",
                description: "Bliksemsnelle laadtijden voor betere SEO.",
                icon: <FiZap size={26} />
            },
            {
                title: "Responsive",
                description: "Ziet er geweldig uit op desktop, tablet en mobiel.",
                icon: <FiSmartphone size={26} />,
                isHighlighted: true
            }
        ],
        imageSrc: "/images/benefits/websites-funnels.png"
        },
    {
        title: "Foto's van je werk, zonder shoot",
        tier: 'basis',
        description: "Genereer hyper-realistische beelden met de allerbeste nieuwe AI modellen.",
        bullets: [
            {
                title: "Top Kwaliteit",
                description: "Gebruikt de kracht van de allerbeste nieuwe generatie beeldmodellen.",
                icon: <FiImage size={26} />
            },
            {
                title: "Fotorealisme",
                description: "Niet van echt te onderscheiden beelden.",
                icon: <FiCamera size={26} />
            },
            {
                title: "Creatieve Vrijheid",
                description: "Van productfoto's tot artistieke concepten.",
                icon: <FiPenTool size={26} />
            },
            {
                title: "Rechtenvrij",
                description: "100% eigendom voor commercieel gebruik.",
                icon: <FiCheckCircle size={26} />
            },
            {
                title: "Snelheid",
                description: "Geen dure fotoshoots of wachttijden. Direct resultaat wanneer jij het nodig hebt.",
                icon: <FiZap size={26} />,
                isHighlighted: true
            }
        ],


        videoSrc: "/videos/benefits/photo-ai.mp4"
        },
    {
        title: "Zakelijke Videoproductie",
        tier: 'basis',
        description: "Creëer cinematische video's met de nieuwste bewegende beeld modellen.",
        bullets: [
            {
                title: "Next-Gen Video",
                description: "Aangedreven door revolutionaire nieuwe video modellen.",
                icon: <FiVideo size={26} />
            },
            {
                title: "Text-to-Video",
                description: "Typ een prompt en zie je verhaal tot leven komen.",
                icon: <FiFileText size={26} />
            },
            {
                title: "Image-to-Video",
                description: "Laat statische afbeeldingen bewegen.",
                icon: <FiImage size={26} />
            },
            {
                title: "Sales & Info",
                description: "Focus op informatieve video's die sales genereren, niet op 'viral' entertainment.",
                icon: <FiTrendingUp size={26} />
            },
            {
                title: "High Definition",
                description: "Haarscherpe kwaliteit voor professioneel gebruik.",
                icon: <FiAward size={26} />,
                isHighlighted: true
            }
        ],


        videoSrc: "/videos/benefits/video-ai.mp4"
        },
]

export const benefits: IBenefit[] = [
    // ① CHATBOT — vangt de bezoeker op die liever typt dan belt
    {
        title: "Chatbot op je site",
        description: "Vangt de bezoeker op die liever typt dan belt. Beantwoordt de vraag, pakt de gegevens en zet de afspraak klaar — ook om elf uur 's avonds, als je hoveniersbedrijf allang dicht is.",
        bullets: [
        {
            title: "Altijd open",
            description: "Je site staat 24/7 iemand te woord, ook in het weekend en terwijl jij in een tuin aan het werk bent.",
            icon: <FiMessageSquare size={26} />
        },
        {
            title: "Niets raakt kwijt",
            description: "Chat, mail, WhatsApp en je socials komen op één plek binnen, met de klantkaart eraan vast.",
            icon: <FiInbox size={26} />
        },
        {
            title: "Van vraag naar klus",
            description: "De chat vraagt door en zet de afspraak klaar, in plaats van alleen te antwoorden.",
            icon: <FiTarget size={26} />,
            isHighlighted: true
        }
        ],
        imageSrc: "/images/benefits/chatbot-ai.png",
        details: chatbotDetails
    },
    // ② VOICE-AI — neemt op als jij je handen niet vrij hebt
    {
        title: "Telefoon die opneemt",
        description: "Neemt op als jij met je handen in de aarde zit. Boekt de afspraak, verbindt door als het moet, en pakt terug wat je zelf liet gaan.",
        bullets: [
        {
            title: "Neemt altijd op",
            description: "Verstaat meerdere talen en accenten en boekt direct in je agenda — ook tijdens het voorjaar.",
            icon: <FiSmartphone size={26} />
        },
        {
            title: "Gemist is niet weg",
            description: "Wie geen gehoor krijgt, heeft binnen een tel een bericht — voordat 'ie de concurrent verderop belt.",
            icon: <FiLifeBuoy size={26} />
        },
        {
            title: "Volle agenda, minder no-shows",
            description: "Herinneringen op 24 uur, 1 uur en 10 minuten voor de afspraak, en een wachtlijst die gaten opvult.",
            icon: <FiCalendar size={26} />,
            isHighlighted: true
        }
        ],
        imageSrc: "/images/benefits/voice-ai.png",
        details: telefoonDetails
    },
    // ③ GEAUTOMATISEERDE MARKETING — gevonden worden, van je laten horen, betaald krijgen
    {
        title: "Marketing die vanzelf loopt",
        description: "Je wordt gevonden, je klanten horen van je en je krijgt betaald — zonder dat jij eraan denkt. Teksten, socials, reviews, mail en facturen lopen op de achtergrond door.",
        bullets: [
        {
            title: "Gevonden worden",
            description: "Pagina's en artikelen die scoren op wat mensen in jouw stad daadwerkelijk zoeken.",
            icon: <FiTrendingUp size={26} />
        },
        {
            title: "Klanten horen van je",
            description: "Socials, mailtjes en reviewverzoeken gaan uit op het moment dat ze het beste werken.",
            icon: <FiShare2 size={26} />
        },
        {
            title: "En je krijgt betaald",
            description: "Offertes, facturen en herinneringen gaan er vanzelf uit; klanten rekenen online af.",
            icon: <FiCreditCard size={26} />,
            isHighlighted: true
        }
        ],
        // ⛔1: de SEO-video toont 'app.gohighlevel.com' in de URL-balk + loodgieters-content (niche-lek);
        // gemeten 25-07 op frame 0.45. Zolang er geen schone opname is draagt dit ding een beeld.
        imageSrc: "/images/benefits/reputatie-manager.png",
        details: marketingDetails
    },
    // ④ EEN WEBSITE DIE ZICHZELF BIJWERKT
    {
        title: "Een website die zichzelf bijwerkt",
        description: "Staat er over een jaar nóg goed bij, zonder dat jij 'm bijhoudt. Nieuwe teksten, nieuwe beelden en nieuwe pagina's komen er vanzelf op.",
        bullets: [
        {
            title: "Altijd actueel",
            description: "Nieuwe teksten en pagina's verschijnen zonder dat jij ooit een editor opent.",
            icon: <FiRefreshCw size={26} />
        },
        {
            title: "Beelden van je werk",
            description: "Nieuwe foto's en video's in jouw stijl, zonder shoot en zonder fotograaf op de stoep.",
            icon: <FiCamera size={26} />
        },
        {
            title: "Snel en op elk scherm",
            description: "Laadt snel en ziet er op mobiel net zo goed uit — en dat helpt je meteen in Google.",
            icon: <FiZap size={26} />,
            isHighlighted: true
        }
        ],
        imageSrc: "/images/benefits/websites-funnels.png",
        details: websiteDetails
    },
]

// Het service-niveau op dezelfde vier dingen — geen vijfde ding, dus geen tab (zie de kop).
export const managedService: IBenefit = {
        title: "Alles volledig uit handen",
        tier: 'elite',
        // ⛔ Uitkomst-taal, geen AI-hype (Tim 25-07, keur 78). Hier stond "Domineer jouw markt in het
        // AI-tijdperk zonder technische zorgen" — dat is precies de vage AI-taal die de sales-lessen
        // afkeuren (bewijs verslaat belofte; de kapper zit op niveau 1-2, niet op marktdominantie).
        description: "Dan zetten wij het op, houden wij het bij en sturen wij het elke maand bij. Jij ziet alleen de afspraken binnenkomen.",
        buttonText: "Plan een Strategie Call",
        buttonUrl: "/demo",
        bullets: [
        {
            title: "AI Dominantie",
            description: "Wij denken proactief mee over nieuwe kansen om jouw concurrentie voor te blijven.",
            icon: <FiTrendingUp size={26} />
        },
        {
            title: "Dagelijkse Automatisering",
            description: "Social media, website updates en email campagnes draaien volledig automatisch.",
            icon: <FiRefreshCw size={26} />
        },
        {
            title: "Strategie & Uitvoering",
            description: "Tijdens de maandelijkse 1 uur strategie sessie bespreken we wensen; wij voeren het direct uit.",
            icon: <FiUsers size={26} />
        },
        {
            title: "Advanced Setup",
            description: "Complexe wensen? Wij regelen het (bij veel werk geldt een eenmalige setup fee).",
            icon: <FiTool size={26} />
        },
        {
            title: "Client App",
            description: "Uw klanten kunnen zelf afspraken inplannen via een gepersonaliseerde app.",
            icon: <FiSmartphone size={26} />
        },
        {
            title: "Focus op je Vak",
            description: "Stop met tijdverspilling aan bijzaken. Jij doet het echte werk, wij de rest.",
            icon: <FiCheckCircle size={26} />,
            isHighlighted: true
        }
        ],
        imageSrc: "/images/benefits/managed-service.png"
    }
