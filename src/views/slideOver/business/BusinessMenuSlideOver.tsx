import { Coupon, CouponResults } from '@/interfaces/coupon';
import { Dialog, Transition } from '@headlessui/react';
import { Product, ProductResults } from '@/interfaces/product';
import React, { Fragment, useEffect, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/outline';
import { Dispensary } from '@/interfaces/dispensary';
import FilterMenuTabs from '@/components/filter/FilterMenuTabs';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import { RootState } from '@/reducers';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useSelector } from 'react-redux';

export default function BusinessMenuSlideOver(props: {
  dispensary: Dispensary;
}) {
  const { dispensary } = props;
  const bid = dispensary._source.id;
  const [open, setOpen] = useState(false);
  const [dispatchSearch] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const { results: products }: ProductResults =
    listResults[`businessProducts${bid}`] || [];
  const { results: coupons }: CouponResults = listResults.businessCoupons || [];

  function getResults() {
    const endpoints: any = [
      {
        name: 'coupons',
        key: 'businessCoupons',
        filters: {
          dispensary: [dispensary._source.id.toString()],
        },
      },
    ];

    const product_ids = dispensary._source.products;
    if (product_ids?.length) {
      endpoints.push({
        name: 'products',
        key: `businessProducts${bid}`,
        filters: { id: product_ids },
        total: 1000,
      });
    }

    dispatchSearch(
      searchMulti({
        endpoints,
        total: 10,
      })
    );
  }

  useEffect(() => {
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispensary]);

  return (
    <div>
      {/* Need Products related to business */}
      {products?.length || coupons?.length ? (
        <ProductResultsSection
          list={products.length ? products.slice(0, 5) : coupons.slice(0, 5)}
          sponsored={false}
          label={'Explore our Products'}
          buttonLabel={'See all Products'}
          type={products.length ? '' : 'COUPON'}
          stateFunction={setOpen}
        />
      ) : (
        ''
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-30"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-y-0 right-0 max-w-full flex  max-w-full desktop:max-w-2xl">
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
                    <div className="mt-6 relative flex-1">
                      <section className="w-full">
                        <FilterMenuTabs products={products} coupons={coupons} />
                      </section>
                      <div className="px-4 grid grid-flow-row auto-rows-max gap-9"></div>
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
