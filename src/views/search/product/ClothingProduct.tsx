import { Field, Form, Formik } from 'formik';

import { Product } from '@/interfaces/product';
import { ProductColorTabs } from '@/components/forms/fields/ProductColorTabs';
import { ProductOptionTabs } from '@/components/forms/fields/ProductOptionTabs';
import QuantityField from '@/components/forms/fields/QuantityField';
import StarRating from '@/components/rating/StarRating';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ClothingProduct(props: { product: Product }) {
  const { product } = props;
  const initialValues = {
    quantity: 0,
  };

  const colors = ['red', 'green', 'blue', 'yellow'];

  return (
    <section>
      <div>
        <h2 className="sr-only">Product information</h2>
      </div>
      <p className="text-sm">
        Shop / {product._source.category} / Sub Category
      </p>
      <p className="text-sm text-blue-500 pt-4">
        {product._source.brand ? product._source.brand[0] : 'Brand Unknown'}
      </p>
      <h1 className="text-lg font-normal tracking-tight text-gray-900">
        {product._source.name}
      </h1>

      {/* Reviews */}
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        {typeof product._source.rating !== 'undefined' && (
          <StarRating
            rating={product._source.rating[0]}
            reviews_count={
              product._source.reviews_count
                ? product._source.reviews_count[0]
                : undefined
            }
          />
        )}
      </div>
      <p className="text-xl font-bold text-black">
        {product._source.price || 'Price not known'}
      </p>

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
                      label={'Size'}
                      options={[
                        {
                          label: 'S',
                          value: 'S',
                        },
                        {
                          label: 'M',
                          value: 'M',
                        },
                        {
                          label: 'L',
                          value: 'L',
                        },
                        {
                          label: 'XL',
                          value: 'XL',
                        },
                      ]}
                    />
                    <Field
                      component={ProductColorTabs}
                      label={'Colors'}
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
