import { useEffect, useState } from 'react';

import BlogArticle from '@/components/blog/BlogArticle';
import { Post } from '@/interfaces/post';
import { SearchHits } from '@/interfaces/searchHits';
import { getDocument } from '@/actions/search';
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { blogId } = router.query;
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    if (blogId) {
      getDocument(blogId, 'blogs').then((document: SearchHits) => {
        if (document) {
          const result = document.hits.hits[0];
          setPost(result as unknown as Post);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div>
      <BlogArticle post={post as Post} />
    </div>
  );
}
