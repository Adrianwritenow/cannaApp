import { useEffect, useState } from 'react';

import { formatImageWithFallback } from '@/helpers/formatters';
import { IconFacebook } from '@/public/assets/icons/iconComponents';
import ImageWithFallback from '@/components/image/ImageWithFallback';
import Link from 'next/link';
import { Post } from '@/interfaces/post';
import SocialShare from '@/components/share/SocialShare';
import SvgIconTwitter from '@/public/assets/icons/iconComponents/IconTwitter';
import styles from './styles.module.scss';

export default function BlogArticle({ post }: { post: Post }) {
  const [renderHtml, setRenderHtml] = useState('');

  useEffect(() => {
    if (!!post) {
      setRenderHtml(post._source.content[0]);
    }
  }, [post]);

  return (
    <div className="relative  bg-white overflow-hidden">
      {renderHtml ? (
        <>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto">
              <h1>
                <span className="mt-2 block font-serif text-4xl leading-10  text-green-500 text-5xl">
                  {post._source.title}
                </span>
              </h1>
              <p className="pt-4 text-gray-500">{post._source.description}</p>
              <div className="pt-4 border-b-2 pb-4">
                <p className="text-xs text-gray-900">
                  By&nbsp;
                  <Link href={`/blog/author/${post._source.author}`} passHref>
                    <a className="text-green-400">{post._source.author}</a>
                  </Link>
                  {/* &nbsp; | {moment(post.published).format('MMMM Do, YYYY')} */}
                </p>
                <div className="flex items-center pt-4 w-24">
                  <div className="flex justify-between w-full">
                    <Link href="#" passHref>
                      <a>
                        <IconFacebook className="w-5 h-5 text-green-500" />
                      </a>
                    </Link>
                    <Link href="#" passHref>
                      <a>
                        <SvgIconTwitter className="w-5 h-5 text-green-500" />
                      </a>
                    </Link>

                    <SocialShare />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center mt-4">
            <ImageWithFallback
              src={formatImageWithFallback(post._source.image)}
              layout="intrinsic"
              height={1000}
              width={1000}
              objectFit="cover"
              alt="rolling a joint"
            />
          </div>
          <div
            className={`${styles.article} w-11/12  mx-auto"`}
            dangerouslySetInnerHTML={{ __html: renderHtml }}
          />
        </>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-serif text-green-600">Loading...</h1>
          </div>
        </>
      )}
    </div>
  );
}
