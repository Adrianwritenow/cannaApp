import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../interfaces/post';
import React from 'react';
import moment from 'moment';

function BlogArticleFeatured({ post }: { post: Post }) {
  return (
    <div key={post.title} className="flex w-full justify-center">
      <div className="align   w-full self-center py-4">
        <div>
          <div className="pb-4">
            <Link href={`/blog/${post.id}`} passHref>
              <a>
                <Image
                  src={post.image}
                  layout="responsive"
                  height={200}
                  width={300}
                  objectFit="cover"
                  alt={post.title}
                  className="rounded-lg"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <p className="text-xs text-gray-700">{post.author} in %Topic%</p>
          <h2 className="font-bold text-gray-700 leading-6 py-1 hover:underline">
            <Link href={`/blog/${post.id}`} passHref>
              <a className="no-underline hover:underline">{post.title}</a>
            </Link>
          </h2>
          <p className="text-gray-700 text-xs">
            {moment(post.published).format('MMMM Do, YYYY')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogArticleFeatured;
