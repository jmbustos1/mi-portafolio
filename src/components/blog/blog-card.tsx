import { formatDate } from "@/lib/utils";
import { Blog } from "contentlayer/generated";
import { BlogIcon, BlogTags } from "./blog-icon";

type BlogCardProps = Pick<
  Blog,
  "readingTime" | "slug" | "title" | "summary" | "publishedAt" | "icon" | "tags"
>;

export function BlogCard({ blog }: { blog: BlogCardProps }) {
  return (
    <article className="group/card flex cursor-pointer gap-4 rounded-lg px-1 py-4 transition hover:bg-zinc-50 sm:px-4 hover:dark:bg-zinc-800/50">
      <BlogIcon
        name={blog.icon}
        className="group-hover/card:bg-white group-hover/card:text-emerald-600 dark:group-hover/card:bg-zinc-900 dark:group-hover/card:text-emerald-400"
      />
      <div className="min-w-0 flex-1 space-y-2">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={blog.publishedAt}>
              {formatDate(blog.publishedAt)}
            </time>
            &nbsp;— {blog.readingTime.text}
          </dd>
        </dl>
        <h3 className="text-xl font-bold leading-7 tracking-tight text-gray-900 dark:text-gray-100">
          {blog.title}
        </h3>
        <p className="prose max-w-none text-gray-500 dark:text-gray-400">
          {blog.summary}
        </p>
        <BlogTags tags={blog.tags} className="pt-1" />
      </div>
    </article>
  );
}
