import React, { useEffect, useState } from 'react';
import { Strain, StrainResults } from '@/interfaces/strain';

import ImageWithFallback from '@/components/image/ImageWithFallback';
import ProductResultsSection from '@/components/sections/ProductsResultsSection';
import { RootState } from '@/reducers';
import { SearchHits } from '@/interfaces/searchHits';
import { StarIcon } from '@heroicons/react/solid';
import { formatImageWithFallback } from '@/helpers/formatters';
import { searchMulti } from '@/actions/search';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function StrainDetail() {
  const router = useRouter();
  const { strainId } = router.query;
  const [myRating, setMyRating] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const location = useSelector((root: RootState) => root.location);

  const { results, query } = useSelector((root: RootState) => root.search);
  const [searchLists, setSearchLists] = useState([]);

  const [dispatchSearch, { loading }] = useAxios(false);
  const { listResults } = useSelector((root: RootState) => root.search);
  const { results: strains }: StrainResults = listResults.strains || [];
  const strain: Strain | undefined = strains?.length ? strains[0] : undefined;

  useEffect(() => {
    dispatchSearch(
      searchMulti({
        endpoints: [
          {
            name: 'strains',
            filters: {
              id: [strainId],
            },
            total: 1,
          },
        ],
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strainId]);

  return (
    <div className="bg-gray-50 max-w-7xl mx-auto">
      <div className="desktop:grid grid-cols-6 desktop:gap-8">
        <div className="relative w-full pb-auto lg:pb-0  col-span-2">
          <ImageWithFallback
            src={formatImageWithFallback(strain?._source.image)}
            layout="fill"
            objectFit={'cover'}
            alt={strain?._source.name}
          />
        </div>
        <div className="p-4 col-span-4">
          <section
            aria-labelledby="strains-heading"
            className="border-gray-200 border-b pb-4"
          >
            <h2 id="strains-heading" className="sr-only">
              {strain?._source.name}
            </h2>
            <h2 className="text-gray-700 text-3xl font-normal">
              {strain?._source.name}
            </h2>
            <p className="text-base text-gray-500 capitalize">
              {strain?._source.type}
            </p>
            {/* <div className="flex items-center pt-4">
            {[0, 1, 2, 3, 4].map(rating => (
              <StarIcon
                key={rating}
                className={`${
                  myRating > rating ? 'text-yellow-400' : 'text-gray-200'
                }
                  flex-shrink-0 h-6 w-6`}
                aria-hidden="true"
                onClick={() => setMyRating(rating + 1)}
              />
            ))}
          </div> */}
          </section>
          <section aria-labelledby="strains-about" className="pt-4">
            <h2 id="strains-about" className="sr-only">
              {strain?._source.name}
            </h2>
            <p className="text-base text-gray-700">
              {strain?._source.description}
            </p>
          </section>
        </div>
      </div>
      {/* {searchLists.length ? (
        <ProductResultsSection
          list={searchLists}
          sponsored={true}
          label={`Shop ${
            query ? `"${query}"` : location.city ? `"${location.city}"` : ''
          }`}
        />
      ) : (
        ''
      )} */}
    </div>
  );
}
