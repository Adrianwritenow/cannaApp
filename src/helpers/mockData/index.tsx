import { Listing } from "../../interfaces/listing";
import { Product } from "../../interfaces/product";
import { Strain } from "../../interfaces/strain";

export const products: Array<Product> = [
  {
    id: 0,
    name: "Product Name",
    vendor: "Vendor",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.",
    cannabanoids: {
      thc: 0.5,
      cbd: 0.5,
    },
    type: "general",
    specifications: [
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
    ],
    brand: "Brand",
    category: "Category",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://images.unsplash.com/photo-1573340605426-50e22546b411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80",
    imageAlt: "TODO",
    href: "#",
    images: [
      {
        id: 1,
        name: "Angled view",
        src: "https://images.unsplash.com/photo-1573340605426-50e22546b411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 2,
        name: "Angled view",
        src: "https://images.unsplash.com/photo-1583511335492-7953f39ce779?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 3,
        name: "Angled view",
        src: "https://images.unsplash.com/photo-1597511325194-f5d8389f8a5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1033&q=80",
        alt: "Angled front view with bag zipped and handles upright.",
      },
    ],
  },
  {
    id: 1,
    name: "Product Name",
    vendor: "Vendor",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.",
    cannabanoids: {
      thc: 0.5,
      cbd: 0.5,
    },
    type: "flower",
    specifications: [
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
    ],
    brand: "Brand",
    category: "Category",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://images.unsplash.com/photo-1583511335492-7953f39ce779?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
    imageAlt: "TODO",
    href: "#",
    images: [
      {
        id: 1,
        name: "Angled view",
        src: "https://images.unsplash.com/photo-1573340605426-50e22546b411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 2,
        name: "Angled view",
        src: "https://images.unsplash.com/photo-1583511335492-7953f39ce779?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 3,
        name: "Angled view",
        src: "https://images.unsplash.com/photo-1597511325194-f5d8389f8a5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1033&q=80",
        alt: "Angled front view with bag zipped and handles upright.",
      },
    ],
  },
  {
    id: 2,
    name: "Product Name",
    vendor: "Vendor",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.",
    cannabanoids: {
      thc: 0.5,
      cbd: 0.5,
    },
    type: "clothing",
    specifications: [
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
    ],
    brand: "Brand",
    category: "Category",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://images.unsplash.com/photo-1597511325194-f5d8389f8a5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1033&q=80",
    imageAlt: "TODO",
    images: [
      {
        id: 1,
        name: "Angled view",
        src: "https://images.unsplash.com/photo-1573340605426-50e22546b411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 2,
        name: "Angled view",
        src: "https://images.unsplash.com/photo-1583511335492-7953f39ce779?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 3,
        name: "Angled view",
        src: "https://images.unsplash.com/photo-1597511325194-f5d8389f8a5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1033&q=80",
        alt: "Angled front view with bag zipped and handles upright.",
      },
    ],
    href: "#",
  },
  {
    id: 3,
    name: "Product Name",
    vendor: "Vendor",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.",
    cannabanoids: {
      thc: 0.5,
      cbd: 0.5,
    },
    type: "Type",
    specifications: [
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
      { label: "Specific", value: "description" },
    ],
    brand: "Brand",
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

export const listings: Array<Listing> = [
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

export const strain: Strain = {
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

export const strains: Array<Strain> = [
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