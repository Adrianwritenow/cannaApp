import { Coupon } from '@/interfaces/coupon';
import { formatDealCard } from '@/helpers/formatters';
import { IAxiosReturn } from '@/interfaces/axios';
import ListingCard from '@/components/listings/ListingCard';
import { searchDealsNearMe } from '@/actions/deals';
import { Tab } from '@headlessui/react';
import { useAxios } from '@/hooks/useAxios';
import { useEffect, useState } from 'react';

interface FilterBucket {
  key: string;
  doc_count: number;
}

export default function SearchDeals() {
  const [filters, setFilters] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [total, setTotal] = useState(0);
  const [currentDeals, setCurrentDeals] = useState<Coupon[]>([]);
  const [dispatchSearch] = useAxios(false);

  function fetchDeals(from: number = 0, filter: string | null = null) {
    // If no filter specified then use whatever is currently active.
    if (!filter) {
      filter = currentFilter;
    }

    // Ideally this would be in the reducer but the "load more" + filtering complicates
    // the concatenation logic.
    dispatchSearch(searchDealsNearMe(filter, from)).then(
      (status: IAxiosReturn) => {
        if (!status.success) {
          return;
        }

        const searchResponse = status.response.data;
        // Build filters.
        const dealsAgg = searchResponse?.aggregations?.category.buckets || [];
        const dealsFilters = dealsAgg.map((item: FilterBucket) => {
          return item.key;
        });

        dealsFilters.unshift('All');
        setFilters(dealsFilters);

        setTotal(searchResponse.hits?.total.value || 0);

        // Build results.
        const hits = searchResponse.hits?.hits || [];
        if (from === 0) {
          setCurrentDeals(hits);
        } else {
          setCurrentDeals(currentDeals.concat(hits));
        }
      }
    );
  }

  function handleChangeFilter(index: number) {
    setCurrentFilter(filters[index]);
    fetchDeals(0, filters[index]);
  }

  function handleLoadMore() {
    fetchDeals(currentDeals.length);
  }

  // Initial load.
  useEffect(() => {
    fetchDeals(0, 'All');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-50">
      <section className="pb-20 pt-2">
        <h2 id="deals-near-me" className="sr-only">
          Deals Near Me
        </h2>
        <h2
          id="deals-near-me"
          className="text-gray-700 text-lg font-semibold px-4 py-4"
        >
          Deals Near Me
        </h2>
        <div className="overflow-visible overflow-scroll border-b border-gray-200 mb-5 mx-4">
          <Tab.Group onChange={handleChangeFilter}>
            <Tab.List className="w-full overflow-visible overflow-x-scroll border-b border-gray-200 flex">
              {filters.map((filter, index) => (
                <Tab
                  key={`filter-${index}`}
                  className={({ selected }) =>
                    `${
                      selected
                        ? 'border-green text-green'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm w-auto focus:outline-none`
                  }
                >
                  {filter}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
        <div className="grid grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-5 gap-4 px-4">
          {currentDeals.map((listing, index) => (
            <div key={`lc-${listing._id}-${index}`}>
              <ListingCard {...formatDealCard(listing)} />
            </div>
          ))}
        </div>

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
