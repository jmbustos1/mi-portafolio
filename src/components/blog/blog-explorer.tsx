"use client";

import { useSearchParams } from "next/navigation";
import { AnimatedBlogList } from "./animated-blog-list";
import { BLOG_POSTS_PER_PAGE, Pagination } from "./pagination";
import { SearchInput } from "./search-input";

type Post = React.ComponentProps<typeof AnimatedBlogList>["posts"][number];

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() ?? "";
  const requestedPage = parseInt(searchParams.get("page") ?? "", 10) || 1;

  const filtered = query
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query)),
      )
    : posts;

  const totalPages = Math.ceil(filtered.length / BLOG_POSTS_PER_PAGE);
  const currentPage = requestedPage > totalPages ? 1 : requestedPage;
  const currentPosts = filtered.slice(
    (currentPage - 1) * BLOG_POSTS_PER_PAGE,
    currentPage * BLOG_POSTS_PER_PAGE,
  );

  return (
    <>
      <div className="mb-8">
        <SearchInput />
      </div>
      <AnimatedBlogList posts={currentPosts} />
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}
