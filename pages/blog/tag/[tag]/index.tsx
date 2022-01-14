import { useEffect, useState } from 'react';

import BlogArticleCardFeatured from '@/components/blog/BlogArticleCardFeatured';
import BlogArticleCardSmall from '@/components/blog/BlogArticleCardSmall';
import { Post } from '@/interfaces/post';
import articles from '@/helpers/mockData/articles.json';
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
  }, [router]);

  async function getBlogs() {
    const hits: any = await combinedSearchQuery({
      search: `${tag}`,
      endpoints: ['blogs'],
      total: 10,
    });
    setBlogs(hits);
  }

  return (
    <div className="bg-gray-50 pt-6 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto lg:max-w-7xl">
        <div>
          <h2 className="text-2xl tracking-tight font-semibold text-gray-700 sm:text-4xl">
            {tag}
          </h2>
        </div>
        <div className=" grid gap-0 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {blogs.map((post, idx) => (
            <BlogArticleCardFeatured post={post} key={post._source.title[0]} />
          ))}
        </div>

        <div className="pt-9">
          <h2 className="text-xl tracking-tight font-bold text-gray-700  my-6 sm:text-4xl">
            Latest Stories in {tag}
          </h2>
        </div>
        <div className=" grid gap-0  lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12 divide-y divide-solid">
          {blogs.slice(5).map((post, idx) => (
            <BlogArticleCardSmall key={post._source.title[0]} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
