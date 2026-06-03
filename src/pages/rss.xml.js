import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context, type) {
  const posts = await getCollection(type);
  return rss({
    title: "BLOG",
    description: "VERY COOL",
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/${type}/${post.id}/`,
    })),
  });
}
