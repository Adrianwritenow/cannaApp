import React, { useEffect, useState } from 'react';
import {
  faqs,
  listings,
  products,
  reviews,
} from '../../../../src/helpers/mockData';

import { ArrowRightIcon } from '@heroicons/react/solid';
import ClothingProduct from '../../../../src/views/search/product/ClothingProduct';
import { Dispensary } from '@/interfaces/searchDispensary';
import FaqSlideOver from '@/views/slideOver/FaqSlideOver';
import FlowerProduct from '../../../../src/views/search/product/FlowerProduct';
import GeneralProduct from '../../../../src/views/search/product/GeneralProduct';
import ImageSlider from '../../../../src/components/slider/ImageSlider';
import Link from 'next/link';
import { Product } from '../../../../src/interfaces/searchProduct';
import ProductResultsSection from '../../../../src/components/sections/ProductsResultsSection';
import ProductReviewsSlideOver from '@/views/slideOver/product/ProductReviewSlideOver';
import { RootState } from '@/reducers';
import { getDocument } from '../../../../src/actions/search';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function ProductDetailXVendor() {
  const router = useRouter();

  const [sort, setSort]: any = useState('relevance');
  const { productId, vendorId } = router.query;
  const [product, setProduct] = useState<Product>();
  const [vendor, setVendor] = useState<Dispensary>();

  const dummyProduct = products[0];
  const { results, query } = useSelector((root: RootState) => root.search);
  const [searchList, setSearchLists] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    if (productId) {
      getDocument(productId).then(
        (document: React.SetStateAction<Product | undefined>) => {
          setProduct(document);
        }
      );
      // Vendor not related to product

      // getDocument(vendorId).then(
      //   (document: React.SetStateAction<Dispensary | undefined>) => {
      //     setVendor(document);
      //   }
      // );
    }

    let searchListUpdate: any = [];

    results.map((result: any, index: number) => {
      switch (true) {
        case result._id.includes('product_entity'):
          searchListUpdate.push(result);
          break;
      }
    });
    if (currentQuery !== query) {
      setSearchLists(searchListUpdate);
    }
    setCurrentQuery(query);
  }, [router, results, searchList, currentQuery]);

  return (
    <div className="max-w-7xl mx-auto bg-white">
      {/* Product */}
      {product && (
        <div className="">
          {/* Image gallery */}

          <ImageSlider images={[]} />

          {/* Product info */}

          <div className="mt-4 px-4 space-y-4">
            {(() => {
              switch (product._source._type) {
                case 'flower':
                  return <FlowerProduct product={product} />;
                  break;
                case 'clothing':
                  return <ClothingProduct product={product} />;
                  break;
                default:
                  return <GeneralProduct product={product} />;
              }
            })()}
          </div>
          <div className="space-y-6 px-4">
            <section aria-labelledby="details-heading ">
              <h2 id="details-heading" className="sr-only">
                Product details
              </h2>
              <div className="pt-6">
                <h2 className="text-gray-700 text-lg font-semibold">
                  {product._source.name_1}
                </h2>
                {product._source._type !== 'clothing' && (
                  <div className="text-sm text-gray-500 pt-2">
                    <p>
                      <span className="text-black">Type:</span>{' '}
                      {product._source._type}
                    </p>
                    <p>
                      <span className="text-black">Category:</span>
                      {product._source.category}
                    </p>
                    {/* Need Cannabanoid data */}
                    {/* <div className="flex">
                      <p className="text-black">Cannabanoids:&nbsp;</p>
                      <p>
                        THC&nbsp;
                        {dummyProduct.cannabanoids &&
                          Math.round(dummyProduct.cannabanoids?.thc * 100)}
                        %
                      </p>
                      <>&nbsp;</>
                      <p>
                        CBD&nbsp;
                        {dummyProduct.cannabanoids &&
                          Math.round(dummyProduct.cannabanoids?.cbd * 100)}
                        %
                      </p>
                    </div> */}
                  </div>
                )}
                <div className="pt-2">
                  <p className="text-sm text-gray-500 line-clamp-4">
                    {product._source.description}
                  </p>
                  <Link href="#" passHref>
                    <a className="text-green mt-1 text-sm font-medium flex items-center">
                      Learn more &nbsp;
                      <ArrowRightIcon className="w-4 h-4" />
                    </a>
                  </Link>
                </div>
              </div>
            </section>
            {/* Need Specifications data */}
            <section aria-labelledby="specifications-heading">
              <div className="py-4 border-b">
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
              </div>
            </section>
          </div>
        </div>
      )}
      <div className="px-4 pt-4">
        <FaqSlideOver name={listings[0]._source.name[0]} faqs={faqs} />
      </div>
      <ProductResultsSection
        list={searchList}
        sponsored={false}
        label="Related Items"
      />
      <div className="pt-4">
        <ProductReviewsSlideOver product={product} reviews={reviews} />
      </div>

      <ProductResultsSection
        list={searchList}
        sponsored={false}
        label={`More from ${vendor?._source.name}`}
        hideButton={true}
      />
      <ProductResultsSection
        list={searchList}
        sponsored={false}
        label="Recently Viewed Items"
        hideButton={true}
      />
    </div>
  );
}

export default ProductDetailXVendor;
