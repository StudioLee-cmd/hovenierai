// ⛔ BOUWSTEEN 6 VAN HET BOODSCHAP-FRAME — de garantie beantwoordt WAT ALS HET NIET WERKT, verder niets.
// Volle wet: niche-sites-upgrade-programma.md §HET BOODSCHAP-FRAME (28-07). De risico-omkering zelf is
// precies goed (sales-lessons Les 6) en blijft ongewijzigd; de SLOTZIN eronder viel op toon-regel 5:
// "Jij hebt niets te verliezen, behalve je huidige chaos" zegt tegen de ondernemer die we willen
// spreken dat z'n zaak een chaos is. Gemeten 28-07 op 14 van de 14 live sites. Een garantie hoeft de
// lezer niet te beledigen om te werken: het bedrag terug is het argument.

import React from 'react';
import { BsShieldCheck } from 'react-icons/bs';

const GuaranteeSection: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto mt-16 text-center">
            <div className="bg-gradient-to-br from-green-900/80 to-emerald-900/80 border border-green-500/30 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <BsShieldCheck size={150} className="text-green-400" />
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-green-100 mb-6 relative z-10 flex items-center justify-center gap-3">
                    <BsShieldCheck className="text-green-400" />
                    De "Groei-of-Geld-Terug" Garantie
                </h3>

                <p className="text-green-200 font-medium mb-8 max-w-2xl mx-auto relative z-10">
                    Geldig vanaf Managed Groei Pro. Word je binnen 6 maanden niet beter zichtbaar dan bij de start, dan krijg je je geld terug. Je zit nergens aan vast: maandelijks opzegbaar.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left relative z-10">
                    <div className="bg-green-800/40 p-6 rounded-xl border border-green-600/30 backdrop-blur-sm">
                        <h4 className="font-bold text-green-100 mb-2">De Harde Garantie</h4>
                        <p className="text-green-200 text-sm">
                            Vóór de eerste werkdag leggen we vast waar je staat, zichtbaar in je dashboard. Daar meten we achteraf tegen, zodat je startpunt niet ter discussie staat.
                        </p>
                    </div>

                    <div className="bg-green-800/40 p-6 rounded-xl border border-green-600/30 backdrop-blur-sm">
                        <h4 className="font-bold text-green-100 mb-2">Resultaat of Refund</h4>
                        <ul className="text-green-200 text-sm space-y-2 list-disc list-inside">
                            <li><strong>SEO:</strong> geen groei in je zichtbaarheid in Ahrefs? Geld terug.</li>
                            <li><strong>Video en advertenties:</strong> geen groei in views? Geld terug.</li>
                            <li><strong>Wat er buiten valt:</strong> klikken, aanvragen en omzet. Die hangen aan je eigen aanbod en je prijzen.</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 text-green-300 text-sm italic relative z-10 font-medium">
                    "Word je wel beter zichtbaar maar belt er niemand, dan kijken we samen naar je aanbod."
                </div>
            </div>
        </div>
    );
};

export default GuaranteeSection;

