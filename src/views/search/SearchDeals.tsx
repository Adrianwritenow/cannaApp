import { Coupon } from '@/interfaces/coupon';
import { dealsNearMe } from '@/helpers/searchQuery';
import DealsFilterSlideOver from '@/views/slideOver/filters/DealsFilterSlideOver';
import { formatDealCard } from '@/helpers/formatters';
import { IAxiosReturn } from '@/interfaces/axios';
import ListingCard from '@/components/listings/ListingCard';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useEffect, useState } from 'react';
import { useSearchLocation } from '@/hooks/useSearchLocation';

interface FilterBucket {
  key: string;
  doc_count: number;
}

export default function SearchDeals() {
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
    fetchDeals(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords, filters]);

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
          <div className="flex justify-center py-10">
            <h3>No deals found in your area. Try broadening your search.</h3>
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
