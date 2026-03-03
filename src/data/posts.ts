
export interface IPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML or Markdown string
    date: string;
    authorSlug: string; // Reference to author slug
    image: string;
    tags: string[];
}

export const posts: IPost[] = [
    {
        slug: 'hoe-ai-dakdekkers-helpt',
        title: 'Hoe AI Dakdekkers Helpt Bij Het Besparen Van Tijd (En Waarom Je Concurrentie Al Om Is)',
        excerpt: 'Ontdek hoe kunstmatige intelligentie de dagelijkse taken van dakdekkers kan automatiseren. Van admin tot planning: dit is je nieuwe digitale werkvoorbereider.',
        content: `
            <p>Het runnen van een dakdekkersbedrijf anno 2026 is topsport. Je bent niet alleen vakspecialist die daken waterdicht moet maken, maar je bent ook boekhouder, planner, telefoniste, marketingmanager en klantenservice in één. Veel ondernemers die wij spreken, staan de hele dag op het dak, maar als ze eerlijk kijken, zijn ze s avonds nog uren bezig met randzaken. Ruis in de vorm van eindeloze telefoontjes, appjes, lekkages inplannen en facturen doen.</p>
            
            <h2>De "Oude" Manier vs. De AI Manier</h2>
            <p>Laten we de situatie eens schetsen. <strong>Vroeger</strong> zag je dag er zo uit: Je staat op een dakkapel, brander in je hand. Je telefoon gaat. Je kunt niet opnemen. Later bel je terug: voicemail. 's Avonds kom je thuis, kapot van het sjouwen. Maar in plaats van op de bank te ploffen, moet je offertes maken en facturen sturen. Je weekenden zijn half gevuld met administratie.</p>
            
            <p><strong>Met AI</strong> ziet diezelfde dag er heel anders uit. Je bent aan het branden. De telefoon gaat, maar je werkt rustig door. Waarom? Omdat je weet dat je AI-receptioniste "Sarah" het gesprek aannam. Ze staat de klant vriendelijk te woord en plant direct een afspraak voor de lekkage-inspectie in je agenda. Jij werkt ongestoord door. Aan het einde van de dag zijn je offertes verstuurd. Je komt thuis en je bent... klaar. Echt klaar.</p>
            
            <h2>Wat vervangt dit systeem precies?</h2>
            <p>Veel ondernemers denken dat AI hun vakmanschap wil vervangen. Dat is onzin. Het gaat om het vervangen van het dure, trage kantoorwerk. Onze AI tools vervangen in feite drie partijen:</p>
            <ul>
                <li><strong>De Telefoniste/Planner:</strong> Een kracht op kantoor kost je al snel €35.000 per jaar. Onze Voice AI (onderdeel van het Elite pakket) neemt 24/7 op, plant afspraken, en beantwoordt vragen over voorrijkosten.</li>
                <li><strong>Het Marketingbureau:</strong> Wil je meer renovatieklussen? Vroeger betaalde je een bureau €1.500 per maand. Onze Social Media AI & Tekstschrijver AI regelen je zichtbaarheid. Ze posten je mooiste projecten op Instagram en schrijven blogs.</li>
                <li><strong>De Boekhouder (deels):</strong> Natuurlijk heb je een boekhouder nodig. Maar het dagelijkse werk? Kassa AI koppelt alles aan elkaar. Geen gedoe met bonnetjes meer.</li>
            </ul>
            
            <h2>Waarom het een No-Brainer is voor elke dakdekker</h2>
            <p>De vraag is niet "of" je AI gaat gebruiken, maar "wanneer". Je concurrentie is er waarschijnlijk al mee bezig. Je kunt doorgaan met alles zelf doen en jezelf uitputten. Of je kiest voor slim ondernemen.</p>
            
            <p>Je huurt voor een fractie van de prijs van één medewerker een compleet team aan virtuele assistenten in. Een systeem dat nooit slaapt, nooit zeurt en altijd levert. Onze <strong>Managed Service</strong> optie betekent zelfs dat wij alles voor je instellen. Jij hoeft alleen maar het dak op.</p>
        `,
        date: '2025-12-15',
        authorSlug: 'tim-van-der-lee',
        image: '/images/benefits/workflow-ai.png',
        tags: ['AI', 'Efficiëntie', 'Automatisering']
    },
    {
        slug: 'meer-klussen-met-ai',
        title: 'Krijg Automatisch Meer Google Reviews (En domineer jouw regio)',
        excerpt: 'Reviews zijn goud waard voor een dakdekker. Maar erom vragen wordt vaak vergeten. Laat onze AI dit volledig overnemen en zie je Google ranking exploderen.',
        content: `
            <p>Als je zelf een aannemer zoekt, wat doe je dan? Precies: je kijkt op Google en checkt de sterren. Heeft een dakdekker 3,4 sterren? Dan scroll je door. Heeft hij 4,9 sterren met 200 reviews? Dan bel je hem.</p>
            <p>Voor jouw bedrijf werkt het precies hetzelfde. Google Reviews zijn de levensader. Heb je minder dan 20 reviews? Dan besta je in de ogen van de moderne klant eigenlijk niet.</p>
            
            <h2>Het Probleem: Vragen wordt vergeten</h2>
            <p>Je hebt een prachtig nieuw dak opgeleverd, de klant is blij. Dit is hét moment voor een review. Maar ja, je bent je spullen aan het inladen, denkt al aan de volgende klus, en vergeet het te vragen.</p>
            <p>Of je stuurt 's avonds een factuur, maar de klant vergeet de review. Het resultaat? Je levert topkwaliteit, maar online ziet niemand dat.</p>
            
            <h2>De Oplossing: Volledige Automatisering</h2>
            <p>Onze Reputatie Manager AI lost dit op. Direct na oplevering (gekoppeld aan je facturatie) krijgt de klant een berichtje. Geen standaard mailtje, maar een persoonlijk Whatsappje. <em>"Hoi [Naam], fijn dat het dak weer dicht is! Ik hoop dat je tevreden bent."</em></p>
            
            <h3>De "Review Firewall": Je geheime wapen</h3>
            <p>Wij sturen de klant niet direct naar Google. We vragen eerst: "Ben je tevreden?"</p>
            <ul>
                <li><strong>Blij? (Duim omhoog)</strong> -> Super! Dan stuurt de AI de link naar Google. De klant klikt en klaar.</li>
                <li><strong>Niet blij? (Duim omlaag)</strong> -> Ai. Maar in plaats van een slechte Google review, opent er een feedback formulier dat <strong>rechtstreeks naar jou</strong> gaat.</li>
            </ul>
            <p>Snap je de kracht hiervan? Je vangt de ontevreden klanten af vòòrdat ze online klagen. Je kunt het netjes oplossen en ze alsnog blij maken.</p>
            
            <p>Meer reviews = Hoger in Google = Meer nieuwe klussen. Het is een vliegwiel.</p>
        `,
        date: '2025-12-20',
        authorSlug: 'tim-van-der-lee',
        image: '/images/benefits/reputatie-manager.png',
        tags: ['Marketing', 'Reviews', 'Groei']
    },
    {
        slug: 'ai-telefoniste-voor-dakdekkers',
        title: 'Het Einde van de "Telefoon Op Het Dak": 24/7 Bereikbaar Zonder Personeel',
        excerpt: 'Mis nooit meer een klus omdat je op het dak staat. Onze Voice AI neemt op, plant inspecties en beantwoordt vragen.',
        content: `
            <p>Het meest frustrerende moment voor een dakdekker? Je staat net met een rol bitumen in je handen, en de telefoon gaat. Je kunt niet opnemen. Je laat hem gaan.</p>
            <p>Wat doet die klant met lekkage? Belt hij later terug? Vaak niet. Hij belt de volgende dakdekker in de lijst. Weg klant. Weg omzet.</p>
            
            <h2>Voice AI: Je nieuwe planner die nooit pauze heeft</h2>
            <p>Onze Voice AI is geen bandje met een keuzemenu. Dit is een geavanceerde AI (laten we haar Sarah noemen) die praat als een mens. Ze is vriendelijk, professioneel en ze weet alles van je bedrijf.</p>
            
            <h3>Wat ze voor je doet:</h3>
            <ul>
                <li><strong>24/7 Opnemen:</strong> Ook als jij vrij bent, op het dak staat of slaapt.</li>
                <li><strong>Agendabeheer:</strong> Sarah heeft toegang tot je agenda. Belt een klant voor een inspectie? Sarah kijkt wanneer je in de buurt bent en zet de afspraak erin.</li>
                <li><strong>Vragen beantwoorden:</strong> "Wat zijn de voorrijkosten?" Sarah geeft netjes antwoord.</li>
            </ul>
            
            <h2>Het bespaart je niet alleen stress, het levert geld op</h2>
            <p>Reken even mee. Stel je mist 3 oproepen per week. Dat zijn ~150 potentiële klussen per jaar. Als een gemiddelde klus €500 winst is, gooi je dus €75.000 per jaar weg door niet op te nemen.</p>
            <p>Een eigen telefoniste kost €30.000+ per jaar. Onze Voice AI kost een fractie daarvan. En: je klanten vinden het fantastisch dat ze direct geholpen worden bij lekkage.</p>
        `,
        date: '2026-01-02',
        authorSlug: 'tim-van-der-lee',
        image: '/images/benefits/voice-ai.png',
        tags: ['Voice AI', 'Innovatie', 'Ondernemen']
    },
    {
        slug: 'social-media-voor-dakdekkers',
        title: 'Social Media voor Dakdekkers die een Hekel hebben aan Social Media (De "Luie Methode")',
        excerpt: 'Geen dansjes op TikTok. Gewoon je vakmanschap tonen. Met onze AI bouw je een portfolio op Instagram in 5 seconden per week.',
        content: `
            <p>Ik hoor het je denken: "Social Media? Daar heb ik toch geen tijd voor? Ik ben dakdekker, geen influencer!" En je hebt gelijk.</p>
            <p>Maar: Social Media is jouw visitekaartje. Mensen willen zien wat je kunt. Een Instagram-feed vol met strakke zinkwerken en nieuwe daken straalt <strong>Vakmanschap</strong> uit.</p>
            
            <h2>De 5-Seconden Workflow</h2>
            <p>Wij hebben het proces gestript tot de essentie. Het kost je letterlijk 5 seconden na een klus.</p>
            <ul>
                <li><strong>Stap 1:</strong> Je hebt een mooi dak opgeleverd. Je pakt je telefoon.</li>
                <li><strong>Stap 2:</strong> Je maakt twee foto's (voor en na).</li>
                <li><strong>Stap 3:</strong> Je appt ze naar je AI-assistent. <strong>Klaar.</strong></li>
            </ul>
            
            <h2>Wat onze AI vervolgens doet</h2>
            <p>De AI "bekijkt" jouw foto. Hij herkent wat het is: "Hé, dit is een nieuw plat dak met EPDM."</p>
            <p>Vervolgens schrijft de AI <strong>zelf</strong> een leuke, wervende tekst. <em>"Weer een strak staaltje werk afgeleverd in [Plaatsnaam]! Dit platte dak is weer voorzien van topkwaliteit EPDM en kan er weer jaren tegenaan. Ook lekkage? Bel ons!"</em></p>
            
            <p>Hij voegt automatisch de juiste hashtags toe (#dakdekker #epdm #vakmanschap). Hij kiest het beste moment om te posten. En hij plaatst het op Instagram en Facebook. Jij hoeft niets te doen.</p>
        `,
        date: '2026-01-15',
        authorSlug: 'tim-van-der-lee',
        image: '/images/benefits/social-media-planner.png',
        tags: ['Social Media', 'Branding', 'Automatisering']
    },
    {
        slug: 'dakdekker-ai-vs-personeel',
        title: 'Dakdekker AI vs. Kantoorpersoneel: Waarom meer betalen als het minder oplevert?',
        excerpt: 'Waarom zou je €3000 per maand betalen aan personeel als AI het beter kan voor een fractie van de prijs?',
        content: `
            <p>Als je als dakdekker wilt groeien, heb je ondersteuning nodig. Vaak neem je dan iemand aan voor op kantoor. Dure contracten, ziekteverzuim, gedoe.</p>
            <p>Maar laten we eerlijk zijn: is dat nodig? Met Dakdekker AI kan dit anders.</p>
            
            <h2>De Vergelijking</h2>
            <p>Waarom zou je teveel betalen?</p>
            <ul>
                <li><strong>Snelheid:</strong> Personeel is niet altijd bereikbaar. AI is direct. Heb je stormschade meldingen? De AI verwerkt ze direct, 24/7.</li>
                <li><strong>Kosten:</strong> Voor personeel betaal je salaris, pensioen, werkplek. Bij Dakdekker AI betaal je voor resultaat. Onze <strong>Elite Managed Service</strong> is goedkoper dan een parttime kracht.</li>
                <li><strong>Schaalbaarheid:</strong> Bij stormdrukte kan één persoon het niet aan. De AI schaalt oneindig mee.</li>
            </ul>
            
            <p>Met Managed Service combineren we het beste van twee werelden: de snelheid van AI, maar beheerd door onze experts. Wij stellen alles in, jij gaat het dak op.</p>
        `,
        date: '2026-01-25',
        authorSlug: 'tim-van-der-lee',
        image: '/images/benefits/managed-service.png',
        tags: ['Managed Service', 'Kostenbesparing', 'Strategie']
    },
    {
        slug: 'elite-dakdekker-app',
        title: 'De Elite Dakdekker App: Geef je klanten hun eigen "Klus App"',
        excerpt: 'Onderscheid jezelf. Met de Client App in het Elite plan kunnen jouw vaste klanten (VvE\'s, woningbouw) zelf meldingen doen en status inzien.',
        content: `
            <p>Gemak is key. Waarom bestellen we bij Coolblue? Gemak. Waarom zou een VvE of vastgoedbeheerder jou bellen? Omdat het makkelijk is.</p>
            
            <h2>De Revolutie: Jouw Eigen Bedrijfs App</h2>
            <p>Stel je voor dat jouw klanten een app op hun telefoon hebben met JOUW logo. Geen onhandige portalen, maar echt JOUW app.</p>
            
            <h3>Wat zit erin?</h3>
            <ul>
                <li><strong>Meldingen:</strong> Direct lekkage melden met foto.</li>
                <li><strong>Status:</strong> Zien wanneer je langskomt.</li>
                <li><strong>Historie:</strong> Alle facturen en werkbonnen op één plek.</li>
            </ul>
            
            <p>Dit zorgt voor klantbinding (lock-in). Een beheerder met jouw app gaat niet snel naar een andere dakdekker. Je bent onderdeel van hun beheer geworden.</p>
            
            <p>Deze app is exclusief onderdeel van ons Elite Plan. Wij bouwen hem voor je, in jouw huisstijl.</p>
        `,
        date: '2026-02-01',
        authorSlug: 'tim-van-der-lee',
        image: '/images/benefits/websites-funnels.png',
        tags: ['Elite Plan', 'Client App', 'Innovatie']
    }
];
