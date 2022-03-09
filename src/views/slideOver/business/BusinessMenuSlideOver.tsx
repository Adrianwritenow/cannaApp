import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import {
  browseBy,
  combinedSearchQuery,
  getBusinessProducts,
} from '@/actions/search';

import { ArrowLeftIcon } from '@heroicons/react/outline';
import { Dispensary } from '@/interfaces/dispensary';
import FilterMenuTabs from '../../../components/filter/FilterMenuTabs';
import { Product } from '@/interfaces/product';
import ProductResultsSection from '../../../components/sections/ProductsResultsSection';
import { Coupon } from '@/interfaces/coupon';

export default function BusinessMenuSlideOver(props: {
  dispensary: Dispensary;
}) {
  const { dispensary } = props;
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [coupons, setCoupons] = useState<Array<Coupon>>([]);

  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (update) {
      getProducts();
      getDeals();
    }
  }, [products, coupons]);

  async function getDeals() {
    const hits: any = await browseBy(
      'dispensary',
      dispensary._source.id.toString(),
      'coupons'
    );

    setCoupons(hits.hits.hits);
  }

  async function getProducts() {
    const product_ids = dispensary._source.products;

    if (product_ids?.length) {
      const hits: any = await getBusinessProducts(product_ids);
      setProducts(hits.hits.hits);
    }
    setUpdate(false);
  }

  return (
    <div>
      {/* Need Products related to business */}
      {products.length || coupons.length ? (
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
