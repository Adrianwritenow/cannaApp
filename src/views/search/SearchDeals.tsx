import ProductDealsCard from "../../components/deals/ProductDealsCard";
import { products } from "../../helpers/mockData";

export default function SearchDeals() {
  return (
    <section className="px-4">
      <h3 className="py-5 text-lg font-semibold text-black"> Featured Deals</h3>
      <div>
        {products.map((product) => {
          return <ProductDealsCard product={product} />;
        })}
      </div>
    </section>
  );
}
