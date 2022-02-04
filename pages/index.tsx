import {
  ArrowsExpandIcon,
  LocationMarkerIcon,
  TagIcon,
} from '@heroicons/react/solid';
import {
  browseBy,
  combinedSearchQuery,
  receiveResults,
} from '@/actions/search';
import { formatDealCard, formatDispensaryCard } from '@/helpers/formatters';
import { searchDealsNearMe, searchFeaturedDeals } from '@/actions/deals';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Background from '@/public/assets/images/png/fullBloom.png';
import BlogArticleCardSlide from '@/components/blog/BlogArticleCardSlide';
import BlogArticleSmall from '@/components/blog/BlogArticleCardSmall';
import ClaimBusiness from '@/public/assets/images/png/growBusiness.png';
import { Coupon } from '@/interfaces/coupon';
import CouponSlideOver from '@/views/slideOver/CouponsSlideOver';
import { DealsState } from '@/interfaces/coupon';
import { Dispensary } from '@/interfaces/dispensary';
import Image from 'next/image';
import ImageWithFallback from '@/components/image/ImageWithFallback';
import Link from 'next/link';
import ListingCard from '@/components/listings/ListingCard';
import Logo from '@/public/assets/logos/logo.png';
import LogoText from '@/public/assets/logos/logo-text.png';
import Map from '@/public/assets/images/png/mapColor.png';
import NewsletterHero from '@/public/assets/images/png/newsletter/newsletter-hero.png';
import { Post } from '@/interfaces/post';
import { Product } from '@/interfaces/product';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import { RootState } from '@/reducers';
import { SearchHits } from '@/interfaces/searchHits';
import SearchSlideOver from '@/components/forms/fields/SearchSlideOver';
import { destinations } from '@/helpers/destinations';
import { publications } from '@/helpers/publications';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';

