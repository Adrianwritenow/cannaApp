import BlogArticleSmall from '@/components/blog/BlogArticleCardSmall';
import FilterSlideOver from '../slideOver/filters/FilterSlideOver';
import Link from 'next/link';
import { Post } from '@/interfaces/post';
import sample from '@/helpers/mockData/articles.json';

export default function SearchNews() {
  return (
    <div>
      <NewsFilterSlideOver />

      <section className="px-4 ">
        {sample.articles.map((post: Post, index) => (
          <span id={`${index}`} key={`article-${index}`}>
            <BlogArticleSmall post={post} />
          </span>
        ))}
        <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
          See more
        </button>
      </section>
    </div>
  );
}
