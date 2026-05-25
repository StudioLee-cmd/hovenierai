import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRight, BsCalendar3 } from "react-icons/bs";
import { getAllPosts } from "@/utils/posts";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const months = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getSupportImage(heroImage: string): string {
  const lastDot = heroImage.lastIndexOf(".");
  if (lastDot === -1) return heroImage + "-2";
  return heroImage.substring(0, lastDot) + "-2" + heroImage.substring(lastDot);
}

export default function HomeLatestBlogs() {
  const allPosts = getAllPosts();
  const latest = allPosts
    .filter((p) => p.date && p.title)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Kennisbank
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Recent op onze blog
            </h2>
            <p className="text-foreground-accent max-w-xl">
              Tips, casestudies en strategieen voor hoveniers die meer
              opdrachten en minder gedoe willen.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-xl font-semibold hover:bg-primary-accent transition-all self-start md:self-auto"
          >
            Alle artikelen <BsArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((post) => {
            const hero = post.image || "/images/blog/placeholder.jpg";
            const supp = getSupportImage(hero);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-[var(--card-border)] rounded-2xl bg-[var(--card-background)] overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={hero}
                    alt={post.title}
                    fill
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <Image
                    src={supp}
                    alt={post.title}
                    fill
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-foreground-accent mb-3">
                    <BsCalendar3 size={12} />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-foreground-accent text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold">
                    Lees verder <BsArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
