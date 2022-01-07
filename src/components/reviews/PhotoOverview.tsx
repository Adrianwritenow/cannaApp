import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

import EditPhotoDetails from './EditPhotoDetails';
import Image from 'next/image';
import SubmitReview from './SubmitReview';

interface ReviewPhoto {
  photo: string[] | null;
}

export default function PhotoOverview(props: {
  setFieldValue: {
    (field: string, value: any, shouldValidate?: boolean | undefined): void;
  };
  values: {
    review: string;
    recommended: boolean | undefined;
    rating?: {
      general: number;
      service: number;
      value: number;
      location: number;
      accuracy: number;
    };
    photos: File[];
  };
  setParent: Function;
}) {
  const [open, setOpen] = useState(false);
  const { setFieldValue, values, setParent } = props;
  const [previews, setPreviews] = useState([]);

  const onSelectFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: {
      (field: string, value: any, shouldValidate?: boolean | undefined): void;
    },
    adding?: boolean
  ) => {
    if (event.target.files) {
      const imageArray: any = Array.from(event.target.files).map(image =>
        URL.createObjectURL(image)
      );

      if (adding) {
        const previewCopy = previews.concat(imageArray);
        const valuesCopy = values.photos.concat(Array.from(event.target.files));
        setPreviews(previewCopy);
        setFieldValue(event.target.id, valuesCopy);
      } else {
        setPreviews(imageArray);
        setFieldValue(event.target.id, Array.from(event.target.files));
      }

      Array.from(previews).map(image => URL.revokeObjectURL(image));
    } else {
      setFieldValue(event.target.id, null);
    }
  };

  useEffect(() => {}, [values]);

  const viewPreview = previews.length > 0 && open;

  return (
    <div>
      <button
        className="w-max relative bg-green-500 py-2 px-3 border border-gray-300 rounded-md shadow flex items-center cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 focus-within:ring-green"
        onClick={() => setOpen(true)}
      >
        <label
          htmlFor="photos"
          className="relative text-sm text-white pointer-events-none"
        >
          <span>Add Photos</span>
          <span className="sr-only"> Add Photos</span>
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
          onChange={event => onSelectFile(event, setFieldValue)}
          multiple
        />
      </button>

      <Transition.Root show={viewPreview} as={Fragment}>
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
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 pt-6 shadow-sm">
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
                      <div className="w-full">
                        <button className="w-full relative bg-green-white py-4 px-3 flex items-center cursor-pointer focus-within:outline-none">
                          <label
                            htmlFor="photos"
                            className="relative text-green-500 pointer-events-none flex items-center space-x-3 ml-auto mr-auto"
                          >
                            <PlusIcon className=" w-5 h-5 p-0.5 " />

                            <span>Add Photos</span>
                            <span className="sr-only"> user photo</span>
                          </label>
                          <input
                            id="photos"
                            name="photos"
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                            onChange={event =>
                              onSelectFile(event, setFieldValue, true)
                            }
                            multiple
                          />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-0.5 w-full h-min mb-auto">
                      {previews.map((image, index) => {
                        return (
                          <div key={`edit-photo--${index}`}>
                            <EditPhotoDetails src={image} index={index} />
                          </div>
                        );
                      })}
                    </div>

                    <div className="px-4 py-5">
                      <SubmitReview
                        values={{
                          review: values.review,
                          recommended: values.recommended,
                          photos: values.photos,
                        }}
                        setParent={setParent}
                      />
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
