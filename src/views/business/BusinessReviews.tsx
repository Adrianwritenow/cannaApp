import { EmojiHappyIcon, StarIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

import AvatarIcon from "../../../public/assets/icons/iconComponents/Avatar";
import { BusinessProps } from "../../interfaces/props/businessProps";
import DropdownFilter from "../../components/forms/fields/DropdownFilter";
import ReviewCard from "../../components/reviews/ReviewCard";

export default function BusinessReviews(props: BusinessProps) {
  const { business } = props;
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const [cons, setCons] = useState("");
  const [language, setLanguage] = useState("");

  const [myRating, setMyRating] = useState(0);

  return (
    <div className="pt-5">
      <section className="px-4">
        <h2 id="business-rating" className="sr-only">
          Business Rating
        </h2>
        <h2
          id="business-rating"
          className="text-lg text-gray-700 font-semibold py-2"
        >
          Business Rating
        </h2>
        <div>
          <p className="text-green text-sm font-semibold flex items-center">
            <EmojiHappyIcon className="w-6 h-6" />
            <span className="px-1">Very Positive</span>
            <span className="font-normal text-gray-500">
              (90% of 2000 reviews)
            </span>
          </p>
        </div>
      </section>
      <section className="px-4 pt-7">
        <div className="border-b border-gray-200  pb-3">
          <div>
            <h2 id="business-review" className="sr-only">
              Rate & Review
            </h2>
            <h2
              id="business-review"
              className="text-lg text-gray-700 font-semibold"
            >
              Rate & Review
            </h2>
            <p className="text-sm text-gray-500">
              What was your experience like?
            </p>
          </div>
          <div>
            <div className="flex items-center pt-4">
              <AvatarIcon className="w-8 h-8 mr-4" />
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`${
                      myRating > rating ? "text-yellow-400" : "text-gray-200"
                    }
                  flex-shrink-0 h-8 w-8`}
                    aria-hidden="true"
                    onClick={() => setMyRating(rating + 1)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review List */}
      <section className="py-4 pt-9">
        {/* Review Filter */}
        <div className="flex overflow-x-scroll pl-4 pb-4">
          <DropdownFilter
            setter={setSort}
            options={["relevance", "distance", "rating"]}
            current={sort}
            label={"Sort by"}
          />
          <DropdownFilter
            setter={setType}
            options={["positive", "negative"]}
            current={type}
            label={"Review Type"}
          />
          <DropdownFilter
            setter={setCons}
            options={["Yes", "No"]}
            current={cons}
            label={"Consumption"}
          />
          <DropdownFilter
            setter={setLanguage}
            options={["english", "spanish"]}
            current={language}
            label={"Language"}
          />
        </div>

        {/* Results */}
        <div className="px-4">
          {business.reviews.map((review, index) => (
            <div key={`review-${index}`}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
