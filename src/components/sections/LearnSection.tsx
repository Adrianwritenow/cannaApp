import { Strain } from "../../interfaces/strain";
import Image from "next/image";

interface LearnProps {
  strain: Strain;
}

export default function LearnSection(data: LearnProps) {
  const { strain } = data;
  return (
    <section id="learn-section">
      <h2 className="text-xl  text-gray-700 font-semibold p-4">
        Learn %Query%
      </h2>
      <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-6 pb-3">
        {strain.images.map((image, index) => (
          <div
            className="rounded-lg overflow-hidden w-24 h-24 relative"
            key={`image-${index}`}
          >
            <Image
              src={image}
              alt={strain.title}
              layout="fill"
              objectFit={"cover"}
            />
          </div>
        ))}
      </div>
      {/* Strain details */}
      <div className="px-4">
        <div className="border-t border-gray-200 pt-2">
          <h3 className="text-xl text-gray-700 font-normal">{strain.title}</h3>
          <p className="text-sm text-gray-500 font-normal">{strain.type}</p>
          <p className="text-sm text-gray-500 font-normal leading-5 py-3">
            {strain.about}
          </p>
        </div>
      </div>
      {/* Strain Details */}
      <div className="px-4 border-t py-4 border-gray-200 grid grid-auto-rows gap-4">
        {/* Cannabanoids */}
        <div className="">
          <h4 className="text-sm text-gray-700 font-normal">Cannabanoids</h4>
          <p className="text-sm text-gray-500 font-normal">
            {strain.cannabanoids.thc}% THC
            <span className="px-2 text-normal">&#8226;</span>
            {strain.cannabanoids.cbd}% CBD
          </p>
        </div>
        {/* Effects */}
        <div className="">
          <h4 className="text-sm text-gray-700 font-normal">Cannabanoids</h4>
          <p className="text-sm text-gray-500 font-normal">
            {strain.effects.effectPercent}% of people report this strain makes
            them feel {strain.effects.type}
          </p>
        </div>
        {/* Growing time */}
        <div className="">
          <h4 className="text-sm text-gray-700 font-normal">Growing Time</h4>
          <p className="text-sm text-gray-500 font-normal">
            This strain takes {strain.growing.min} to {strain.growing.max} days
            to flower
          </p>
        </div>
      </div>
      <div className="px-4 ">
        <button className="py-4 w-full uppercase text-gray-700 text-xs font-bold border-t border-gray-200 tracking-widest">
          Learn more
        </button>
      </div>
    </section>
  );
}
