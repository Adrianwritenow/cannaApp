import { Post } from '@/interfaces/post';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogArticleCardSlide from './BlogArticleCardSlide';
import 'swiper/css';

function BlogArticleSlider(props: { posts: Post[] }) {
  const { posts } = props;
  return (
    <div className="pb-4 bg-white ">
      <h2 className="px-4 pb-4 text-green-600 text-xl font-bold">
        Related Stories
      </h2>
      <Swiper
        spaceBetween={10}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        slidesPerView="auto"
      >
        {posts.map((post: any) => (
          <SwiperSlide key={post.id} style={{ maxWidth: '300px' }}>
            <BlogArticleCardSlide post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BlogArticleSlider;
