import { Product } from "../../interfaces/product";
import ProductCard from "./ProductCard";
import { products } from "../../../src/helpers/mockData";

interface ResultsProps {
  label: string;
}
export default function ProductResultsGrid(props: ResultsProps) {
  const { label } = props;
  return (
    <div>
      <div>
        <h2 className="text-xl text-gray-700 font-semibold py-4">{label}</h2>

        <div className=" grid grid-cols-2 gap-4">
          {products.map((product: Product, index) => (
            <ProductCard product={product} key={`pc-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
