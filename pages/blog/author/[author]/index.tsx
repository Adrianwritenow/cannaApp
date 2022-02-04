import { useEffect, useState } from 'react';

import BlogArticleCardFeatured from '@/components/blog/BlogArticleCardFeatured';
import BlogArticleCardSmall from '@/components/blog/BlogArticleCardSmall';
import { Post } from '@/interfaces/post';
import { SearchHits } from '@/interfaces/searchHits';
import { browseBy } from '@/actions/search';
import { useRouter } from 'next/router';

export default function BlogByAuthor() {
  const router = useRouter();
  const { author } = router.query;
  const [articles, setArticles] = useState<Array<Post>>();

  useEffect(() => {
    if (author && !articles) {
      browseBy('author', `${author}`, 'blogs').then((document: SearchHits) => {
        if (document) {
          const result = document.hits.hits;
          setArticles(result as unknown as Post[]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, articles]);

  return (
    <div className="bg-gray-50 pt-6 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto lg:max-w-7xl">
        <div>
          <h2 className="text-2xl tracking-tight font-semibold text-gray-700 sm:text-4xl">
            {author}
          </h2>
        </div>
        {articles && (
          <div className=" grid gap-0 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
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
