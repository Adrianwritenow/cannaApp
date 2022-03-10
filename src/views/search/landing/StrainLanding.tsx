import React, { useEffect, useState } from 'react';
import { searchMulti } from '@/actions/search';

import { ArrowRightIcon } from '@heroicons/react/solid';
import { Feeling } from '@/interfaces/feeling';
import { Feelings } from '@/helpers/feelings';
import { Flavor } from '@/interfaces/flavor';
import { Flavors } from '@/helpers/flavors';
import Image from 'next/image';
import ImageWithFallback from '@/components/image/ImageWithFallback';
import { Strain } from '@/interfaces/strain';
import StrainCard from '@/components/strains/StrainCard';
import StrainCardSmall from '@/components/strains/StrainCardSmall';
import SvgHybrid from '@/public/assets/icons/iconComponents/Hybrid';
import SvgIndica from '@/public/assets/icons/iconComponents/Indica';
import SvgSativa from '@/public/assets/icons/iconComponents/Sativa';
import { useSelector } from 'react-redux';
import { useAxios } from '@/hooks/useAxios';
import { RootState } from '@/reducers';

export default function StrainLanding() {
  const [clamp, setClamp] = useState(true);
  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const popular: Strain[] = listResults.strainsPopular || [];
  const featuredStrains: Strain[] = listResults.strainsFeatured || [];
  const featured: Strain | undefined = featuredStrains.length
    ? featuredStrains[0]
    : undefined;

  function getResults() {
    dispatchSearch(
      searchMulti({
        q: '',
        endpoints: [
          {
            name: 'strains',
            key: 'strainsFeatured',
            filters: {
              featured: [true],
            },
          },
          {
            name: 'strains',
            key: 'strainsPopular',
            body: {
              query: {
                function_score: {
                  query: { match_all: {} },
                  boost: '5',
                  random_score: {},
                  boost_mode: 'multiply',
                },
              },
            },
          },
        ],
        total: 10,
      })
    );
  }

  useEffect(() => {
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBrowse(field: string, value: string) {
    dispatchSearch(
      searchMulti({
        q: '',
        endpoints: [
          {
            name: 'strains',
            filters: {
              [field]: [value],
            },
          },
        ],
        total: 10,
      })
    );
  }

  return (
    <div className="max-w-7xl bg-gray-50 pb-5 mx-auto">
      {/* Strain */}

      {featured && popular && (
        <>
          <section className="px-4" aria-labelledby="featured-strain-heading">
            <h1 id="featured-strain-heading" className="sr-only">
              Featured Strain
            </h1>
            <h1 className="text-gray-700 text-xl font-semibold py-4 desktop:text-2xl">
              Featured Strain
            </h1>
            {/* Image */}
            <div className="desktop:flex ">
              <div className="w-full h-48 relative rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={'#'}
                  alt={featured._source.name}
                  layout="fill"
                  objectFit={'cover'}
                />
              </div>

              {/* Strain info */}
              <div className="pt-4 desktop:pt-0 desktop:pl-4">
                <h1 className="text-xl font-normal text-gray-700">
                  {featured._source.name}
                </h1>
                <span className="text-gray-500 text-sm font-normal">
                  {featured._source.type[0]}
                </span>

                <div className="mt-4">
                  <h3 className="sr-only">Description</h3>
                  <span
                    className={`text-base text-gray-700 space-y-6 ${
                      clamp ? 'line-clamp-4' : ''
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: featured._source.description[0],
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    setClamp(!clamp);
                  }}
                >
                  <p className="text-green mt-1 text-sm font-medium flex items-center">
                    Learn more &nbsp;
                    <ArrowRightIcon className="w-4 h-4" />
                  </p>
                </button>
              </div>
            </div>
          </section>

          {/* Popular Strains */}

          {popular && (
            <section
              aria-labelledby="popular-strains-heading"
              className="mt-8 pl-4"
            >
              <h2 id="popular-strains-heading" className="sr-only">
                Popular Strains
              </h2>

              <h2 className="text-gray-700 text-xl font-semibold py-4 desktop:text-2xl">
                Popular Strains
              </h2>
              <div className="w-full overflow-x-scroll">
                <div className="w-full">
                  <div className="grid grid-flow-col auto-cols-max grid-rows-4 w-full gap-1 desktop:flex desktop:flex-wrap desktop:gap-4">
                    {popular.map((strain: Strain, index) => (
                      <div key={`${strain}-${index}`}>
                        <div className="w-max relative desktop:hidden">
                          <StrainCardSmall strain={strain} />
                        </div>
                        <div className="w-max relative hidden desktop:flex">
                          <StrainCard strain={strain} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Browse by Type */}
          <section aria-labelledby="browse-strains-type" className="mt-8 px-4">
            <h2 id="browse-strains-type" className="sr-only">
              Browse by type
            </h2>
            <h2 className="text-black text-xl font-semibold py-4 text-gray-700 desktop:text-2xl">
              Browse by Type
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => {
                  handleBrowse('type', 'indica');
                }}
              >
                <div className="bg-green flex items-center justify-center rounded-lg p-4">
                  <SvgIndica className="w-20 h-20" />
                </div>
                <p className="text-center pt-2 text-sm text-green font-medium desktop:text-base">
                  Indica
                </p>
              </button>
              <button
                onClick={() => {
                  handleBrowse('type', 'sativa');
                }}
              >
                <div className="bg-green flex items-center justify-center rounded-lg p-4">
                  <SvgSativa className="w-20 h-20 text-green-100" />
                </div>
                <p className="text-center pt-2 text-sm text-green font-medium desktop:text-base">
                  Sativa
                </p>
              </button>
              <button
                onClick={() => {
                  handleBrowse('type', 'hybrid');
                }}
              >
                <div className="bg-green flex items-center justify-center rounded-lg p-4">
                  <SvgHybrid className="w-20 h-20" />
                </div>
                <p className="text-center pt-2 text-sm text-green font-medium desktop:text-base">
                  Hybrid
                </p>
              </button>
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
              <div className="w-full">
                <div className="grid grid-flow-col auto-cols-max grid-rows-4 w-full gap-4 desktop:flex desktop:flex-wrap">
                  {Feelings.map((feeling: Feeling, index) => {
                    return (
                      <button
                        onClick={() => {
                          handleBrowse('top_rated_effects', `${feeling.label}`);
                        }}
                        className="w-36 flex justify-between bg-gray-100 rounded-lg overflow-hidden border border-gray-200 p-4"
                        key={`${feeling.label}-${index}`}
                      >
                        <div className="w-6 h-6 relative overflow-hidden flex-shrink-0">
                          <Image
                            src={feeling.src}
                            alt={feeling.label}
                            layout="fill"
                            objectFit={'cover'}
                          />
                        </div>
                        <p className="w-full text-center">{feeling.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Browse by Flavor */}

          <section
            aria-labelledby="browse-strains-flavor"
            className="mt-8 px-4"
          >
            <h2 id="browse-strains-flavor" className="sr-only">
              Popular Flavors & Aromas
            </h2>
            <h2 className="text-black text-xl font-semibold py-4">
              Popular Flavors & Aromas
            </h2>

            <div className="w-full overflow-x-scroll">
              <div className="w-full">
                <div className="grid grid-flow-col auto-cols-max grid-rows-3 w-full gap-4 desktop:flex desktop:flex-wrap">
                  {Flavors.map((flavor: Flavor, index) => {
                    return (
                      <button
                        onClick={() => {
                          handleBrowse(
                            'top_reported_flavors',
                            `${flavor.label}`
                          );
                        }}
                        className="w-36 flex justify-between bg-gray-100  overflow-hidden bor p-4 relative"
                        key={`${flavor.label}-${index}`}
                      >
                        <div
                          className={`w-2 h-full ${flavor.color} left-0 top-0 absolute`}
                        ></div>
                        <p className="w-full text-center">{flavor.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Browse by Terpene */}
          {/* Need Terpene Data */}

          {/* <section
            aria-labelledby="browse-strains-terpene"
            className="mt-8 px-4"
          >
            <h2 id="browse-strains-terpene" className="sr-only">
              Browse by Terpene
            </h2>
            <h2 className="text-black text-xl font-semibold py-4">
              Browse by Terpene
            </h2>

            <div className="w-full overflow-x-scroll">
              <div className="w-min">
                <div className="grid grid-flow-col auto-cols-max grid-rows-3 w-full gap-4 ">
                  {Terpenes.map((terpene: Terpene, index) => {
                    return (
                      <div
                        className="w-36 flex justify-between bg-gray-100  overflow-hidden bor p-4 relative"
                        key={`${terpene.label}-${index}`}
                      >
                        <div
                          className={`w-2 h-full ${terpene.color} left-0 top-0 absolute`}
                        ></div>
                        <p className="w-full text-center">{terpene.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section> */}
        </>
      )}
    </div>
  );
}
