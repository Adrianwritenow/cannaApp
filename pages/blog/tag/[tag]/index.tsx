import { Post, PostResults } from '@/interfaces/post';
import { combinedSearchQuery, searchMulti } from '@/actions/search';
import { useEffect, useState } from 'react';

import BlogArticleCardFeatured from '@/components/blog/BlogArticleCardFeatured';
import BlogArticleCardSmall from '@/components/blog/BlogArticleCardSmall';
import { RootState } from '@/reducers';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function BlogByTag() {
  const router = useRouter();
  const { tag } = router.query;
  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const { results: blogs }: PostResults = listResults.blogs || [];

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  function getBlogs() {
    dispatchSearch(
      searchMulti({
        q: `${tag}`,
        endpoints: [
          {
            name: 'blogs',
            total: 10,
          },
        ],
      })
    );
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
