import { ArrowLeftIcon, StarIcon } from '@heroicons/react/solid';
import {
  // BookmarkIcon,
  GlobeIcon,
  InformationCircleIcon,
  MapIcon,
  PhoneIcon,
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
import BusinessMenuSlideOver from '../../../src/views/slideOver/business/BusinessMenuSlideOver';
import BusinessReviewSlideOver from '@/views/slideOver/business/BusinessReviewSlideOver';
import BusinessVerificationSlideOver from '@/views/slideOver/business/BusinessVerifiedSlideOver';
import { Dispensary } from '../../../src/interfaces/searchDispensary';
import FaqSlideOver from '../../../src/views/slideOver/FaqSlideOver';
import ListingCardDropdown from '../../../src/components/listings/ListingCardDropDown';

// import ReviewsSlideOver from '../../../src/views/slideOver/ReviewsSlideOver';

import SvgIconTwitter from '../../../public/assets/icons/iconComponents/IconTwitter';
import { getDocument } from '../../../src/actions/search';
import { useRouter } from 'next/router';
import { SearchHits } from '@/interfaces/searchHits';
import Link from 'next/link';
import moment from 'moment-timezone';
import SocialShare from '@/components/share/SocialShare';
import SmallMap from '@/components/map/businessPageMap/SmallMap';

export default function BusinessDetail() {
  const router = useRouter();
  const { bid } = router.query;
  const [view, setView] = useState('');
  const [dispensary, setDispensary] = useState<Dispensary>();
  const [sort, setSort]: any = useState('relevance');
  const listing = listings[0];
  const [isOpen, setIsOpen] = useState(false);
  const [willOpenToday, setWillOpenToday] = useState(false);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [dispensaryTimezone, setDispensaryTimezone] = useState('');
  const [tomorrowOpenTime, setTomorrowOpenTime] = useState('');

  let now = moment();

  const currentTimeIsBetweenTzTime = (
    currentTime = new Date(),
    tmz: string,
    startTime: string,
    endTime: string,
    fmt = 'h:mma'
  ) => {
    const time = moment.tz(currentTime, tmz);
    const start = moment.tz(startTime, fmt, tmz);
    const end = moment.tz(endTime, fmt, tmz);
    return (
      time.isBetween(start, end) ||
      time.isBetween(start.subtract(1, 'day'), end.subtract(1, 'day')) ||
      time.isBetween(start.add(2, 'day'), end.add(2, 'day'))
    );
  };

  function getSourceValue(key: keyof Dispensary['_source']) {
    if (dispensary && Object.keys(dispensary._source).includes(key)) {
      return key as keyof Dispensary['_source'];
    }
    throw Error('key not found');
  }

  useEffect(() => {
    if (bid) {
      getDocument(bid).then((document: SearchHits) => {
        if (document) {
          const result = document.hits.hits[0];
          setDispensary(result as Dispensary);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (dispensary && dispensaryTimezone === '') {
      switch (dispensary?._source.field_time_zone[0]) {
        case 'EST':
          setDispensaryTimezone('America/New_York');
          break;
        case 'CST':
          setDispensaryTimezone('America/Chicago');
          break;
        case 'MST':
          setDispensaryTimezone('America/Denver');
          break;
        case 'PST':
          setDispensaryTimezone('America/Los_Angeles');
          break;
      }
    } else if (dispensary && dispensaryTimezone) {
      const todayKey = getSourceValue(
        `field_${now
          .tz(dispensaryTimezone)
          .format('dddd')
          .toLowerCase()}_hours` as keyof Dispensary['_source']
      );
      const tomorrowKey = getSourceValue(
        `field_${moment()
          .add(1, 'days')
          .tz(dispensaryTimezone)
          .format('dddd')
          .toLowerCase()}_hours` as keyof Dispensary['_source']
      );

      const todayHours = (dispensary?._source[todayKey][0] as string).split(
        ' - '
      );
      const tomorrowHours = (
        dispensary?._source[tomorrowKey][0] as string
      ).split(' - ');
      const todayOpenTime = todayHours[0];
      const todayCloseTime = todayHours[1];
      const tomorrowOpenTime = tomorrowHours[0];
      const todayOpenMoment = moment.tz(
        todayOpenTime,
        'h:mmA',
        dispensaryTimezone
      );

      setOpenTime(todayOpenTime);
      setCloseTime(todayCloseTime);
      setTomorrowOpenTime(tomorrowOpenTime);
      setIsOpen(
        currentTimeIsBetweenTzTime(
          new Date(),
          dispensaryTimezone,
          todayOpenTime,
          todayCloseTime
        )
      );

      if (moment().tz(dispensaryTimezone).isBefore(todayOpenMoment)) {
        setWillOpenToday(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispensary, dispensaryTimezone]);

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
                  {dispensary?._source.field_rating[0] !== ''
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

              {/*****  Need current location from *****/}
              {/* <span className="px-1 text-normal">&#8226;&nbsp;</span>
              <p>{listing.distance}</p> */}

              {/***** Need pricing info *****/}
              {/* <span className="px-1 text-normal">&#8226;</span>
              <p>$$$</p> */}
              
            </div>
            <div className="flex justify-between">
              <div className="flex">
                {isOpen ? (
                  <p className="text-normal text-blue-500">Open</p>
                ) : (
                  <p className="text-normal text-red-500">Closed</p>
                )}
                <span className="px-1 text-normal">&#8226;</span>
                {!isOpen && willOpenToday ? (
                  <p>Opens {openTime}</p>
                ) : !isOpen && !willOpenToday ? (
                  <p>opens {tomorrowOpenTime}</p>
                ) : (
                  <p>closes {closeTime}</p>
                )}
              </div>
              <div className="flex">
                <InformationCircleIcon className="w-5 h-5" />
                <Link href="#business-hours" passHref>
                  <a className="pl-1">See Operating Hours</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-around auto-cols-max w-full justify-center pt-3 w-full">
            <a
              href={`tel:${dispensary?._source.field_phone_number}`}
              className="text-gray-500 flex flex-wrap justify-center py-2"
            >
              <PhoneIcon className="w-6 h-6 " />
              <span className="w-full text-center text-xs">Call</span>
            </a>
            <a
              href={`http://maps.google.com/maps?q=${
                dispensary?._source.name
              }+${
                dispensary?._source.address_line1[0]
                  ? dispensary?._source.address_line1[0]
                  : dispensary?._source.field_coordinates
              }&ll=${dispensary?._source.field_coordinates}&z=17`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 flex flex-wrap justify-center py-2"
            >
              <MapIcon className="w-6 h-6 " />
              <span className="w-full text-center text-xs">Directions</span>
            </a>
            {dispensary?._source.field_website !== undefined && (
              <a
                href={`${dispensary?._source.field_website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 flex flex-wrap justify-center py-2"
              >
                <GlobeIcon className="w-6 h-6 " />
                <span className="w-full text-center text-xs">Website</span>
              </a>
            )}

            {/***** Need Reviews *****/}
            {/* <button className="text-gray-500 flex flex-wrap justify-center py-2">
              <StarIconOutline className="w-6 h-6 " />
              <span className="w-full text-center text-xs">Review</span>
            </button> */}
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

      <div className="space-y-4 px-4">
        <AboutUsSlideOver dispensary={dispensary} />
        <BusinessVerificationSlideOver dispensary={dispensary} />
        {/* Map */}
        <section className="pt-10 pb-4">
          <h2 className="sr-only">Location</h2>

          <div className="w-full h-48 relative rounded-lg overflow-hidden">
            {dispensary && (
              <SmallMap
                coords={{
                  lat: dispensary?._source.lat[0],
                  lon: dispensary?._source.lon[0],
                }}
              />
            )}
          </div>

          <div className="text-lg text-gray-500 w-full grid grid-flow-row auto-rows-max gap-2">
            <h2 className="text-lg text-gray-700 font-semibold pt-3 ">
              Location
            </h2>
            <p className="text-gray-700 w-full">
              {dispensary?._source.address_line1[0]}
              <br />
              {dispensary?._source.locality[0]},{' '}
              {dispensary?._source.administrative_area}{' '}
              {dispensary?._source.postal_code[0]}
            </p>
            {/* <p>{listing.distance} away</p> */}
          </div>
          <div className="pt-5 w-full flex justify-center ">
            <a
              href={`http://maps.google.com/maps?q=${
                dispensary?._source.name
              }+${
                dispensary?._source.address_line1[0]
                  ? dispensary?._source.address_line1[0]
                  : dispensary?._source.field_coordinates
              }&ll=${dispensary?._source.field_coordinates}&z=17`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 uppercase text-gray-700 text-xs font-semibold border-t border-gray-200 tracking-widest text-green w-full text-center"
            >
              Get Directions
            </a>
          </div>
        </section>
        {/* Socials */}
        {dispensary?._source.field_facebook ||
        dispensary?._source.field_twitter ||
        dispensary?._source.field_instagram ? (
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
                          {
                            dispensary?._source.field_facebook[0].split('/')[
                              dispensary?._source.field_facebook[0].split('/')
                                .length - 1
                            ]
                          }
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
                          {
                            dispensary?._source.field_twitter[0].split('/')[
                              dispensary?._source.field_twitter[0].split('/')
                                .length - 1
                            ]
                          }
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
                          {
                            dispensary?._source.field_instagram[0].split('/')[
                              dispensary?._source.field_instagram[0].split('/')
                                .length - 1
                            ]
                          }
                        </span>
                      </button>{' '}
                    </a>
                  </Link>
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
      </div>
      {/* Need Review FAQ  and amenities Data */}

      <FaqSlideOver name={dispensary?._source.name[0]} faqs={faqs} />
      <BusinessReviewSlideOver dispensary={dispensary} reviews={reviews} />

      <div className="px-4">
        <AmenitiesSection
          amenities={['amenity', 'amenity', 'amenity', 'amenity']}
        />
      </div>
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
