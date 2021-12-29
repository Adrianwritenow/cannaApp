import React, { useEffect, useState } from 'react';

import { Dispensary } from '@/interfaces/searchDispensary';
import { Listing } from '../../interfaces/listing';
import ListingCardDropdown from '../../components/listings/ListingCardDropDown';
import ListingSection from '../../components/sections/ListingSection';
import MapContainer from '../../components/map/MapContainer';
import axios from 'axios';
import { listings } from '../../helpers/mockData';

export default function SearchStrain(props: {
  dispensaries: Dispensary[];
  query: string;
}) {
  const { dispensaries, query } = props;
  const [data, setData] = useState([]);
  const [resultSet, setResultSet] = useState(8);

  const locations = ['boulder', 'orlando', 'sacramento', 'portland'];
  const [place, setPlace] = useState(0);

  useEffect(() => {
    axios
      .get(
        //TODO add to env variables
        `https://search-dev.cannapages.com/elasticsearch_index_pantheon_dispenaries/_search?q=${locations[place]}`
      )
      .then((res: any) => setData(res.data.hits.hits))
      .catch(err => console.log(err));
  }, [place]);
  return (
    <div className="bg-gray-50">
      {data && <MapContainer data={data} />}

      {/* Temporary next location button for demonstration purposes */}
      <div className="px-4 flex">
        <button
          onClick={() => {
            if (place === 3) {
              setPlace(0);
            } else setPlace(prev => prev + 1);
          }}
          className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest"
        >
          <p>
            {locations[place]}
            {' >'}
          </p>
        </button>
      </div>
      <ListingSection listings={dispensaries} query={query} />
      <div className="pt-5">
        <h2 className="text-xl text-gray-700 font-semibold p-4 pb-0">
          {`Dispensaries near "${query}"`}
        </h2>
        <div className="grid grid-flow-row auto-rows-max gap-1 px-4">
          {dispensaries.map((dispensary: Dispensary, index) => (
            <ListingCardDropdown listing={dispensary} key={`sd-${index}`} />
          ))}
        </div>
      </div>
      <div className="px-4 pt-5">
        <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
          See more
        </button>
      </div>
    </div>
  );
}
