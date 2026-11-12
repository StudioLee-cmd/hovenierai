// The one pricing and message block of a product page. Its words and numbers are src/data/ezidaPlan.ts, which
// clusters/seo/own_sites.py frame generates from the Ezida plan record; change the record, never this page.
import React from "react";
import { ezidaPlan } from "@/data/ezidaPlan";

const List = ({ title, items }: { title: string; items: readonly string[] }) =>
  items.length ? (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : null;

const EzidaPlanFrame: React.FC = () => (
  <section data-ezida-plan={ezidaPlan.marker} id="pakket" className="py-12 px-4 scroll-mt-20">
    <div className="max-w-4xl mx-auto rounded-3xl border border-gray-200 dark:border-[var(--card-border)] bg-white dark:bg-[var(--card-background)] p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--secondary)] mb-2">{ezidaPlan.name}</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-3">{ezidaPlan.heading}</h2>
      <p className="text-4xl font-bold mb-2">
        €{ezidaPlan.price} <span className="text-base font-normal">{ezidaPlan.period}</span>
      </p>
      <p className="mb-8 text-gray-600 dark:text-[var(--foreground-accent)]">{ezidaPlan.message}</p>
      <div className="grid gap-8 md:grid-cols-3">
        <List title={ezidaPlan.includedTitle} items={ezidaPlan.included} />
        <List title={ezidaPlan.selfTitle} items={ezidaPlan.self} />
        <List title={ezidaPlan.offeredTitle} items={ezidaPlan.offered} />
      </div>
    </div>
  </section>
);

export default EzidaPlanFrame;
