import { Post, PostResults } from '@/interfaces/post';
import { StringParam, useQueryParam, withDefault } from 'next-query-params';
import { useEffect, useState } from 'react';

import BlogArticleCardSlide from '@/components/blog/BlogArticleCardSlide';
import BlogArticleSmall from '@/components/blog/BlogArticleCardSmall';
import NewsFilterSlideOver from '../slideOver/filters/NewsFilterSlideOver';
import { RootState } from '@/reducers';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useSelector } from 'react-redux';

export default function SearchNews() {
  const [query] = useQueryParam('qs', withDefault(StringParam, ''));
  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const { results: blogs, total }: PostResults = listResults.blogs || [];
  const [filters, setFilters] = useState<any>({
    description: [],
    sort: [],
  });

  useEffect(() => {
    getBlogs();
  }, [query, filters]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getBlogs() {
    console.log('filters', filters);
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

  function removeFilter(categoryQuery: string) {
    console.log('CAT', categoryQuery);
    const updatedDescription = filters.description.filter(
      (filter: string) => filter !== categoryQuery
    );

    handleFilter({
      ...filters,
      description: updatedDescription,
    });
  }

  function handleFilter(data: any) {
    setFilters(data);
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
    <section className="bg-gray-50">
      <NewsFilterSlideOver
        removeFilter={removeFilter}
        filters={filters}
        setFilters={setFilters}
      />

      {blogs?.length ? (
        <>
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl text-gray-700 font-semibold py-4  desktop:text-2xl">
              {query ? `${total} results for "${query}"` : `${total} results`}
            </h2>
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
                <span id={`${index}`} key={`article-${index}`} className="w-60">
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
  );
}
