import { Product } from "../../../interfaces/product";
import ProductResultsSection from "../../../components/sections/ProductsResultsSection";
import React from "react";
import { Strain } from "../../../interfaces/strain";
import StrainCard from "../../../components/strains/StrainCard";
import StrainCardSmall from "../../../components/strains/StrainCardSmall";

interface ResultsProps {
  view: string;
}

export default function ResultsStrain(data: ResultsProps) {
  const { view } = data;
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

  return (
    <div>
      <ProductResultsSection products={products} sponsored={true} />
      {/* Sponsered Listings Section */}

      <div>
        <h2 className="text-xl text-gray-700 font-semibold p-4">
          % Results for %Query%
        </h2>
        {view === "list" ? (
          <div className=" grid grid-flow-row auto-rows-max">
            {strains.map((strain: Strain) => (
              <StrainCardSmall
                strain={strain}
                key={`strain-card-${strain.id}`}
              />
            ))}
          </div>
        ) : (
          <div className=" grid grid-cols-2 px-4 gap-4">
            {strains.map((strain: Strain) => (
              <StrainCard strain={strain} key={`strain-card-${strain.id}`} />
            ))}
          </div>
        )}
        <div className="px-4 ">
          <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
            See more
          </button>
        </div>
      </div>
    </div>
  );
}
