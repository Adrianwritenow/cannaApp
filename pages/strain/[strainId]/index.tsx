import React, { useEffect, useState } from 'react';
import { products, strain } from '../../../src/helpers/mockData';

import Image from 'next/image';
import ProductResultsSection from '../../../src/components/sections/ProductsResultsSection';
import { Sativa } from '../../../public/assets/icons/iconComponents';
import { StarIcon } from '@heroicons/react/solid';
import { Strain } from '@/interfaces/SearchStrain';
import { getDocument } from '../../../src/actions/search';
import { useRouter } from 'next/router';

export default function StrainDetail() {
  const router = useRouter();
  const { strainId } = router.query;
  const [myRating, setMyRating] = useState(0);
  const [strain, setStrain] = useState<Strain>();

  useEffect(() => {
    if (strainId) {
      getDocument(strainId).then(
        (document: React.SetStateAction<Strain | undefined>) => {
          setStrain(document);
        }
      );
    }
  }, [strainId]);

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
      <ProductResultsSection
        list={products}
        sponsored={true}
        label={'Shop %Query%'}
      />
    </div>
  );
}
