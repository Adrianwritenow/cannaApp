import React, { useState } from "react";

import Image from "next/image";
import { Product } from "../../../src/interfaces/product";
import ProductResultsSection from "../../../src/components/sections/ProductsResultsSection";
import { StarIcon } from "@heroicons/react/solid";
import { Strain } from "../../../src/interfaces/strain";

export default function StrainDetail() {
  const [myRating, setMyRating] = useState(0);
  const strain: Strain = {
    id: "c1",
    rating: 4,
    reviewCount: 30,
    images: [
      "https://images.unsplash.com/photo-1503262028195-93c528f03218?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1496189713555-6f47ff6b27e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1520224855316-280b2e6afca1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      "https://images.unsplash.com/photo-1457573399415-1154bfe3ff71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2787&q=80",
    ],
    title: "Cannabis Strain",
    type: "Type",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.",
    cannabanoids: {
      thc: 40,
      cbd: 60,
    },
    effects: {
      type: "Sleepy",
      effectPercent: 55,
    },
    growing: {
      min: 20,
      max: 30,
    },
  };
  const products: Array<Product> = [
    {
      id: 1,
      name: "Product Name",
      vendor: "Vendor",
      category: "Category",
      price: "$149",
      rating: 5,
      reviewCount: 38,
      imageSrc:
        "https://images.unsplash.com/photo-1573340605426-50e22546b411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80",
      imageAlt: "TODO",
      href: "#",
    },
    {
      id: 2,
      name: "Product Name",
      vendor: "Vendor",
      category: "Category",
      price: "$15",
      rating: 5,
      reviewCount: 18,
      imageSrc:
        "https://images.unsplash.com/photo-1583511335492-7953f39ce779?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
      imageAlt: "TODO",
      href: "#",
    },
    {
      id: 3,
      name: "Product Name",
      vendor: "Vendor",
      category: "Category",
      price: "$15",
      rating: 5,
      reviewCount: 14,
      imageSrc:
        "https://images.unsplash.com/photo-1597511325194-f5d8389f8a5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1033&q=80",
      imageAlt: "TODO",
      href: "#",
    },
    {
      id: 4,
      name: "Product Name",
      vendor: "Vendor",
      category: "Category",
      price: "$15",
      rating: 4,
      reviewCount: 21,
      imageSrc:
        "https://images.unsplash.com/photo-1587920951705-5e2ddf954c49?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
      imageAlt: "TODO",
      href: "#",
    },
  ];

  return (
    <div className="bg-white">
      <div className="w-full h-64 relative">
        <Image src={strain.images[0]} layout="fill" objectFit={"cover"} />
      </div>
      <div className="p-4">
        <section
          aria-labelledby="strains-heading"
          className="border-gray-200 border-b pb-4"
        >
          <h2 id="strains-heading" className="sr-only">
            {strain.title}
          </h2>
          <h2 className="text-gray-700 text-3xl font-normal">{strain.title}</h2>
          <p className="text-base text-gray-500">{strain.type}</p>
          <div className="flex items-center pt-4">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`${
                  myRating > rating ? "text-yellow-400" : "text-gray-200"
                }
                  flex-shrink-0 h-6 w-6`}
                aria-hidden="true"
                onClick={() => setMyRating(rating + 1)}
              />
            ))}
          </div>
        </section>
        <section aria-labelledby="strains-about" className="pt-4">
          <h2 id="strains-about" className="sr-only">
            {strain.title}
          </h2>
          <p className="text-base text-gray-700">{strain.about}</p>
        </section>
      </div>
      <ProductResultsSection products={products} sponsored={true} />
    </div>
  );
}
