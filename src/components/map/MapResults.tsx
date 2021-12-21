import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { BookmarkIcon } from "@heroicons/react/outline";
import { Context } from "./mapContext";

function MapResults({ data }: any) {
  const containerRef = useRef(null);
  const [triggerInView, setTriggerInView] = useState(false);

  const {
    activeCard,
    setActiveCard,
    ref0,
    ref1,
    ref2,
    ref3,
    ref4,
    ref5,
    ref6,
    ref7,
    ref8,
    ref9,
  } = useContext(Context);
  const items = [ref0, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9];

  const handleEntrance = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        const activeRef = items.find(
          (item: any) => item.current.id === entry.target.id
        );
        setActiveCard({
          ...activeCard,
          ref: activeRef,
          id: entry.target.id,
        });
      }
    });
  };
  const options = useMemo(() => {
    return {
      root: containerRef.current,
      rootMargin: "4000px -20% 4000px -20%",
      threshold: 0.95,
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleEntrance, options);
    items.forEach((item) => {
      if (item) {
        const currentItem: any = item.current;
        if (currentItem) {
          observer.observe(currentItem);
        }
      }
    });
    return () => {
      items.forEach((item) => {
        if (item.current) {
          observer.unobserve(item.current);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div
      className="bottom-6 absolute flex overflow-x-scroll overflow-y-auto w-screen"
      style={{
        scrollSnapType: "x mandatory",
        padding: " 0 90px",
      }}
      ref={containerRef}
    >
      {data.map((listing: any, idx: number) => {
        const currentRef =
          idx === 0
            ? ref0
            : idx === 1
            ? ref1
            : idx === 2
            ? ref2
            : idx === 3
            ? ref3
            : idx === 4
            ? ref4
            : idx === 5
            ? ref5
            : idx === 6
            ? ref6
            : idx === 7
            ? ref7
            : idx === 8
            ? ref8
            : ref9;
        return (
          <div
            key={listing._id}
            id={listing._id}
            ref={currentRef}
            className="snap-center ml-2"
            style={{ scrollSnapAlign: "center", padding: " 0" }}
          >
            <Link href={"/product/5"} passHref>
              <div className="group relative bg-white rounded-lg flex flex-col h-56 w-60">
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

                <div className="text-left text-sm  flex flex-col p-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {listing._source.name}
                    </h3>
                    <BookmarkIcon className="w-6" />
                  </div>

                  <div className="flex flex-col items-start">
                    <p className="sr-only">
                      {listing._source.field_rating} out of 5 stars
                    </p>
                    <div className="flex items-center">
                      <span className="font-normal text-gray-500">
                        {listing._source.field_rating}
                      </span>

                      {listing._source.field_reviews_count &&
                        [0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={`    ${
                              Math.round(listing._source.field_rating) > rating
                                ? "text-yellow-400"
                                : "text-gray-200"
                            }
                  flex-shrink-0 h-4 w-4`}
                            aria-hidden="true"
                          />
                        ))}
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
          </div>
        );
      })}
      <div className=" h-56 w-60"></div>
    </div>
  );
}

export default MapResults;
