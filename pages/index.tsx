import {
  ArrowsExpandIcon,
  LocationMarkerIcon,
  TagIcon,
} from '@heroicons/react/solid';
import {
  browseBy,
  combinedSearchQuery,
  getPopular,
  receiveResults,
} from '@/actions/search';
import { listings, products } from '@/helpers/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Background from '@/public/assets/images/png/fullBloom.png';
import BlogArticleSmall from '@/components/blog/BlogArticleCardSmall';
import ClaimBusiness from '@/public/assets/images/png/growBusiness.png';
import { Coupon } from '@/interfaces/coupon';
import CouponSlideOver from '@/views/slideOver/CouponsSlideOver';
import { Dispensary } from '@/interfaces/dispensary';
import Image from 'next/image';
import Link from 'next/link';
import ListingCard from '@/components/listings/ListingCard';
import Logo from '@/public/assets/logos/logo.png';
import LogoText from '@/public/assets/logos/logo-text.png';
import Map from '@/public/assets/images/png/mapColor.png';
import { Post } from '@/interfaces/post';
import { Product } from '@/interfaces/product';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import { RootState } from '@/reducers';
import { SearchHits } from '@/interfaces/searchHits';
import SearchSlideOver from '@/components/forms/fields/SearchSlideOver';
import { destinations } from '@/helpers/destinations';
import { publications } from '@/helpers/publications';
import { useRouter } from 'next/router';

