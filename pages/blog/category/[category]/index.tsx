import BlogArticleCardFeatured from '@/components/blog/BlogArticleCardFeatured';
import BlogArticleCardSmall from '@/components/blog/BlogArticleCardSmall';
import { useRouter } from 'next/router';

export default function BlogByCategory() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="bg-gray-50 pt-6 pb-20 px-4 sm:px-6 desktop:pt-24 desktop:pb-28 desktop:px-8">
      {/* <div className="relative max-w-lg mx-auto desktop:max-w-7xl">
        <div>
          <h2 className="text-2xl tracking-tight font-semibold text-gray-700 sm:text-4xl">
            {category}
          </h2>
        </div>
        <div className=" grid gap-0 desktop:grid-cols-3 desktop:gap-x-5 desktop:gap-y-12">
          {articles.articles
            .slice(0, 5)
            .map(
              (post, idx) =>
                idx < 3 && (
                  <BlogArticleCardFeatured post={post} key={post.title} />
                )
            )}
        </div>

        <div className="pt-9">
          <h2 className="text-xl tracking-tight font-bold text-gray-700  my-6 sm:text-4xl">
            Latest Stories in {category}
          </h2>
        </div>
        <div className=" grid gap-0  desktop:grid-cols-3 desktop:gap-x-5 desktop:gap-y-12 divide-y divide-solid">
          {articles.articles.slice(5).map((post, idx) => (
            <BlogArticleCardSmall key={post.title} post={post} />
          ))}
        </div>
      </div> */}
    </div>
  );
}
