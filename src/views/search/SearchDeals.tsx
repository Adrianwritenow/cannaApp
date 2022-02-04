import { DealsState } from '@/interfaces/coupon';
import { formatDealCard } from '@/helpers/formatters';
import ListingCard from '@/components/listings/ListingCard';
import ProductFilterSlideOver from '@/views/slideOver/filters/ProductFilterSlideOver';
import { RootState } from '@/reducers';
import { searchDealsNearMe } from '@/actions/deals';
import { Tab } from '@headlessui/react';
import { useAxios } from '@/hooks/useAxios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function SearchDeals() {
  const [currentFilter, setCurrentFilter] = useState('All');
  const { deals, filters, total } = useSelector((root: RootState): DealsState => root.deals);
  const [dispatchSearch] = useAxios(false);

  function fetchDeals() {
    dispatchSearch(searchDealsNearMe(currentFilter, total));
  }

  function handleChangeFilter(index: number) {
    setCurrentFilter(filters[index]);
    fetchDeals();
  }

  useEffect(() => {
    fetchDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-50">
      <ProductFilterSlideOver setFilters={() => {}} />
      <div>
        <div>
          <section className="pb-4 pt-2">
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
              <Tab.Group
                onChange={handleChangeFilter}
              >
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
              {deals.map((listing, index) => (
                <div key={`lc-${listing._id}-${index}`}>
                  <ListingCard {...formatDealCard(listing)} />
                </div>
              ))}
            </div>

            <div>
              <button onClick={fetchDeals}>Load More</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
