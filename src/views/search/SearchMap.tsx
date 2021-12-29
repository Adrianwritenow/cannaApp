import { MapContainer } from '@/components/map/MapContainer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BullseyeIcon from '@/public/assets/icons/iconComponents/Bullseye';

function SearchMap() {
  const [data, setData] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState<any>({
    lat: null,
    lng: null,
  });

  const locations = ['boulder', 'orlando', 'sacramento', 'portland'];
  const [place, setPlace] = useState(0);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        err => console.log(err)
      );
    }
  };

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
      {data && (
        <>
          <div className="relative">
            <button
              onClick={() => getLocation()}
              className="z-10 right-5 top-5 bg-green-400 h-10 w-10 flex items-center justify-center rounded-3xl absolute"
            >
              <BullseyeIcon className="text-white" height={24} width={24} />
            </button>
          </div>
          <MapContainer data={data} userCoordinates={userCoordinates} />
        </>
      )}

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
    </div>
  );
}

export default SearchMap;
