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

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Betaling & Incasso</h2>
                    <p>
                        Betaling geschiedt per maand vooruit. Facturen dienen binnen 30 dagen na factuurdatum te worden voldaan.
                    </p>
                    <p className="mt-4">
                        Bij niet-tijdige betaling is de opdrachtgever van rechtswege in verzuim, zonder dat een nadere ingebrekestelling is vereist. Vanaf het moment van verzuim is de opdrachtgever de wettelijke handelsrente verschuldigd over het openstaande bedrag.
                    </p>
                    <p className="mt-4">
                        Alle redelijke kosten ter verkrijging van voldoening buiten rechte — waaronder buitengerechtelijke incassokosten — komen voor rekening van de opdrachtgever, met een minimum van € 150,-.
                    </p>
                    <p className="mt-4">
                        Bij niet-tijdige betaling behoudt {siteDetails.siteName} zich daarnaast het recht voor om de dienstverlening (tijdelijk) op te schorten totdat alle openstaande facturen zijn voldaan.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Aansprakelijkheid & Verantwoordelijkheid</h2>
                    <p>
                        {siteDetails.siteName} is niet aansprakelijk voor indirecte schade, gevolgschade of winstderving. Onze maximale aansprakelijkheid is te allen tijde beperkt tot het bedrag van de, voor de desbetreffende dienst, in de maand van de gebeurtenis betaalde abonnementsgelden.
                    </p>
                    <p className="mt-4">
                        <strong>Belangrijk:</strong> Ons systeem is uitsluitend een hulpmiddel (tool). Als gebruiker blijf je te allen tijde zelf verantwoordelijk en behoud je de volledige controle over de output en acties van de AI. Omdat jij als gebruiker de functies activeert, configureert en goedkeurt, ben je volledig verantwoordelijk voor enig gebruik, incorrect gebruik of schade die voortvloeit uit de inzet van onze systemen.
                    </p>
                    <p className="mt-4">
                        Op al onze aanbiedingen en overeenkomsten zijn de <strong>NLdigital Voorwaarden 2020</strong> van toepassing, gedeponeerd bij de Rechtbank Midden-Nederland, locatie Utrecht. In geval van strijdigheid tussen deze algemene voorwaarden en de NLdigital Voorwaarden 2020, prevaleren de bepalingen uit deze algemene voorwaarden.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Uitsluitingen</h2>
                    <p>
                        De verzekering en aansprakelijkheid van {siteDetails.siteName} sluit specifieke activiteiten en situaties uit. De volgende zaken zijn expliciet <strong>uitgesloten</strong> van dekking en aansprakelijkheid:
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

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Domeinnamen & Hosting</h2>
                    <p>
                        Indien {siteDetails.siteName} namens de opdrachtgever een domeinnaam registreert of beheert, geschiedt dit te allen tijde ten behoeve van de opdrachtgever. Het eigendom van de domeinnaam berust bij de opdrachtgever, ongeacht op wiens naam de registratie technisch is gesteld.
                    </p>
                    <p className="mt-4">
                        Bij beëindiging van de overeenkomst wordt de domeinnaam kosteloos overgedragen aan de opdrachtgever, mits alle openstaande facturen zijn voldaan. De opdrachtgever is zelf verantwoordelijk voor de tijdige verlenging van de domeinnaam na overdracht.
                    </p>
                    <p className="mt-4">
                        Indien {siteDetails.siteName} hostingdiensten levert of beheert ten behoeve van de opdrachtgever, geldt dat alle door de opdrachtgever aangeleverde content en data eigendom blijven van de opdrachtgever. Bij beëindiging van de overeenkomst zal {siteDetails.siteName} de opdrachtgever gedurende 30 dagen in de gelegenheid stellen om een back-up van de data te verkrijgen.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Intellectueel Eigendom & Maatwerk</h2>
                    <p>
                        Alle door {siteDetails.siteName} in opdracht van de opdrachtgever ontwikkelde werken — waaronder websites, automatiseringen, workflows, content en overige op maat gemaakte oplossingen — worden na volledige betaling eigendom van de opdrachtgever. De opdrachtgever is vrij om deze werken naar eigen inzicht te gebruiken, aan te passen of over te dragen aan derden.
                    </p>
                    <p className="mt-4">
                        Het voorgaande geldt niet voor door {siteDetails.siteName} voorafgaand aan of onafhankelijk van de opdracht ontwikkelde software, templates, tooling en systemen. Hierop behoudt {siteDetails.siteName} alle intellectuele eigendomsrechten. De opdrachtgever verkrijgt hierop een niet-exclusief gebruiksrecht voor de duur van de overeenkomst.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Meerwerk</h2>
                    <p>
                        Werkzaamheden die buiten de oorspronkelijk overeengekomen scope vallen, worden beschouwd als meerwerk. {siteDetails.siteName} zal de opdrachtgever hierover vooraf informeren en een aanvullende offerte uitbrengen. Meerwerk wordt pas uitgevoerd na schriftelijke of digitale goedkeuring door de opdrachtgever.
                    </p>
                    <p className="mt-4">
                        Indien de opdrachtgever mondeling of via digitale communicatie (zoals e-mail, WhatsApp of chat) instemt met aanvullende werkzaamheden, geldt dit als goedkeuring voor het meerwerk.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">10. Overmacht</h2>
                    <p>
                        {siteDetails.siteName} is niet gehouden tot het nakomen van enige verplichting indien zij daartoe gehinderd wordt als gevolg van overmacht. Onder overmacht wordt in ieder geval verstaan:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Storingen of uitval van door {siteDetails.siteName} gebruikte derde diensten, platforms of API&apos;s (waaronder maar niet beperkt tot AI-modellen, hostingproviders, telecomoperators en software van derden).</li>
                        <li>Wijzigingen in de werking, beschikbaarheid of output van AI-modellen door de betreffende leverancier.</li>
                        <li>Storingen in de internetverbinding of telecommunicatie-infrastructuur.</li>
                        <li>Overheidsmaatregelen, natuurrampen, pandemieën of andere omstandigheden buiten de invloedssfeer van {siteDetails.siteName}.</li>
                    </ul>
                    <p className="mt-4">
                        Indien de overmachtsituatie langer dan 30 dagen voortduurt, hebben beide partijen het recht de overeenkomst schriftelijk te ontbinden, zonder verplichting tot schadevergoeding.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">11. Geheimhouding</h2>
                    <p>
                        Beide partijen zijn verplicht tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van de overeenkomst van elkaar of uit andere bron hebben verkregen. Informatie geldt als vertrouwelijk als dit door de andere partij is medegedeeld of als dit redelijkerwijs voortvloeit uit de aard van de informatie.
                    </p>
                    <p className="mt-4">
                        {siteDetails.siteName} zal vertrouwelijke bedrijfsinformatie, inloggegevens, data en accounts van de opdrachtgever uitsluitend gebruiken voor de uitvoering van de overeenkomst. De opdrachtgever zal vertrouwelijke informatie over de werkwijze, systemen en methoden van {siteDetails.siteName} niet zonder voorafgaande schriftelijke toestemming delen met derden.
                    </p>
                    <p className="mt-4">
                        De geheimhoudingsplicht blijft ook na beëindiging van de overeenkomst van kracht.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">12. Fair Use Policy</h2>
                    <p>
                        Al onze diensten en het gebruik daarvan vallen onder onze Fair Use Policy. Hoewel wij termen als &apos;onbeperkt&apos; hanteren, is dit altijd gebaseerd op normaal, redelijk zakelijk gebruik. Bij excessief gebruik of misbruik behouden wij ons het recht voor om het account direct te beëindigen.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">13. Wijzigingen in Prijzen en Functionaliteit</h2>
                    <p>
                        {siteDetails.siteName} heeft het recht deze voorwaarden te wijzigen. Wijzigingen worden minimaal 30 dagen van tevoren gecommuniceerd.
                    </p>
                    <p className="mt-4">
                        Wij behouden ons tevens het recht voor om onze prijzen, pakketten en de kosten per credit (&quot;credit cost&quot;) te wijzigen. Daarnaast kan de werking van de AI-modellen worden aangepast of geüpdatet om de kwaliteit te waarborgen of te verbeteren. Indien er prijswijzigingen plaatsvinden, zullen wij de gebruiker hierover meerdere keren en ruim van tevoren inlichten, zodat je nooit voor verrassingen komt te staan.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">14. Gratis Testaccount (Free Trial)</h2>
                    <p>
                        Het aanvragen van een gratis testaccount geeft geen automatisch recht op toegang. Wij hanteren een limiet op het aantal beschikbare gratis accounts dat tegelijkertijd actief kan zijn. {siteDetails.siteName} behoudt zich het recht voor om een aanvraag voor een testaccount te weigeren, bijvoorbeeld (maar niet uitsluitend) bij een vermoeden van misbruik, eerdere overtredingen of wanneer de limiet van het aantal testaccounts is bereikt. Er kan geen aanspraak worden gemaakt op compensatie indien een gratis account wordt geweigerd of ingetrokken.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">15. Bedrijfsgegevens</h2>
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
