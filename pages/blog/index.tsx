import BlogArticleCardFeatured from '../../src/components/blog/BlogArticleCardFeatured';
import BlogArticleCardSmall from '../../src/components/blog/BlogArticleCardSmall';
import Link from 'next/link';
import articles from '@/helpers/mockData/articles.json';
import moment from 'moment';

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
  return (
    <div>
      <div className="bg-gray-100 w-full h-12 flex items-center justify-center">
        <p className="text-xs uppercase tracking-wider">
          {now.format('dddd, MMMM Do, YYYY')}
        </p>
      </div>
      <div className="bg-white pt-6 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto lg:max-w-7xl">
          <h1 className="sr-only">Articles</h1>
          <div>
            <h2 className="text-2xl tracking-tight font-semibold text-gray-700 sm:text-4xl">
              Top Stories
            </h2>
          </div>
          <div className=" grid gap-0  lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {articles.articles
              .slice(0, 5)
              .map((post, idx) =>
                idx === 0 ? (
                  <BlogArticleCardFeatured post={post} key={post.title} />
                ) : (
                  <BlogArticleCardSmall post={post} />
                )
              )}
            <BlogArticleCardSmall post={articles.articles[0]} />
          </div>

          <div>
            <h2 className="text-xl tracking-tight font-bold text-gray-700  mt-6 sm:text-4xl">
              Topics to Explore
            </h2>
          </div>
          <div>
            <div className="flex flex-wrap py-6 border-b-2 ">
              {topics.map(topic => (
                <Link href={`/blog/category/${topic}`} key={topic} passHref>
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
          <div className=" grid gap-0  lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {articles.articles.slice(5).map((post, idx) => (
              <BlogArticleCardSmall key={post.title} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
