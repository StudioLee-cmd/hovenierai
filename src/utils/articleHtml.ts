// Northstar own-site template (clusters/seo/own-sites/template): wide body elements scroll inside the article on a
// phone. The article's markdown is untouched; only its rendered HTML gets a scrolling wrapper around each table and
// code block.
const WRAP_OPEN = '<div class="article-scroll" data-article-scroll style="overflow-x:auto;max-width:100%;-webkit-overflow-scrolling:touch">';

export function scrollableWide(html: string): string {
    return html
        .replace(/<table[\s>][\s\S]*?<\/table>/g, (table) => `${WRAP_OPEN}${table}</div>`)
        .replace(/<pre(?=[\s>])/g, '<pre style="overflow-x:auto;max-width:100%"');
}
