import { MapContainer } from '@/components/map/MapContainer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BullseyeIcon from '@/public/assets/icons/iconComponents/Bullseye';
import { Dispensary } from '@/interfaces/searchDispensary';
import SvgEmptyState from '@/public/assets/icons/iconComponents/EmptyState';

function SearchMap() {


  return dispensaries.length ? (
    <MapContainer  />
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
  );
}

export default SearchMap;
