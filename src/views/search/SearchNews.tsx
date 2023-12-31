import { Post, PostResults } from '@/interfaces/post';
import { StringParam, useQueryParam, withDefault } from 'next-query-params';
import { useEffect, useState } from 'react';

import BlogArticleCardSlide from '@/components/blog/BlogArticleCardSlide';
import BlogArticleSmall from '@/components/blog/BlogArticleCardSmall';
import { IAxiosReturn } from '@/interfaces/axios';
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
  const { results: blogs, total: blogTotal }: PostResults =
    listResults.blogs || [];
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<any>({
    description: [],
    sort: [],
  });

  useEffect(() => {
    getBlogs(0, false);
  }, [query, filters]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getBlogs(from: number, concat: boolean) {
    dispatchSearch(
      searchMulti({
        q: query,
        filters: filters,
        endpoints: [
          {
            name: 'blogs',
            geolocate: true,
            from,
            concat,
          },
        ],
        total: 10,
      })
    ).then((status: IAxiosReturn) => {
      if (!status.success) {
        return;
      }
      const searchResponse = status.response.data.responses[0] || {};
      setTotal(searchResponse.hits?.total.value || 0);
    });
  }

  function removeFilter(categoryQuery: string) {
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
    getBlogs(blogs.length, true);
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
          <div className="max-w-7xl mx-auto px-4 pb-4">
            <h2 className="text-xl text-gray-700 font-semibold py-4  desktop:text-2xl">
              {query
                ? `${blogTotal} results for "${query}"`
                : `${blogTotal} results`}
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
            {total > blogs.length && (
              <div className="flex justify-center py-10">
                <button
                  onClick={handleLoadMore}
                  className="bg-green-500 text-white hover:bg-green-600 flex justify-center py-2 px-20 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
                >
                  Load More
                </button>
              </div>
            )}
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
