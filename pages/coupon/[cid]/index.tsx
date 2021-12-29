import { Business } from '../../../public/assets/icons/iconComponents';
import { CheckCircleIcon } from '@heroicons/react/solid';
import ProductResultsGrid from '../../../src/components/products/ProductResultsGrid';
import { products } from '@/helpers/mockData';
import { useState } from 'react';

export default function CouponDetail() {
  const [redeemed, setRedeemed] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-gray-50 px-4 py-6">
      <section className="border-b border-gray-200 space-y-6">
        <div className="flex items-center space-x-2">
          <div className="flex justify-center items-center rounded-full overflow-hidden w-10 h-10 border border-gray-200">
            <Business fill="green" className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <h3 className="font-semibold">Brand/Location</h3>
            <p className="text-green-500">
              More deals from this brand/location
            </p>
          </div>
        </div>
        <h2 className="text-2xl text-gray-700 font-medium">
          Save %Discount% on %Product Name%
        </h2>

        <div className="space-y-2 pb-6">
          <button
            onClick={() => setSaved(true)}
            type="button"
            className="w-full bg-white text-green-500 hover:bg-gray-50 flex justify-center py-2 px-4 border-2 border-green-500 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
          >
            {!saved ? 'Save Coupon' : 'View Coupons'}
          </button>

          <button
            type="button"
            onClick={() => setRedeemed(true)}
            className="w-full bg-green text-white hover:bg-green-600 flex justify-center py-2 px-4   border-2 border-green-500 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
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

      <section>
        <ProductResultsGrid label={'Qualifying Items'} list={products} />
      </section>
    </div>
  );
}
