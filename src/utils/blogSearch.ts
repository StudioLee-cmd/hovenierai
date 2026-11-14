// The blog search of every own site (shared template, clusters/seo/own-sites in StudioLee Northstar).
// The index is made once at build time from the posts (src/app/blog-search.json/route.ts); the blog index page
// fetches it on first use and searches it in the browser. No service, no third party.

export interface SearchEntry {
    slug: string;
    title: string;
    excerpt: string;
    tags: string[];
    headings: string[];
    date: string;
}

interface PostLike {
    slug: string;
    title: string;
    excerpt?: string;
    tags?: unknown;
    cluster?: string;
    content?: string;
    date?: string;
}

function plain(text: string): string {
    return text
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/[*_`#>]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

export function headingsOf(markdown: string): string[] {
    const found: string[] = [];
    for (const line of markdown.split("\n")) {
        const m = /^#{2,4}\s+(.+?)\s*#*\s*$/.exec(line);
        if (m) {
            const text = plain(m[1]);
            if (text && !found.includes(text)) found.push(text);
        }
    }
    return found;
}

export function searchEntry(post: PostLike): SearchEntry {
    const tags = Array.isArray(post.tags) ? post.tags.map(String) : typeof post.tags === "string" ? [post.tags] : [];
    if (post.cluster) tags.push(post.cluster.replace(/-/g, " "));
    return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "",
        tags,
        headings: headingsOf(post.content || ""),
        date: post.date || "",
    };
}

export function normalize(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function weigh(field: string, term: string, word: number, part: number): number {
    if (!field.includes(term)) return 0;
    return (" " + field).includes(" " + term) ? word : part;
}

// Every word of the query has to occur in the article (title, tags, headings or excerpt); the title weighs most.
export function search(entries: SearchEntry[], query: string): SearchEntry[] {
    const terms = normalize(query).split(" ").filter(Boolean);
    if (!terms.length) return [];
    const phrase = terms.join(" ");
    const scored: [number, SearchEntry][] = [];
    for (const entry of entries) {
        const title = normalize(entry.title);
        const tags = normalize(entry.tags.join(" "));
        const headings = normalize(entry.headings.join(" "));
        const excerpt = normalize(entry.excerpt);
        const slug = normalize(entry.slug);
        let score = 0;
        let all = true;
        for (const term of terms) {
            const s = weigh(title, term, 10, 6) + weigh(tags, term, 5, 3) + weigh(headings, term, 3, 2) + weigh(excerpt, term, 2, 1) + weigh(slug, term, 1, 1);
            if (!s) { all = false; break; }
            score += s;
        }
        if (!all) continue;
        if (terms.length > 1 && title.includes(phrase)) score += 8;
        scored.push([score, entry]);
    }
    return scored.sort((a, b) => b[0] - a[0] || b[1].date.localeCompare(a[1].date)).map(([, entry]) => entry);
}
