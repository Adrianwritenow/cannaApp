import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IconFacebook } from '../../../public/assets/icons/iconComponents';
import SvgIconTwitter from '@/public/assets/icons/iconComponents/IconTwitter';
import SocialShare from '@/components/share/SocialShare';
import 'swiper/css';
import { articles } from '@/helpers/mockData';
import BlogArticleSlider from '@/components/blog/BlogArticleSlider';
// import { useRouter } from "next/router";

export default function BlogPost() {
  const [swiper, setSwiper] = useState(null);
  return (
    <div className="relative  bg-white overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="mt-2 block font-serif text-4xl leading-10  text-green-500 text-5xl">
              Exercitation veniam consequat sunt nostrud amet.
            </span>
          </h1>
          <p className="pt-4 text-gray-500">
            Ultrices cursus sagittis, lacus risus enim odio potenti diam
            parturient odio ipsum.
          </p>
          <div className="pt-4 border-b-2 pb-4">
            <p className="text-xs text-gray-900">
              By{' '}
              <Link href="#" passHref>
                <a className="text-green-400">John Doe</a>
              </Link>{' '}
              | January 1st, 2022
            </p>
            <div className="flex items-center pt-4 w-24">
              <div className="flex justify-between w-full">
                <Link href="#" passHref>
                  <a>
                    <IconFacebook width={20} height={20} fill="#2F603D" />
                  </a>
                </Link>
                <Link href="#" passHref>
                  <a>
                    <SvgIconTwitter width={20} height={20} fill="#2F603D" />
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
          src="https://images.unsplash.com/photo-1605570381616-4d1dc384e9e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          layout="intrinsic"
          height={620}
          width={830}
          objectFit="cover"
          alt="rolling a joint"
        />
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div>
          <p className="mt-8 text-xl text-green-600 leading-8">
            Urna ullamcorper varius molestie quisque ac vel augue mi lacus.
            Risus arcu lectus consequat tempus tellus velit tristique senectus
            quis. Mollis dictumst malesuada elementum ac pellentesque. Quisque
            lectus lobortis morbi bibendum ultricies faucibus. Egestas sed
            ultrices sed quam mi. A bibendum posuere ipsum, fermentum. Enim
            sociis aliquam, ac velit aenean tellus porttitor. Elementum eget
            tincidunt posuere vitae vitae lorem fermentum, dignissim in. Enim
            ultricies lorem consectetur risus blandit mollis lacus pretium
            cursus. Non et quis ultrices lectus dictum. Dolor neque potenti nibh
            in arcu sed non nisl, egestas.
          </p>
        </div>
        <div className=" text-gray-500 mx-auto">
          <blockquote className="ml-3 font-serif my-10 py-10 not-italic text-3xl pl-4 text-green-600 border-l-2 border-green-600">
            “Quisque lectus lobortis morbi bibendum ultricies faucibus.”
          </blockquote>
          <p className="mt-8 text-xl text-green-600 leading-8">
            Vel sed tincidunt in consectetur nibh lacinia platea interdum. Massa
            morbi amet tincidunt sed pharetra, ultricies vitae. At enim posuere
            in malesuada. Quis risus quis tristique risus. Ac pellentesque quis
            ultrices ornare feugiat elit. Pharetra sit enim, justo tellus in ac.
            Tortor amet velit in justo, nisi. Tortor risus sem dictum senectus
            elementum eu elit. Diam elit ante aliquam tortor velit. Quam turpis
            pharetra risus, lectus elementum mauris. Pharetra senectus ipsum
            interdum sed enim integer amet. Purus elit, eget sed curabitur
            scelerisque tellus.
          </p>
        </div>
      </div>
      <div className="relative flex items-center flex-col py-4 mt-4 ">
        <Image
          src="https://images.unsplash.com/photo-1524046346361-5a9c9592fb74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
          layout="intrinsic"
          height={620}
          width={830}
          objectFit="cover"
          alt="rolling a joint"
        />
        <figcaption className=" text-sm text-green-600 sm:px-6 pt-4 px-4 lg:px-8">
          Nulla eget porta aliquet quis sit elementum. Tortor, vitae elit quis
          nunc nulla. Non lacus, purus tincidunt ac aliquam elit. Enim
          scelerisque eu porta vitae augue risus, fusce.
        </figcaption>
      </div>
      <div className="relative px-4 pt-6 sm:px-6 lg:px-8 my-4 pb-6">
        <h2 className="text-green-600 text-xl font-bold">
          Feugiat rhoncus odio praesent et interdum. Aliquam ultrices
          scelerisque quisque nibh.
        </h2>
        <p className="mt-8 text-xl text-green-600 leading-8">
          Pharetra sit enim, justo tellus in ac. Tortor amet velit in justo,
          nisi. Tortor risus sem dictum senectus elementum eu elit. Diam elit
          ante aliquam tortor velit. Quam turpis pharetra risus, lectus
          elementum mauris. Pharetra senectus ipsum interdum sed enim integer
          amet. Purus elit, eget sed curabitur scelerisque tellus. Quis nunc
          adipiscing hendrerit nulla lectus. Enim venenatis, semper lobortis
          aliquet cursus erat. Amet at dignissim eget iaculis nulla massa. Enim,
          tempus euismod id eget dictumst morbi. Gravida ac suspendisse enim
          malesuada tempus. Eu, turpis sit tortor pharetra gravida arcu purus,
          phasellus ipsum. Quam id mattis enim tortor tristique aliquam id est.{' '}
        </p>
      </div>
      <BlogArticleSlider posts={articles} />
    </div>
  );
}
