import { Product, ProductResults } from '@/interfaces/product';

import { ArrowRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import { RootState } from '@/reducers';
import { categories } from '@/helpers/categories';
import { imageLoader } from '@/helpers/localImageLoader';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ExploreProducts(props: { handleFilter: Function }) {
  const { handleFilter } = props;
  const [dispatchSearch] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);

  const { results: fudge }: ProductResults = listResults.fudge || [];
  const { results: accessories }: ProductResults =
    listResults.accessories || [];
  const { results: drinks }: ProductResults = listResults.drinks || [];
  const { results: papers }: ProductResults = listResults.papers || [];
  const { results: preRolls }: ProductResults = listResults.preRolls || [];
  const { results: crumble }: ProductResults = listResults.crumble || [];
  const { results: candy }: ProductResults = listResults.candy || [];

  const fudgeFilters = {
    name: 'products',
    key: 'fudge',
    q: 'Chocolate Fudge',
    filters: {
      category: [
        'Chocolate^2',
        'Chocolates^2',
        'Chocolate & Fudge^2',
        'Fudge^2',
        'Candy',
      ],
      sorts: [
        {
          key: 'created',
          value: 'desc',
        },
      ],
    },
    total: 10,
  };

  const accessoryFilters = {
    name: 'products',
    key: 'accessories',
    q: 'Accessories',
    filters: {
      category: ['Rig', 'Accessories'],
      sorts: [
        {
          key: 'rating',
          value: 'desc',
        },
      ],
    },
    total: 10,
  };

  const drinksFilters = {
    name: 'products',
    key: 'drinks',
    q: 'CBD Drinks Soft Pop',
    filters: {
      category: ['CBD', 'Drinks'],
      sorts: [
        {
          key: 'reviews_count',
          value: 'desc',
        },
      ],
    },
    total: 10,
  };

  const papersFilters = {
    name: 'products',
    key: 'papers',
    q: 'Rolling Paper',
    filters: {
      category: ['Rolling Papers'],
      sorts: [
        {
          key: 'rating',
          value: 'desc',
        },
      ],
    },
    total: 10,
  };

  const preRollsFilters = {
    name: 'products',
    key: 'preRolls',
    q: 'Pre Roll',
    filters: {
      category: ['Pre Roll', 'Pre Rolls'],
      sorts: [
        {
          key: 'reviews_count',
          value: 'desc',
        },
      ],
    },
    total: 10,
  };

  const crumbleFilters = {
    name: 'products',
    key: 'crumble',
    q: 'Crumble',
    filters: {
      category: ['Crumble'],
      sorts: [
        {
          key: 'reviews_count',
          value: 'desc',
        },
      ],
    },
    total: 10,
  };

  const candyFilters = {
    name: 'products',
    key: 'candy',
    q: 'Candy',
    filters: {
      category: ['Candy'],
      sorts: [
        {
          key: 'reviews_count',
          value: 'desc',
        },
      ],
    },
    total: 10,
  };

  function getResults() {
    dispatchSearch(
      searchMulti({
        endpoints: [
          fudgeFilters,
          accessoryFilters,
          drinksFilters,
          papersFilters,
          preRollsFilters,
          crumbleFilters,
          candyFilters,
        ],
      })
    );
  }

  useEffect(() => {
    getResults();
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
                  <button>
                    <Image
                      loader={imageLoader}
                      src={category.imgSrc}
                      alt={category.label}
                      layout="fill"
                      objectFit={'cover'}
                      onClick={() => {
                        handleFilter({
                          sort: ['Rating'],
                          category: [category.label],
                        });
                      }}
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
          list={preRolls}
          sponsored={false}
          label={'Popular Pre Rolls'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
          list={crumble}
          sponsored={false}
          label={'Popular Crumble'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
          list={candy}
          sponsored={false}
          label={'Popular Candy'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
          list={accessories}
          sponsored={false}
          label={'4+ Star Rig Accesories'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
          list={fudge}
          sponsored={false}
          label={'Discvover New Chocolate & Fudge'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
          list={drinks}
          sponsored={false}
          label={'Trending CBD drinks'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
          list={papers}
          sponsored={false}
          label={'Top Rated Rolling Papers'}
        />
        <div className="px-4 pt-2 desktop:hidden">
          <Link
            href={{
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
              pathname: '/search/shopping',
              query: { category: 'Flower' },
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
