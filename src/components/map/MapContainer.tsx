import React, { createContext, useEffect, useRef, useState } from 'react';
import { combinedSearchQuery, receiveResults } from '@/actions/search';
import { useDispatch, useSelector } from 'react-redux';

import BullseyeIcon from '@/public/assets/icons/iconComponents/Bullseye';
import DispenaryFilterSlideOver from '@/views/slideOver/filters/DispensaryFilterSlideOver';
import { Dispensary } from '@/interfaces/dispensary';
import { Map } from './Map';
import MapResults from './MapResults';
import { RootState } from '@/reducers';
import { setLocation } from '@/actions/location';
import { useCurrentWidth } from './useCurrentWidth';

export const MapContext = createContext<any>(null);

export function MapContainer() {
  const [showMap, setShowMap] = useState(true);
  const { searchLocation, query } = useSelector(
    (root: RootState) => root.search
  );
  const { state, city, lat, lon, preciseLocationSet } = useSelector(
    (root: RootState) => root.location
  );
  const [dispensaryResults, setDispensaryResults] = useState<any>([]);
  const dispatch = useDispatch();
  const [resultsShouldUpdate, setResultsShouldUpdate] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [locationMatches, setLocationMatches] = useState<Array<Dispensary>>();
  const [activeCard, setActiveCard] = useState<any>(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [swiper, setSwiper] = useState<any>(null);
  const [update, setUpdate] = useState(true);
  const width = useCurrentWidth();
  const [filters, setFilters] = useState<any>({
    category: [`${query ? query : ''}`],
    sort: [],
    amenities: [],
    distance: [`5mi`],
  });

  useEffect(() => {
    if (searchLocation.label !== null) {
      getLocationMatches();
    }
    if (update) {
      getLocationMatches();
    }
  }, [
    searchLocation.label,
    query,
    searchLocation.coords,
    lat,
    lon,
    update,
    filters,
  ]);

  const getLocation = () => {
    if (!preciseLocationSet) {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            dispatch(
              setLocation({
                city: city,
                state: state,
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                preciseLocationSet: true,
              })
            );
            dispatch(
              receiveResults({
                searchLocation: {
                  coords: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                  },
                  label: city,
                },
              })
            );
          },
          err => console.log(err)
        );
      }
    } else {
      dispatch(
        receiveResults({
          // search: city,
          searchLocation: {
            coords: {
              lat: lat,
              lon: lon,
            },
            label: city,
          },
        })
      );
    }
  };

  async function getLocationMatches() {
    const range = filters.distance ? filters.distance[0] : '5mi';
    const { distance, ...filterData } = filters;
    const hits: any = await combinedSearchQuery({
      endpoints: ['dispensaries'],
      coords: searchLocation.coords ? searchLocation.coords : { lat, lon },
      filters: filterData,
      distance: range,
      total: 10,
    });

    setLocationMatches(hits);
    setUpdate(false);
  }

  function handleFilter(data: any) {
    setFilters(data);
    setUpdate(true);
  }

  return (
    <>
      {/* {!showMap && (
        <div className="w-screen relative py-2 bg-gray-50 flex items-center justify-center">
          <button
            className="flex justify-between text-sm items-center px-4 py-4 h-7 rounded-3xl text-white bg-green-400"
            onClick={() => setShowMap(!showMap)}
          >
            Map
            <MapIcon className="ml-2 w-6" />
          </button>
        </div>
      )} */}

      {locationMatches && (
        <>
          <DispenaryFilterSlideOver setFilters={handleFilter} />

          <MapContext.Provider
            value={{
              activeCard,
              setActiveCard,
              swiper,
              setSwiper,
              showResults,
              setShowResults,
            }}
          >
            <div className="overflow-hidden">
              <section className=" relative w-screen">
                {locationMatches && showMap ? (
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
                    <Map data={locationMatches} currentViewport={width} />
                    {/* <div
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
                  </div> */}
                    <div className="">
                      <MapResults
                        data={locationMatches}
                        userCoords={{ lat: lat, lon: lon }}
                      />
                    </div>
                  </>
                ) : null}
              </section>
            </div>
          </MapContext.Provider>
        </>
      )}
    </>
  );
}
