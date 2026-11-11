import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface IPost {
    slug: string;
    title: string;
    seoTitle?: string;
    excerpt: string;
    content: string;
    date: string;
    authorSlug: string;
    image: string;
    tags: string[];
    cluster: string;
}

export function getAllPosts(): IPost[] {
    if (!fs.existsSync(postsDirectory)) return [];

    const filenames = fs.readdirSync(postsDirectory)
        .filter(f => f.endsWith('.md') && !f.startsWith('._'));

    const posts = filenames.map((filename) => {
        const slug = filename.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || '',
            seoTitle: data.seoTitle || '',
            excerpt: data.excerpt || '',
            content,
            date: data.date || '',
            authorSlug: data.authorSlug || 'tim-van-der-lee',
            image: data.image || '',
            tags: data.tags || [],
            cluster: data.cluster || '',
        } as IPost;
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): IPost | null {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || '',
        seoTitle: data.seoTitle || '',
        excerpt: data.excerpt || '',
        content,
        date: data.date || '',
        authorSlug: data.authorSlug || 'tim-van-der-lee',
        image: data.image || '',
        tags: data.tags || [],
        cluster: data.cluster || '',
    };
}

export async function getPostHtml(slug: string): Promise<string> {
    const post = getPostBySlug(slug);
    if (!post) return '';
    return await marked.parse(post.content);
}

const GENERIC_TAGS = new Set(['hovenier', 'hoveniers']);

/**
 * The articles shown under a post as "Verder lezen": same cluster only.
 * The two cluster neighbours by date come first (so every article in a cluster is linked from at least two siblings),
 * then the siblings sharing the most tags, nearest in date. Deterministic: the same posts give the same links.
 */
export function getRelatedPosts(slug: string, count = 4): IPost[] {
    const all = getAllPosts();
    const post = all.find((p) => p.slug === slug);
    if (!post || !post.cluster) return [];
    const siblings = all.filter((p) => p.cluster === post.cluster);
    if (siblings.length < 2) return [];
    const i = siblings.findIndex((p) => p.slug === slug);
    const picked: IPost[] = [];
    for (const p of [siblings[(i - 1 + siblings.length) % siblings.length], siblings[(i + 1) % siblings.length]]) {
        if (p.slug !== slug && !picked.some((q) => q.slug === p.slug)) picked.push(p);
    }
    const tags = new Set(post.tags.map((t) => t.toLowerCase()).filter((t) => !GENERIC_TAGS.has(t)));
    const shared = (p: IPost) => p.tags.filter((t) => tags.has(t.toLowerCase())).length;
    const distance = (p: IPost) => Math.abs(new Date(p.date).getTime() - new Date(post.date).getTime());
    const rest = siblings
        .filter((p) => p.slug !== slug && !picked.some((q) => q.slug === p.slug))
        .sort((a, b) => shared(b) - shared(a) || distance(a) - distance(b) || a.slug.localeCompare(b.slug));
    return picked.concat(rest).slice(0, count);
}
