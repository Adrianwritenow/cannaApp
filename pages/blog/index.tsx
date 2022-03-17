import BlogArticleCardFeatured from '../../src/components/blog/BlogArticleCardFeatured';
import BlogArticleCardSmall from '../../src/components/blog/BlogArticleCardSmall';
import Link from 'next/link';
import { PostResults } from '@/interfaces/post';
import { RootState } from '@/reducers';
import moment from 'moment';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const topics = [
  'Arts',
  'Education',
  'CBD',
  'Politics',
  'Strains & Products',
  'Health & Lifestyle',
  'Science & Technology',
  'Business',
  'Entertainment',
  'Food & Drink',
  'Travel',
  'Opinion',
];

export default function Blog() {
  const now = moment();
  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const { results: articles }: PostResults = listResults.blogs || [];
  const { results: featured }: PostResults = listResults.blogsFeatured || [];

  useEffect(() => {
    getResults();
  }, []);

  function getResults() {
    dispatchSearch(
      searchMulti({
        endpoints: [
          {
            name: 'blogs',
            total: 10,
          },
          {
            name: 'blogs',
            key: 'blogsFeatured',
            filters: { featured: [true] },
            total: 10,
          },
        ],
      })
    );
  }

  return (
    <div>
      {articles && featured && (
        <>
          <div className="bg-gray-100 w-full h-12 flex items-center justify-center">
            <p className="text-xs uppercase tracking-wider">
              {now.format('dddd, MMMM Do, YYYY')}
            </p>
          </div>
          <div className="bg-white pt-6 pb-20 px-4 sm:px-6 desktop:pt-24 desktop:pb-28 desktop:px-8">
            <div className="relative max-w-lg mx-auto desktop:max-w-7xl">
              <h1 className="sr-only">Articles</h1>
              <div>
                <h2 className="text-2xl tracking-tight font-semibold text-gray-700 sm:text-4xl">
                  Top Stories
                </h2>
              </div>

              {featured.length && (
                <div className=" grid gap-0  desktop:grid-cols-3 desktop:gap-x-5 desktop:gap-y-12 divide-y-2">
                  {featured
                    .slice(0, 5)
                    .map((post, idx) =>
                      idx === 0 ? (
                        <BlogArticleCardFeatured
                          post={post}
                          key={post._source.title[0]}
                        />
                      ) : (
                        <BlogArticleCardSmall post={post} />
                      )
                    )}
                  <div></div>
                </div>
              )}

              <div>
                <h2 className="text-xl tracking-tight font-bold text-gray-700  mt-6 sm:text-4xl">
                  Topics to Explore
                </h2>
              </div>
              <div>
                <div className="flex flex-wrap py-6 border-b-2 ">
                  {topics.map(topic => (
                    <Link href={`/blog/tag/${topic}`} key={topic} passHref>
                      <a className="px-4 py-1 mr-2 my-1 text-gray-600 bg-white text-sm border-2 border-gray-400 rounded-2xl hover:bg-green-400 hover:border-transparent hover:text-white">
                        {topic}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl tracking-tight font-bold text-gray-700  my-6 sm:text-4xl">
                  Latest Stories
                </h2>
              </div>
              <div className=" grid gap-0  desktop:grid-cols-3 desktop:gap-x-5 desktop:gap-y-12">
                {articles.slice(5).map((post, idx) => (
                  <BlogArticleCardSmall
                    key={post._source.title[0]}
                    post={post}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
