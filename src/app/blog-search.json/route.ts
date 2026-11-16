import { getAllPosts } from "@/utils/posts";
import { searchEntry } from "@/utils/blogSearch";

// Made once at build time from the posts: the blog index's search reads this file, nothing else is asked.
export const dynamic = "force-static";

export function GET() {
    return Response.json(getAllPosts().map(searchEntry));
}
