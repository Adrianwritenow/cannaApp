import { useEffect, useState } from 'react';

import { IconFacebook } from '@/public/assets/icons/iconComponents';
import Image from 'next/image';
import Link from 'next/link';
import SocialShare from '@/components/share/SocialShare';
import SvgIconTwitter from '@/public/assets/icons/iconComponents/IconTwitter';
import moment from 'moment';
import styles from './styles.module.scss';

export default function BlogArticle({ post }: any) {
  const [renderHtml, setRenderHtml] = useState('');

  useEffect(() => {
    if (!!post) {
      setRenderHtml(post.content);
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
                  {post.title}
                </span>
              </h1>
              <p className="pt-4 text-gray-500">{post.description}</p>
              <div className="pt-4 border-b-2 pb-4">
                <p className="text-xs text-gray-900">
                  By&nbsp;
                  <Link href={`/blog/author/${post.author}`} passHref>
                    <a className="text-green-400">{post.author}</a>
                  </Link>
                  &nbsp; | {moment(post.published).format('MMMM Do, YYYY')}
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
            <Image
              src={post.image}
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
