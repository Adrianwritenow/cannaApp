import { Product } from '@/interfaces/product';
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
        <h2 className="text-xl text-gray-700 font-semibold py-4 desktop:text-2xl">
          {label}
        </h2>

        <div className=" grid grid-cols-2 gap-4 desktop:flex desktop:flex-wrap ">
          {list.map((product: Product, index) => (
            <div className="w-36" key={`pc-${index}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
