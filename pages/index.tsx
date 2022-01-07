import { ArrowsExpandIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { listings, products } from '@/helpers/mockData';

import Background from '@/public/assets/images/png/fullBloom.png';
import BlogArticleSmall from '@/components/blog/BlogArticleCardSmall';
import ClaimBusiness from '@/public/assets/images/png/growBusiness.png';
import CouponSlideOver from '@/views/slideOver/CouponsSlideOver';
import Image from 'next/image';
import Link from 'next/link';
import ListingCard from '@/components/listings/ListingCard';
import Logo from '@/public/assets/logos/logo.png';
import LogoText from '@/public/assets/logos/logo-text.png';
import Map from '@/public/assets/images/png/mapColor.png';
import { Post } from '@/interfaces/post';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import SearchSlideOver from '@/components/forms/fields/SearchSlideOver';
import { destinations } from '@/helpers/destinations';
import { publications } from '@/helpers/publications';
import sample from '@/helpers/mockData/articles.json';

export default function Home() {
  return (
    <div className="mx-auto space-y-2">
      {/* Search/Map Section */}
      <section className="relative pt-16">
        <Image src={Map} alt="Map" layout="fill" objectFit={'cover'} />
        <Link href="/map" passHref>
          <a className="absolute z-10 flex rounded-full bg-gray-50 shadow p-0.5 right-0 top-0 mt-2 mr-4 focus:outline-none">
            <button className="focus:outline-none">
              <ArrowsExpandIcon className="w-5 h-5 text-gray-700" />
            </button>
          </a>
        </Link>
        <div className="relative rounded-t-xl overflow-hidden shadow-top ">
          <Image
            src={Background}
            alt="Background image"
            className="z-0"
            layout="fill"
            objectFit={'cover'}
          />
          <div className="px-2 py-7">
            <div className="px-4">
              <div className="space-x-2 flex justify-center items-center pb-4">
                <div>
                  <Image width={52} height={58} src={Logo} alt="Image logo" />
                </div>
                <div className="mt-2">
                  <Image
                    width={172}
                    height={32}
                    src={LogoText}
                    alt="Image logo"
                  />
                </div>
              </div>
              <SearchSlideOver root={true} />
            </div>
            <div className="flex items-center flex-wrap space-x-2 space-y-2">
              <span></span>
              <Link href={'/search?type=dispensaries'} passHref>
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <LocationMarkerIcon className="w-3.5 h-3.5 " />
                  <span>Dispensaries</span>
                </a>
              </Link>
              <Link href={'/search?type=dispensaries'} passHref>
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <LocationMarkerIcon className="w-3.5 h-3.5 " />
                  <span>Edibles</span>
                </a>
              </Link>
              <Link href={'/search?type=deals'} passHref>
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <LocationMarkerIcon className="w-3.5 h-3.5 " />
                  <span>Deals</span>
                </a>
              </Link>
              <Link href={'/search?type=dispensaries'} passHref>
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <LocationMarkerIcon className="w-3.5 h-3.5 " />
                  <span>Concentrates</span>
                </a>
              </Link>
              <Link href={'/search?type=dispensaries'} passHref>
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <LocationMarkerIcon className="w-3.5 h-3.5 " />
                  <span>Topicals</span>
                </a>
              </Link>
              <Link href={'/search?type=dispensaries'} passHref>
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <LocationMarkerIcon className="w-3.5 h-3.5 " />
                  <span>Flower</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Near me section */}
      <section className="pb-4 pt-2">
        <h2 id="deals-near-me" className="sr-only">
          Deals Near Me
        </h2>
        <h2
          id="deals-near-me"
          className="text-gray-700 text-lg font-semibold px-4 py-4"
        >
          Deals Near Me
        </h2>
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4 pb-4">
          {listings.map((listing, index) => (
            <div className="w-64" key={`lc-${listing._id}-${index}`}>
              <ListingCard
                discount={'50%'}
                listing={listing}
                amenities={false}
              />
            </div>
          ))}
        </div>
        <div className="px-4 pt-2">
          <button
            className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest"
            onClick={() => {}}
          >
            <span>See more</span>
          </button>
        </div>
      </section>

      {/* Deals of the Day */}
      <CouponSlideOver label="Deals of the Day" />

      {/* Featured Destinations */}
      <section className="pb-4 pt-2">
        <h2 id="featured-destinations" className="sr-only">
          Featured Destinations
        </h2>
        <h2
          id="featured-destinations"
          className="text-gray-700 text-lg font-semibold px-4 py-4"
        >
          Featured Destinations
        </h2>
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4 pb-4">
          {destinations.map((location, index) => (
            <div key={`fd-${index}`}>
              <div className="w-36 flex relative">
                <div className="w-full h-48 rounded-md overflow-hidden">
                  <Image
                    src={location.imgSrc}
                    alt={location.label}
                    layout="fill"
                    objectFit={'cover'}
                  />
                </div>
              </div>
              <p className=" text-center py-2 font-medium text-sm text-gray-700">
                {location.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* New Locations nearby */}
      <section className="pb-4 pt-2">
        <h2 id="locations-near-me" className="sr-only">
          New Locations Nearby
        </h2>
        <h2
          id="locations-near-me"
          className="text-gray-700 text-lg font-semibold px-4 py-4"
        >
          New Locations Nearby
        </h2>
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4 pb-4">
          {listings.map((listing, index) => (
            <div className="w-64" key={`lc-${listing._id}-${index}`}>
              <ListingCard listing={listing} amenities={false} />
            </div>
          ))}
        </div>
      </section>
      <ProductResultsSection
        list={products}
        sponsored={false}
        label={`Shop Flower near %Location%`}
      />

      {/* News Section */}
      <section>
        {sample.articles.map((post: Post, index) => (
          <div id={`${index}`} key={`article-${index}`} className="px-4">
            <BlogArticleSmall post={post} />
          </div>
        ))}
        <div className="px-4 pt-2">
          <button className="py-4 w-full uppercase text-gray-700 text-xs  text-green-500 font-bold border-t border-gray-200 tracking-widest">
            See more Articles
          </button>
        </div>
      </section>

      {/* Print Publication */}
      <section className="pb-4 pt-2">
        <h2 id="publications" className="sr-only">
          Subscribe to our Print Publication
        </h2>
        <h2
          id="publications"
          className="text-gray-700 text-lg font-semibold px-4 py-4"
        >
          Subscribe to our Print Publication
        </h2>
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4 pb-4">
          {publications.map((location, index) => (
            <div key={`lc-${index}`}>
              <div className="w-36 flex relative">
                <div className="w-full h-48 rounded-md overflow-hidden">
                  <Image
                    src={location.imgSrc}
                    alt={location.label}
                    layout="fill"
                    objectFit={'cover'}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pt-2">
          <button
            className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest"
            onClick={() => {}}
          >
            <span>Subscribe Now</span>
          </button>
        </div>
      </section>

      {/* Start Growing your Business */}
      <section className="p-4 pb-6 bg-gray-800">
        <div className="w-full pb-full rounded-md relative overflow-hidden mb-5">
          <Image
            src={ClaimBusiness}
            alt={'Claim Business'}
            layout="fill"
            objectFit={'cover'}
          />
        </div>

        <h2 className="text-green-100 text-2xl font-bold pb-2.5">
          Start Growing Your Business
        </h2>
        <p className="text-lg text-white pb-6">
          People are looking for businesses just like yours. Claim and manage
          your listing on Cannapages and make it easier for people to find you.
        </p>
        <button
          className="p-4 rounded-md bg-green-100 w-max  text-green-600 text-sm font-semibold border-gray-200"
          onClick={() => {}}
        >
          <span>Claim your Business</span>
        </button>
      </section>
    </div>
  );
}
