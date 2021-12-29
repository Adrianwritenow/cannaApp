import FilterSlideOver from '../slideOver/FilterSlideOver';
import { Product } from '@/interfaces/searchProduct';
import ProductResultsGrid from '@/components/products/ProductResultsGrid';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
// import { products } from '@/helpers/mockData';

export default function SearchShopping(props: {
  products: Product[];
  query: string;
}) {
  const { products, query } = props;
  return (
    <section className="bg-gray-50">
      <FilterSlideOver />

      <div>
        {products.length ? (
          <>
            <ProductResultsSection
              list={products}
              sponsored={true}
              label={`Shop "${query}"`}
            />
            <div className="px-4">
              <ProductResultsGrid
                label={`${products.length} Results for "${query}"`}
                list={products}
              />
            </div>
          </>
        ) : (
          <div className="w-full flex items-center  flex-wrap justify-center h-full space-y-4 py-14">
            <SvgEmptyState className="w-40 h-40" />
            <div className="w-full space-y-3">
              <h2 className="text-lg text-gray-700 font-semibold text-center w-56 ml-auto mr-auto">
                Sorry, there are no results for this search.
              </h2>
              <p className="text-sm text-gray-500 text-center w-56 ml-auto mr-auto">
                Please try again with different or more general keywords.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
