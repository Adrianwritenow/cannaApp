import {
  ArrowRightIcon,
  CurrencyDollarIcon,
  LocationMarkerIcon,
} from '@heroicons/react/solid';

import { Feature } from '@/interfaces/feature';

interface SearchLocationProps {
  data: Feature;
}
export default function SearchLocationCard(props: SearchLocationProps) {
  const { data } = props;

  return (
    <div className="flex items-center shrink-0">
      <div className=" grid grid-cols-12 py-3 w-full">
        <div className="rounded-sm w-6 h-6 flex items-center justify-center">
          <LocationMarkerIcon className="w-4 h-4 text-gray-500" />
        </div>
        <div className="ml-2 w-full flex flex-wrap col-span-11 ">
          <p className="w-full overflow-hidden flex flex-wrap text-gray-700 pr-4">
            {data.place_name}
          </p>
        </div>
      </div>
    </div>
  );
}
