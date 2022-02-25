import { formatDealCard, formatProductCard } from '@/helpers/formatters';
import { getDocument, getDocuments } from '@/actions/search';
import { useEffect, useState } from 'react';

import { IAxiosReturn } from '@/interfaces/axios';
import ImageWithFallback from '@/components/image/ImageWithFallback';
import ListingCard from '@/components/listings/ListingCard';
import { ListingProps } from '@/interfaces/listing';
import { Product } from '@/interfaces/product';
import { SearchHits } from '@/interfaces/searchHits';
import StarRating from '@/components/rating/StarRating';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DealOverview() {
  const router = useRouter();
  const [deal, setDeal] = useState<ListingProps>();
  const [products, setProducts] = useState<Product[]>();
  const { deal_id } = router.query;
  const [dispatchProductLoad] = useAxios(false);

  useEffect(() => {
    if (!deal_id || deal) {
      return;
    }

    getDocument(deal_id, 'coupons').then((document: SearchHits) => {
      if (!document) {
        return;
      }

      const result = document.hits.hits[0];
      const dealProducts = result._source.products || [];
      setDeal(formatDealCard(result));

      if (dealProducts.length) {
        dispatchProductLoad(getDocuments(dealProducts, 'products')).then(
          (status: IAxiosReturn) => {
            if (status.success) {
              const responseData: SearchHits = status.response.data;
              setProducts(responseData.hits.hits);
            }
          }
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, deal_id, deal]);

  if (!deal) {
    // TODO: This is barely noticeable but maybe something better?
    return 'Loading deal...';
  }

  return (
    <div className="bg-gray-50">
      <div className="grid grid-cols-1 tablet:grid-cols-2 tablet:gap-20 px-4 py-10 max-w-7xl mx-auto ">
        {/* Left Column */}
        <section aria-labelledby="dispensary-information-grouping">
          <div className="w-full h-36 tablet:h-80 relative mb-2">
            <ImageWithFallback
              src={deal.image}
              alt={deal.title}
              layout="fill"
              objectFit={'cover'}
            />
          </div>

          <div className="w-full py-6">
            <p className="text-md text-gray-500 mb-2">Deal offered by</p>
            <div className="border p-4">
              <Link href={`/business/${deal.dispensary_id}`} passHref>
                <a className="flex items-center">
                  <div className="w-20 h-20 mr-5 relative ">
                    <ImageWithFallback
                      src={deal.thumbnail}
                      alt={deal.name}
                      layout="fill"
                      objectFit={'cover'}
                    />
                  </div>
                  <div>
                    <p className="font-bold">{deal.name}</p>
                    {deal.rating && (
                      <StarRating
                        rating={deal.rating}
                        reviews_count={deal.reviews_count}
                      />
                    )}
                    <p className="text-sm text-gray-500 font-normal">
                      {deal.city}, {deal.state}
                    </p>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* Right Column */}
        <section aria-labelledby="deal-information-grouping">
          <section aria-labelledby="deal-information">
            <div className="sr-only">
              <h1>Product information</h1>
            </div>
            <h1 className="text-lg font-normal tracking-tight text-gray-900">
              {deal.title}
            </h1>

            {/* Reviews */}
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              {typeof deal.rating !== 'undefined' && (
                <StarRating
                  rating={deal.rating}
                  reviews_count={deal.reviews_count}
                />
              )}
            </div>

            <div className="print:hidden">
              <button
                onClick={e => window.print()}
                className="w-full bg-green-500 text-white hover:bg-green-600 flex justify-center py-2 px-4 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
              >
                Print Coupon
              </button>
            </div>
          </section>

          <section aria-labelledby="details-heading">
            <h2 id="details-heading" className="sr-only">
              Deal details
            </h2>
            <div className="pt-6">
              <h2 className="text-gray-700 text-lg font-semibold">
                Deal Details
              </h2>
              <div className="text-sm text-gray-500 pt-2">
                <p>
                  <span className="text-black">Type: </span>
                  {deal.type}
                </p>
                <p>
                  <span className="text-black">Category: </span>
                  {deal.categories?.join(', ')}
                </p>
              </div>

              {products && products.length > 0 && (
                <div className="pt-6">
                  <h2 className="text-gray-700 text-lg font-semibold">
                    Applies To
                  </h2>
                  <div className="grid grid-cols-2 desktop:grid-cols-3 gap-4 py-6">
                    {products.map((listing, index) => (
                      <div key={`lc-${listing._id}-${index}`}>
                        <ListingCard
                          {...formatProductCard(listing)}
                          rating={undefined}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="py-6">
              <p className="text-lg">How to Apply Deal?</p>
              <p className="text-sm text-gray-700 pt-2">
                You may print out a copy or just show it to the budtender from
                your mobile screen.
              </p>
            </div>
          </section>

          {/* Hours of Operation */}
          {deal.hours && (
            <section className="pt-6 pb-12 print:hidden">
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
                  Sunday <span>{deal.hours.sunday_hours}</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Monday <span>{deal.hours.monday_hours}</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Tuesday <span>{deal.hours.tuesday_hours}</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Wednesday <span>{deal.hours.wednesday_hours}</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Thursday <span>{deal.hours.thursday_hours}</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Friday <span>{deal.hours.friday_hours}</span>
                </p>
                <p className="py-3 flex justify-between items-center">
                  Saturday <span>{deal.hours.saturday_hours}</span>
                </p>
              </div>
            </section>
          )}
        </section>
      </div>
    </div>
  );
}
