import { ArrowLeftIcon, StarIcon } from '@heroicons/react/solid';
import {
  BookmarkIcon,
  GlobeIcon,
  InformationCircleIcon,
  MapIcon,
  PhoneIcon,
  ShareIcon,
  StarIcon as StarIconOutline,
} from '@heroicons/react/outline';
import {
  IconFacebook,
  IconInsta,
  Sativa,
} from '../../../public/assets/icons/iconComponents';
import React, { useEffect, useState } from 'react';
import { faqs, listings, reviews } from '@/helpers/mockData';

import AboutUsSlideOver from '../../../src/views/slideOver/AboutUsSlideOver';
import AmenitiesSection from '../../../src/components/sections/AmenitiesSection';
import BusinessMenuSlideOver from '../../../src/views/slideOver/BusinessMenuSlideOver';
import BusinessVerificationSlideOver from '../../../src/views/slideOver/BusinessVerifiedSlideOver';
import { Dispensary } from '../../../src/interfaces/searchDispensary';
import FaqSlideOver from '../../../src/views/slideOver/FaqSlideOver';
import Image from 'next/image';
import ListingCardDropdown from '../../../src/components/listings/ListingCardDropDown';
import Map from '@/public/assets/images/png/map-mock.png';
import ReviewsSlideOver from '../../../src/views/slideOver/ReviewsSlideOver';
import SvgIconTwitter from '../../../public/assets/icons/iconComponents/IconTwitter';
import { getDocument } from '../../../src/actions/search';
import { useRouter } from 'next/router';
import { SearchHits } from '@/interfaces/searchHits';
import Link from 'next/link';

