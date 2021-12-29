/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { FlyToInterpolator, Marker } from "react-map-gl";
import Image from "next/image";
import mapmarker from "./mapmarker.png";
import { MapContext } from "./MapContainer";

export function Map({ data, currentViewport }: any) {
  const [viewport, setViewport] = useState<any>({
    width: "100%",
    height: "80vh",
    latitude: 37.0902,
    longitude: -95.7219,
    zoom: 3,
  });

  const { activeCard, setActiveCard, swiper, setShowResults, showResults, userCoordinates } =
    useContext(MapContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCard(0);
      swiper.slideTo(0, 1500, false);
    }, 250);
    return () => {
      clearTimeout(timer);
    };
  }, [data, swiper]);

  useEffect(() => {
    if (
      !!data[activeCard] &&
      !!data[activeCard]._source.lat &&
      !!data[activeCard]._source.lon
    ) {
      setViewport({
        ...viewport,
        latitude: data[activeCard]._source.lat[0] - 0.002,
        longitude: data[activeCard]._source.lon[0],
        transitionDuration: 1000,
        zoom: 15,
      });
    }
  }, [activeCard, data]);

  useEffect(() => {
    if (!!userCoordinates) {
      setViewport({
        ...viewport,
        latitude: userCoordinates.lat,
        longitude: userCoordinates.lng,
        transitionDuration: 1000,
        zoom: 12,
      });
    }
  }, [userCoordinates])

  // Redraw map if viewport changes
  useEffect(() => {
    setViewport({
      ...viewport,
      width: "100%",
    });
  }, [currentViewport]);

  return (
    <div className="z-0">
      <ReactMapGL
        maxZoom={20}
        transitionDuration={2000}
        transitionInterpolator={new FlyToInterpolator()}
        mapStyle="mapbox://styles/cannapages420/ckwqrmkc60dj414pd8ts1mm01?optimize=true"
        mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
        onViewportChange={(viewport: any) => setViewport(viewport)}
        {...viewport}
      >
        {data.map((place: any, idx: number) => {
          if (place._source.lat && place._source.lon) {
            let lng = place._source.lon[0];
            let lat = place._source.lat[0];
            return (
              <Marker
                longitude={lng}
                latitude={lat}
                key={idx}
                offsetTop={-10}
                offsetLeft={-10}
              >
                <button
                  onClick={() => {
                    setShowResults(true);
                    setTimeout(() => [swiper.slideTo(idx, 1000, false)], 100);
                  }}
                >
                  <Image src={mapmarker} height={30} width={30} alt="marker" />
                </button>
              </Marker>
            );
          }
        })}

        <button
          className={`flex justify-between text-sm items-center pointer transition absolute px-4 py-4 h-7 z-50 bottom-60 duration-500 right-5 rounded-3xl  text-white bg-green-400 ${
            !showResults ? "transform translate-y-52" : ""
          }`}
          onClick={() => setShowResults(!showResults)}
        >
          <ChevronDownIcon
            style={{
              scale: !showResults ? "-1" : "1",
              transition: "all 500ms ease",
            }}
            className={`w-6 transform transition duration-500`}
          />
        </button>
      </ReactMapGL>
    </div>
  );
}
