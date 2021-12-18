import { Listing } from "../../interfaces/listing";
import ListingCard from "../../components/listings/ListingCard";
import ListingSection from "../../components/sections/ListingSection";
import React, { useState, useEffect } from "react";
import { listings } from "../../helpers/mockData";
import MapContainer from "../../components/map/MapContainer";
import axios from "axios";

export default function SearchStrain() {
    const [data, setData] = useState([]);
    const [resultSet, setResultSet] = useState(8);
    

    useEffect(() => {
      if (true) {
        axios
          .get(
            //TODO add to env variables
            `https://search-dev.cannapages.com/elasticsearch_index_pantheon_dispenaries/_search?q=${resultSet}`
          )
          .then((res: any) => setData(res.data.hits.hits))
          .catch((err) => console.log(err));
      }
    }, [resultSet]);
  return (
    <div className="bg-gray-50">
      <MapContainer data={data} />
      
      <div className="px-4 flex">
        <button onClick={() => setResultSet(prev => prev - 1)} className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
          <p>Prev</p>
        </button>
        <button onClick={() => setResultSet(prev => prev + 1)} className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
          Next
        </button>
      </div>
      <ListingSection listings={[listings[0], listings[1]]} sponsored={true} />
      <div className="pt-5">
        <h2 className="text-xl text-gray-700 font-semibold p-4 pb-0">
          Dispensaries near %Location%
        </h2>
        <div className="grid grid-flow-row auto-rows-max gap-1">
          {listings.map((listing: Listing, index) => (
            <ListingCard listing={listing} key={`sd-${index}`} />
          ))}
        </div>
      </div>
      <div className="px-4 ">
        <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
          See more
        </button>
      </div>
    </div>
  );
}
