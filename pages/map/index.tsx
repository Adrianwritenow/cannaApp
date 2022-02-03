import React, { useEffect, useState } from 'react';

import DispenaryFilterSlideOver from '@/views/slideOver/filters/DispensaryFilterSlideOver';
import { MapContainer } from '@/components/map/MapContainer';
import MapFilterSlideOver from '@/views/slideOver/MapFilterSlideOver';
import { RootState } from '@/reducers';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { useSelector } from 'react-redux';

function Map() {
  return (
    <div className="bg-grey-50">
      <div>
        {/* <div className="pt-4">
            <MapFilterSlideOver />
          </div> */}

        <MapContainer />
      </div>

      {/* <div className="w-full flex items-center  flex-wrap justify-center h-full space-y-4 py-14">
          <SvgEmptyState className="w-40 h-40" />
          <div className="w-full space-y-3">
            <h2 className="text-lg text-gray-700 font-semibold text-center w-56 ml-auto mr-auto">
              Sorry, there are no results for this search.
            </h2>
            <p className="text-sm text-gray-500 text-center w-56 ml-auto mr-auto">
              Please try again with different or more general keywords.
            </p>
          </div>
        </div> */}
    </div>
  );
}

export default Map;
