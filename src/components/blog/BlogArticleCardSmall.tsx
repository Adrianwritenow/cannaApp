import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { Post } from '@/interfaces/post';
import React from 'react';
import moment from 'moment';

function BlogArticleSmall({ post }: { post: Post }) {
  return (
    <div key={post._source.title[0]}>
      <div className="grid gap-4 grid-cols-3 justify-between items-center w-full  py-4">
        <div className="basis-3/4 w-full col-span-2">
          <p className="text-xs text-gray-700">By {post._source.author}</p>
          <h2 className="font-bold text-gray-700 leading-6 py-1">
            <Link href={`/blog/${post._source.id}`} passHref>
              <a className="hover:underline">{post._source.title}</a>
            </Link>
          </h2>
          <p className="text-gray-700 text-xs">
            {/* Need published date */}
            {/* {moment(post.published).format('MMMM Do, YYYY')} */}
          </p>
        </div>
        <div className=" col-span-1 ">
          <div className="relative flex justify-end">
            <Link href={`/blog/${post._source.id}`} passHref>
              <a>
                <ImageWithFallback
                  src={`${process.env.API_URL}${
                    typeof post._source.image_url === 'undefined'
                      ? '#'
                      : post._source.image_url[0].includes('image_missing')
                      ? '#'
                      : post._source.image_url[0]
                  }`}
                  layout="intrinsic"
                  height={130}
                  width={130}
                  objectFit="cover"
                  alt={post._source.title[0]}
                  className="rounded-lg"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogArticleSmall;
