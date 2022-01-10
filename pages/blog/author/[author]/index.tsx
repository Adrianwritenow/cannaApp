import BlogArticleCardFeatured from '@/components/blog/BlogArticleCardFeatured';
import BlogArticleCardSmall from '@/components/blog/BlogArticleCardSmall';
import articles from '@/helpers/mockData/articles.json';
import { useRouter } from 'next/router';

export default function BlogByAuthor() {
  const router = useRouter();
  const { author } = router.query;

  return (
    <div className="bg-gray-50 pt-6 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto lg:max-w-7xl">
        <div>
          <h2 className="text-2xl tracking-tight font-semibold text-gray-700 sm:text-4xl">
            {author}
          </h2>
        </div>
        <div className=" grid gap-0 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {articles.articles.map((post, idx) => (
            <BlogArticleCardFeatured post={post} key={post.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
