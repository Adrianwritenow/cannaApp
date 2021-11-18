import {
  DotsVerticalIcon,
  EmojiHappyIcon,
  FireIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
import React, { useState } from "react";

import AvatarIcon from "../../../public/assets/icons/iconComponents/Avatar";
import { Review } from "../../interfaces/review";

interface ReviewProps {
  review: Review;
}
export default function ReviewCard(props: ReviewProps) {
  const { review } = props;
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="py-4">
      <div className="flex flex-wrap border-b border-gray-200">
        <div className="flex justify-between w-full">
          <div className="flex flex-wrap">
            <AvatarIcon className="w-8 h-8 mr-4" />
            <div>
              <h4 className="font-semibold text-gray-700 text-sm">
                {review.by}
              </h4>
              <p className="text-xs text-gray-500">{review.caption}</p>
            </div>
          </div>
          <button>
            <DotsVerticalIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xl font-semibold w-full py-3 ">
          {review.recommended ? (
            <div className="flex flex-wrap items-center">
              <div className=" bg-green rounded-lg w-6 h-6 p-1 mr-1.5 ">
                <ThumbUpIcon className="text-white " />
              </div>
              <h4 className="text-green">Recommended</h4>
            </div>
          ) : (
            <div className="flex flex-wrap  items-center">
              <div className=" bg-red-700 rounded-lg w-6 h-6 p-1 mr-1.5 ">
                <ThumbDownIcon className="text-white " />
              </div>
              <h4 className="text-red-700">Recommended</h4>
            </div>
          )}
        </div>
        <div className="text-sm space-y-1">
          <p className={`${!readMore ? "line-clamp-4" : ""}`}>
            {review.review}
          </p>
          <button
            onClick={() => setReadMore(!readMore)}
            className="text-green font-semibold focus:outline-none"
          >
            Read Full Review
          </button>

          <p className="text-gray-500 pb-2.5">
            <time dateTime={review.date}>{review.date}</time>
            <span aria-hidden="true">&#8226;</span>
            <time dateTime={review.time}>{review.time}</time>
          </p>
        </div>
      </div>
      <div className="grid grid-flow-col auto-cols-max gap-4 py-4">
        <button className="text-xs font-medium shadow-sm text-gray-700 flex rounded-lg px-2.5 py-2 border border-gray-200">
          <ThumbUpIcon className="w-4 h-4 mr-2" />
          Useful
        </button>
        <button className="text-xs font-medium shadow-sm text-gray-700 flex rounded-lg px-2.5 py-2 border border-gray-200">
          <EmojiHappyIcon className="w-4 h-4 mr-2" />
          Funny
        </button>
        <button className="text-xs font-medium shadow-sm text-gray-700 flex rounded-lg px-2.5 py-2 border border-gray-200">
          <FireIcon className="w-4 h-4 mr-2" />
          Amazing
        </button>
      </div>
    </div>
  );
}
