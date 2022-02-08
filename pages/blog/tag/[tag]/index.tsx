import { useEffect, useState } from 'react';

import BlogArticleCardFeatured from '@/components/blog/BlogArticleCardFeatured';
import BlogArticleCardSmall from '@/components/blog/BlogArticleCardSmall';
import { Post } from '@/interfaces/post';
import { combinedSearchQuery } from '@/actions/search';
import { useRouter } from 'next/router';

export default function BlogByTag() {
  const router = useRouter();
  const { tag } = router.query;
  const [blogs, setBlogs] = useState<Array<Post>>([]);

  useEffect(() => {
    if (!blogs.length && tag) {
      getBlogs();
    }
  }, [blogs.length, getBlogs, router, tag]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getBlogs() {
    const hits: any = await combinedSearchQuery({
      q: `${tag}`,
      endpoints: ['blogs'],
      total: 10,
    });
    setBlogs(hits);
  }

  return (
    <div className="bg-gray-50 pt-6 pb-20 px-4 sm:px-6 desktop:pt-24 desktop:pb-28 desktop:px-8">
      <div className="relative max-w-lg mx-auto desktop:max-w-7xl">
        <div>
          <h2 className="text-2xl tracking-tight font-semibold text-gray-700 sm:text-4xl">
            {tag}
          </h2>
        </div>
        <div className=" grid gap-0 desktop:grid-cols-3 desktop:gap-x-5 desktop:gap-y-12">
          {blogs.map((post, idx) => (
            <BlogArticleCardFeatured post={post} key={post._source.title[0]} />
          ))}
        </div>

        <div className="pt-9">
          <h2 className="text-xl tracking-tight font-bold text-gray-700  my-6 sm:text-4xl">
            Latest Stories in {tag}
          </h2>
        </div>
        <div className=" grid gap-0  desktop:grid-cols-3 desktop:gap-x-5 desktop:gap-y-12 divide-y divide-solid">
          {blogs.slice(5).map((post, idx) => (
            <BlogArticleCardSmall key={post._source.title[0]} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
