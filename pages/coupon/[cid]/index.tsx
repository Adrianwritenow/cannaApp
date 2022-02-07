import { browseBy, getDocument } from '@/actions/search';
import { useEffect, useState } from 'react';

import { Business } from '../../../public/assets/icons/iconComponents';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { Coupon } from '@/interfaces/coupon';
import { Dispensary } from '@/interfaces/dispensary';
import ProductResultsGrid from '../../../src/components/products/ProductResultsGrid';
import { SearchHits } from '@/interfaces/searchHits';
import { products } from '@/helpers/mockData';
import { useRouter } from 'next/router';

export default function CouponDetail() {
  const [redeemed, setRedeemed] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const { cid } = router.query;
  const [coupon, setCoupon] = useState<Coupon>();
  const [dispensary, setDispensary] = useState<Dispensary[]>([]);

  useEffect(() => {
    if (cid && !coupon) {
      getDocument(cid, 'coupons').then((document: SearchHits) => {
        if (document) {
          const result = document.hits.hits[0];
          setCoupon(result as Coupon);
        }
      });
    }

    async function handleBrowse() {
      const business: SearchHits = await browseBy(
        'id',
        coupon?._source.dispensary[0],
        '*'
      );
      console.log(business);

      setDispensary(business.hits.hits as unknown as Dispensary[]);
    }

    if (coupon && !dispensary.length) {
      handleBrowse();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, coupon]);

  return (
    <div className="bg-gray-50 px-4 py-6 lg:max-w-7xl mx-auto">
      <section className="border-b border-gray-200 space-y-6">
        <div className="flex items-center space-x-2">
          <div className="flex justify-center items-center rounded-full overflow-hidden w-10 h-10 border border-gray-200 bg-white shadow-sm">
            <Business fill="green" className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <h3 className="font-semibold">{dispensary[0]?._source.name[0]}</h3>
            <p className="text-green-500">
              More deals from this brand/location
            </p>
          </div>
        </div>
        <h2 className="text-2xl text-gray-700 font-medium">
          {coupon?._source.title}
        </h2>

        <div className="space-y-2  lg:space-y-0 lg:space-x-2 pb-6 lg:flex">
          <button
            onClick={() => setSaved(true)}
            type="button"
            className="w-full lg:w-auto bg-white text-green-500 hover:bg-gray-50 flex justify-center py-2 px-4 border-2 border-green-500 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
          >
            {!saved ? 'Save Coupon' : 'View Coupons'}
          </button>

          <button
            type="button"
            onClick={() => setRedeemed(true)}
            className="w-full lg:w-auto bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4   border-2 border-green-500 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
          >
            {!redeemed ? (
              'Apply Coupon to Cart'
            ) : (
              <div className="flex">
                <CheckCircleIcon className="w-5 h-5 text-white mr-3" />
                Coupon Applied
              </div>
            )}
          </button>
        </div>
      </section>

      {/* Need Qualifying Items */}
      {/* <section>
        <ProductResultsGrid label={'Qualifying Items'} list={products} />
      </section> */}
    </div>
  );
}
