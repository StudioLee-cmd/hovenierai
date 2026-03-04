import React from "react";
import Container from "@/components/Container";
import { siteDetails } from "@/data/siteDetails";
import { footerDetails } from "@/data/footer";

const TermsPage: React.FC = () => {
    return (
        <Container>
            <div className="py-20 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Algemene Voorwaarden</h1>
                <div className="prose prose-lg text-foreground-accent">
                    <p className="mb-4">
                        <em>Laatst bijgewerkt: {new Date().getFullYear()}</em>
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Algemeen</h2>
                    <p>
                        Deze algemene voorwaarden zijn van toepassing op alle diensten van {siteDetails.siteName}. Door gebruik te maken van onze diensten, ga je akkoord met deze voorwaarden.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Dienstverlening</h2>
                    <p>
                        {siteDetails.siteName} is een handelsnaam van <strong>{footerDetails.legalName}</strong> (KVK: {footerDetails.kvk}). Wij leveren software-oplossingen (SaaS) voor ondernemers, waaronder AI-telefonie, chatbots en social media automatisering.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Abonnement & Opzegging</h2>
                    <p>
                        Onze abonnementen zijn maandelijks opzegbaar. Er is geen sprake van lange contracten, tenzij expliciet anders overeengekomen. Opzegging dient schriftelijk of via het online dashboard te geschieden vóór de nieuwe factuurdatum.
                    </p>
                    <p className="mt-4">
                        {siteDetails.siteName} behoudt zich daarnaast het recht voor om accounts te allen tijde, en om welke reden dan ook, per direct te beëindigen of op te schorten. Dit kan bijvoorbeeld gebeuren bij een vermoeden van misbruik, maar is niet beperkt tot deze reden.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Betaling</h2>
                    <p>
                        Betaling geschiedt per maand vooruit. Bij niet-tijdige betaling behoudt {siteDetails.siteName} zich het recht voor om de dienstverlening (tijdelijk) op te schorten.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Aansprakelijkheid & Verantwoordelijkheid</h2>
                    <p>
                        {siteDetails.siteName} is niet aansprakelijk voor indirecte schade, gevolgschade of winstderving. Onze maximale aansprakelijkheid is te allen tijde beperkt tot het bedrag van de, voor de desbetreffende dienst, in de maand van de gebeurtenis betaalde abonnementsgelden.
                    </p>
                    <p className="mt-4">
                        Belangrijk: Ons systeem is uitsluitend een hulpmiddel (tool). Als gebruiker blijf je te allen tijde zelf verantwoordelijk en behoud je de volledige controle over de output en acties van de AI. Omdat jij als gebruiker de functies activeert, configureert en goedkeurt, ben je volledig verantwoordelijk voor enig gebruik, incorrect gebruik of schade die voortvloeit uit de inzet van onze systemen.
                    </p>
                    <p className="mt-4">
                        Op al onze aanbiedingen en overeenkomsten zijn de NLdigital Voorwaarden 2020 van toepassing, gedeponeerd bij de Rechtbank Midden-Nederland, locatie Utrecht. In geval van strijdigheid tussen deze algemene voorwaarden en de NLdigital Voorwaarden 2020, prevaleren de bepalingen uit deze algemene voorwaarden.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Uitsluitingen</h2>
                    <p>
                        De verzekering en aansprakelijkheid van {siteDetails.siteName} sluit specifieke activiteiten en situaties uit. De volgende zaken zijn expliciet uitgesloten van dekking en aansprakelijkheid:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Exploitatie van sociale media-websites (websites waar gebruikers inhoud kunnen maken en/of delen).</li>
                        <li>Exploitatie van streamingdiensten (zoals film- en muziekstreaming).</li>
                        <li>Planning, ontwerp, constructie, softwareontwikkeling, productie, levering, of toezicht op machines die het productieproces rechtstreeks regelen (zoals PLC&apos;s) en hun onderdelen.</li>
                        <li>Planning, ontwerp, constructie, softwareontwikkeling, productie, levering, of supervisie van bagageafhandelingssystemen voor luchthavens.</li>
                        <li>Planning, ontwerp, constructie, softwareontwikkeling, productie, levering, of toezicht op medische en laboratoriumtechnologie (zoals besturingssoftware van röntgenapparatuur).</li>
                        <li>Fouten die uitsluitend vallen onder de verantwoordelijkheid van een derde (zoals fabrikant of leverancier) of gebrekkige levering van internet-/telecomdiensten door derden (indien regresrecht is afgestaan).</li>
                        <li>Een inbreuk op intellectuele eigendomsrechten.</li>
                        <li>Een contractuele clausule die de aansprakelijkheid verhoogt (zoals boetes of garanties).</li>
                        <li>Veelbelovende of gegarandeerde resultaten (zoals opbrengsten of winstgevendheid).</li>
                        <li>Financiële diensten (zoals bemiddeling/verkoop van verzekerings- of beleggingsproducten).</li>
                        <li>Organisatie of hosting van prijstrekkingen, loterijen of andere kansspelen.</li>
                        <li>Voorspellingen of berekeningen m.b.t. beloofde coupons, kortingen of prijzen in advertenties.</li>
                        <li>Publicatie van anti-constitutionele (zoals racistische) inhoud.</li>
                        <li>Ongevraagde communicatie gericht aan een consument (spam) via telefoon, e-mail of andere middelen.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Fair Use Policy</h2>
                    <p>
                        Al onze diensten en het gebruik daarvan vallen onder onze Fair Use Policy. Hoewel wij termen als &apos;onbeperkt&apos; hanteren, is dit altijd gebaseerd op normaal, redelijk zakelijk gebruik. Bij excessief gebruik of misbruik behouden wij ons het recht voor om het account direct te beëindigen.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Wijzigingen in Prijzen en Functionaliteit</h2>
                    <p>
                        {siteDetails.siteName} heeft het recht deze voorwaarden te wijzigen. Wijzigingen worden minimaal 30 dagen van tevoren gecommuniceerd.
                    </p>
                    <p className="mt-4">
                        Wij behouden ons tevens het recht voor om onze prijzen, pakketten en de kosten per credit (&quot;credit cost&quot;) te wijzigen. Daarnaast kan de werking van de AI-modellen worden aangepast of geüpdatet om de kwaliteit te waarborgen of te verbeteren. Indien er prijswijzigingen plaatsvinden, zullen wij de gebruiker hierover meerdere keren en ruim van tevoren inlichten, zodat je nooit voor verrassingen komt te staan.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Gratis Testaccount (Free Trial)</h2>
                    <p>
                        Het aanvragen van een gratis testaccount geeft geen automatisch recht op toegang. Wij hanteren een limiet op het aantal beschikbare gratis accounts dat tegelijkertijd actief kan zijn. {siteDetails.siteName} behoudt zich het recht voor om een aanvraag voor een testaccount te weigeren, bijvoorbeeld (maar niet uitsluitend) bij een vermoeden van misbruik, eerdere overtredingen of wanneer de limiet van het aantal testaccounts is bereikt. Er kan geen aanspraak worden gemaakt op compensatie indien een gratis account wordt geweigerd of ingetrokken.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">10. Bedrijfsgegevens</h2>
                    <div className="bg-hero-background p-6 rounded-lg border border-border mt-4">
                        <ul className="space-y-3">
                            <li><strong>Bedrijfsnaam:</strong> {footerDetails.legalName} (h.o.d.n. {siteDetails.siteName})</li>
                            <li><strong>Adres:</strong> {footerDetails.address}</li>
                            <li><strong>KVK:</strong> {footerDetails.kvk}</li>
                            <li><strong>BTW:</strong> {footerDetails.btw}</li>
                            <li><strong>Email:</strong> <a href={`mailto:${footerDetails.email}`} className="text-primary hover:underline">{footerDetails.email}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default TermsPage;
