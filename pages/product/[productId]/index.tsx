import { Product, ProductResults } from '@/interfaces/product';
import React, { useEffect } from 'react';

import AboutSlideOver from '@/components/products/AboutSlideOver';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import FaqSlideOver from '@/views/slideOver/FaqSlideOver';
import ImageSlider from '@/components/slider/ImageSlider';
import ImageWithFallback from '@/components/image/ImageWithFallback';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import ProductReviewsSlideOver from '@/views/slideOver/product/ProductReviewSlideOver';
import { RootState } from '@/reducers';
import StarRating from '@/components/rating/StarRating';
import { formatImageWithFallback } from '@/helpers/formatters';
import { reviews } from '@/helpers/mockData';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function ProductDetail() {
  const router = useRouter();
  const { productId } = router.query;

  const [dispatchProduct, { loading: loadingProduct }] = useAxios(false);
  const [dispatchRelated, { loading: loadingRelated }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const relatedKey = `productRelated${productId}`;
  const { results: related }: ProductResults = listResults[relatedKey] || [];
  const productKey = `productResult${productId}`;
  const { results: productResult }: ProductResults =
    listResults[productKey] || [];
  const product: Product | undefined = productResult?.length
    ? productResult[0]
    : undefined;

  useEffect(() => {
    if (productId) {
      dispatchProduct(
        searchMulti({
          endpoints: [
            {
              name: 'products',
              key: productKey,
              filters: {
                id: [productId],
              },
              total: 1,
            },
          ],
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (!loadingRelated && product?._source.category) {
      const relatedFilters: any = {
        category: product?._source.category,
      };
      if (product?._source.top_reported_flavors) {
        relatedFilters.top_reported_flavors =
          product?._source.top_reported_flavors;
      }

      dispatchRelated(
        searchMulti({
          endpoints: [
            {
              name: 'products',
              key: relatedKey,
              filters: relatedFilters,
            },
          ],
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

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
            <button
              onClick={() => router.back()}
              className="bg-white rounded-full  absolute w-10 h-10 flex items-center justify-center left-0 top-0 z-10 m-4 desktop:hidden"
            >
              <ArrowLeftIcon className="text-gray-700 w-4" />
            </button>
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
                    {product?._source.top_reported_flavors && (
                      <p>
                        <span className="text-black">
                          Top Reported Flavors:&nbsp;
                        </span>
                        {product?._source.top_reported_flavors.map(
                          (flavor: string) => (
                            <span key={`${flavor}`}>{flavor},&nbsp;</span>
                          )
                        )}
                      </p>
                    )}

                    {product?._source.top_rated_effects && (
                      <p>
                        <span className="text-black">
                          Top Rated Effects:&nbsp;
                        </span>
                        {product?._source.top_rated_effects.map(
                          (effect: string) => (
                            <span key={`${effect}`}>{effect},&nbsp;</span>
                          )
                        )}
                      </p>
                    )}
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
      </div> */}
      <div className="pt-4">
        <ProductReviewsSlideOver product={product} reviews={reviews} />
      </div>

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
