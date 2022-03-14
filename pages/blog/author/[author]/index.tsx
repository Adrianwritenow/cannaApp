import { useEffect } from 'react';

import BlogArticleCardFeatured from '@/components/blog/BlogArticleCardFeatured';
import BlogArticleCardSmall from '@/components/blog/BlogArticleCardSmall';
import { Post } from '@/interfaces/post';
import { searchMulti } from '@/actions/search';
import { useRouter } from 'next/router';
import { useAxios } from '@/hooks/useAxios';
import { useSelector } from 'react-redux';
import { RootState } from '@/reducers';

export default function BlogByAuthor() {
  const router = useRouter();
  const { author } = router.query;

  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const articlesKey = `articlesByAuthor${author}`;
  const articles: Post[] = listResults[articlesKey] || [];

  useEffect(() => {
    if (!loading && author) {
      dispatchSearch(
        searchMulti({
          endpoints: [
            {
              name: 'blogs',
              key: articlesKey,
              filters: {
                author: [author],
              },
              total: 20,
            },
          ],
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author]);

  return (
    <div className="bg-gray-50 pt-6 pb-20 px-4 sm:px-6 desktop:pt-24 desktop:pb-28 desktop:px-8">
      <div className="relative max-w-lg mx-auto desktop:max-w-7xl">
        <div>
          <h2 className="text-2xl tracking-tight font-semibold text-gray-700 sm:text-4xl">
            {author}
          </h2>
        </div>
        {articles && (
          <div className=" grid gap-0 desktop:grid-cols-3 desktop:gap-x-5 desktop:gap-y-12">
            {articles.map((post, idx) => (
              <BlogArticleCardFeatured
                post={post}
                key={post._source.title[0]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
