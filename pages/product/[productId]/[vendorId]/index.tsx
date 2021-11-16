import React, { useEffect, useState } from "react";

import { ArrowRightIcon } from "@heroicons/react/solid";
import ClothingProduct from "../../../../src/views/search/product/ClothingProduct";
import FlowerProduct from "../../../../src/views/search/product/FlowerProduct";
import GeneralProduct from "../../../../src/views/search/product/GeneralProduct";
import ImageSlider from "../../../../src/components/slider/ImageSlider";
import Link from "next/link";
import { Product } from "../../../../src/interfaces/product";
import ProductResultsSection from "../../../../src/components/sections/ProductsResultsSection";
import { products } from "../../../../src/helpers/mockData";
import { useRouter } from "next/router";

function ProductDetailXVendor() {
  const [sort, setSort]: any = useState("relevance");
  const [product, setProduct] = useState<Product>();
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    const { productId } = query;
    const pid = parseInt(productId as string);
    setProduct(products[pid]);
  }, [product, router]);

  return (
    <div className="max-w-7xl mx-auto bg-white">
      {/* Product */}
      {product && (
        <div className="">
          {/* Image gallery */}

          <ImageSlider images={product.images} />

          {/* Product info */}

          <div className="mt-4 px-4 space-y-4">
            {(() => {
              switch (product.type) {
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
                  {product.name}
                </h2>
                {product.type !== "clothing" && (
                  <div className="text-sm text-gray-500 pt-2">
                    <p>
                      <span className="text-black">Type:</span> {product.type}
                    </p>
                    <p>
                      <span className="text-black">Category:</span>{" "}
                      {product.category}
                    </p>
                    <div className="flex">
                      <p className="text-black">Cannabanoids:&nbsp;</p>
                      <p>
                        THC&nbsp;
                        {product.cannabanoids &&
                          Math.round(product.cannabanoids?.thc * 100)}
                        %
                      </p>
                      <>&nbsp;</>
                      <p>
                        CBD&nbsp;
                        {product.cannabanoids &&
                          Math.round(product.cannabanoids?.cbd * 100)}
                        %
                      </p>
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <p className="text-sm text-gray-500">{product.about}</p>
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
                  {product.specifications.map((spec, index) => {
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