export default function Home() {
  const { deals, featuredDeals } = useSelector(
    (root: RootState): DealsState => root.deals
  );
  const location = useSelector((root: RootState) => root.location);
  const [nearby, setNearby] = useState<Array<Dispensary>>();
  const [flower, setFlower] = useState<Array<Product>>();
  const [blogs, setBlogs] = useState<Array<Post>>();
  const dispatch = useDispatch();
  const [dispatchSearch] = useAxios(false);
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

  function getDeals() {
    dispatchSearch(searchDealsNearMe('All'));
    dispatchSearch(searchFeaturedDeals());
  }

  useEffect(() => {
    if (location.city) {
      if (!flower) {
        getFlower();
      }

      if (!blogs) {
        getBlogs();
      }

      if (location.city && !nearby) {
        getDispensaryResults();
      }

      getDeals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, flower, blogs, nearby]);

  return (
    <div className="space-y-2">
      {/* Search/Map Section Desktop*/}

      <div className="bg-white overflow-hidden hidden lg:inline">
        <div className="w-full h-min relative bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-white pb-8 lg:max-w-2xl lg:w-full py-20 z-10">
              <svg
                className="block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2 text-white z-0"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>

              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
                <div className="sm:text-center lg:text-left">
                  <div className="space-x-2 flex justify-center items-center pb-4">
                    <div>
                      <Image
                        width={102}
                        height={108}
                        src={Logo}
                        alt="Image logo"
                      />
                    </div>
                    <div className="mt-2">
                      <Image
                        width={342}
                        height={80}
                        src={LogoText}
                        alt="Image logo"
                      />
                    </div>
                  </div>
                  <div className="z-10">
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
                      <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex hover:bg-green-50 ease-in-out transition-all duration-200	 items-center space-x-1-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex items-center space-x-1">
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
                      <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex hover:bg-green-50 ease-in-out transition-all duration-200	 items-center space-x-1">
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
                      <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex hover:bg-green-50 ease-in-out transition-all duration-200	 items-center space-x-1">
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
                      <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex hover:bg-green-50 ease-in-out transition-all duration-200	 items-center space-x-1">
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
                      <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex hover:bg-green-50 ease-in-out transition-all duration-200	 items-center space-x-1">
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
                      <a className="rounded-full text-sm text-green-400 border border-green-400 py-2 pr-4 pl-2.5 bg-white z-10 flex hover:bg-green-50 ease-in-out transition-all duration-200	 items-center space-x-1">
                        <TagIcon className="w-3.5 h-3.5" />
                        <span>Flower</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0  w-1/2 z-0">
            <Image src={Map} alt="Map" layout="fill" objectFit={'cover'} />
          </div>
          <Link href="/map" passHref>
            <a className="absolute z-10 flex rounded-full bg-gray-50 shadow p-1 right-0 bottom-0 mb-4 mr-4 focus:outline-none lg:animate-bounce	">
              <button className="focus:outline-none">
                <ArrowsExpandIcon className="w-8 h-8 text-gray-700" />
              </button>
            </a>
          </Link>
        </div>
      </div>
      {/* Search/Map Section Mobile */}
      <section className="lg:hidden relative pt-16 lg:max-w-4xl lg:rounded-md  lg:mx-auto lg:shadow-md ">
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
      {deals.length > 0 && (
        <section className="pb-4 pt-2">
          <h2 id="deals-near-me" className="sr-only">
            Deals Near Me
          </h2>
          <h2
            id="deals-near-me"
            className="text-gray-700 text-lg lg:text-2xl  font-semibold px-4 py-4"
          >
            Deals Near Me
          </h2>
          <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4 pb-4">
            {deals.map((listing, index) => {
              return (
                <div className="w-64" key={`lc-${listing._id}-${index}`}>
                  <ListingCard {...formatDealCard(listing)} />
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
      {featuredDeals.length > 0 && (
        <CouponSlideOver
          label="Deals of the Day"
          list={featuredDeals as Coupon[]}
        />
      )}

      {/* Featured Destinations */}
      <section className="pb-4 pt-2 lg:px-8 w-full overflow-scroll">
        <h2 id="featured-destinations" className="sr-only">
          Featured Destinations
        </h2>
        <h2
          id="featured-destinations"
          className="text-gray-700 text-lg lg:text-2xl font-semibold px-4 py-4"
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
      <section className="pb-4 pt-2 lg:px-8 w-full overflow-scroll">
        <h2 id="locations-near-me" className="sr-only">
          New Locations Nearby
        </h2>
        <h2
          id="locations-near-me"
          className="text-gray-700 text-lg lg:text-2xl font-semibold px-4 py-4"
        >
          New Locations Nearby
        </h2>

        {nearby && (
          <div className="grid grid-flow-col auto-cols-max  gap-2 overflow-scroll pl-4 pb-4 ">
            {nearby.map((listing, index) => (
              <div className="w-64" key={`lc-${listing._id}-${index}`}>
                <ListingCard {...formatDispensaryCard(listing)} />
              </div>
            ))}
          </div>
        )}
      </section>
      <div className="lg:px-8 w-full overflow-scroll">
        <ProductResultsSection
          list={flower as Product[]}
          sponsored={false}
          label={`Shop Flower near ${location.city}`}
          link={'/search?category=Flower&view=shopping'}
        />
      </div>

      {/* News Section */}
      {blogs && (
        <section className="lg:px-8 w-full">
          <h2 id="blogs" className="sr-only">
            Dispatches from the Highlands
          </h2>
          <h2
            id="blogs"
            className="text-gray-700 text-lg lg:text-2xl font-semibold px-4 py-4"
          >
            Dispatches from the Highlands
          </h2>
          <div className=" hidden lg:grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-6 ">
            {blogs.map((post: Post, index) => (
              <div id={`${index}`} key={`article-${index}`}>
                <BlogArticleCardSlide post={post} />
              </div>
            ))}
          </div>
          <div className="lg:hidden block p-4">
            {blogs.map((post: Post, index) => (
              <div
                id={`${index}`}
                key={`article-${index}`}
                className="col-span-1"
              >
                <BlogArticleSmall post={post} />
              </div>
            ))}
          </div>
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

      {/* Print Publication Mobile*/}
      <section className="pb-4 pt-2 lg:px-8 w-full overflow-scroll lg:hidden">
        <h2 id="publications" className="sr-only">
          Subscribe to our Print Publication
        </h2>
        <h2
          id="publications"
          className="text-gray-700 text-lg lg:text-2xl font-semibold px-4 py-4"
        >
          Subscribe to our Print Publication
        </h2>
        <div className="grid grid-flow-col auto-cols-max grid-flow-auto gap-2 overflow-scroll pl-4 pb-4">
          {publications.map((publication, index) => (
            <div key={`lc-${index}`} className="col-span-1">
              <div className="w-36 lg:w-48 flex relative">
                <div className="w-full h-48 lg:h-64 rounded-md overflow-hidden">
                  <Image
                    src={publication.imgSrc}
                    alt={publication.label}
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
      {/* Print Publication Desktop*/}

      <section className=" w-full relative overflow-hidden hidden lg:block">
        <div className="max-w-7xl mx-auto w-full grid grid-flow-col gap-2">
          <div className="z-10 relative h-full">
            <div className="absolute bottom-8 right-0">
              <h2 id="publications" className="sr-only">
                Subscribe to our Print Publication
              </h2>
              <h2
                id="publications"
                className="text-white text-4xl font-semibold"
              >
                Subscribe to our Print Publication
              </h2>
              <button
                className="p-4 mt-4 rounded-md bg-green-100 w-max  text-green-600 text-sm font-semibold border-gray-200"
                onClick={() => {}}
              >
                <span>Subscribe Now</span>
              </button>
            </div>
          </div>
          <div className="relative h-72 w-full overflow-hidden">
            <div className="absolute left-20 -bottom-32 z-10">
              <Image
                src={NewsletterHero}
                alt={'Newsletter'}
                layout="intrinsic"
                width={400}
                height={400}
                objectFit={'cover'}
              />
            </div>
          </div>
        </div>
        <div className="absolute w-full bg-green-400 p- z-0 bottom-0 h-3/5"></div>
      </section>

      {/* Start Growing your Business */}
      <div className="lg:py-16">
        <section className="p-4 bg-gray-800 lg:max-w-7xl lg:rounded-md mx-auto lg:grid lg:grid lg:grid-flow-col gap-4 lg:shadow-md">
          <div className="w-full pb-full lg:h-64 lg:w-64 rounded-md relative overflow-hidden mb-5 lg:mb-0 ">
            <Image
              src={ClaimBusiness}
              alt={'Claim Business'}
              layout="fill"
              objectFit={'cover'}
            />
          </div>

          <div className="p-4 w-auto">
            <h2 className="text-green-100 text-2xl lg:text-4xl font-bold pb-2.5">
              Start Growing Your Business
            </h2>
            <p className="text-lg lg:text-2xl text-white pb-6 whitespace-normal">
              People are looking for businesses just like yours. Claim and
              manage your listing on Cannapages and make it easier for people to
              find you.
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
          </div>
        </section>
      </div>
    </div>
  );
}
