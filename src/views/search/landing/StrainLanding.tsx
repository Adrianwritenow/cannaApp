import { ArrowRightIcon } from "@heroicons/react/solid";
import { Feeling } from "../../../interfaces/feeling";
import { Feelings } from "../../../helpers/feelings";
import { Flavor } from "../../../interfaces/flavor";
import { Flavors } from "../../../helpers/flavors";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Strain } from "../../../interfaces/strain";
import StrainCardSmall from "../../../components/strains/StrainCardSmall";
import SvgHybrid from "../../../../public/assets/icons/iconComponents/Hybrid";
import SvgIndica from "../../../../public/assets/icons/iconComponents/Indica";
import SvgSativa from "../../../../public/assets/icons/iconComponents/Sativa";
import { Terpene } from "../../../interfaces/terpene";
import { Terpenes } from "../../../helpers/terpenes";

interface StrainProps {
  strain: Strain;
}

export default function StrainLanding() {
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

  const popularStrains: Array<Strain> = [
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
    {
      id: "c5",
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
      id: "c6",
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
      id: "c7",
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
      id: "c8",
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
    <div className="max-w-7xl bg-gray-50 pb-5">
      {/* Strain */}

      <section className="px-4" aria-labelledby="featured-strain-heading">
        <h1 id="featured-strain-heading" className="sr-only">
          Featured Strain
        </h1>
        <h1 className="text-gray-700 text-xl font-semibold py-4">
          Featured Strain
        </h1>
        {/* Image */}
        <div className="w-full h-48 relative rounded-lg overflow-hidden">
          <Image
            src={strain.images[0]}
            alt={strain.title}
            layout="fill"
            objectFit={"cover"}
          />
        </div>

        {/* Strain info */}
        <div className="pt-4">
          <h1 className="text-xl font-normal text-gray-700">{strain.title}</h1>
          <p className="text-gray-500 text-sm font-normal">{strain.type}</p>

          <div className="mt-4">
            <h3 className="sr-only">Description</h3>
            <div
              className="text-base text-gray-700 space-y-6"
              dangerouslySetInnerHTML={{ __html: strain.about }}
            />
          </div>
          <Link href="#" passHref>
            <a className="text-green mt-1 text-sm font-medium flex items-center">
              Learn more &nbsp;
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>

      {/* Popular Strains */}
      <section aria-labelledby="popular-strains-heading" className="mt-8 pl-4">
        <h2 id="popular-strains-heading" className="sr-only">
          Popular Strains
        </h2>

        <h2 className="text-gray-700 text-xl font-semibold py-4">
          Popular Strains
        </h2>
        <div className="w-full overflow-x-scroll">
          <div className="w-min">
            <div className="grid grid-rows-4 grid-flow-col auto-rows-max w-full gap-1">
              {popularStrains.map((strain: Strain, index) => (
                <div className="w-60" key={`${strain}-${index}`}>
                  <StrainCardSmall strain={strain} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Type */}
      <section aria-labelledby="browse-strains-type" className="mt-8 px-4">
        <h2 id="browse-strains-type" className="sr-only">
          Browse by type
        </h2>
        <h2 className="text-black text-xl font-semibold py-4 text-gray-700">
          Browse by Type
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="bg-green flex items-center justify-center rounded-lg p-4">
              <SvgIndica className="w-20 h-20" />
            </div>
            <p className="text-center pt-2 text-sm text-green font-medium">
              Indica
            </p>
          </div>
          <div>
            <div className="bg-green flex items-center justify-center rounded-lg p-4">
              <SvgSativa className="w-20 h-20" />
            </div>
            <p className="text-center pt-2 text-sm text-green font-medium">
              Sativa
            </p>
          </div>
          <div>
            <div className="bg-green flex items-center justify-center rounded-lg p-4">
              <SvgHybrid className="w-20 h-20" />
            </div>
            <p className="text-center pt-2 text-sm text-green font-medium">
              Hybrid
            </p>
          </div>
        </div>
      </section>

      {/* Browse by Feeling */}

      <section aria-labelledby="browse-strains-feel" className="mt-8 px-4">
        <h2 id="browse-strains-feel" className="sr-only">
          Browse by Feel
        </h2>
        <h2 className="text-black text-xl font-semibold py-4">
          Browse by Feel
        </h2>

        <div className="w-full overflow-x-scroll">
          <div className="w-min">
            <div className="grid grid-rows-4 grid-flow-col auto-rows-max w-full gap-4 ">
              {Feelings.map((feeling: Feeling, index) => {
                return (
                  <div
                    className="w-36 flex justify-between bg-gray-100 rounded-lg overflow-hidden border border-gray-200 p-4"
                    key={`${feeling.label}-${index}`}
                  >
                    <div className="w-6 h-6 relative overflow-hidden flex-shrink-0">
                      <Image
                        src={feeling.src}
                        alt={feeling.label}
                        layout="fill"
                        objectFit={"cover"}
                      />
                    </div>
                    <p className="w-full text-center">{feeling.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Flavor */}

      <section aria-labelledby="browse-strains-flavor" className="mt-8 px-4">
        <h2 id="browse-strains-flavor" className="sr-only">
          Popular Flavors & Aromas
        </h2>
        <h2 className="text-black text-xl font-semibold py-4">
          Popular Flavors & Aromas
        </h2>

        <div className="w-full overflow-x-scroll">
          <div className="w-min">
            <div className="grid grid-rows-3 grid-flow-col auto-rows-max w-full gap-4 ">
              {Flavors.map((flavor: Flavor, index) => {
                return (
                  <div
                    className="w-36 flex justify-between bg-gray-100  overflow-hidden bor p-4 relative"
                    key={`${flavor.label}-${index}`}
                  >
                    <div
                      className={`w-2 h-full bg-${flavor.color} left-0 top-0 absolute`}
                    ></div>
                    <p className="w-full text-center">{flavor.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pt-4 ">
          <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
            See more
          </button>
        </div>
      </section>

      {/* Browse by Terpene */}

      <section aria-labelledby="browse-strains-terpene" className="mt-8 px-4">
        <h2 id="browse-strains-terpene" className="sr-only">
          Browse by Terpene
        </h2>
        <h2 className="text-black text-xl font-semibold py-4">
          Browse by Terpene
        </h2>

        <div className="w-full overflow-x-scroll">
          <div className="w-min">
            <div className="grid grid-rows-3 grid-flow-col auto-rows-max w-full gap-4 ">
              {Terpenes.map((terpene: Terpene, index) => {
                return (
                  <div
                    className="w-36 flex justify-between bg-gray-100  overflow-hidden bor p-4 relative"
                    key={`${terpene.label}-${index}`}
                  >
                    <div
                      className={`w-2 h-full bg-${terpene.color} left-0 top-0 absolute`}
                    ></div>
                    <p className="w-full text-center">{terpene.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
