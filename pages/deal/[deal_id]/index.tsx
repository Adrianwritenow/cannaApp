import { useEffect, useState } from 'react';

import { BookmarkIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import ImageSlider from '@/components/slider/ImageSlider';
import Map from '@/public/assets/images/png/map-mock.png';
import { Product } from '@/interfaces/searchProduct';
import { SearchHits } from '@/interfaces/searchHits';
import { StarIcon } from '@heroicons/react/solid';
import { getDocument } from '@/actions/search';
import { useRouter } from 'next/router';

export default function DealOverview() {
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  const { deal_id } = router.query;

  useEffect(() => {
    if (deal_id) {
      getDocument(deal_id).then((document: SearchHits) => {
        if (document) {
          const result = document.hits.hits[0];
          setProduct(result as unknown as Product);
        }
      });
    }
  }, [router]);

  return (
    <div className="bg-gray-50">
      <ImageSlider images={[]} />
      <div className="px-4 pt-5">
        {product?._source && (
          <div>
            <section>
              <div>
                <h2 className="sr-only">Product information</h2>
              </div>
              <div className="w-full flex">
                <p className="text-sm text-blue-500">
                  More Deals from this Location
                </p>
                <BookmarkIcon className="w-6 h-6 ml-auto" />
              </div>
              <h1 className="text-lg font-normal tracking-tight text-gray-900">
                {product?._source.name_1}
              </h1>
            </section>

            <section>
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
                      className={`${
                        product._source?.field_rating
                          ? product._source?.field_rating[0]
                          : 0 > rating
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      }
                        'h-3.5 w-3.5 flex-shrink-0'
                      `}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="font-normal text-gray-500">
                    (
                    {product._source.field_review_count
                      ? product._source.field_review_count[0]
                      : 0}
                    )
                  </span>
                </div>
                <p className="sr-only">
                  {product._source.field_rating
                    ? product._source.field_rating[0]
                    : 0}
                  out of 5 stars
                </p>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {product?._source.field_price}
              </p>
            </section>
          </div>
        )}

        <div>
          <button className="w-full bg-green-500 text-white hover:bg-green-600 flex justify-center py-2 px-4 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green">
            Print Coupon | 12/29/2021
          </button>
        </div>

        <section aria-labelledby="details-heading ">
          <h2 id="details-heading" className="sr-only">
            Deal details
          </h2>
          <div className="pt-6">
            <h2 className="text-gray-700 text-lg font-semibold">
              Deal Details
            </h2>
            {product?._source && (
              <div className="text-sm text-gray-500 pt-2">
                <p>
                  <span className="text-black">Store Name: </span>
                  {product?._source.name_1}
                </p>
                <p>
                  <span className="text-black">Type: </span>
                  {product?._source._type}
                </p>
                <p>
                  <span className="text-black">Category: </span>
                  {product?._source.category}
                </p>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-700 pt-2">
            Ut varius scelerisque augue et condimentum. Curabitur mi mauris,
            egestas vitae leo et, finibus ornare dolor. Praesent at hendrerit
            ligula. Suspendisse potenti. Donec vestibulum nec nibh sit amet
            tristique...
          </p>
        </section>
        <section className="pt-10 pb-4">
          <h2 className="sr-only">Location</h2>

          <div className="w-full h-48 relative rounded-lg overflow-hidden">
            <Image
              unoptimized
              src={Map}
              layout="fill"
              objectFit={'cover'}
              alt={'Map'}
            />
          </div>

          <div className="text-lg text-gray-500 w-60 grid grid-flow-row auto-rows-max gap-2">
            <h2 className="text-lg text-gray-700 font-semibold pt-3">
              Location
            </h2>
            <p className="text-gray-700">
              8502 Preston Rd. Inglewood, Maine 98380
            </p>
            <p>5.5mi away</p>
          </div>
          <div className="pt-5 ">
            <button className="py-4 w-full uppercase text-gray-700 text-xs font-semibold border-t border-gray-200 tracking-widest text-green">
              Get Directions
            </button>
          </div>
        </section>

        {/* Hours of Operation */}
        <section className="pt-6 pb-12">
          <h2 id="business-hours" className="sr-only">
            Opening Hours
          </h2>
          <h2
            id="business-hours"
            className="text-lg text-gray-700 font-semibold pb-4 pt-1 w-full border-b border-gray-200"
          >
            Opening Hours
          </h2>
          <div className="text-gray-700 pt-2">
            <p className="py-3 flex justify-between items-center">
              Sunday <span>8:00 AM-:00 PM</span>
            </p>
            <p className="py-3 flex justify-between items-center">
              Monday <span>8:00 AM-:00 PM</span>
            </p>
            <p className="py-3 flex justify-between items-center">
              Tuesday <span>8:00 AM-:00 PM</span>
            </p>
            <p className="py-3 flex justify-between items-center">
              Wednesday <span>8:00 AM-:00 PM</span>
            </p>
            <p className="py-3 flex justify-between items-center">
              Thursday <span>8:00 AM-:00 PM</span>
            </p>
            <p className="py-3 flex justify-between items-center">
              Friday <span>8:00 AM-:00 PM</span>
            </p>
            <p className="py-3 flex justify-between items-center">
              Saturday <span>8:00 AM-:00 PM</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
