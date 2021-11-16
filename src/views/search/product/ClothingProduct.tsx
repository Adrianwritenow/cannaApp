import { Field, Form, Formik } from "formik";

import { Product } from "../../../interfaces/product";
import { ProductColorTabs } from "../../../components/forms/fields/ProductColorTabs";
import { ProductOptionTabs } from "../../../components/forms/fields/ProductOptionTabs";
import QuantityField from "../../../components/forms/fields/QuantityField";
import { StarIcon } from "@heroicons/react/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ClothingProduct(props: { product: Product }) {
  const { product } = props;
  const initialValues = {
    quantity: 0,
  };

  const colors = ["red", "green", "blue", "yellow"];

  return (
    <section>
      <div>
        <h2 className="sr-only">Product information</h2>
      </div>
      <p className="text-sm">Shop / {product.category} / Sub Category</p>
      <p className="text-sm text-blue-500 pt-4">{product.brand}</p>
      <h1 className="text-lg font-normal tracking-tight text-gray-900">
        {product.name}
      </h1>

      {/* Reviews */}
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          <span className="font-normal text-gray-500 mr-1">
            {product.rating}
          </span>
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                product.rating > rating ? "text-gray-900" : "text-gray-200",
                "h-3.5 w-3.5 flex-shrink-0"
              )}
              aria-hidden="true"
            />
          ))}
          <span className="font-normal text-gray-500">
            ({product.reviewCount})
          </span>
        </div>
        <p className="sr-only">{product.rating} out of 5 stars</p>
      </div>
      <p className="text-xl font-bold text-black">{product.price}</p>

      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          enableReinitialize={true}
        >
          {({ values, setFieldValue }) => {
            return (
              // Form Popover sets based on type of filter
              <Form className=" divide-y divide-gray-200 pt-4 ">
                <div className="space-y-4">
                  <div>
                    <Field
                      component={ProductOptionTabs}
                      label={"Size"}
                      options={[
                        {
                          label: "S",
                          value: "S",
                        },
                        {
                          label: "M",
                          value: "M",
                        },
                        {
                          label: "L",
                          value: "L",
                        },
                        {
                          label: "XL",
                          value: "XL",
                        },
                      ]}
                    />
                    <Field
                      component={ProductColorTabs}
                      label={"Colors"}
                      options={colors}
                    />
                  </div>
                  <div>
                    <Field component={QuantityField} />
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full text-center justify-center py-2 border border-transparent text-sm font-medium w-full rounded shadow-sm text-white bg-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green mt-5"
                >
                  Add to Cart
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}
