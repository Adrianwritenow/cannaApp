import { Post, PostResults } from '@/interfaces/post';

import BlogArticle from '@/components/blog/BlogArticle';
import { RootState } from '@/reducers';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function BlogPost() {
  const router = useRouter();
  const { blogId } = router.query;
  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const { results: blogs }: PostResults = listResults.blogs || [];
  const post: Post | undefined = blogs?.length ? blogs[0] : undefined;

  useEffect(() => {
    if (blogId) {
      dispatchSearch(
        searchMulti({
          endpoints: [
            {
              name: 'blogs',
              filters: {
                id: [blogId],
              },
              total: 1,
            },
          ],
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  return (
    <div>
      <BlogArticle post={post as Post} />
    </div>
  );
}
