import React, { useEffect, useState } from 'react';

import ImageWithFallback from '@/components/image/ImageWithFallback';
import ProductResultsSection from '../../../src/components/sections/ProductsResultsSection';
import { RootState } from '@/reducers';
import { Sativa } from '../../../public/assets/icons/iconComponents';
import { SearchHits } from '@/interfaces/searchHits';
import { StarIcon } from '@heroicons/react/solid';
import { Strain } from '@/interfaces/strain';
import { getDocument } from '../../../src/actions/search';
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

  const [strain, setStrain] = useState<Strain>();

  useEffect(() => {
    getDocument(strainId, 'strains').then((document: SearchHits) => {
      if (document) {
        const result = document.hits.hits[0];
        setStrain(result as unknown as Strain);
      }
    });

    let searchListUpdate: any = [];

    results.map((result: any, index: number) => {
      switch (true) {
        case result._id.includes('product_entity'):
          searchListUpdate.push(result);
          break;
      }
    });
    if (currentQuery !== query) {
      setSearchLists(searchListUpdate);
    }
    setCurrentQuery(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="bg-gray-50 max-w-7xl mx-auto">
      <div className="desktop:grid grid-cols-6 desktop:gap-8">
        <div className="w-full pb-auto relative col-span-2">
          <ImageWithFallback
            src={strain?._source?.image ? strain._source.image[0] : 'undefined'}
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
      {searchLists.length ? (
        <ProductResultsSection
          list={searchLists}
          sponsored={true}
          label={`Shop ${
            query ? `"${query}"` : location.city ? `"${location.city}"` : ''
          }`}
        />
      ) : (
        ''
      )}
    </div>
  );
}