export default function Home() {
  const { lat, lon } = useSelector((root: RootState) => root.location);
  const location = useSelector((root: RootState) => root.location);
  const [nearby, setNearby] = useState<Array<Dispensary>>();
  const [flower, setFlower] = useState<Array<Product>>();
  const [blogs, setBlogs] = useState<Array<Post>>();
  const [deals, setDeals] = useState<Array<Dispensary>>([]);
  const [coupons, setCoupons] = useState<Array<Coupon>>();
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleDestinationClick(
    coords: { lat: number; lon: number },
    city: string
  ) {
    dispatch(
      receiveResults({
        searchLocation: {
          coords: {
            lat: coords.lat,
            lon: coords.lon,
            city: city,
          },
        },
      })
    );
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getDispensaryResults() {
    const hits: any = await combinedSearchQuery({
      endpoints: ['dispenaries'],
      coords: { lat: location.lat, lon: location.lon },
    });

    // Sort by created date
    if (hits) {
      hits.sort((a: any, b: any) =>
        a._source.created[0] < b._source.created[0] ? 1 : -1
      );
    }
    setNearby(hits);
  }

  async function getFlower() {
    const hits: SearchHits = await browseBy('category', 'Flower', 'products');
    setFlower(hits.hits.hits);
  }

  async function getBlogs() {
    const hits: any = await combinedSearchQuery({
      q: '*',
      endpoints: ['blogs'],
      total: 5,
    });

    setBlogs(hits);
  }

  async function getDeals(data: Coupon[]) {
    const ids = data.map(index => index._source.dispensary[0]);

    const hits: SearchHits = await browseBy(
      'id',
      `*`,
      'dispenaries',
      {
        key: 'id',
        value: ids,
      },
      true
    );
    setDeals(hits.hits.hits as unknown as Dispensary[]);
  }

  async function getPopularItems(type: string) {
    const hits: SearchHits = await getPopular(type);
    setCoupons(hits.hits.hits);
  }

  useEffect(() => {
    if (location.city) {
      if (!coupons) {
        getPopularItems('coupons');
      }
      if (!flower) {
        getFlower();
      }

      if (!blogs) {
        getBlogs();
      }

      if (location.city && !nearby) {
        getDispensaryResults();
      }

      if (coupons?.length && !deals.length) {
        getDeals(coupons);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, coupons, flower, blogs, nearby]);

  return (
    <div className="mx-auto space-y-2">
      {/* Search/Map Section */}
      <section className="relative pt-16 desktop:max-w-4xl desktop:rounded-md  desktop:mx-auto desktop:shadow-md">
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
              <Link
                href={{
                  pathname: '/search',
                  query: { view: 'dispensaries' },
                }}
                passHref
              >
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <LocationMarkerIcon className="w-3.5 h-3.5 " />
                  <span>Dispensaries</span>
                </a>
              </Link>
              <Link
                href={{
                  pathname: '/search',
                  query: { category: 'Edible', view: 'shopping' },
                }}
                passHref
              >
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <TagIcon className="w-3.5 h-3.5 " />
                  <span>Edibles</span>
                </a>
              </Link>
              <Link
                href={{
                  pathname: '/search',
                  query: { view: 'deals' },
                }}
                passHref
              >
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <TagIcon className="w-3.5 h-3.5 " />
                  <span>Deals</span>
                </a>
              </Link>
              <Link
                href={{
                  pathname: '/search',
                  query: { category: 'Budder', view: 'shopping' },
                }}
                passHref
              >
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <TagIcon className="w-3.5 h-3.5 " />
                  <span>Budder</span>
                </a>
              </Link>
              <Link
                href={{
                  pathname: '/search',
                  query: { category: 'Fragrances', view: 'shopping' },
                }}
                passHref
              >
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <TagIcon className="w-3.5 h-3.5 " />
                  <span>Fragrances</span>
                </a>
              </Link>
              <Link
                href={{
                  pathname: '/search',
                  query: { category: 'Flower', view: 'shopping' },
                }}
                passHref
              >
                <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
                  <TagIcon className="w-3.5 h-3.5 " />
                  <span>Flower</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Near me section */}
      {deals && coupons && (
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
            {deals.map((listing, index) => {
              const discount =
                ((coupons[index]._source.price[0] as number) /
                  parseFloat(coupons[index]._source.discount[0] as string)) *
                100;

              return (
                <div className="w-64" key={`lc-${listing._id}-${index}`}>
                  <ListingCard
                    discount={`${
                      discount && discount !== Infinity ? discount : 0
                    }%`}
                    listing={listing}
                    amenities={false}
                  />
                </div>
              );
            })}
          </div>
          <div className="px-4 pt-2">
            <Link
              href={{ pathname: '/search', query: { view: 'deals' } }}
              passHref
            >
              <a>
                <button className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest">
                  <span>See more</span>
                </button>
              </a>
            </Link>
          </div>
        </section>
      )}

      {/* Deals of the Day */}
      <CouponSlideOver label="Deals of the Day" list={coupons as Coupon[]} />

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
                  <button
                    onClick={() =>
                      handleDestinationClick(
                        location.coords,
                        location.label
                      ).then(() => router.push('/map'))
                    }
                  >
                    <Image
                      src={location.imgSrc}
                      alt={location.label}
                      layout="fill"
                      objectFit={'cover'}
                    />
                  </button>
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

        {nearby && (
          <div className="grid grid-flow-col auto-cols-max  gap-2 overflow-scroll pl-4 pb-4">
            {nearby.map((listing, index) => (
              <div className="w-64" key={`lc-${listing._id}-${index}`}>
                <ListingCard
                  listing={listing}
                  amenities={false}
                  userCoords={{ lat: lat, lon: lon }}
                />
              </div>
            ))}
          </div>
        )}
      </section>
      <ProductResultsSection
        list={flower as Product[]}
        sponsored={false}
        label={`Shop Flower near ${location.city}`}
        link={'/search?category=Flower&view=shopping'}
      />

      {/* News Section */}
      {blogs && (
        <section>
          {blogs.map((post: Post, index) => (
            <div id={`${index}`} key={`article-${index}`} className="px-4">
              <BlogArticleSmall post={post} />
            </div>
          ))}
          <div className="px-4 pt-2">
            <Link href="/blog" passHref>
              <a>
                <button className="py-4 w-full uppercase text-gray-700 text-xs  text-green-500 font-bold border-t border-gray-200 tracking-widest">
                  See more Articles
                </button>
              </a>
            </Link>
          </div>
        </section>
      )}

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
        <Link href="/business/claim" passHref>
          <a>
            <button
              className="p-4 rounded-md bg-green-100 w-max  text-green-600 text-sm font-semibold border-gray-200"
              onClick={() => {}}
            >
              <span>Claim your Business</span>
            </button>
          </a>
        </Link>
      </section>
    </div>
  );
}