export default function BusinessDetail() {
  const router = useRouter();
  const { bid } = router.query;
  const [view, setView] = useState('');
  const [dispensary, setDispensary] = useState<Dispensary>();
  const [sort, setSort]: any = useState('relevance');
  const listing = listings[0];

  useEffect(() => {
    if (bid) {
      getDocument(bid).then((document: SearchHits) => {
        if (document) {
          const result = document.hits.hits[0];
          setDispensary(result as unknown as Dispensary);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="bg-white">
      <div className="w-full h-64 relative">
        {/* <Image
          src={listing.image}
          layout="fill"
          objectFit={"cover"}
          alt={listing.name}
        /> */}

        <div className="absolute w-full relative h-full bg-gray-200 z-0">
          <Sativa fill="black" opacity={0.2} className="w-full h-full" />
        </div>
        <button
          onClick={() => router.back()}
          className="bg-white rounded-full shadow-sm absolute w-10 h-10 flex items-center justify-center left-0 top-0 z-30 m-4"
        >
          <ArrowLeftIcon className="text-gray-700 w-4" />
        </button>
        <div className="absolute flex space-x-6 right-0 top-0 z-30 m-4">
          <button
            onClick={() => router.back()}
            className="bg-white rounded-full shadow-sm  w-10 h-10 flex items-center justify-center"
          >
            <BookmarkIcon className="text-gray-700 w-4" />
          </button>
          <button
            onClick={() => router.back()}
            className="bg-white rounded-full shadow-sm  w-10 h-10 flex items-center justify-center"
          >
            <ShareIcon className="text-gray-700 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4 pb-0 shadow-md pb-2">
        <section aria-labelledby="business-heading">
          <h2 id="business-heading" className="sr-only">
            {dispensary?._source.name}
          </h2>
          <h2 className="text-gray-700 text-2xl font-semibold">
            {dispensary?._source.name}
          </h2>
          <div className="grid gap-2 grid-flow-row auto-rows-max border-b border-gray-200 text-sm text-gray-500 pt-2 pb-4">
            <div className="flex items-center ">
              <StarIcon
                className={`flex-shrink-0 h-5 w-5 text-yellow-400`}
                aria-hidden="true"
              />
              <p className="p">
                <span>
                  {typeof dispensary?._source.field_rating !== 'undefined'
                    ? parseFloat(
                        dispensary?._source.field_rating[0] as string
                      ).toFixed(1)
                    : ''}
                </span>
                ({dispensary?._source.field_reviews_count}) Reviews
              </p>
            </div>
            <div className="flex">
              <p>{dispensary?._source._type}</p>
              <span className="px-1 text-normal">&#8226;&nbsp;</span>
              {/* Need current location from */}
              {/* <p>{listing.distance}</p> */}
              <span className="px-1 text-normal">&#8226;</span>
              <p>$$$</p>
            </div>
            <div className="flex justify-between">
              {/* <div className="flex">
                <p className="text-normal text-blue-500">Open</p>
                <span className="px-1 text-normal">&#8226;</span>
                <p>Closes {listing.closeTime}</p>
              </div> */}
              <div className="flex">
                <InformationCircleIcon className="w-5 h-5" />
                <p className="pl-1">See Operating Hours</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 grid-flow-col auto-cols-max w-full pt-3">
            <button className="text-gray-500 flex flex-wrap justify-center py-2">
              <PhoneIcon className="w-6 h-6 " />
              <span className="w-full text-center text-xs">Call</span>
            </button>
            <button className="text-gray-500 flex flex-wrap justify-center py-2">
              <MapIcon className="w-6 h-6 " />
              <span className="w-full text-center text-xs">Directions</span>
            </button>
            <button className="text-gray-500 flex flex-wrap justify-center py-2">
              <GlobeIcon className="w-6 h-6 " />
              <span className="w-full text-center text-xs">Website</span>
            </button>
            <button className="text-gray-500 flex flex-wrap justify-center py-2">
              <StarIconOutline className="w-6 h-6 " />
              <span className="w-full text-center text-xs">Review</span>
            </button>
          </div>
        </section>
      </div>
      <div className="py-4">
        <BusinessMenuSlideOver
          dispensary={dispensary}
          active={view === 'menu' ? true : false}
          setView={setView}
        />
      </div>

      <div className="px-4 space-y-4">
        <AboutUsSlideOver dispensary={dispensary} />
        <BusinessVerificationSlideOver dispensary={dispensary} />
        {/* Map */}
        <section className="pt-10 pb-4">
          <h2 className="sr-only">Location</h2>

          <div className="w-full h-48 relative rounded-lg overflow-hidden">
            <Image
              unoptimized
              src={Map}
              layout="fill"
              objectFit={'cover'}
              alt={'Map'}
            />
          </div>

          <div className="text-lg text-gray-500 w-full grid grid-flow-row auto-rows-max gap-2">
            <h2 className="text-lg text-gray-700 font-semibold pt-3 ">
              Location
            </h2>
            <p className="text-gray-700 w-full">
              {dispensary?._source.address_line1[0]}
              <br />
              {dispensary?._source.locality[0]},{' '}
              {dispensary?._source.administrative_area}
            </p>
            {/* <p>{listing.distance} away</p> */}
          </div>
          <div className="pt-5 ">
            <button className="py-4 w-full uppercase text-gray-700 text-xs font-semibold border-t border-gray-200 tracking-widest text-green">
              Get Directions
            </button>
          </div>
        </section>
        {/* Socials */}
        <section className="py-2">
          <h2 id="business-socilas" className="sr-only">
            Find us on Social Media
          </h2>
          <h2
            id="business-socilas"
            className="text-lg text-gray-700 font-semibold"
          >
            Find us on Social Media
          </h2>

          <div className="grid grid-flow-row auto-rows-max ">
            <div className="pt-5 ">
              {typeof dispensary?._source.field_facebook !== 'undefined' && (
                <Link
                  href={`${dispensary?._source.field_facebook[0]}`}
                  passHref
                >
                  <a>
                    <button className="py-4 w-full text-gray-700 flex items-center justify-start ">
                      <IconFacebook className="w-10 h-10 text-gray-400" />
                      <span className="pl-4 text-sm">
                        {dispensary?._source.field_facebook[0]}
                      </span>
                    </button>{' '}
                  </a>
                </Link>
              )}
              {typeof dispensary?._source.field_twitter !== 'undefined' && (
                <Link href={`${dispensary?._source.field_twitter[0]}`}>
                  <a>
                    <button className="py-4 w-full text-gray-700 flex items-center justify-start">
                      <SvgIconTwitter className="w-10 h-10 text-gray-400" />

                      <span className="pl-4 text-sm">
                        {dispensary?._source.field_twitter[0]}
                      </span>
                    </button>
                  </a>
                </Link>
              )}
              {typeof dispensary?._source.field_instagram !== 'undefined' && (
                <Link href={`${dispensary?._source.field_instagram[0]}`}>
                  <a>
                    {' '}
                    <button className="py-4 w-full text-gray-700 flex items-center justify-start   ">
                      <IconInsta className="w-10 h-10 text-gray-400" />
                      <span className="pl-4 text-sm">
                        {dispensary?._source.field_instagram[0]}
                      </span>
                    </button>{' '}
                  </a>
                </Link>
              )}
            </div>
          </div>
        </section>
        {/* Hours of Operation */}
        <section>
          <h2 id="business-hours" className="sr-only">
            Opening Hours
          </h2>
          <h2
            id="business-hours"
            className="text-lg text-gray-700 font-semibold pb-4 pt-1 w-full border-b border-gray-200"
          >
            Opening Hours
          </h2>{' '}
          {typeof dispensary?._source.field_monday_hours !== 'undefined' && (
            <>
              <div className="text-gray-700 pt-2">
                <p className="py-3 flex justify-between items-center">
                  Sunday{' '}
                  <span>
                    {dispensary?._source.field_sunday_hours
                      ? dispensary?._source.field_sunday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Monday{' '}
                  <span>
                    {dispensary?._source.field_monday_hours
                      ? dispensary?._source.field_monday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Tuesday{' '}
                  <span>
                    {dispensary?._source.field_tuesday_hours
                      ? dispensary?._source.field_tuesday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Wednesday{' '}
                  <span>
                    {dispensary?._source.field_wednesday_hours
                      ? dispensary?._source.field_wednesday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Thursday{' '}
                  <span>
                    {dispensary?._source.field_thursday_hours
                      ? dispensary?._source.field_thursday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Friday{' '}
                  <span>
                    {dispensary?._source.field_friday_hours
                      ? dispensary?._source.field_friday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Saturday{' '}
                  <span>
                    {dispensary?._source.field_saturday_hours
                      ? dispensary?._source.field_saturday_hours
                      : 'Not Available'}
                  </span>
                </p>
              </div>
            </>
          )}
        </section>
        {/* Need Review FAQ  and amenities Data */}
        <FaqSlideOver name={dispensary?._source.name[0]} faqs={faqs} />
        <ReviewsSlideOver dispensary={dispensary} reviews={reviews} />
        <AmenitiesSection
          amenities={['amenity', 'amenity', 'amenity', 'amenity']}
        />
        {/* Also Viewed */}
      </div>
      <section className="pb-4 pt-2">
        <h2 id="related-businesses" className="sr-only">
          People Also Viewed
        </h2>
        <h2
          id="related-businesses"
          className="text-gray-700 text-lg font-semibold px-4 pb-5"
        >
          People Also Viewed
        </h2>
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4">
          {listings.map((listing, index) => (
            <div className="w-64" key={`lc-${listing._id}-${index}`}>
              <ListingCardDropdown listing={listing} amenities={false} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
