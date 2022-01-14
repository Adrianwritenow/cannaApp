import { browseBy, getPopular } from '@/actions/search';
import { listings, products } from '../../helpers/mockData';
import { useEffect, useState } from 'react';

import { Coupon } from '@/interfaces/coupon';
import CouponSlideOver from '../slideOver/CouponsSlideOver';
import { Dispensary } from '@/interfaces/dispensary';
import ListingCard from '../../components/listings/ListingCard';
import ProductDealsCard from '../../components/deals/ProductDealsCard';
import ProductFilterSlideOver from '../slideOver/filters/ProductFilterSlideOver';
import ProductResultsSection from '../../components/sections/ProductsResultsSection';
import { SearchHits } from '@/interfaces/searchHits';

export default function SearchDeals() {
  const [deals, setDeals] = useState<Array<Dispensary>>([]);
  const [coupons, setCoupons] = useState<Array<Coupon>>([]);
  useEffect(() => {
    if (!coupons.length) {
      getPopularItems('coupons');
    }

    if (coupons?.length && !deals.length) {
      getDeals(coupons);
    }
  }, [coupons, deals]);
  async function getDeals(data: Coupon[]) {
    const ids = data.map(index => index._source.dispensary[0]);

    const hits: SearchHits = await browseBy(
      'id',
      `*`,
      'dispenaries',
      {
        key: 'id',
        value: ids,
      },
      true
    );
    setDeals(hits.hits.hits as unknown as Dispensary[]);
  }

  async function getPopularItems(type: string) {
    const hits: SearchHits = await getPopular(type);
    setCoupons(hits.hits.hits);
  }
  return (
    <div className="bg-gray-50">
      <ProductFilterSlideOver setFilters={() => {}} />
      <div>
        {/* <section className="px-4 pb-2.5">
          <h3 className="text-lg font-semibold text-black">Featured Deals</h3>

          {products.map((product, index) => {
            return (
              <ProductDealsCard
                product={product}
                key={`${product._id}-${index}`}
              />
            );
          })}
        </section> */}
        <div>
          {/* <CouponSlideOver label="Coupons on Pipes" />

          <CouponSlideOver label="Coupons on Concentrates" /> */}

          <section className="pb-4 pt-2">
            <h2 id="deals-near-me" className="sr-only">
              Deals Near Me
            </h2>
            <h2
              id="deals-near-me"
              className="text-gray-700 text-lg font-semibold px-4 py-4"
            >
              Deals Near Me
            </h2>
            <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4 pb-4">
              {deals.map((listing, index) => (
                <div className="w-64" key={`lc-${listing._id}-${index}`}>
                  <ListingCard
                    discount={`$${coupons[index]._source.discount}`}
                    listing={listing}
                    amenities={false}
                  />
                </div>
              ))}
            </div>
            {/* <div className="px-4">
              <button
                className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest"
                onClick={() => {}}
              >
                <span>See more</span>
              </button>
            </div> */}
          </section>
          {/* <section>
            <ProductResultsSection
              list={products}
              sponsored={false}
              label="Up to 50% off %Brand% Edibles"
              type="DEAL"
              deal="$11.00"
            />
          </section>
          <section>
            <ProductResultsSection
              list={products}
              sponsored={false}
              label="Bulk Deals on Flower"
              type="DEAL"
              deal="$9.00"
            />
          </section> */}
        </div>
      </div>
    </div>
  );
}
