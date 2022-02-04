import { ArrowRightIcon } from '@heroicons/react/solid';
import { Dispensary } from '@/interfaces/dispensary';
import Link from 'next/link';
import SvgStore from '@/public/assets/icons/iconComponents/Store';

interface SearchDispensaryProps {
  data: Dispensary;
}
export default function SearchDispensaryCard(props: SearchDispensaryProps) {
  const { data } = props;

  return (
    <Link href={`/business/${data._source.id}`} passHref>
      <a className="flex items-center shrink-0">
        <div className=" grid grid-cols-12 py-3 w-full">
          <div className="bg-green-500 rounded-sm p-0.5 mt-0.5 w-6 h-6 flex items-center justify-center">
            <SvgStore className="w-4 h-4 bg-green-500" />
          </div>
          <div className="ml-2 w-full flex flex-wrap col-span-9 ">
            <p className="w-full overflow-hidden flex flex-wrap text-gray-700 pr-4">
              {data._source.name}
            </p>
            <span className="text-gray-500 text-sm w-full">Dispensary</span>
          </div>
          <div className="col-span-2 ">
            <div className="flex items-center h-full ml-auto">
              <ArrowRightIcon className="w-6 h-6 text-gray-400 ml-auto shrink-0" />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
