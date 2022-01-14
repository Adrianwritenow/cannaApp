import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { Post } from '../../interfaces/post';
import React from 'react';
import moment from 'moment';

function BlogArticleFeatured({ post }: { post: Post }) {
  return (
    <div key={post._source.title[0]} className="flex w-full justify-center">
      <div className="align   w-full self-center py-4">
        <div>
          <div className="pb-4">
            <Link href={`/blog/${encodeURIComponent(post._id)}`} passHref>
              <a>
                <ImageWithFallback
                  src={`${process.env.API_URL}${
                    post._source.image_url[0].includes('image_missing')
                      ? '#'
                      : post._source.image_url[0]
                  }`}
                  layout="responsive"
                  height={200}
                  width={300}
                  objectFit="cover"
                  alt={post._source.main_alt[0]}
                  className="rounded-lg"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <p className="text-xs text-gray-700">By {post._source.author}</p>
          <h2 className="font-bold text-gray-700 leading-6 py-1 hover:underline">
            <Link href={`/blog/${encodeURIComponent(post._id)}`} passHref>
              <a className="no-underline hover:underline">
                {post._source.title}
              </a>
            </Link>
          </h2>
          {/* <p className="text-gray-700 text-xs">
            {moment(post.published).format('MMMM Do, YYYY')}
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default BlogArticleFeatured;
