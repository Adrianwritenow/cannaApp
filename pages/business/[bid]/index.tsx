import { ArrowLeftIcon, StarIcon } from '@heroicons/react/solid';
import {
  GlobeIcon,
  InformationCircleIcon,
  MapIcon,
  PhoneIcon,
  StarIcon as StarIconOutline,
} from '@heroicons/react/outline';
import { IconFacebook, IconInsta } from '@/public/assets/icons/iconComponents';
import React, { useEffect, useState } from 'react';
import { combinedSearchQuery, getDocument } from '@/actions/search';

import AboutUsSlideOver from '@/views/slideOver/AboutUsSlideOver';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import BusinessMenuSlideOver from '@/views/slideOver/business/BusinessMenuSlideOver';
import BusinessReviewSlideOver from '@/views/slideOver/business/BusinessReviewSlideOver';
import BusinessVerificationSlideOver from '@/views/slideOver/business/BusinessVerifiedSlideOver';
import { Dispensary } from '@/interfaces/dispensary';
import FaqSlideOver from '@/views/slideOver/FaqSlideOver';
import ImageWithFallback from '@/components/image/ImageWithFallback';
import Link from 'next/link';
import ListingCardDropdown from '@/components/listings/ListingCardDropDown';
import OpenIndicator from '@/helpers/OpenStatus';
import { RootState } from '@/reducers';
import { SearchHits } from '@/interfaces/searchHits';
import SmallMap from '@/components/map/businessPageMap/SmallMap';
import SocialShare from '@/components/share/SocialShare';
import SvgIconTwitter from '@/public/assets/icons/iconComponents/IconTwitter';
import getDistanceFrom from '@/helpers/getDistanceFrom';
import moment from 'moment-timezone';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function BusinessDetail() {
  const router = useRouter();
  const { bid } = router.query;
  const [view, setView] = useState('');
  const [distanceFrom, setDistanceFrom] = useState('');
  const [dispensary, setDispensary] = useState<Dispensary>();
  const [timezone, setTimezone] = useState('');
  const [sort, setSort]: any = useState('relevance');
  const { lat, lon } = useSelector((root: RootState) => root.location);
  const location = useSelector((root: RootState) => root.location);
  const [viewed, setViewed] = useState<Array<Dispensary>>();

  let today = moment.tz(timezone).format('dddd');

  useEffect(() => {
    getDocument(bid, 'dispenaries').then((document: SearchHits) => {
      if (document) {
        const result = document.hits.hits[0];
        setDispensary(result as Dispensary);
      }
    });

    if (dispensary && lat && lon) {
      const isEmpty = Object.values({ lat, lon }).every(
        x => x === null || x === undefined
      );
      if (!isEmpty) {
        const distance = getDistanceFrom(
          { lat: lat, lon: lon },
          {
            lat: dispensary._source.lat,
            lon: dispensary._source.lon,
          }
        );
        setDistanceFrom(distance);
      }
      if (dispensary && timezone === '') {
        switch (dispensary?._source.time_zone[0]) {
          case 'EST':
            setTimezone('America/New_York');
            break;
          case 'CST':
            setTimezone('America/Chicago');
            break;
          case 'MST':
            setTimezone('America/Denver');
            break;
          case 'PST':
            setTimezone('America/Los_Angeles');
            break;
        }
      }
    }

    async function getDispensaryResults() {
      const hits: any = await combinedSearchQuery({
        endpoints: ['dispenaries'],
        coords: { lat: location.lat, lon: location.lon },
      });
      setViewed(hits);
    }

    if (location.city && !viewed) {
      getDispensaryResults();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  // }, [lat, lon, dispensary, router]); //

  return dispensary ? (
    <div className="bg-white">
      {dispensary && (
        <div className="w-full h-64 relative">
          <ImageWithFallback
            src={`${process.env.API_URL}${
              typeof dispensary._source.url === 'undefined'
                ? '#'
                : dispensary._source.url[0].includes('image_missing')
                ? '#'
                : dispensary._source.url[0]
            }`}
            alt={dispensary._source?.name}
            layout="fill"
            objectFit={'cover'}
          />

          <button
            onClick={() => router.back()}
            className="bg-white rounded-full shadow-sm absolute w-10 h-10 flex items-center justify-center left-0 top-0 z-5 m-4"
          >
            <ArrowLeftIcon className="text-gray-700 w-4" />
          </button>
          <div className="absolute flex space-x-6 right-0 top-0 z-5 m-4">
            {/****** Need saving favorites working ******/}
            {/* <button
            onClick={() => router.back()}
            className="bg-white rounded-full shadow-sm  w-10 h-10 flex items-center justify-center"
          >
            <BookmarkIcon className="text-gray-700 w-4" />
          </button> */}
            <div className="bg-white rounded-full shadow-sm  w-10 h-10 flex items-center justify-center">
              <SocialShare iconStyles="text-gray-700 w-4" />
            </div>
          </div>
        </div>
      )}
      <div className="p-4 pb-0 shadow-md pb-2">
        <section aria-labelledby="business-heading">
          <h2 id="business-heading" className="sr-only">
            {dispensary._source.name}
          </h2>
          <h2 className="text-gray-700 text-2xl font-semibold">
            {dispensary._source.name}
          </h2>
          <div className="grid gap-2 grid-flow-row auto-rows-max border-b border-gray-200 text-sm text-gray-500 pt-2 pb-4">
            <div className="flex items-center ">
              {typeof dispensary._source.rating !== 'undefined' ? (
                <>
                  <StarIcon
                    className={`flex-shrink-0 h-5 w-5 text-yellow-400`}
                    aria-hidden="true"
                  />
                  <p className="p">
                    <span className="font-bold text-gray-700">
                      {dispensary?._source.rating[0]}
                    </span>{' '}
                    ({dispensary._source.reviews_count} Reviews)
                  </p>
                </>
              ) : (
                <em>No Reviews</em>
              )}
            </div>
            <div className="flex">
              <p>Dispensary</p>
              {/* <span className="px-1 text-normal">&#8226;</span>
              <p>$$$</p> */}
              {/*****  Need current location from *****/}
              <span className="px-1 text-normal">&#8226;</span>
              {distanceFrom ? (
                <p>{distanceFrom ? distanceFrom : null}les away</p>
              ) : null}

              {/***** Need pricing info *****/}
            </div>
            <div className="flex justify-between">
              {typeof dispensary?._source !== 'undefined' && (
                <OpenIndicator dispensary={dispensary} />
              )}
              <div className="flex">
                <Link href="#business-hours" passHref>
                  <a className="pl-1 flex">
                    <InformationCircleIcon className=" w-5 h-5 stroke-2 mr-1" />
                    See Operating Hours
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-around auto-cols-max w-full justify-center pt-3 w-full">
            <a
              href={`tel:${dispensary._source.phone_number}`}
              className="text-gray-500 flex flex-wrap justify-center py-2"
            >
              <PhoneIcon className="w-6 h-6" />
              <span className="w-full text-center text-xs">Call</span>
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${
                dispensary._source.name
              }+${
                dispensary._source.address_line1[0]
                  ? dispensary._source.address_line1[0]
                  : dispensary._source.coordinates
              }&ll=${dispensary._source.coordinates}&z=17`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 flex flex-wrap justify-center py-2"
            >
              <MapIcon className="w-6 h-6 " />
              <span className="w-full text-center text-xs">Directions</span>
            </a>
            {dispensary._source.website !== undefined && (
              <a
                href={`${dispensary._source.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 flex flex-wrap justify-center py-2"
              >
                <GlobeIcon className="w-6 h-6 " />
                <span className="w-full text-center text-xs">Website</span>
              </a>
            )}
            <Link href="#reviews-section" passHref>
              <a className="text-gray-500 flex flex-wrap justify-center py-2">
                <StarIconOutline className="w-6 h-6 " />
                <span className="w-full text-center text-xs">Review</span>
              </a>
            </Link>
          </div>
        </section>
      </div>
      <div className="py-4">
        <BusinessMenuSlideOver dispensary={dispensary} />
      </div>
      <div className="space-y-4 px-4">
        <AboutUsSlideOver dispensary={dispensary} />
        {dispensary?._source.licenses && (
          <BusinessVerificationSlideOver dispensary={dispensary} />
        )}
        {/* Map */}
        <section className="pt-10 pb-4">
          <h2 className="sr-only">Location</h2>

          <div className="w-full h-48 relative rounded-lg overflow-hidden">
            <SmallMap
              coords={{
                lat: dispensary._source.lat[0],
                lon: dispensary._source.lon[0],
              }}
            />
          </div>

          <div className="text-lg text-gray-500 w-full grid grid-flow-row auto-rows-max gap-2">
            <h2 className="text-lg text-gray-700 font-semibold pt-3 ">
              Location
            </h2>
            <p className="text-gray-700 w-full">
              {dispensary._source.address_line1[0]}
              <br />
              {dispensary._source.locality[0]},{' '}
              {dispensary._source.administrative_area}{' '}
              {dispensary._source.postal_code[0]}
            </p>
            {/* <p>{listing.distance} away</p> */}
          </div>
          <div className="pt-5 w-full flex justify-center ">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${
                dispensary._source.name
              }+${
                dispensary._source.address_line1[0]
                  ? dispensary._source.address_line1[0]
                  : dispensary._source.coordinates
              }&ll=${dispensary._source.coordinates}&z=17`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 uppercase text-gray-700 text-xs font-semibold border-t border-gray-200 tracking-widest text-green w-full text-center"
            >
              Get Directions
            </a>
          </div>
        </section>
        {/* Socials */}
        {dispensary._source.facebook ||
        dispensary._source.twitter ||
        dispensary._source.instagram ? (
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
                {typeof dispensary._source.facebook !== 'undefined' && (
                  <a
                    href={`${dispensary._source.facebook[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="py-4 w-full text-gray-700 flex items-center justify-start ">
                      <IconFacebook className="w-10 h-10 text-gray-400" />
                      <span className="pl-4 text-sm">Facebook</span>
                    </button>
                  </a>
                )}
                {typeof dispensary._source.twitter !== 'undefined' && (
                  <a
                    href={`${dispensary?._source.twitter[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="py-4 w-full text-gray-700 flex items-center justify-start">
                      <SvgIconTwitter className="w-10 h-10 text-gray-400" />

                      <span className="pl-4 text-sm">Twitter</span>
                    </button>
                  </a>
                )}
                {typeof dispensary._source.instagram !== 'undefined' && (
                  <a
                    href={`${dispensary._source.instagram[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="py-4 w-full text-gray-700 flex items-center justify-start   ">
                      <IconInsta className="w-10 h-10 text-gray-400" />
                      <span className="pl-4 text-sm">Instagram</span>
                    </button>
                  </a>
                )}
              </div>
            </div>
          </section>
        ) : null}
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
          {typeof dispensary._source.monday_hours !== 'undefined' && (
            <>
              <div className="text-gray-700 pt-2">
                <p
                  className={`py-3 flex justify-between items-center ${
                    today === 'Sunday' && 'font-bold'
                  }`}
                >
                  Sunday{' '}
                  <span>
                    {dispensary._source.sunday_hours
                      ? dispensary._source.sunday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p
                  className={`py-3 flex justify-between items-center ${
                    today === 'Monday' && 'font-bold'
                  }`}
                >
                  Monday{' '}
                  <span>
                    {dispensary._source.monday_hours
                      ? dispensary._source.monday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p
                  className={`py-3 flex justify-between items-center ${
                    today === 'Tuesday' && 'font-bold'
                  }`}
                >
                  Tuesday{' '}
                  <span>
                    {dispensary._source.tuesday_hours
                      ? dispensary?._source.tuesday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p
                  className={`py-3 flex justify-between items-center ${
                    today === 'Wednesday' && 'font-bold'
                  }`}
                >
                  Wednesday{' '}
                  <span>
                    {dispensary._source.wednesday_hours
                      ? dispensary._source.wednesday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p
                  className={`py-3 flex justify-between items-center ${
                    today === 'Thursday' && 'font-bold'
                  }`}
                >
                  Thursday{' '}
                  <span>
                    {dispensary._source.thursday_hours
                      ? dispensary._source.thursday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p
                  className={`py-3 flex justify-between items-center ${
                    today === 'Friday' && 'font-bold'
                  }`}
                >
                  Friday{' '}
                  <span>
                    {dispensary._source.friday_hours
                      ? dispensary._source.friday_hours
                      : 'Not Available'}
                  </span>
                </p>
                <p
                  className={`py-3 flex justify-between items-center ${
                    today === 'Saturday' && 'font-bold'
                  }`}
                >
                  Saturday{' '}
                  <span>
                    {dispensary._source.saturday_hours
                      ? dispensary._source.saturday_hours
                      : 'Not Available'}
                  </span>
                </p>
              </div>
            </>
          )}
        </section>
      </div>
      {/* Need Review FAQ  and amenities Data */}

      {/* <FaqSlideOver name={dispensary?._source.name[0]} faqs={faqs} /> */}
      {/* <div id="reviews-section">
        <BusinessReviewSlideOver dispensary={dispensary} reviews={reviews} />
      </div> */}
      {dispensary?._source.amenities && (
        <div className="px-4">
          <AmenitiesSection
            amenities={dispensary._source.amenities as string[]}
          />
        </div>
      )}
      {/* Also Viewed */}
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
        {viewed && (
          <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4">
            {/* location  Based*/}
            {viewed.map((listing, index) => (
              <div className="w-64" key={`lc-${listing._id}-${index}`}>
                <ListingCardDropdown listing={listing} amenities={false} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  ) : null;
}
