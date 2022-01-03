import React, { createContext, useEffect, useRef, useState } from 'react';
import { Map } from './Map';
import MapResults from './MapResults';
import { MapIcon } from '@heroicons/react/solid';
import { useCurrentWidth } from './useCurrentWidth';
import { ViewListIcon } from '@heroicons/react/outline';
import BullseyeIcon from '@/public/assets/icons/iconComponents/Bullseye';

export const MapContext = createContext<any>(null);

export function MapContainer({ data }: any) {
  const [showMap, setShowMap] = useState(true);
  const [showResults, setShowResults] = useState(true);
  const [activeCard, setActiveCard] = useState<any>(0);
  const [swiper, setSwiper] = useState<any>(null);
  const width = useCurrentWidth();
  const [userCoordinates, setUserCoordinates] = useState<any>({
    lat: null,
    lng: null,
  });

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

  return (
    <>
      {!showMap && (
        <div className="w-screen relative py-2 bg-gray-50 flex items-center justify-center">
          <button
            className="flex justify-between text-sm items-center px-4 py-4 h-7 rounded-3xl text-white bg-green-400"
            onClick={() => setShowMap(!showMap)}
          >
            Map
            <MapIcon className="ml-2 w-6" />
          </button>
        </div>
      )}

      {data.length && (
        <MapContext.Provider
          value={{
            activeCard,
            setActiveCard,
            swiper,
            setSwiper,
            showResults,
            setShowResults,
            userCoordinates,
          }}
        >
          <div className="overflow-hidden">
            <section className=" relative w-screen">
              {data.length && showMap ? (
                <>
                  <button
                    onClick={() => getLocation()}
                    className="z-10 right-5 top-5 bg-green-400 h-10 w-10 flex items-center justify-center rounded-3xl absolute"
                  >
                    <BullseyeIcon
                      className="text-white"
                      height={24}
                      width={24}
                    />
                  </button>
                  <Map data={data} currentViewport={width} />
                  <div
                    className={`transition-all duration-500 absolute bottom-64
                ${
                  !showResults ? 'transform translate-y-52' : ''
                } w-screen flex justify-center`}
                  >
                    <button
                      className="flex justify-between text-sm items-center px-4 py-4 h-7 rounded-3xl z-10 text-white bg-green-400"
                      onClick={() => setShowMap(!showMap)}
                    >
                      List
                      <ViewListIcon className=" ml-2 w-6" />
                    </button>
                  </div>
                  <div className="">
                    <MapResults data={data} />
                  </div>
                </>
              ) : null}
            </section>
          </div>
        </MapContext.Provider>
      )}
    </>
  );
}
