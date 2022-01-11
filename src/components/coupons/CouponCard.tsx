import { Coupon } from '../../interfaces/coupon';
import Image from 'next/image';
import Link from 'next/link';

interface CouponCardProps {
  coupon: Coupon;
}

export default function CouponCard(props: CouponCardProps) {
  const { coupon } = props;
  return (
    <div className="relative w-36 flex flex-wrap" id={`coupon-${coupon.code}`}>
      <div className="rounded-lg overflow-hidden w-36 h-36 relative">
        <Image
          src={coupon.image.src}
          alt={coupon.image.alt}
          layout="fill"
          objectFit={'cover'}
        />
      </div>
      <div className="pt-2 pb-6 text-left text-sm w-36">
        <p className="text-blue-500 font-semibold">Save {coupon.saving} on</p>
        <h3 className="text-sm font-normal text-gray-700 pt-1 pb-2">
          {coupon.products[0]._source.name}
        </h3>
        <div className="flex flex-col items-start">
          <Link href="/coupon/1" passHref>
            <a>
              <button
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 border border-green-500 shadow-sm text-xs font-medium rounded text-green-500 bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                View Coupon
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
