import { Coupon } from '@/interfaces/coupon';
import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';

interface CouponCardProps {
  coupon: Coupon;
}

export default function CouponCard(props: CouponCardProps) {
  const { coupon } = props;
  return (
    <div
      className="relative w-36 flex flex-wrap h-max"
      id={`coupon-${coupon._id}`}
    >
      <div className="rounded-lg overflow-hidden w-36 h-36 relative">
        <ImageWithFallback
          src={coupon._source.deal_image}
          alt={'Coupon Image'}
          layout="fill"
          objectFit={'cover'}
        />
      </div>
      <div className="pt-2 pb-6 text-left text-sm w-36">
        <p className="text-blue-500 font-semibold">
          Save {coupon._source.title} on
        </p>
        {/* <h3 className="text-sm font-normal text-gray-700 pt-1 pb-2">
          {coupon._source.title}
        </h3> */}
        <div className="flex flex-col items-start">
          <Link href={`/coupon/${coupon._source.id}`} passHref>
            <a>
              <button
                type="button"
                className="inline-flex items-center mt-2 px-2.5 py-1.5 border border-green-500 shadow-sm text-xs font-medium rounded text-green-500 bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 "
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
