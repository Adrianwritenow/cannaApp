import { listings, products } from "../../../src/helpers/mockData";

import { BookmarkIcon } from "@heroicons/react/outline";
import BrandFilterSlideOver from "../../../src/views/slideOver/BrandFilterSlideOver";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import ProductResultsSection from "../../../src/components/sections/ProductsResultsSection";

export default function BrandProfile() {
  const listing = listings[0];

  return (
    <div className="bg-gray-50">
      <div>
        <div className="w-full h-48 relative">
          <Image
            src={listing.image}
            layout="fill"
            objectFit={"cover"}
            alt={listing.name}
          />

          <div className="absolute flex space-x-6 right-0 top-0 z-30 m-4">
            <button
              onClick={() => {}}
              className="bg-white rounded-full shadow-sm  w-10 h-10 flex items-center justify-center"
            >
              <BookmarkIcon className="text-gray-700 w-4" />
            </button>
          </div>
        </div>
        <section
          className="p-4 space-y-2 bg-white shadow-md"
          aria-labelledby="brand-heading"
        >
          {/* Title */}
          <h2 id="brand-heading" className="sr-only">
            {listing.name}
          </h2>
          <h2 className="text-gray-700 text-2xl font-semibold">
            {listing.name}
          </h2>
          {/* Link */}
          <div className="flex items-center ">
            <p className="text-sm font-semibold text-gray-700">
              Example.com&nbsp;
            </p>
            <Link href={listing.href} passHref>
              <a>
                <ExternalLinkIcon className="w-5 h-5" />
              </a>
            </Link>
          </div>
          {/* About */}
          <div className="text-sm text-gray-500">{listing.about}</div>
          {/* Followers */}
          <div>
            <p className="text-sm text-gray-500 ">
              <span className="text-gray-700 font-semibold">50</span> followers
            </p>
          </div>
        </section>
        <div>
          <BrandFilterSlideOver business={listing} />
        </div>
        <div className="py-3">
          <ProductResultsSection
            products={products}
            sponsored={false}
            label="Explore our products"
          />

          <ProductResultsSection
            products={products}
            sponsored={false}
            label="Best Sellers"
          />
          <ProductResultsSection
            products={products}
            sponsored={false}
            label="Deals"
          />
          <ProductResultsSection
            products={products}
            sponsored={false}
            label="Category"
          />
        </div>
      </div>
    </div>
  );
}
