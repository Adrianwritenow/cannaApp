import { ArrowRightIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import ImageWithFallback from '../image/ImageWithFallback';
import Link from 'next/link';
import { Strain } from '@/interfaces/strain';

interface LearnProps {
  strain: Strain;
  query: string;
}

export default function LearnSection(data: LearnProps) {
  const { strain, query } = data;
  return (
    <section id="learn-section">
      <div className="pt-2 w-full lg:flex lg:mx-auto">
        <div className="lg:h-auto lg:rounded-md lg:bg-green-100 lg:flex lg:flex-wrap  lg:w-64 flex-shrink-0">
          <h2 className="text-xl  text-gray-700 font-semibold p-4">
            {`Learn ${query ? `"${query}"` : ''}`}
          </h2>
          <Link
            href={`/strain/${encodeURIComponent(strain._id as string)}`}
            passHref
          >
            <a className=" mt-auto w-full">
              <button className="p-4 hidden lg:flex rounded-md bg-green-100   text-green-600 text-sm font-semibold border-gray-200 items-center justify-between w-full">
                <span> Learn more</span>
                <ArrowRightIcon className=" w-4 h-4" />
              </button>
            </a>
          </Link>
        </div>

        <div className="lg:flex flex-wrap">
          <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-6 pb-3">
            <div
              className="rounded-lg overflow-hidden w-24 h-24 relative"
              key={`image-placeholder`}
            >
              <ImageWithFallback
                src={'/'}
                alt={strain._source.name}
                layout="fill"
                objectFit={'cover'}
              />
            </div>
          </div>
          <div className="px-4">
            <div className="border-t border-gray-200 pt-2">
              <h3 className="text-xl text-gray-700 font-normal">
                {strain._source.name}
              </h3>
              <p className="text-sm text-gray-500 font-normal capitalize">
                {strain._source.type}
              </p>
              <p className="text-sm text-gray-500 font-normal leading-5 py-3">
                {strain._source.description}
              </p>
            </div>
          </div>
          {/* Strain details */}

          {/* Strain Details */}
          <div className="px-4 border-t py-4 border-gray-200 grid grid-auto-rows gap-4">
            {/* Cannabanoids */}
            {/* <div className="">
          <h4 className="text-sm text-gray-700 font-normal">Cannabanoids</h4>
          <p className="text-sm text-gray-500 font-normal">
            Unknown% THC
            <span className="px-2 text-normal">&#8226;</span>
            Unknown% CBD
          </p>
        </div> */}
            {/* Effects */}
            <div className="">
              <h4 className="text-sm text-gray-700 font-normal">
                Cannabanoids
              </h4>
              <p className="text-sm text-gray-500 font-normal">
                0% of people report this strain makes them feel %Unknown
              </p>
            </div>
            {/* Growing time/info */}
            {strain._source.grow_information && (
              <div className="">
                <h4 className="text-sm text-gray-700 font-normal">
                  Growing Information
                </h4>
                <p className="text-sm text-gray-500 font-normal">
                  {strain._source.grow_information[0]}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 ">
        <Link href={`/strain/${strain._source.id}`} passHref>
          <a>
            <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest lg:hidden">
              Learn more
            </button>
          </a>
        </Link>
      </div>
    </section>
  );
}
