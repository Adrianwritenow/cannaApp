import React from "react";
import LearnSection from "../../src/components/sections/LearnSection";
import ListingSection from "../../src/components/sections/ListingSection";
import ProductResultsSection from "../../src/components/sections/ProductsResultsSection";
import RelatedStrainsSection from "../../src/components/sections/RelatedStrainsSection";
import { Listing } from "../../src/interfaces/listing";
import { Product } from "../../src/interfaces/product";
import { Strain } from "../../src/interfaces/strain";

export default function Search() {
  const tabs = [
    { name: "All", href: "#", current: true },
    { name: "Dispensaries", href: "#", current: false },
    { name: "Strains", href: "#", current: false },
    { name: "Restauraunts", href: "#", current: false },
    { name: "Shops", href: "#", current: false },
  ];

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

  const strains: Array<Strain> = [
    {
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
    },
    {
      id: "c2",
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
    },
    {
      id: "c3",
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
    },
    {
      id: "c4",
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
    },
  ];

  const listings: Array<Listing> = [
    {
      id: "l23",
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1674&q=80",
      distance: "8mi",
      openTime: "12pm",
      closeTime: "8pm",
      amenities: ["Amenity", "Amenity", "Amenity"],
      category: "Listing Category",
      href: "#",
      name: "Listing Name",
      rating: 4,
      reviewCount: 90,
    },
    {
      id: "l24",
      image:
        "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      distance: "8mi",
      openTime: "12pm",
      closeTime: "8pm",
      amenities: ["Amenity", "Amenity", "Amenity"],
      category: "Listing Category",
      href: "#",
      name: "Listing Name",
      rating: 4,
      reviewCount: 90,
    },
    {
      id: "l25",
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1674&q=80",
      distance: "8mi",
      openTime: "12pm",
      closeTime: "8pm",
      amenities: ["Amenity", "Amenity", "Amenity"],
      category: "Listing Category",
      href: "#",
      name: "Listing Name",
      rating: 4,
      reviewCount: 90,
    },
    {
      id: "l26",
      image:
        "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      distance: "8mi",
      openTime: "12pm",
      closeTime: "8pm",
      amenities: ["Amenity", "Amenity", "Amenity"],
      category: "Listing Category",
      href: "#",
      name: "Listing Name",
      rating: 4,
      reviewCount: 90,
    },
    {
      id: "l29",
      image:
        "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      distance: "8mi",
      openTime: "12pm",
      closeTime: "8pm",
      amenities: ["Amenity", "Amenity", "Amenity"],
      category: "Listing Category",
      href: "#",
      name: "Listing Name",
      rating: 4,
      reviewCount: 90,
    },
    {
      id: "l2t7",
      image:
        "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      distance: "8mi",
      openTime: "12pm",
      closeTime: "8pm",
      amenities: ["Amenity", "Amenity", "Amenity"],
      category: "Listing Category",
      href: "#",
      name: "Listing Name",
      rating: 4,
      reviewCount: 90,
    },
    {
      id: "l456",
      image:
        "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      distance: "8mi",
      openTime: "12pm",
      closeTime: "8pm",
      amenities: ["Amenity", "Amenity", "Amenity"],
      category: "Listing Category",
      href: "#",
      name: "Listing Name",
      rating: 4,
      reviewCount: 90,
    },
    {
      id: "l2w3",
      image:
        "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      distance: "8mi",
      openTime: "12pm",
      closeTime: "8pm",
      amenities: ["Amenity", "Amenity", "Amenity"],
      category: "Listing Category",
      href: "#",
      name: "Listing Name",
      rating: 4,
      reviewCount: 90,
    },
  ];
  return (
    <div className="bg-gray-50 ">
      <div className="overflow-visible overflow-scroll border-b border-gray-200 bg-white ">
        <nav
          className="-mb-px flex space-x-8 overflow-visible overflow-x-scroll pl-6 border-b border-gray-200 "
          aria-label="Tabs"
        >
          {tabs.map((tab, index, array) => (
            <a
              key={tab.name}
              href={tab.href}
              className={`${
                tab.current
                  ? "border-green text-green"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } ${
                array.length - 1 === index ? "pr-6" : ""
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
      {/* Shop Query Section */}
      <ProductResultsSection products={products} sponsored={true} />
      {/* Learn Query Section */}
      <LearnSection strain={strains[0]} />
      {/* Related Strains Secrtion */}
      <RelatedStrainsSection strains={strains} />
      {/* Sponsered Listings Section */}
      <ListingSection listings={[listings[0], listings[1]]} sponsored={true} />

      {/* Listings Section */}
      <ListingSection listings={listings} />
    </div>
  );
}
