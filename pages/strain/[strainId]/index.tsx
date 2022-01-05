import React, { useEffect, useState } from 'react';

import ProductResultsSection from '../../../src/components/sections/ProductsResultsSection';
import { RootState } from '@/reducers';
import { Sativa } from '../../../public/assets/icons/iconComponents';
import { StarIcon } from '@heroicons/react/solid';
import { Strain } from '@/interfaces/SearchStrain';
import { getDocument } from '../../../src/actions/search';
import { products } from '../../../src/helpers/mockData';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { SearchHits } from '@/interfaces/searchHits';

export default function StrainDetail() {
  const router = useRouter();
  const { strainId } = router.query;
  const [myRating, setMyRating] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');

  const { results, query } = useSelector((root: RootState) => root.search);
  const [searchLists, setSearchLists] = useState([]);

  const [strain, setStrain] = useState<Strain>();

  useEffect(() => {
    if (strainId) {
      getDocument(strainId).then((document: SearchHits) => {
        if (document) {
          const result = document.hits.hits[0];
          setStrain(result as unknown as Strain);
        }
      });
    }
    let searchListUpdate: any = [];

    results[0].general.map((result: any, index: number) => {
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
  }, [strainId, results, searchLists]);

  return (
    <div className="bg-white">
      <div className="w-full h-64 relative">
        {/* <Image
          src={strain.images[0]}
          layout="fill"
          objectFit={"cover"}
          alt={strain.title}
        /> */}
        <div className="absolute w-full relative h-full bg-gray-200 z-0">
          <Sativa fill="black" opacity={0.2} className="w-full h-full" />
        </div>
      </div>
      <div className="p-4">
        <section
          aria-labelledby="strains-heading"
          className="border-gray-200 border-b pb-4"
        >
          <h2 id="strains-heading" className="sr-only">
            {strain?._source.name_2}
          </h2>
          <h2 className="text-gray-700 text-3xl font-normal">
            {strain?._source.name_2}
          </h2>
          <p className="text-base text-gray-500 capitalize">
            {strain?._source.type}
          </p>
          <div className="flex items-center pt-4">
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
          </div>
        </section>
        <section aria-labelledby="strains-about" className="pt-4">
          <h2 id="strains-about" className="sr-only">
            {strain?._source.name_2}
          </h2>
          <p className="text-base text-gray-700">
            {strain?._source.description_1}
          </p>
        </section>
      </div>
      {searchLists.length ? (
        <ProductResultsSection
          list={searchLists}
          sponsored={true}
          label={`Shop "${query}"`}
        />
      ) : (
        ''
      )}
    </div>
  );
}
