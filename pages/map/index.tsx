import MapFilterSlideOver from '@/views/slideOver/MapFilterSlideOver';
import React from 'react';
import SearchMap from '@/views/search/SearchMap';

function Map() {
  return (
    <div className="bg-white">
      <div className="pt-4">
        <MapFilterSlideOver />
      </div>
      <SearchMap />
    </div>
  );
}

export default Map;
