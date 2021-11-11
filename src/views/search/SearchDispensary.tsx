import { Listing } from "../../interfaces/listing";
import ListingCard from "../../components/listings/ListingCard";
import ListingSection from "../../components/sections/ListingSection";
import React from "react";


export default function SearchStrain() {
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
    <div className="bg-gray-50">
      <ListingSection listings={[listings[0], listings[1]]} sponsored={true} />
      <div className="pt-5">
        <h2 className="text-xl text-gray-700 font-semibold p-4 pb-0">
          Dispensaries near %Location%
        </h2>
        <div className="grid grid-flow-row auto-rows-max gap-1">
          {listings.map((listing: Listing, index) => (
            <ListingCard listing={listing} key={`sd-${index}`} />
          ))}
        </div>
      </div>
      <div className="px-4 ">
        <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
          See more
        </button>
      </div>
    </div>
  );
}
