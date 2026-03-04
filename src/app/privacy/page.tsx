import React from "react";
import Container from "@/components/Container";
import { siteDetails } from "@/data/siteDetails";

const PrivacyPage: React.FC = () => {
    return (
        <Container>
            <div className="py-20 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-lg text-foreground-accent">
                    <p className="mb-4">
                        <em>Laatst bijgewerkt: {new Date().getFullYear()}</em>
                    </p>

                    <p>
                        Je privacy is voor {siteDetails.siteName} (onderdeel van <strong>DigitalStudioLee</strong>) van groot belang. Wij houden ons dan ook aan de privacywetgeving (AVG/GDPR). Dit betekent dat je gegevens bij ons veilig zijn en dat wij ze altijd netjes gebruiken.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Gegevensverwerking</h2>
                    <p>
                        Wij verwerken persoonsgegevens die nodig zijn voor het leveren van onze diensten, zoals naam, adres, telefoonnummer en e-mailadres. Daarnaast verwerkt onze AI gespreksdata om afspraken te kunnen inplannen.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. AI & Data</h2>
                    <p>
                        De AI-systemen analyseren gesprekken om de juiste antwoorden te geven. Gevoelige informatie zoals wachtwoorden wordt <strong>niet</strong> met de AI gedeeld of opgeslagen voor trainingsdoeleinden. Waar mogelijk wordt &apos;training&apos; van modellen uitgeschakeld.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Beveiliging</h2>
                    <p>
                        Beveiliging van persoonsgegevens is voor ons van groot belang. Wij maken gebruik van bank-grade encryptie en beveiligde verbindingen (SSL) om te zorgen dat je gegevens niet in verkeerde handen vallen.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Delen met derden</h2>
                    <p>
                        Wij delen je gegevens nooit met derden voor commerciële doeleinden. Delen gebeurt uitsluitend indien noodzakelijk voor de dienstverlening (bijvoorbeeld agenda-koppelingen) of indien wettelijk verplicht.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Inzage & Wijzigen</h2>
                    <p>
                        Je hebt altijd het recht op inzage in je gegevens. Ook kun je ons verzoeken gegevens aan te passen of te verwijderen. Neem hiervoor contact op via <a href="mailto:tim@studiolee.nl" className="text-primary hover:underline">tim@studiolee.nl</a>.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Cookies</h2>
                    <p>
                        Onze website gebruikt functionele cookies om de site goed te laten werken en analytische cookies om het gebruik te meten. Wij gebruiken geen tracking cookies zonder jouw toestemming.
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default PrivacyPage;
