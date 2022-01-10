import MapFilterSlideOver from '@/views/slideOver/MapFilterSlideOver';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/reducers';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { MapContainer } from '@/components/map/MapContainer';

function Map() {
  const { results } = useSelector((root: RootState) => root.search);
  const [mapResults, setMapResults] = useState<any>([]);

  useEffect(() => {
    const validResults = results.filter(
      (result: any) =>
        result._id.includes('dispensary') &&
        typeof result._source.lat !== 'undefined'
    );
    setMapResults(validResults);
  }, [results]);
  
  return (
    <div className="bg-grey-50">
      {results.filter((result: any) => result._id.includes('dispensary')  && typeof result._source.lat !== 'undefined').length ? (
        <div>
          <div className="pt-4">
            <MapFilterSlideOver />
          </div>
          <MapContainer data={mapResults}/>
        </div>
      ) : (
        <div className="w-full flex items-center  flex-wrap justify-center h-full space-y-4 py-14">
          <SvgEmptyState className="w-40 h-40" />
          <div className="w-full space-y-3">
            <h2 className="text-lg text-gray-700 font-semibold text-center w-56 ml-auto mr-auto">
              Sorry, there are no dispensary results for this search.
            </h2>
            <p className="text-sm text-gray-500 text-center w-56 ml-auto mr-auto">
              Please try again with different or more general keywords.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Map;
