import { Coupon } from "../../interfaces/coupon";
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
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    socials: {
      facebook: "facebook.com/#",
      instagram: "instagram.com/#",
      twitter: "twitter.com/#",
    },
    about:
      "Lectus vel sit nibh ante sagittis, ullamcorper amet lobortis. Tortor volutpat venenatis vitae purus sed commodo, odio a eleifend. Donec lobortis proin dictum. Sodales praesent purus convallis vulputate. Quam commodo, blandit maecenas sed enim nullam sed. In orci metus pharetra mauris. Amet, sagittis sollicitudin tincidunt adipiscing tellus. Ultrices arcu, mollis odio semper mi.  ",

    openTime: "12pm",
    closeTime: "8pm",
    amenities: ["Amenity", "Amenity", "Amenity"],
    category: "Listing Category",
    faqs: [
      {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 2,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 3,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
    ],
    href: "#",
    name: "Listing Name",
    rating: 4,
    reviewCount: 90,
    reviews: [
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: false,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
    ],
    address: "8502 Preston Rd. Inglewood, Maine 98380",
  },
  {
    id: "l24",
    image:
      "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    distance: "8mi",
    socials: {
      facebook: "facebook.com/#",
      instagram: "instagram.com/#",
      twitter: "twitter.com/#",
    },
    about:
      "Lectus vel sit nibh ante sagittis, ullamcorper amet lobortis. Tortor volutpat venenatis vitae purus sed commodo, odio a eleifend. Donec lobortis proin dictum. Sodales praesent purus convallis vulputate. Quam commodo, blandit maecenas sed enim nullam sed. In orci metus pharetra mauris. Amet, sagittis sollicitudin tincidunt adipiscing tellus. Ultrices arcu, mollis odio semper mi.  ",
    openTime: "12pm",
    closeTime: "8pm",
    amenities: ["Amenity", "Amenity", "Amenity"],
    category: "Listing Category",
    faqs: [
      {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 2,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 3,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
    ],
    href: "#",
    name: "Listing Name",
    rating: 4,
    reviewCount: 90,
    reviews: [
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: false,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
    ],
    address: "8502 Preston Rd. Inglewood, Maine 98380",
  },
  {
    id: "l25",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1674&q=80",
    distance: "8mi",
    socials: {
      facebook: "facebook.com/#",
      instagram: "instagram.com/#",
      twitter: "twitter.com/#",
    },
    about:
      "Lectus vel sit nibh ante sagittis, ullamcorper amet lobortis. Tortor volutpat venenatis vitae purus sed commodo, odio a eleifend. Donec lobortis proin dictum. Sodales praesent purus convallis vulputate. Quam commodo, blandit maecenas sed enim nullam sed. In orci metus pharetra mauris. Amet, sagittis sollicitudin tincidunt adipiscing tellus. Ultrices arcu, mollis odio semper mi.  ",

    openTime: "12pm",
    closeTime: "8pm",
    amenities: ["Amenity", "Amenity", "Amenity"],
    category: "Listing Category",
    faqs: [
      {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 2,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 3,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
    ],
    href: "#",
    name: "Listing Name",
    rating: 4,
    reviewCount: 90,
    reviews: [
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: false,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
    ],
    address: "8502 Preston Rd. Inglewood, Maine 98380",
  },
  {
    id: "l26",
    image:
      "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    distance: "8mi",
    socials: {
      facebook: "facebook.com/#",
      instagram: "instagram.com/#",
      twitter: "twitter.com/#",
    },
    about:
      "Lectus vel sit nibh ante sagittis, ullamcorper amet lobortis. Tortor volutpat venenatis vitae purus sed commodo, odio a eleifend. Donec lobortis proin dictum. Sodales praesent purus convallis vulputate. Quam commodo, blandit maecenas sed enim nullam sed. In orci metus pharetra mauris. Amet, sagittis sollicitudin tincidunt adipiscing tellus. Ultrices arcu, mollis odio semper mi.  ",
    openTime: "12pm",
    closeTime: "8pm",
    amenities: ["Amenity", "Amenity", "Amenity"],
    category: "Listing Category",
    faqs: [
      {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 2,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 3,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
    ],
    href: "#",
    name: "Listing Name",
    rating: 4,
    reviewCount: 90,
    reviews: [
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: false,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
    ],
    address: "8502 Preston Rd. Inglewood, Maine 98380",
  },
  {
    id: "l29",
    image:
      "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    distance: "8mi",
    socials: {
      facebook: "facebook.com/#",
      instagram: "instagram.com/#",
      twitter: "twitter.com/#",
    },
    about:
      "Lectus vel sit nibh ante sagittis, ullamcorper amet lobortis. Tortor volutpat venenatis vitae purus sed commodo, odio a eleifend. Donec lobortis proin dictum. Sodales praesent purus convallis vulputate. Quam commodo, blandit maecenas sed enim nullam sed. In orci metus pharetra mauris. Amet, sagittis sollicitudin tincidunt adipiscing tellus. Ultrices arcu, mollis odio semper mi.  ",

    openTime: "12pm",
    closeTime: "8pm",
    amenities: ["Amenity", "Amenity", "Amenity"],
    category: "Listing Category",
    faqs: [
      {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 2,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 3,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
    ],
    href: "#",
    name: "Listing Name",
    rating: 4,
    reviewCount: 90,
    reviews: [
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: false,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
    ],
    address: "8502 Preston Rd. Inglewood, Maine 98380",
  },
  {
    id: "l2t7",
    image:
      "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    distance: "8mi",
    socials: {
      facebook: "facebook.com/#",
      instagram: "instagram.com/#",
      twitter: "twitter.com/#",
    },
    about:
      "Lectus vel sit nibh ante sagittis, ullamcorper amet lobortis. Tortor volutpat venenatis vitae purus sed commodo, odio a eleifend. Donec lobortis proin dictum. Sodales praesent purus convallis vulputate. Quam commodo, blandit maecenas sed enim nullam sed. In orci metus pharetra mauris. Amet, sagittis sollicitudin tincidunt adipiscing tellus. Ultrices arcu, mollis odio semper mi.  ",
    openTime: "12pm",
    closeTime: "8pm",
    amenities: ["Amenity", "Amenity", "Amenity"],
    category: "Listing Category",
    faqs: [
      {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 2,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 3,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
    ],
    href: "#",
    name: "Listing Name",
    rating: 4,
    reviewCount: 90,
    reviews: [
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: false,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
    ],
    address: "8502 Preston Rd. Inglewood, Maine 98380",
  },
  {
    id: "l456",
    image:
      "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    distance: "8mi",
    socials: {
      facebook: "facebook.com/#",
      instagram: "instagram.com/#",
      twitter: "twitter.com/#",
    },
    about:
      "Lectus vel sit nibh ante sagittis, ullamcorper amet lobortis. Tortor volutpat venenatis vitae purus sed commodo, odio a eleifend. Donec lobortis proin dictum. Sodales praesent purus convallis vulputate. Quam commodo, blandit maecenas sed enim nullam sed. In orci metus pharetra mauris. Amet, sagittis sollicitudin tincidunt adipiscing tellus. Ultrices arcu, mollis odio semper mi.  ",
    openTime: "12pm",
    closeTime: "8pm",
    amenities: ["Amenity", "Amenity", "Amenity"],
    category: "Listing Category",
    faqs: [
      {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 2,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 3,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
    ],
    href: "#",
    name: "Listing Name",
    rating: 4,
    reviewCount: 90,
    reviews: [
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: false,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
    ],
    address: "8502 Preston Rd. Inglewood, Maine 98380",
  },
  {
    id: "l2w3",
    image:
      "https://images.unsplash.com/photo-1457573557536-6b4b6ca9a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    distance: "8mi",
    socials: {
      facebook: "facebook.com/#",
      instagram: "instagram.com/#",
      twitter: "twitter.com/#",
    },
    about:
      "Lectus vel sit nibh ante sagittis, ullamcorper amet lobortis. Tortor volutpat venenatis vitae purus sed commodo, odio a eleifend. Donec lobortis proin dictum. Sodales praesent purus convallis vulputate. Quam commodo, blandit maecenas sed enim nullam sed. In orci metus pharetra mauris. Amet, sagittis sollicitudin tincidunt adipiscing tellus. Ultrices arcu, mollis odio semper mi.  ",

    openTime: "12pm",
    closeTime: "8pm",
    amenities: ["Amenity", "Amenity", "Amenity"],
    category: "Listing Category",
    faqs: [
      {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 2,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
      {
        id: 3,
        question: "What's the best thing about Switzerland?",
        answer:
          "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
      },
    ],
    href: "#",
    name: "Listing Name",
    rating: 4,
    reviewCount: 90,
    reviews: [
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: false,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
      {
        recommended: true,
        by: "Jon Doe",
        caption: "Caption",
        review:
          "Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.Vestibulum id diam ornare, pulvinar sapien sit amet, porttitor nisl. Duis at pharetra quam, et cursus sapien. Class aptent taciti sociosqu ad litora torquent per.",
        time: "6:00am",
        date: "Jan 1st, 2022",
      },
    ],
    address: "8502 Preston Rd. Inglewood, Maine 98380",
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

export const coupons: Array<Coupon> = [
  {
    code: "HHH-111-222-333",
    saving: "10%",
    products: [products[0], products[1], products[2]],
    business: listings[0],
    image: {
      id: 14,
      name: "Bongs",
      src: "https://images.unsplash.com/photo-1601505612614-178f7ca0077c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      alt: "Bongs",
    },
  },

  {
    code: "HHH-111-222-333",
    saving: "10%",
    products: [products[0], products[1], products[2]],
    business: listings[0],
    image: {
      id: 56,
      name: "Pipes",
      src: "https://images.unsplash.com/photo-1592410115363-e8dc156e4113?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      alt: "Pipes",
    },
  },
  {
    code: "HHH-111-222-333",
    saving: "10%",
    products: [products[0], products[1], products[2]],
    business: listings[0],

    image: {
      id: 45,
      name: "Pipes",
      src: "https://images.unsplash.com/photo-1621541694081-aef305865f51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      alt: "Pipes",
    },
  },
  {
    code: "HHH-111-222-333",
    saving: "10%",
    products: [products[0], products[1], products[2]],
    business: listings[0],
    image: {
      id: 24,
      name: "Grinder",
      src: "https://images.unsplash.com/photo-1513114412776-6169617cdcf3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2VlZCUyMGdyaW5kZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      alt: "Grinder",
    },
  },
];
