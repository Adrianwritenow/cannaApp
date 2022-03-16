import { Post, PostResults } from '@/interfaces/post';
import { StringParam, useQueryParam, withDefault } from 'next-query-params';
import { useEffect, useState } from 'react';

import BlogArticleCardSlide from '@/components/blog/BlogArticleCardSlide';
import BlogArticleSmall from '@/components/blog/BlogArticleCardSmall';
import NewsFilterSlideOver from '../slideOver/filters/NewsFilterSlideOver';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { combinedSearchQuery } from '@/actions/search';

export default function SearchNews() {
  const [query] = useQueryParam('qs', withDefault(StringParam, ''));
  const [blogs, setBlogs] = useState<Array<Post>>();
  const [update, setUpdate] = useState(true);
  const [filters, setFilters] = useState<any>({
    description: [],
    sort: [],
  });

  useEffect(() => {
    getBlogs();
  }, [query, filters]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getBlogs() {
    dispatchSearch(
      searchMulti({
        q: query,
        filters: filters,
        endpoints: [
          {
            name: 'blogs',
            geolocate: true,
          },
        ],
        total: 10,
      })
    );
  }

  function handleFilter(data: any) {
    setFilters(data);
    setUpdate(true);
  }

  function handleLoadMore() {
    dispatchSearch(
      searchMulti({
        q: query,
        filters: filters,

        endpoints: [
          {
            name: 'blogs',
            from: blogs.length,
            concat: true,
          },
        ],
        total: 10,
      })
    );
  }
  return (
    <div>
      {blogs && (
        <section className="px-4 ">
          {blogs?.length ? (
            <>
              <NewsFilterSlideOver handleFilter={handleFilter} />
              <div className="max-w-7xl mx-auto">
                {blogs.map((post: Post, index) => (
                  <span
                    id={`${index}`}
                    key={`article-${index}`}
                    className="desktop:hidden"
                  >
                    <BlogArticleSmall post={post} />
                  </span>
                ))}
                <div className="hidden desktop:flex flex-wrap gap-4">
                  {blogs.map((post: Post, index) => (
                    <span
                      id={`${index}`}
                      key={`article-${index}`}
                      className="w-60"
                    >
                      <BlogArticleCardSlide post={post} />
                    </span>
                  ))}
                </div>
                <div className="flex justify-center py-10">
                  <button
                    onClick={handleLoadMore}
                    className="bg-green-500 text-white hover:bg-green-600 flex justify-center py-2 px-20 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
                  >
                    Load More
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center  flex-wrap justify-center h-full space-y-4 py-14">
              <SvgEmptyState className="w-40 h-40" />
              <div className="w-full space-y-3">
                <h2 className="text-lg text-gray-700 font-semibold text-center w-56 ml-auto mr-auto">
                  Sorry, there are no results for this search.
                </h2>
                <p className="text-sm text-gray-500 text-center w-56 ml-auto mr-auto">
                  Please try again with different or more general keywords.
                </p>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
