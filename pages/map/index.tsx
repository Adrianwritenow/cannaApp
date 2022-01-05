import MapFilterSlideOver from '@/views/slideOver/MapFilterSlideOver';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/reducers';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';
import { MapContainer } from '@/components/map/MapContainer';

function Map() {
  // const [view, setView] = useState(0);
  // const [currentQuery, setCurrentQuery] = useState('');
  const { results } = useSelector((root: RootState) => root.search);
  

  
  // const [searchLists, setSearchLists] = useState<SearchState>({
  //   news: [],
  //   deals: [],
  //   shopping: [],
  //   dispensaries: [],
  //   strains: [],
  // });

  // useEffect(() => {
  //   let searchListUpdate: SearchState = {
  //     news: [],
  //     deals: [],
  //     shopping: [],
  //     dispensaries: [],
  //     strains: [],
  //   };

  //   if (results.dispensaries) {
  //     results.dispensaries.map((result: any, index: number) => {
  //       searchListUpdate.dispensaries.push(result);
  //     });
  //   }
  //   if (currentQuery !== query) {
  //     setSearchLists(searchListUpdate);
  //   }
  //   setCurrentQuery(query);
  // }, [view, results, searchLists]);

  return (
    <div className="bg-white">
      {results.filter((result: any) => result._id.includes('dispensary')  && typeof result._source.lat !== 'undefined').length ? (
        <div>
          <div className="pt-4">
            <MapFilterSlideOver />
          </div>
          <MapContainer />
        </div>
      ) : (
        <div className="w-full flex items-center  flex-wrap justify-center h-full space-y-4 py-14">
          <SvgEmptyState className="w-40 h-40" />
          <div className="w-full space-y-3">
            <h2 className="text-lg text-gray-700 font-semibold text-center w-56 ml-auto mr-auto">
              Sorry, there are no results for this search.
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
