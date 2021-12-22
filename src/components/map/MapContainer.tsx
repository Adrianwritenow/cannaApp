import React, { createContext, useEffect, useRef, useState } from "react";
import { Map } from "./Map";
import MapResults from "./MapResults";
import { MapIcon } from "@heroicons/react/solid";
import { useCurrentWidth } from "./useCurrentWidth";
import { ViewListIcon } from "@heroicons/react/outline";

export const MapContext = createContext<any>(null);

function MapContainer({ data }: any) {
  const [showMap, setShowMap] = useState(true);
  const [showResults, setShowResults] = useState(true);
  const [activeCard, setActiveCard] = useState<any>(null);
  const [swiper, setSwiper] = useState<any>(null);
  const width = useCurrentWidth();
  return !!data ? (
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
      {data && (
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
              {data && showMap ? (
                <>
                  <Map data={data} currentViewport={width} />
                  <div
                    className={`transition-all duration-500 absolute bottom-60
                ${
                  !showResults ? "transform translate-y-52" : ""
                } w-screen flex justify-center`}
                  >
                    <button
                      className="flex justify-between text-sm items-center px-4 py-4 h-7 rounded-3xl z-40 text-white bg-green-400"
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
  ) : (
    <></>
  );
}

export default MapContainer;
