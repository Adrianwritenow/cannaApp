import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { Post } from '../../interfaces/post';
import React from 'react';
import moment from 'moment';

function BlogArticleCardSlide({ post }: { post: Post }) {
  console.log(post);
  return (
    <div key={post._source.title[0]} className="flex w-full justify-center ">
      <div className="border-b-2 align border rounded-lg w-full self-center pb-4 ">
        <div>
          <div className="relative h-200 w-full h-52 mb-4">
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
                  alt={post._source.main_alt[0]}
                  className="rounded-t-lg"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full h-32 px-4 flex flex-wrap">
          <div>
            <p className="text-xs text-green-600">{post._source.author}</p>
            <h2 className="font-bold text-green-600 leading-6 py-1 hover:underline">
              <Link href={`/blog/${encodeURIComponent(post._id)}`} passHref>
                <a className="no-underline text-green-600 hover:underline">
                  {post._source.title}
                </a>
              </Link>
            </h2>
          </div>
          <p className="text-green-600 text-xs mt-auto">
            {moment.unix(post._source.created[0]).format('MMMM Do, YYYY')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogArticleCardSlide;
