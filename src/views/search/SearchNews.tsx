import { useEffect, useState } from 'react';

import BlogArticleSmall from '@/components/blog/BlogArticleCardSmall';
import NewsFilterSlideOver from '../slideOver/filters/NewsFilterSlideOver';
import { Post } from '@/interfaces/post';
import { SearchHits } from '@/interfaces/searchHits';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { combinedSearchQuery } from '@/actions/search';
import sample from '@/helpers/mockData/articles.json';

export default function SearchNews(props: { query: string }) {
  const { query } = props;
  const [blogs, setBlogs] = useState<Array<Post>>();
  const [update, setUpdate] = useState(true);
  const [currentQuery, setCurrentQuery] = useState('');
  const [filters, setFilters] = useState<any>({
    description: [],
    sort: [],
  });

  useEffect(() => {
    if (update || currentQuery !== query) {
      getBlogs();
    }
  }, [update, query]);

  async function getBlogs() {
    const hits: any = await combinedSearchQuery({
      search: query,
      filters: filters,
      endpoints: ['blogs'],
      total: 10,
    });
    setBlogs(hits);
    setUpdate(false);
    setCurrentQuery(query);
  }

  function handleFilter(data: any) {
    setFilters(data);
    setUpdate(true);
  }
  return (
    <div>
      {blogs && (
        <section className="px-4 ">
          {blogs.length ? (
            <>
              <NewsFilterSlideOver handleFilter={handleFilter} />
              <>
                {blogs.map((post: Post, index) => (
                  <span id={`${index}`} key={`article-${index}`}>
                    <BlogArticleSmall post={post} />
                  </span>
                ))}
                {/* <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
                  See more
                </button> */}
              </>
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
