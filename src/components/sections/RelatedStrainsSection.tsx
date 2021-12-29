import { Strain } from '@/interfaces/SearchStrain';
import StrainCard from '../strains/StrainCard';

interface Strains {
  strains: Array<Strain>;
}

export default function RelatedStrainsSection(results: Strains) {
  const { strains } = results;
  return (
    <section id="shop-section">
      <h2 className="text-xl  text-gray-700 font-semibold p-4">
        Related Strains
      </h2>
      <div className="grid grid-flow-col auto-cols-max gap-2 overflow-scroll pl-6 ">
        {strains.map((strain: Strain) => (
          <StrainCard strain={strain} key={strain._id} />
        ))}
      </div>
    </section>
  );
}
