import React, { useEffect, useState } from "react";

import { ArrowRightIcon } from "@heroicons/react/solid";
import ClothingProduct from "../../../../src/views/search/product/ClothingProduct";
import FlowerProduct from "../../../../src/views/search/product/FlowerProduct";
import GeneralProduct from "../../../../src/views/search/product/GeneralProduct";
import ImageSlider from "../../../../src/components/slider/ImageSlider";
import Link from "next/link";
import { Product } from "../../../../src/interfaces/searchProduct";
import ProductResultsSection from "../../../../src/components/sections/ProductsResultsSection";
import { getDocument } from "../../../../src/actions/search";
import { products } from "../../../../src/helpers/mockData";
import { useRouter } from "next/router";

function ProductDetailXVendor() {
  const router = useRouter();

  const [sort, setSort]: any = useState("relevance");
  const { productId, vendorId } = router.query;

  const [product, setProduct] = useState<Product>();

  const dummyProduct = products[0];

  useEffect(() => {
    console.log(router.query);
    if (productId) {
      getDocument(productId).then(
        (document: React.SetStateAction<Product | undefined>) => {
          setProduct(document);
        }
      );
    }
  }, [router]);

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
                case "flower":
                  return <FlowerProduct product={product} />;
                  break;
                case "clothing":
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
                {product._source._type !== "clothing" && (
                  <div className="text-sm text-gray-500 pt-2">
                    <p>
                      <span className="text-black">Type:</span>{" "}
                      {product._source._type}
                    </p>
                    <p>
                      <span className="text-black">Category:</span>
                      {product._source.category}
                    </p>
                    <div className="flex">
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
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <p className="text-sm text-gray-500">
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

            <section aria-labelledby="specifications-heading">
              <h2 id="specifications-heading" className="sr-only">
                Specifications
              </h2>
              <h2 className="text-gray-700 text-lg font-semibold">
                Specifications
              </h2>
              <div>
                <ul className="text-sm text-gray-700">
                  {dummyProduct.specifications.map((spec, index) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-green-50"
                        } flex py-3 px-2`}
                      >
                        <p className="font-semibold">{spec.label}</p>
                        <p className="ml-auto">{spec.value}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          </div>
        </div>
      )}
      <ProductResultsSection
        products={products}
        sponsored={false}
        label="Related Items"
      />

      <ProductResultsSection
        products={products}
        sponsored={false}
        label="More from %Shop% "
      />
      <ProductResultsSection
        products={products}
        sponsored={false}
        label="Recently Viewed Items"
      />
    </div>
  );
}

export default ProductDetailXVendor;
