import { Coupon } from '@/interfaces/coupon';
import CouponCard from '@/components/coupons/CouponCard';
import { InformationCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { Product } from '@/interfaces/product';
import ProductCard from '@/components/products/ProductCard';

interface Results {
  list: Array<Product> | Array<Coupon>;
  sponsored: boolean;
  label: string;
  buttonLabel?: string;
  stateFunction?: Function;
  hideButton?: boolean;
  type?: string;
  deal?: string;
  link?: string;
}

export default function ProductResultsSection(results: Results) {
  const {
    list,
    sponsored,
    label,
    buttonLabel,
    stateFunction,
    type,
    link,
    deal,
    hideButton,
  } = results;

  return (
    <section id="results-section" className="w-full max-w-7xl mx-auto">
      {sponsored ? (
        <div className="flex flex-wrap items-center px-4 pt-3">
          <h5 className="text-xs text-gray-500 font-semibold pr-1">
            Sponsored Result
          </h5>
          <InformationCircleIcon className="w-5 h-5 text-gray-500" />
        </div>
      ) : (
        ''
      )}
      <div className="pt-2 w-full ">
        <div className="desktop:h-auto desktop:rounded-md desktop:flex desktop:flex-wrap flex-shrink-0">
          <h2 className="text-gray-700 text-lg desktop:text-2xl font-semibold px-4 py-4">
            {label}
          </h2>
        </div>
        {list && list?.length > 0 && (
          <div
            className={`${
              type === 'COUPON' ? 'pb-6' : ''
            } grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4 pb-4 desktop:flex desktop:flex-wrap`}
          >
            {list.map(data => {
              if (type === 'COUPON') {
                return (
                  <div key={`cc-${data._id}`}>
                    <CouponCard coupon={data as Coupon} />
                  </div>
                );
              } else if (type === 'DEAL') {
                return (
                  <ProductCard
                    product={data as Product}
                    key={`pc-${data._id}`}
                    deal={deal}
                  />
                );
              } else {
                return (
                  <div className="w-36" key={`pc-${data._id}`}>
                    <ProductCard product={data as Product} />
                  </div>
                );
              }
            })}
          </div>
        )}
        {hideButton || sponsored ? (
          ''
        ) : (
          <div className={'px-4'}>
            {link && (
              <Link href={link} passHref>
                <a>
                  <button
                    className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest"
                    onClick={() => {
                      if (stateFunction) {
                        stateFunction(true);
                      }
                    }}
                  >
                    {buttonLabel ? buttonLabel : <span>See more</span>}
                  </button>
                </a>
              </Link>
            )}
            {stateFunction && (
              <button
                className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest"
                onClick={() => {
                  if (stateFunction) {
                    stateFunction(true);
                  }
                }}
              >
                {buttonLabel ? buttonLabel : <span>See more</span>}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
