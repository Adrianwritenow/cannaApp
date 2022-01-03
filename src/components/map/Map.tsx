/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import { MapContext } from './MapContainer';
import { getCenterOfBounds } from 'geolib';
import MapDispMarker from '@/public/assets/icons/iconComponents/MapDispMarker';
import MapDispMarkerSelected from '@/public/assets/icons/iconComponents/MapDispMarkerSelected';

export function Map({ data, currentViewport }: any) {
  const [currentCenter, setCurrentCenter] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [viewport, setViewport] = useState<any>({
    width: '100%',
    height: '75vh',
    latitude: currentCenter.latitude,
    longitude: currentCenter.longitude,
    zoom: 3,
    transitionInterpolator: new FlyToInterpolator(),
  });

  // function getCoords(item: any) {
  //   const coordString = item._source.field_coordinates[0]
  //     .slice(6)
  //     .slice(0, -1)
  //     .split(' ');
  //   return { lat: +coordString[1], lng: +coordString[0] };
  // }

  const {
    activeCard,
    setActiveCard,
    swiper,
    setShowResults,
    showResults,
    userCoordinates,
  } = useContext(MapContext);

  useEffect(() => {
    if (data.length && swiper) {
      setActiveCard(0);
      swiper.slideTo(0, 1500, false);
    }
  }, [data]);

  useEffect(() => {
    if (
      data.length &&
      activeCard !== 0 &&
      data[activeCard - 1] &&
      data[activeCard - 1]._source.lat.length &&
      data[activeCard - 1]._source.lon.length
    ) {
      const currentLat = data[activeCard - 1]._source.lat[0];
      const currentLon = data[activeCard - 1]._source.lon[0];
      setViewport({
        ...viewport,
        longitude: currentLon - 0.0,
        latitude: currentLat - 0.004,
        transitionDuration: 1500,
        zoom: 14,
      });
    }

    if (activeCard === 0 && data.length) {
      const coordinates = data
        .filter((result: any) => {
          return !!result._source.lat && !!result._source.lon;
        })
        .map((result: any) => {
          if (result._source.lat && result._source.lon) {
            return {
              latitude: result._source.lat[0],
              longitude: result._source.lon[0],
            };
          }
        });
      const center: any = getCenterOfBounds(coordinates);
      setViewport({
        ...viewport,
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 10,
      });
    }
  }, [activeCard, data, swiper]);

  useEffect(() => {
    if (!!userCoordinates) {
      setViewport({
        ...viewport,
        latitude: userCoordinates.lat,
        longitude: userCoordinates.lng - 0.005,
        transitionDuration: 1500,
        zoom: 9,
      });
    }
  }, [userCoordinates]);

  // Redraw map if viewport changes
  useEffect(() => {
    setViewport({
      ...viewport,
      width: '100%',
    });
  }, [currentViewport]);

  return (
    <div className="z-0">
      <ReactMapGL
        maxZoom={20}
        preventStyleDiffing={true}
        transitionDuration={1500}
        mapStyle="mapbox://styles/cannapages420/ckxrqq0ot2yxg14sx1ojmpczi"
        mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
        onViewportChange={(viewport: any) => setViewport(viewport)}
        {...viewport}
      >
        {data.map((place: any, idx: number) => {
          const active = idx === activeCard - 1;
          if (!!place._source.lat && !!place._source.lon) {
            return (
              <Marker
                longitude={place._source.lon[0]}
                latitude={place._source.lat[0]}
                key={idx}
                offsetTop={-48}
                offsetLeft={-12}
              >
                <button
                  onClick={() => {
                    setShowResults(true);
                    swiper.slideTo(idx + 1, 1500, false);
                  }}
                >
                  {active ? (
                    <MapDispMarkerSelected className="h-12 w-12" />
                  ) : (
                    <MapDispMarker className="h-10 w-10" />
                  )}
                </button>
              </Marker>
            );
          }
        })}

        <button
          className={`flex justify-between text-sm items-center pointer transition absolute px-4 py-4 h-7 z-50 bottom-64 duration-500 right-5 rounded-3xl  text-white bg-green-400 ${
            !showResults ? 'transform translate-y-52' : ''
          }`}
          onClick={() => setShowResults(!showResults)}
        >
          <ChevronDownIcon
            style={{
              scale: !showResults ? '-1' : '1',
              transition: 'all 500ms ease',
            }}
            className={`w-6 transform transition duration-500`}
          />
        </button>
      </ReactMapGL>
    </div>
  );
}
