import sample from '@/helpers/mockData/articles.json';
import { useRouter } from 'next/router';
import BlogArticleSlider from '@/components/blog/BlogArticleSlider';
import BlogArticle from '@/components/blog/BlogArticle';
import { Post } from '@/interfaces/post';

export default function BlogPost() {
  const router = useRouter();
  return (
    <div>
      <BlogArticle
        post={sample.articles.find(
          (article: Post) => article.id === +router.query.blogId!
        )}
      />
      <BlogArticleSlider posts={sample.articles} />
    </div>
  );
}
