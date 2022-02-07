import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { Post } from '@/interfaces/post';
import React from 'react';
import moment from 'moment';

function BlogArticleSmall({ post }: { post: Post }) {
  console.log(post);
  return (
    <div key={post._source.title[0]}>
      <div className="grid gap-4 grid-cols-3 justify-between items-center w-full  py-4">
        <div className="basis-3/4 w-full col-span-2">
          <div>
            <p className="text-xs text-gray-700">By {post._source.author}</p>
            <h2 className="font-bold text-gray-700 leading-6 py-1">
              <Link href={`/blog/${encodeURIComponent(post._id)}`} passHref>
                <a className="hover:underline">{post._source.title}</a>
              </Link>
            </h2>
          </div>
          {/* Need published date */}
          <p className="text-green-600 text-xs mt-auto">
            {moment.unix(post._source.created[0]).format('MMMM Do, YYYY')}
          </p>
        </div>
        <div className=" col-span-1 ">
          <div className="relative flex justify-end w-20 h-20 lg:w-32 lg:h-32 ml-auto">
            <Link href={`/blog/${encodeURIComponent(post._id)}`} passHref>
              <a>
                <ImageWithFallback
                  src={`${process.env.API_URL}${
                    post._source.image[0].includes('image_missing')
                      ? '#'
                      : post._source.image[0]
                  }`}
                  layout="fill"
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
