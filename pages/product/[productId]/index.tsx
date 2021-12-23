import { ArrowRightIcon, StarIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { listings, products } from '../../../src/helpers/mockData';

import AboutSlideOver from '../../../src/components/products/AboutSlideOver';
import DropdownFilter from '../../../src/components/forms/fields/DropdownFilter';
import FaqSlideOver from '../../../src/views/slideOver/FaqSlideOver';
import ImageSlider from '../../../src/components/slider/ImageSlider';
import Link from 'next/link';
import { Product } from '../../../src/interfaces/searchProduct';
import ProductResultsSection from '../../../src/components/sections/ProductsResultsSection';
import ReviewsSlideOver from '../../../src/views/slideOver/ReviewsSlideOver';
import { Vendor } from '../../../src/interfaces/vendor';
import VendorCard from '../../../src/components/vendor/VendorCard';
import { getDocument } from '../../../src/actions/search';
import { useRouter } from 'next/router';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetail() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<Product>();
  const [sort, setSort]: any = useState('relevance');
  const listing = listings[0];

  useEffect(() => {
    if (productId) {
      getDocument(productId).then(
        (document: React.SetStateAction<Product | undefined>) => {
          setProduct(document);
        }
      );
    }
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto bg-white">
      {/* Product */}

      {product && (
        <div className="">
          {/* Image gallery */}
          <ImageSlider images={[]} />

          {/* Product info */}
          <div className="mt-4 px-4 space-y-4">
            <section>
              <div>
                <h2 className="sr-only">Product information</h2>
              </div>
              <p className="text-sm text-blue-500">
                {product?._source.category}
              </p>
              <h1 className="text-lg font-normal tracking-tight text-gray-900">
                {product?._source.name_1}
              </h1>

              {/* Reviews */}
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="font-normal text-gray-500 mr-1">
                    {product?._source.field_rating
                      ? product?._source.field_rating
                      : 0}
                  </span>
                  {[0, 1, 2, 3, 4].map(rating => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product?._source.field_rating > rating
                          ? 'text-gray-900'
                          : 'text-gray-200',
                        'h-3.5 w-3.5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="font-normal text-gray-500">
                    ({product._source.field_review_count})
                  </span>
                </div>
                <p className="sr-only">
                  {product._source.field_rating} out of 5 stars
                </p>
              </div>
            </section>

            <section aria-labelledby="vendors-heading">
              <h2 id="vendors-heading" className="sr-only">
                Vendors with this product
              </h2>
              <div className="mt-4 py-3 border-t border-b border-gray-200 flex items-center justify-between">
                <p className="text-sm">Buying Options</p>
                <DropdownFilter
                  setter={setSort}
                  options={['relevance', 'distance']}
                  current={sort}
                  label={'Sort By'}
                />
              </div>
              {listings.map((listing, index) => {
                const vendorProduct: Vendor = {
                  listing: listing,
                  product: products[0],
                };
                return (
                  <VendorCard
                    productId={productId}
                    vendor={vendorProduct}
                    key={index}
                  />
                );
              })}
            </section>
          </div>
          <div className="space-y-6 px-4">
            <section aria-labelledby="details-heading ">
              <h2 id="details-heading" className="sr-only">
                Product details
              </h2>
              <div className="pt-6">
                <h2 className="text-gray-700 text-lg font-semibold">
                  {product?._source.name_1}
                </h2>
                <div className="text-sm text-gray-500 pt-2">
                  <p>
                    <span className="text-black">Type:</span>{' '}
                    {product?._source._type}
                  </p>
                  <p>
                    <span className="text-black">Category:</span>{' '}
                    {product?._source.category}
                  </p>
                  <div className="flex">
                    <p className="text-black">Cannabanoids:&nbsp;</p>
                    {/* <p>
                    THC&nbsp;
                    {product.cannabanoids &&
                      Math.round(product.cannabanoids?.thc * 100)}
                    %
                  </p>
                  <>&nbsp;</>
                  <p>
                    CBD&nbsp;
                    {product.cannabanoids &&
                      Math.round(product.cannabanoids?.cbd * 100)}
                    %
                  </p> */}
                  </div>
                </div>
                <div className="pt-2">
                  <AboutSlideOver
                    about={product._source.description[0]}
                    businessName={product._source.name_1[0]}
                  />
                  <Link href="#" passHref>
                    <a className="text-green mt-1 text-sm font-medium flex items-center">
                      Learn more &nbsp;
                      <ArrowRightIcon className="w-4 h-4" />
                    </a>
                  </Link>
                </div>
              </div>
            </section>

            <section aria-labelledby="specifications-heading">
              <h2 id="specifications-heading" className="sr-only">
                Specifications
              </h2>
              <h2 className="text-gray-700 text-lg font-semibold">
                Specifications
              </h2>
              <div>
                <ul className="text-sm text-gray-700">
                  {/* {product.specifications.map((spec, index) => {
                  return (
                    <li
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-green-50"
                      } flex py-3 px-2`}
                    >
                      <p className="font-semibold">{spec.label}</p>
                      <p className="ml-auto">{spec.value}</p>
                    </li>
                  );
                })} */}
                </ul>
              </div>
            </section>
          </div>
        </div>
      )}

      <ProductResultsSection
        list={products}
        sponsored={false}
        label="Related Items"
      />
      <ProductResultsSection
        list={products}
        sponsored={false}
        label="Recently Viewed Items"
      />
    </div>
  );
}
