import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../interfaces/post";



function BlogArticleSmall({ post }: { post: Post }) {
  return (
    <div key={post.title}>
      <div className="border-b-2 border-gray-200 grid gap-4 grid-cols-3 justify-between items-center w-full  py-4">
        <div className="basis-3/4 w-full col-span-2">
          <p className="text-xs text-gray-700">
            {post.author.name} in {post.topic.name}
          </p>
          <h2 className="font-bold text-gray-700 leading-6 py-1">
            <Link href={`/blog/${post.id}`} passHref>
              <a className="hover:underline">{post.title}</a>
            </Link>
          </h2>
          <p className="text-gray-700 text-xs">{post.date}</p>
        </div>
        <div className=" col-span-1 ">
          <div className="relative flex justify-end">
            <Link href={`/blog/${post.id}`} passHref>
              <a>
                <Image
                  src={post.imageUrl}
                  layout="intrinsic"
                  height={130}
                  width={130}
                  objectFit="cover"
                  alt={post.imageAltText}
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
