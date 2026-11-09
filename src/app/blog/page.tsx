import { Suspense } from "react";
import { allBlogs } from "contentlayer/generated";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { generatePageMetadata } from "../seo";
import { ENV } from "@/lib/env";

export const metadata = generatePageMetadata({
  title: "Blog",
  description: "Notes on infrastructure, DevOps, Go and local LLMs.",
});

const isProd = ENV.NODE_ENV === "production";

export default function Blog() {
  // Solo los campos que usa la lista: nunca el cuerpo MDX completo.
  const posts = allBlogs
    .filter((blog) => !isProd || !blog.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map(({ slug, title, summary, publishedAt, readingTime, icon, tags }) => ({
      slug,
      title,
      summary,
      publishedAt,
      readingTime,
      icon,
      tags,
    }));

  return (
    <section className="min-h-[calc(100vh-300px)]">
      {/* useSearchParams exige Suspense en un export estático. */}
      <Suspense>
        <BlogExplorer posts={posts} />
      </Suspense>
    </section>
  );
}
