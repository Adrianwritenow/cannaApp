import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../interfaces/post';



function BlogArticleCardSlide({ post }: { post: Post }) {
  return (
    <div key={post.title} className="flex w-full justify-center">
      <div className="border-b-2 align border rounded-lg w-full self-center pb-4">
        <div>
          <div className="pb-4">
            <Link href={`/blog/${post.id}`} passHref>
              <a>
                <Image
                  src={post.imageUrl}
                  layout="intrinsic"
                  height={200}
                  width={300}
                  objectFit="cover"
                  alt={post.imageAltText}
                  className="rounded-t-lg"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full px-4">
          <p className="text-xs text-green-600">
            {post.author.name} in {post.topic.name}
          </p>
          <h2 className="font-bold text-green-600 leading-6 py-1 hover:underline">
            <Link href={`/blog/${post.id}`} passHref>
              <a className="no-underline text-green-600 hover:underline">{post.title}</a>
            </Link>
          </h2>
          <p className="text-green-600 text-xs">{post.date}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogArticleCardSlide;
