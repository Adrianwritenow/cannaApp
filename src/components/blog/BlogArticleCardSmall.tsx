import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../interfaces/post';
import React from 'react';
import moment from 'moment';

function BlogArticleSmall({ post }: { post: Post }) {
  return (
    <div key={post._source.title[0]}>
      <div className="grid gap-4 grid-cols-3 justify-between items-center w-full  py-4">
        <div className="basis-3/4 w-full col-span-2">
          <p className="text-xs text-gray-700">
            {post._source.author} in %Topic%
          </p>
          <h2 className="font-bold text-gray-700 leading-6 py-1">
            <Link href={`/blog/${encodeURIComponent(post._id)}`} passHref>
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
            <Link href={`/blog/${encodeURIComponent(post._id)}`} passHref>
              <a>
                <Image
                  src={post._source.image_url[0]}
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
