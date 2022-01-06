import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import ReviewCard from './ReviewCard';
import moment from 'moment';

export default function SubmitReview(props: {
  values: { review: string; recommended?: boolean; photos?: File[] };
  setParent: Function;
  skip?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { values, setParent, skip } = props;
  const now = moment();
  const [previews, setPreviews] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    console.log('VALS FINAL', values);
    if (values.photos && values.photos.length && update) {
      const imageArray: any = values.photos.map(image =>
        URL.createObjectURL(image)
      );
      setPreviews(imageArray);
      setUpdate(false);
    }
    setUpdate(true);
  }, [update, values]);

  return (
    <div className="w-full">
      {skip ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-max ml-auto flex px-6 py-2 mt-6 border-2 border-green-500 rounded-md shadow-sm text-sm font-medium text-green-500 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Skip for now
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full inline-flex items-center justify-center px-6 py-2 mt-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Next
        </button>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0  max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col x bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 pt-6">
                      <div className="flex items-center justify-start border-b border-gray-200 pb-5">
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
                        <span className="text-lg  text-gray-700">Back</span>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-col h-auto flex-grow  px-4 sm:px-6">
                      <h2 className="text-2xl font-semibold text-gray-700 pb-6">
                        Your Review
                      </h2>
                      <ReviewCard
                        review={{
                          recommended: values.recommended,
                          by: 'Me',
                          caption: 'Caption',
                          review: values.review,
                          time: now.format('hh:mm'),
                          date: now.format('MMMM Do YYYY'),
                        }}
                        self={true}
                        showFull={true}
                      />
                      {values.photos && (
                        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pb-4">
                          {previews.map((photo, index) => (
                            <div key={`rp-${index}`}>
                              <div className="w-20 flex relative rounded-md overflow-hidden">
                                <div className="w-full pb-full  ">
                                  <Image
                                    src={photo}
                                    alt={`review-photo-${index}`}
                                    layout="fill"
                                    objectFit={'cover'}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="px-4 pb-4">
                      <button
                        type="button"
                        onClick={() => {
                          setParent(false);
                        }}
                        className="w-full inline-flex items-center justify-center px-6 py-2 mt-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
