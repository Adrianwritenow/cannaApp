import React, { createContext, useEffect, useRef, useState } from 'react';
import { Map } from './Map';
import MapResults from './MapResults';
import { MapIcon } from '@heroicons/react/solid';
import { useCurrentWidth } from './useCurrentWidth';
import { ViewListIcon } from '@heroicons/react/outline';
import { RootState } from '@/reducers';
import { useDispatch, useSelector } from 'react-redux';
import BullseyeIcon from '@/public/assets/icons/iconComponents/Bullseye';
import { combinedSearchQuery, receiveResults } from '@/actions/search';
import { SearchState } from '@/interfaces/searchState';
import { useRouter } from 'next/router';

export const MapContext = createContext<any>(null);

export function MapContainer() {
  const [showMap, setShowMap] = useState(true);
  const { results, query } = useSelector((root: RootState) => root.search);
  const { city, lat, lng } = useSelector((root: RootState) => root.location);
  const [dispensaryResults, setDispensaryResults] = useState<any>([]);
  const dispatch = useDispatch();
  const [resultsShouldUpdate, setResultsShouldUpdate] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [activeCard, setActiveCard] = useState<any>(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [swiper, setSwiper] = useState<any>(null);
  const width = useCurrentWidth();
  const [userCoordinates, setUserCoordinates] = useState<any>({
    lat: null,
    lon: null,
  });

  useEffect(() => {
    let searchListUpdate: any = {
      dispensaries: [],
    };

    if (results) {
      results.filter((result: any) => {
        if (
          result._id.includes('dispensary') &&
          typeof result._source.lat !== 'undefined'
        ) {
          searchListUpdate.dispensaries.push(result);
        }
      });
    }
    if (currentQuery !== query) {
      setDispensaryResults(searchListUpdate);
    }
    setCurrentQuery(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, dispensaryResults, userCoordinates]);

  async function handleSubmit(search: any, coords: any, distance: any) {
    const hits: any = await combinedSearchQuery(search, coords, distance);
    dispatch(
      receiveResults({
        // search: city,
        search: 'My Location',
        data: hits.hits.hits,
      })
    );
  }

  // const getLocation = () => {
  //   setUserCoordinates({ lat: lat, lon: lng });
  //   setResultsShouldUpdate(true);
  // };

  const getLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          setResultsShouldUpdate(true);
          setUserCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        err => console.log(err)
      );
    }
  };

  useEffect(() => {
    if (resultsShouldUpdate && results.length) {
      setResultsShouldUpdate(false);

      handleSubmit(
        '',
        { lat: userCoordinates.lat, lon: userCoordinates.lon },
        '10mi'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCoordinates]);

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

      {typeof dispensaryResults.dispensaries !== 'undefined' && (
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
              {typeof dispensaryResults.dispensaries !== 'undefined' &&
              showMap ? (
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
                  <Map
                    data={dispensaryResults.dispensaries}
                    currentViewport={width}
                  />
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
                    <MapResults data={dispensaryResults.dispensaries} />
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
