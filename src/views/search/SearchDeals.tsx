import { StringParam, useQueryParam, withDefault } from 'next-query-params';
import { useEffect, useState } from 'react';

import { Coupon } from '@/interfaces/coupon';
import DealsFilterSlideOver from '@/views/slideOver/filters/DealsFilterSlideOver';
import { IAxiosReturn } from '@/interfaces/axios';
import ListingCard from '@/components/listings/ListingCard';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { dealsNearMe } from '@/helpers/searchQuery';
import { formatDealCard } from '@/helpers/formatters';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useSearchLocation } from '@/hooks/useSearchLocation';

interface FilterBucket {
  key: string;
  doc_count: number;
}

export default function SearchDeals() {
  const router = useRouter();
  const { isReady } = router;
  const [query] = useQueryParam('qs', withDefault(StringParam, ''));
  const { coords } = useSearchLocation();
  const [dispatchSearch, { loading }] = useAxios(false);
  const [currentDeals, setCurrentDeals] = useState<Coupon[]>([]);
  const [total, setTotal] = useState(0);

  const initialValues = {
    category: 'All',
    distance: '5mi',
  };
  const [categories, setCategories] = useState(['All']);
  const [filters, setFilters] = useState(initialValues);

  function fetchDeals(from: number = 0) {
    dispatchSearch(
      searchMulti({
        endpoints: [
          dealsNearMe(
            query,
            'couponsFiltered',
            filters.category,
            from,
            coords,
            filters.distance
          ),
        ],
      })
    ).then((status: IAxiosReturn) => {
      if (!status.success) {
        return;
      }

      const searchResponse = status.response.data.responses[0] || {};
      setTotal(searchResponse.hits?.total.value || 0);

      // Build filters.
      const dealsAgg = searchResponse?.aggregations?.category.buckets || [];
      // TODO: Probably need a better way of dealing with location changes.
      // We can't build this each time otherwise you lose some filters when the
      // user drills in to specific categories.
      if (categories.length <= dealsAgg.length || filters.category === 'all') {
        const dealsFilters = dealsAgg.map((item: FilterBucket) => {
          return item.key;
        });

        dealsFilters.unshift('All');
        setCategories(dealsFilters);
      }

      // Build results.
      const hits = searchResponse.hits?.hits || [];
      if (from === 0) {
        setCurrentDeals(hits);
      } else {
        setCurrentDeals(currentDeals.concat(hits));
      }
    });
  }

  function handleLoadMore() {
    fetchDeals(currentDeals.length);
  }

  useEffect(() => {
    if (isReady) {
      fetchDeals(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords, filters, query, isReady]);

  return (
    <div className="bg-gray-50">
      <DealsFilterSlideOver
        categories={categories}
        initialValues={initialValues}
        setFilters={setFilters}
        filters={filters}
      />
      <section className="pb-20 pt-2 max-w-7xl mx-auto">
        <h2 id="deals-near-me" className="sr-only">
          Deals
        </h2>

        <div className="grid grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-5 gap-4 px-4">
          {currentDeals.map((listing, index) => (
            <div key={`lc-${listing._id}-${index}`}>
              <ListingCard {...formatDealCard(listing)} />
            </div>
          ))}
        </div>

        {!loading && !currentDeals.length && (
          <div className="w-full flex items-center  flex-wrap justify-center h-full space-y-4 py-14">
            <SvgEmptyState className="w-40 h-40" />
            <div className="w-full space-y-3">
              <h2 className="text-lg text-gray-700 font-semibold text-center w-56 ml-auto mr-auto">
                Sorry, there are no results for this search.
              </h2>
              <p className="text-sm text-gray-500 text-center w-56 ml-auto mr-auto">
                No deals found in your area. Try broadening your search
                {!query ? '' : ' or removing your search query'}.{' '}
              </p>
            </div>
          </div>
        )}

        {total > currentDeals.length && (
          <div className="flex justify-center py-10">
            <button
              onClick={handleLoadMore}
              className="bg-green-500 text-white hover:bg-green-600 flex justify-center py-2 px-20 mt-5 border border-green rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
