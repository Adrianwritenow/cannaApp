import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import MapDispMarkerSelected from '@/public/assets/icons/iconComponents/MapDispMarkerSelected';
function SmallMap({ coords }: { coords: { lat: number; lon: number } }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: coords.lat,
    longitude: coords.lon,
    zoom: 13,
  });

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: coords.lat,
      longitude: coords.lon,
      zoom: 13
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords])
  return (
    <div className="h-full w-full">
      <ReactMapGL
        mapStyle="mapbox://styles/cannapages420/ckxrqq0ot2yxg14sx1ojmpczi"
        mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
        onViewportChange={(viewport: any) => setViewport(viewport)}
        scrollZoom={false}
        {...viewport}
      >
        <Marker
          longitude={coords.lon}
          latitude={coords.lat}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <MapDispMarkerSelected />
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default SmallMap;
