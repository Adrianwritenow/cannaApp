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
      <h2 className="text-xl  text-gray-700 font-semibold p-4">
        {`Learn ${query ? `"${query}"` : ''}`}
      </h2>
      <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-6 pb-3">
        {strain._source.image ? (
          strain._source.image.map((image, index) => (
            <div
              className="rounded-lg overflow-hidden w-24 h-24 relative"
              key={`image-${index}`}
            >
              <ImageWithFallback
                src={image}
                alt={strain._source.name}
                layout="fill"
                objectFit={'cover'}
              />
            </div>
          ))
        ) : (
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
        )}
      </div>
      {/* Strain details */}
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
          <h4 className="text-sm text-gray-700 font-normal">Cannabanoids</h4>
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
      <div className="px-4 ">
        <Link
          href={`/strain/${encodeURIComponent(strain._id as string)}`}
          passHref
        >
          <a>
            <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
              Learn more
            </button>
          </a>
        </Link>
      </div>
    </section>
  );
}
