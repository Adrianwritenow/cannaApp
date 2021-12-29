import { Product } from '@/interfaces/searchProduct';
import ProductCard from './ProductCard';

interface ResultsProps {
  label: string;
  list: Array<Product>;
}
export default function ProductResultsGrid(props: ResultsProps) {
  const { label, list } = props;
  return (
    <div>
      <div>
        <h2 className="text-xl text-gray-700 font-semibold py-4">{label}</h2>

        <div className=" grid grid-cols-2 gap-4">
          {list.map((product: Product, index) => (
            <ProductCard product={product} key={`pc-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
