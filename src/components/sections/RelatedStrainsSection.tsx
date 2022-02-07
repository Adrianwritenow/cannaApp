import { Strain } from '@/interfaces/strain';
import StrainCard from '../strains/StrainCard';

interface Strains {
  strains: Array<Strain>;
}

export default function RelatedStrainsSection(results: Strains) {
  const { strains } = results;
  return (
    <section id="shop-section">
      <div className="pt-2 w-full lg:flex lg:mx-auto">
        <div className="lg:h-auto lg:rounded-md lg:bg-green-100 lg:flex lg:flex-wrap  lg:w-64 flex-shrink-0">
          <h2 className="text-xl  text-gray-700 font-semibold p-4">
            Related Strains
          </h2>
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-4 lg:flex lg:flex-wrap ">
          {strains.map((strain: Strain) => (
            <StrainCard strain={strain} key={strain._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
