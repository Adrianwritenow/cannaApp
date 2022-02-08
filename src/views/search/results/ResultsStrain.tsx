import React from 'react';
import { Strain } from '@/interfaces/strain';
import StrainCard from '../../../components/strains/StrainCard';
import StrainCardSmall from '../../../components/strains/StrainCardSmall';

interface ResultsProps {
  view: string;
  strains: Strain[];
  query: string;
}

export default function ResultsStrain(data: ResultsProps) {
  const { view, strains, query } = data;

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl text-gray-700 font-semibold p-4  desktop:text-2xl">
          {`${strains.length} Results for ${query}`}
        </h2>
        {view === 'list' ? (
          <div className=" grid grid-flow-row auto-rows-max desktop:flex desktop:flex-wrap desktop:gap-4">
            {strains.map((strain: Strain) => (
              <div key={`strain-card-${strain._id}`}>
                <div className="desktop:hidden">
                  <StrainCardSmall strain={strain} />
                </div>
                <div className="w-64 hidden desktop:block">
                  <StrainCard strain={strain} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" grid grid-cols-2 px-4 gap-4">
            {strains.map((strain: Strain) => (
              <StrainCard strain={strain} key={`strain-card-${strain._id}`} />
            ))}
          </div>
        )}
        {/* <div className="px-4 ">
          <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
            See more
          </button>
        </div> */}
      </div>
    </div>
  );
}
