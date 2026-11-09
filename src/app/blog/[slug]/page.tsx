import type { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import { siteMetadata } from "@/data/siteMetadata";
import NotFound from "@/app/not-found";
import { formatDate } from "@/lib/utils";
import { BlogIcon, BlogTags } from "@/components/blog/blog-icon";

// En producción, los borradores no generan página: no quedan accesibles por URL.
export const generateStaticParams = async () =>
  allBlogs
    .filter((blog) => process.env.NODE_ENV !== "production" || !blog.draft)
    .map((blog) => ({ slug: blog._raw.flattenedPath }));

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  if (!blog) {
    return;
  }

  const ogImage = `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`;

  return {
    title: blog.title,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: blog.publishedAt,
      url: `${siteMetadata.siteUrl}/blog/${blog.slug}/`,
      authors: siteMetadata.author,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: [ogImage],
    },
  };
}

export default async function Blog(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);

  if (!blog) {
    return <NotFound />;
  }

  return (
    <section>
      <div className="flex items-start gap-4">
        <BlogIcon name={blog.icon} />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tighter">
            <Balancer>{blog.title}</Balancer>
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(blog.publishedAt)} - {blog.readingTime.text}
          </p>
        </div>
      </div>
      <BlogTags tags={blog.tags} className="mb-8 mt-4" />
      <Mdx code={blog.body.code} />
    </section>
  );
}
