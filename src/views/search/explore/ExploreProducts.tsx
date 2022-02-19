import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ArrowRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces/product';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import { SearchHits } from '@/interfaces/searchHits';
import { access } from 'fs';
import { browseBy } from '@/actions/search';
import { categories } from '@/helpers/categories';

export default function ExploreProducts(props: { categoryFilter: Function }) {
  const router = useRouter();
  const { categoryFilter } = props;
  const [fudge, setFudge] = useState<Array<Product>>();
  const [accessories, setAccessoires] = useState<Array<Product>>();
  const [preRolls, setPreRolls] = useState<Array<Product>>();
  const [drinks, setDrinks] = useState<Array<Product>>();
  const [papers, setPapers] = useState<Array<Product>>();
  const [crumble, setCrumble] = useState<Array<Product>>();
  const [candy, setCandy] = useState<Array<Product>>();

  async function getFudge() {
    const hits: SearchHits = await browseBy(
      '',
      'Chocolate Fudge',
      'products',
      {
        key: 'category',
        value: [
          'Chocolate^2',
          'Chocolates^2',
          'Chocolate & Fudge^2',
          'Fudge^2',
          'Candy',
        ],
      },
      { field: 'created', direction: 'desc' }
    );
    if (hits) {
      setFudge(hits.hits.hits);
    }
  }

  async function getAccessories() {
    const hits: SearchHits = await browseBy(
      '',
      'Accessories',
      'products',
      {
        key: 'category',
        value: ['Rig', 'Accessories'],
      },
      { field: 'rating', direction: 'desc' }
    );
    if (hits) {
      setAccessoires(hits.hits.hits);
    }
  }

  async function getDrinks() {
    const hits: SearchHits = await browseBy(
      '',
      'CBD Drinks Soft Pop',
      'products',
      {
        key: 'category',
        value: ['CBD', 'Drinks'],
      },
      { field: 'reviews_count', direction: 'desc' }
    );
    if (hits) {
      setDrinks(hits.hits.hits);
    }
  }

  async function getPapers() {
    const hits: SearchHits = await browseBy(
      '',
      'Rolling Paper',
      'products',
      {
        key: 'category',
        value: ['Rolling Papers'],
      },
      { field: 'rating', direction: 'desc' }
    );
    if (hits) {
      setPapers(hits.hits.hits);
    }
  }

  async function getPreRolls() {
    const hits: SearchHits = await browseBy(
      '',
      'Pre Roll',
      'products',
      {
        key: 'category',
        value: ['Pre Rolls', 'Pre Roll'],
      },
      { field: 'reviews_count', direction: 'desc' }
    );
    if (hits) {
      setPreRolls(hits.hits.hits);
    }
  }

  async function getCrumble() {
    const hits: SearchHits = await browseBy(
      '',
      'Crumble',
      'products',
      {
        key: 'category',
        value: ['Crumble'],
      },
      { field: 'reviews_count', direction: 'desc' }
    );
    if (hits) {
      setCrumble(hits.hits.hits);
    }
  }

  async function getCandy() {
    const hits: SearchHits = await browseBy(
      '',
      'Candy',
      'products',
      {
        key: 'category',
        value: ['Candy'],
      },
      { field: 'reviews_count', direction: 'desc' }
    );
    if (hits) {
      setCandy(hits.hits.hits);
    }
  }

  useEffect(() => {
    getFudge();
    getAccessories();
    getDrinks();
    getPapers();
    getPreRolls();
    getCrumble();
    getCandy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <section className="pt-2  w-full g:mx-auto max-w-7xl mx-auto desktop:border-b-2 border-gray-200 pb-6">
        <div className="desktop:h-auto justify-center flex-shrink-0">
          <h2 id="explore-categories" className="sr-only">
            Explore Categories
          </h2>
          <h2
            id="explore-categories"
            className="text-gray-700 text-lg desktop:text-2xl font-semibold px-4 py-4"
          >
            Explore Categories
          </h2>
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4 desktop:flex desktop:flex-wrap">
          {categories.map((category, index) => (
            <div key={`fd-${index}`}>
              <div className="w-36 flex relative">
                <div className="w-full h-48 rounded-md overflow-hidden">
                  <button
                    onClick={() => {
                      categoryFilter(``);
                      router.push({
                        pathname: '/search',
                        query: {
                          category: category.label,
                          view: 'shopping',
                          sortQuery: 'Rating',
                        },
                      });
                    }}
                  >
                    <Image
                      src={category.imgSrc}
                      alt={category.label}
                      layout="fill"
                      objectFit={'cover'}
                    />
                  </button>
                </div>
              </div>
              <p className=" text-center py-2 font-medium text-sm text-gray-700">
                {category.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pre Rolls section */}
      <div className=" w-full overflow-scroll max-w-7xl mx-auto desktop:border-b-2 border-gray-200 pb-6">
        <ProductResultsSection
          list={preRolls ? preRolls : []}
          sponsored={false}
          label={'Popular Pre Rolls'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search?category=Flower&view=shopping',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a>
              <button className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest">
                <span>See more</span>
              </button>
            </a>
          </Link>
        </div>
        <div className="px-4 pt-2 hidden desktop:block w-full flex">
          <Link
            href={{
              pathname: '/search',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a className="flex hover:animate-ping  w-full">
              <button className="py-4 uppercase text-green-500 text-sm font-semibold tracking-widest flex justify-center items-center ml-auto">
                <span>See more</span>
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </button>
            </a>
          </Link>
        </div>
      </div>

      {/* Crumble section */}
      <div className=" w-full overflow-scroll max-w-7xl mx-auto desktop:border-b-2 border-gray-200 pb-6">
        <ProductResultsSection
          list={crumble ? crumble : []}
          sponsored={false}
          label={'Popular Crumble'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search?category=Flower&view=shopping',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a>
              <button className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest">
                <span>See more</span>
              </button>
            </a>
          </Link>
        </div>
        <div className="px-4 pt-2 hidden desktop:block w-full flex">
          <Link
            href={{
              pathname: '/search',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a className="flex hover:animate-ping  w-full">
              <button className="py-4 uppercase text-green-500 text-sm font-semibold tracking-widest flex justify-center items-center ml-auto">
                <span>See more</span>
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </button>
            </a>
          </Link>
        </div>
      </div>

      {/* Candy section */}
      <div className="w-full overflow-scroll max-w-7xl mx-auto desktop:border-b-2 border-gray-200 pb-6">
        <ProductResultsSection
          list={candy ? candy : []}
          sponsored={false}
          label={'Popular Candy'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search?category=Flower&view=shopping',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a>
              <button className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest">
                <span>See more</span>
              </button>
            </a>
          </Link>
        </div>
        <div className="px-4 pt-2 hidden desktop:block w-full flex">
          <Link
            href={{
              pathname: '/search',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a className="flex hover:animate-ping  w-full">
              <button className="py-4 uppercase text-green-500 text-sm font-semibold tracking-widest flex justify-center items-center ml-auto">
                <span>See more</span>
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </button>
            </a>
          </Link>
        </div>
      </div>

      {/* 4*+ section */}
      <div className=" w-full overflow-scroll max-w-7xl mx-auto desktop:border-b-2 border-gray-200 pb-6">
        <ProductResultsSection
          list={accessories ? accessories : []}
          sponsored={false}
          label={'4+ Star Rig Accesories'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search?category=Flower&view=shopping',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a>
              <button className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest">
                <span>See more</span>
              </button>
            </a>
          </Link>
        </div>
        <div className="px-4 pt-2 hidden desktop:block w-full flex">
          <Link
            href={{
              pathname: '/search',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a className="flex hover:animate-ping  w-full">
              <button className="py-4 uppercase text-green-500 text-sm font-semibold tracking-widest flex justify-center items-center ml-auto">
                <span>See more</span>
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </button>
            </a>
          </Link>
        </div>
      </div>
      {/* Chocolate & Fudge section */}
      <div className=" w-full overflow-scroll max-w-7xl mx-auto desktop:border-b-2 border-gray-200 pb-6">
        <ProductResultsSection
          list={fudge ? fudge : []}
          sponsored={false}
          label={'Discvover New Chocolate & Fudge'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search?category=Flower&view=shopping',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a>
              <button className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest">
                <span>See more</span>
              </button>
            </a>
          </Link>
        </div>
        <div className="px-4 pt-2 hidden desktop:block w-full flex">
          <Link
            href={{
              pathname: '/search',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a className="flex hover:animate-ping  w-full">
              <button className="py-4 uppercase text-green-500 text-sm font-semibold tracking-widest flex justify-center items-center ml-auto">
                <span>See more</span>
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </button>
            </a>
          </Link>
        </div>
      </div>
      {/* CBD Drinks section */}
      <div className=" w-full overflow-scroll max-w-7xl mx-auto desktop:border-b-2 border-gray-200 pb-6">
        <ProductResultsSection
          list={drinks ? drinks : []}
          sponsored={false}
          label={'Trending CBD drinks'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search?category=Flower&view=shopping',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a>
              <button className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest">
                <span>See more</span>
              </button>
            </a>
          </Link>
        </div>
        <div className="px-4 pt-2 hidden desktop:block w-full flex">
          <Link
            href={{
              pathname: '/search',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a className="flex hover:animate-ping  w-full">
              <button className="py-4 uppercase text-green-500 text-sm font-semibold tracking-widest flex justify-center items-center ml-auto">
                <span>See more</span>
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </button>
            </a>
          </Link>
        </div>
      </div>
      {/* Rolling Papers section */}
      <div className=" w-full overflow-scroll max-w-7xl mx-auto desktop:border-b-2 border-gray-200 pb-6">
        <ProductResultsSection
          list={papers ? papers : []}
          sponsored={false}
          label={'Top Rated Rolling Papers'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search?category=Flower&view=shopping',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a>
              <button className="py-4 w-full uppercase text-green-500 text-xs font-semibold border-t border-gray-200 tracking-widest">
                <span>See more</span>
              </button>
            </a>
          </Link>
        </div>
        <div className="px-4 pt-2 hidden desktop:block w-full flex">
          <Link
            href={{
              pathname: '/search',
              query: { view: 'deals', category: 'Flower' },
            }}
            passHref
          >
            <a className="flex hover:animate-ping  w-full">
              <button className="py-4 uppercase text-green-500 text-sm font-semibold tracking-widest flex justify-center items-center ml-auto">
                <span>See more</span>
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
