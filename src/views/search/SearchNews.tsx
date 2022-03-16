import { useEffect, useState } from 'react';

import BlogArticleCardSlide from '@/components/blog/BlogArticleCardSlide';
import BlogArticleSmall from '@/components/blog/BlogArticleCardSmall';
import NewsFilterSlideOver from '../slideOver/filters/NewsFilterSlideOver';
import { Post } from '@/interfaces/post';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { combinedSearchQuery } from '@/actions/search';
import { useQueryParam, StringParam, withDefault } from 'next-query-params';

export default function SearchNews() {
  const [query] = useQueryParam('qs', withDefault(StringParam, ''));
  const [blogs, setBlogs] = useState<Array<Post>>();
  const [update, setUpdate] = useState(true);
  const [filters, setFilters] = useState<any>({
    description: [],
    sort: [],
  });

  useEffect(() => {
    if (update || query) {
      getBlogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, query]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getBlogs() {
    const hits: any = await combinedSearchQuery({
      q: query,
      filters: filters,
      endpoints: ['blogs'],
      total: 10,
    });
    setBlogs(hits);
    setUpdate(false);
  }

  function handleFilter(data: any) {
    setFilters(data);
    setUpdate(true);
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
                {/* <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
                  See more
                </button> */}
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
