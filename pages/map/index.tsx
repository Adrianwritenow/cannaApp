import SearchMap from '@/views/search/SearchMap';
import MapFilterSlideOver from '@/views/slideOver/MapFilterSlideOver';
import React from 'react';

function Map() {
  return (
    <div className="bg-white">
      <MapFilterSlideOver />
      <SearchMap />
    </div>
  );
}

export default Map;
