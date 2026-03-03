import React from "react";
import Container from "@/components/Container";
import { footerDetails } from "@/data/footer";

const LegalPage: React.FC = () => {
    return (
        <Container>
            <div className="py-20 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Bedrijfsgegevens (Legal)</h1>
                <div className="prose prose-lg text-foreground-accent">
                    <p className="mb-4">
                        Hieronder vind je de officiële bedrijfsgegevens van KapperAI.
                    </p>

                    <div className="bg-hero-background p-6 rounded-lg border border-border">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">Contact & Identiteit</h2>
                        <ul className="space-y-3">
                            <li><strong>Bedrijfsnaam:</strong> {footerDetails.legalName} (h.o.d.n. KapperAI)</li>
                            <li><strong>Adres:</strong> {footerDetails.address}</li>
                            <li><strong>KVK (KvK):</strong> {footerDetails.kvk}</li>
                            <li><strong>BTW (VAT):</strong> {footerDetails.btw}</li>
                            <li><strong>Email:</strong> <a href={`mailto:${footerDetails.email}`} className="text-primary hover:underline">{footerDetails.email}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default LegalPage;
