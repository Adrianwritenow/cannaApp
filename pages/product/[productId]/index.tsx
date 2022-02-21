import React, { useEffect, useState } from 'react';
import { browseBy, getDocument } from '@/actions/search';

import AboutSlideOver from '@/components/products/AboutSlideOver';
import FaqSlideOver from '@/views/slideOver/FaqSlideOver';
import ImageSlider from '@/components/slider/ImageSlider';
import ImageWithFallback from '@/components/image/ImageWithFallback';
import { Product } from '@/interfaces/product';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import ProductReviewsSlideOver from '@/views/slideOver/product/ProductReviewSlideOver';
import { SearchHits } from '@/interfaces/searchHits';
import { StarIcon } from '@heroicons/react/solid';
import StarRating from '@/components/rating/StarRating';
import { formatImageWithFallback } from '@/helpers/formatters';
import { useRouter } from 'next/router';

export default function ProductDetail() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<Product>();
  const [sort, setSort]: any = useState('relevance');
  const [related, setRelated] = useState<Array<Product>>();
  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    if (!product) {
      getDocument(productId, 'products').then((document: SearchHits) => {
        if (document) {
          const result = document.hits.hits[0];
          setProduct(result as unknown as Product);
        }
      });
    }
    if (!related && product) {
      getRelated();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, related, product]);

  async function getRelated() {
    const hits: SearchHits = await browseBy(
      'category',
      `${product?._source.category[0]}`,
      'products',
      {
        key: 'top_reported_flavors',
        value: product?._source.top_reported_flavors as string[],
      }
    );
    if (hits) {
      setRelated(hits.hits.hits);
    } else {
      setRelated([]);
    }
  }

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 md:px-20 desktop:mt-4">
      {/* Product */}

      {product && (
        <div className="desktop:grid grid-cols-6 desktop:gap-8">
          {/* Image gallery */}
          {/* <ImageSlider images={[]} /> */}
          <div className="relative w-full pb-full lg:pb-0 col-span-2">
            <ImageWithFallback
              src={formatImageWithFallback(product._source.image)}
              alt={product._source?.name[0]}
              layout="fill"
              objectFit={'cover'}
            />
          </div>

          {/* Product info */}
          <div className="col-span-4">
            <div className="mt-4 px-4 space-y-4">
              <section>
                <div>
                  <h2 className="sr-only">Product information</h2>
                </div>
                {product?._source?.brand && (
                  <p className="text-sm text-blue-500">
                    {product?._source?.brand[0]}
                  </p>
                )}
                <h1 className="text-lg font-normal tracking-tight text-gray-900">
                  {product?._source.name[0]}
                </h1>

                {/* Reviews */}
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {product?._source?.rating && (
                      <StarRating rating={product?._source?.rating[0]} />
                    )}
                    <span className="font-normal text-gray-500">
                      (
                      {product._source.reviews_count
                        ? product._source.reviews_count[0]
                        : 0}
                      )
                    </span>
                  </div>
                  <p className="sr-only">
                    {product._source.rating ? product._source.rating[0] : 0} out
                    of 5 stars
                  </p>
                </div>
              </section>

              {/* <section aria-labelledby="vendors-heading">
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
            </section> */}
            </div>
            <div className="space-y-6 px-4">
              <section aria-labelledby="details-heading ">
                <h2 id="details-heading" className="sr-only">
                  Product details
                </h2>
                <div className="pt-6">
                  <h2 className="text-gray-700 text-lg font-semibold">
                    {product?._source.name}
                  </h2>
                  <div className="text-sm text-gray-500 pt-2">
                    {/* <p>
                    <span className="text-black">Type:&nbsp;</span>
                    {product?._source.type[0]}
                    %Type%
                  </p> */}
                    <p>
                      <span className="text-black">Category:&nbsp;</span>
                      {product?._source.category[0]}
                    </p>
                    {/* Need Cannabanoids data */}

                    {/* <div className="flex">
                    <p className="text-black">Cannabanoids:&nbsp;</p>
                    <p>
                      THC&nbsp;
                      {Math.round(0.5 * 100)}%
                    </p>
                    <>&nbsp;</>
                    <p>
                      CBD&nbsp;
                      {Math.round(0.5 * 100)}%
                    </p>
                  </div> */}
                  </div>
                  <div className="pt-2">
                    <AboutSlideOver
                      about={product._source.description[0]}
                      businessName={product._source.name[0]}
                      title={false}
                    />
                  </div>
                </div>
              </section>
              {/* Need specification data  */}

              {/* <section aria-labelledby="specifications-heading">
              <h2 id="specifications-heading" className="sr-only">
                Specifications
              </h2>
              <h2 className="text-gray-700 text-lg font-semibold">
                Specifications
              </h2>
              <div>
                <ul className="text-sm text-gray-700">
                  {[
                    { label: 'Spec', value: ' Value' },
                    { label: 'Spec', value: ' Value' },
                    { label: 'Spec', value: ' Value' },
                    { label: 'Spec', value: ' Value' },
                    { label: 'Spec', value: ' Value' },
                  ].map((spec, index) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          index % 2 === 0 ? 'bg-white' : 'bg-green-50'
                        } flex py-3 px-2`}
                      >
                        <p className="font-semibold">{spec.label}</p>
                        <p className="ml-auto">{spec.value}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section> */}
            </div>
          </div>
        </div>
      )}

      {/* <div className=" pt-4">
        <FaqSlideOver name={listings[0]._source.name[0]} faqs={faqs} />
      </div>
      <div className="pt-4">
        <ProductReviewsSlideOver product={product} reviews={reviews} />
      </div> */}

      <ProductResultsSection
        list={related ?? []}
        sponsored={false}
        hideButton={true}
        label="Related Items"
      />
      {/* <ProductResultsSection
        list={related}
        sponsored={false}
        hideButton={true}
        label="Recently Viewed Items"
      /> */}
    </div>
  );
}
