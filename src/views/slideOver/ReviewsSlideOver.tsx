import { ArrowLeftIcon, EmojiHappyIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

import { BusinessSlideoverProps } from '@/interfaces/props/businessSlideOverProps';
import DropdownFilter from '@/components/forms/fields/DropdownFilter';
import ReviewCard from '@/components/reviews/ReviewCard';
import ReviewFormSlideOver from '@/components/reviews/product/ReviewFormSlideOver';

export default function ReviewsSlideOver(props: BusinessSlideoverProps) {
  const { dispensary, reviews, name } = props;
  const [open, setOpen] = useState(false);

  const [sort, setSort] = useState('');
  const [type, setType] = useState('');
  const [cons, setCons] = useState('');
  const [language, setLanguage] = useState('');

  const [myRating, setMyRating] = useState(0);

  return (
    <section>
      <h2 id="business-reviews" className="sr-only">
        {name ? name : 'Reviews'}
      </h2>
      <h2
        id="business-review"
        className="text-lg text-gray-700 font-semibold pb-2 pt-1 w-full bo"
      >
        {name ? name : 'Reviews'}
      </h2>
      {reviews && (
        <div>
          {reviews.map((review, index) => (
            <div key={`review-${index}`}>
              <ReviewCard review={review} />
            </div>
          ))}
          <button
            onClick={() => setOpen(true)}
            className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest"
          >
            See All {dispensary?._source.reviews_count} Reviews
          </button>
        </div>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen">
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4">
                      <div className="flex items-center justify-start">
                        <div className="flex items-center mr-9">
                          <button
                            type="button"
                            className="bg-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Back</span>
                            <ArrowLeftIcon className="text-gray-700 w-6 h-6" />
                          </button>
                        </div>
                        <Dialog.Title className="text-lg font-semibold text-gray-600">
                          {dispensary?._source.name}
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1 ">
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
                                (90% of {`${dispensary?._source.reviews_count}`}
                                )
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
                            <ReviewFormSlideOver
                              myRating={myRating}
                              setMyRating={setMyRating}
                              dispensary={dispensary}
                            />
                          </div>
                        </section>

                        {/* Review List */}
                        <section className="py-4 pt-9">
                          {/* Review Filter */}
                          <div className="flex overflow-x-scroll pl-4 pb-4">
                            <DropdownFilter
                              setter={setSort}
                              options={['Most Useful', 'Most Recent']}
                              current={sort}
                              label={'Sort by'}
                            />
                            <DropdownFilter
                              setter={setType}
                              options={['positive', 'negative']}
                              current={type}
                              label={'Review Type'}
                            />
                            <DropdownFilter
                              setter={setCons}
                              options={['Smoked', 'Vaped', 'Topical']}
                              current={cons}
                              label={'Consumption'}
                            />
                            <DropdownFilter
                              setter={setLanguage}
                              options={['english']}
                              current={language}
                              label={'Language'}
                            />
                          </div>

                          {/* Results */}
                          {reviews && (
                            <div className="px-4">
                              {reviews.map((review, index) => (
                                <div key={`review-${index}`}>
                                  <ReviewCard review={review} />
                                </div>
                              ))}
                            </div>
                          )}
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  );
}
