import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface IPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    authorSlug: string;
    image: string;
    tags: string[];
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
            excerpt: data.excerpt || '',
            content,
            date: data.date || '',
            authorSlug: data.authorSlug || 'tim-van-der-lee',
            image: data.image || '',
            tags: data.tags || [],
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
        excerpt: data.excerpt || '',
        content,
        date: data.date || '',
        authorSlug: data.authorSlug || 'tim-van-der-lee',
        image: data.image || '',
        tags: data.tags || [],
    };
}

export async function getPostHtml(slug: string): Promise<string> {
    const post = getPostBySlug(slug);
    if (!post) return '';
    return await marked.parse(post.content);
}
