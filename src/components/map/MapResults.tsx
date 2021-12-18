import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { BookmarkIcon } from "@heroicons/react/outline";
import { Context } from "./mapContext";
import { Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function MapResults({ data }: any) {
  const containerRef = useRef(null);
  const {swiper, setSwiper, setActiveCard} = useContext(Context);


  return (
    <div className=" z-50">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        init={true}
        slidesPerView={2}
        // onSlideChange={setSwiper}
        onSwiper={setSwiper}
        grabCursor={true}
        onSlideChange={() => {setActiveCard(swiper.realIndex)}}
        centeredSlides={true}
        style={{
          position: "absolute",
          bottom: "30px",
          left: "0",
          right: "0",
        }}
      >
        {data.map((listing: any, idx: number) => {
          return (
            <SwiperSlide
              key={listing._id}
              id={listing._id}
              style={{ height: "200px" }}
            >
              <Link href={"/product/5"} passHref>
                <div className="group relative bg-white rounded-lg h-full ">
                  <div className=" group-hover:opacity-75 basis-1/2">
                    <div className="h-28 relative rounded-t-lg overflow-hidden">
                      <Image
                        objectFit="cover"
                        src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1674&q=80"
                        alt={`listing ${listing._id}`}
                        layout="fill"
                      />
                    </div>
                  </div>

                  <div className="text-left text-sm  flex-col p-2">
                    <div className="flex justify-between">
                      <h3 className="text-md font-semibold text-gray-700">
                        {listing._source.name}
                      </h3>
                      <div>
                        <BookmarkIcon className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="flex items-start">
                      <p className="sr-only">
                        {listing._source.field_rating} out of 5 stars
                      </p>
                      <div className="flex items-center flex-col">
                        <div className="flex">
                          <span className="font-normal text-gray-500">
                            {listing._source.field_rating}
                          </span>

                          {listing._source.field_reviews_count &&
                            [0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={`    ${
                                  Math.round(listing._source.field_rating) >
                                  rating
                                    ? "text-yellow-400"
                                    : "text-gray-200"
                                }
                            flex-shrink-0 h-4 w-4`}
                                aria-hidden="true"
                              />
                            ))}
                        </div>
                        <p className="font-normal text-gray-500">
                          {listing._source.field_reviews_count ? (
                            `(${listing._source.field_reviews_count}) `
                          ) : (
                            <>
                              <em>No Reviews </em>
                            </>
                          )}
                          • x mi.
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 font-normal">
                        {listing.category} {listing.id}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MapResults;
