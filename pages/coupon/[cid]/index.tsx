// TODO: Is this component/page still needed? Seems like we use
// `deals/[deal_id]` instead.
import { searchMulti } from '@/actions/search';
import { useEffect, useState } from 'react';

import { Business } from '@/public/assets/icons/iconComponents';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { Coupon } from '@/interfaces/coupon';
import { Dispensary } from '@/interfaces/dispensary';
import ProductResultsGrid from '@/components/products/ProductResultsGrid';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/reducers';
import { useAxios } from '@/hooks/useAxios';

export default function CouponDetail() {
  const [redeemed, setRedeemed] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const { cid } = router.query;

  const [dispatchCoupon, { loading: loadingCoupon }] = useAxios(false);
  const [dispatchDispensary, { loading: loadingDispensary }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const couponKey = `couponResult${cid}`;
  const couponResult: Coupon[] = listResults[couponKey] || [];
  const coupon: Coupon | undefined = couponResult.length
    ? couponResult[0]
    : undefined;
  const dispensaryKey = `dispensaryResult${cid}`;
  const dispensaryResult: Dispensary[] = listResults[dispensaryKey] || [];
  const dispensary: Dispensary | undefined = dispensaryResult.length
    ? dispensaryResult[0]
    : undefined;

  useEffect(() => {
    if (!loadingCoupon && cid) {
      dispatchCoupon(
        searchMulti({
          endpoints: [
            {
              name: 'coupons',
              key: couponKey,
              filters: {
                id: [cid],
              },
              total: 1,
            },
          ],
        })
      );
    }

    if (!loadingDispensary && coupon?._source.dispensary[0]) {
      dispatchDispensary(
        searchMulti({
          endpoints: [
            {
              name: 'dispenaries',
              key: dispensaryKey,
              filters: {
                id: [coupon._source.dispensary[0]],
              },
              total: 1,
            },
          ],
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, coupon]);

  return (
    <div className="bg-gray-50 px-4 py-6 desktop:max-w-7xl mx-auto">
      <section className="border-b border-gray-200 space-y-6">
        <div className="flex items-center space-x-2">
          <div className="flex justify-center items-center rounded-full overflow-hidden w-10 h-10 border border-gray-200 bg-white shadow-sm">
            <Business fill="green" className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <h3 className="font-semibold">
              {dispensary && dispensary._source?.name[0]}
            </h3>
            <p className="text-green-500">
              More deals from this brand/location
            </p>
          </div>
        </div>
        <h2 className="text-2xl text-gray-700 font-medium">
          {coupon?._source.title}
        </h2>

        <div className="space-y-2  desktop:space-y-0 desktop:space-x-2 pb-6 desktop:flex">
          <button
            onClick={() => setSaved(true)}
            type="button"
            className="w-full desktop:w-auto bg-white text-green-500 hover:bg-gray-50 flex justify-center py-2 px-4 border-2 border-green-500 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
          >
            {!saved ? 'Save Coupon' : 'View Coupons'}
          </button>

          <button
            type="button"
            onClick={() => setRedeemed(true)}
            className="w-full desktop:w-auto bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4   border-2 border-green-500 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
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
