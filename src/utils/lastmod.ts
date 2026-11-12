import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execFileSync } from 'child_process';
import matter from 'gray-matter';
import record from '@/data/lastmod.json';

// Northstar own-site template (clusters/seo/own-sites/template): an article's last change, never the build time.
// The newest of: its publication date, its own updated/modified frontmatter, and its last content commit. That commit
// date is kept in src/data/lastmod.json (written by clusters/seo/own_sites.py apply-fixes from the repository
// history, with the file's sha256); a file changed after that record is dated by its own last commit when the build
// has the history, and never earlier than the recorded date.
type Entry = { lastmod: string; sha256: string };
const RECORDED = record as Record<string, Entry>;

function valid(value: unknown): Date | null {
    if (!value) return null;
    const d = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(d.getTime()) ? null : d;
}

function lastCommit(file: string): string | null {
    try {
        return execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || null;
    } catch {
        return null;
    }
}

export function postLastmod(post: { slug: string; date: string }): Date {
    const dates: unknown[] = [post.date];
    const entry = RECORDED[post.slug];
    if (entry) dates.push(entry.lastmod);
    const file = path.join(process.cwd(), 'posts', `${post.slug}.md`);
    try {
        const raw = fs.readFileSync(file);
        const { data } = matter(raw.toString('utf8'));
        dates.push(data.updated, data.modified, data.dateModified, data.lastmod);
        if (!entry || entry.sha256 !== crypto.createHash('sha256').update(raw).digest('hex')) dates.push(lastCommit(file));
    } catch {
        // no readable file: the recorded and publication dates stand
    }
    const found = dates.map(valid).filter((d): d is Date => d !== null);
    return found.length ? new Date(Math.max(...found.map((d) => d.getTime()))) : new Date(post.date);
}
