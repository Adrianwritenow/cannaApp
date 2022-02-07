import { Field, Form, Formik } from 'formik';

import { Product } from '@/interfaces/product';
import { ProductOptionTabs } from '@/components/forms/fields/ProductOptionTabs';
import QuantityField from '@/components/forms/fields/QuantityField';
import StarRating from '@/components/rating/StarRating';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function FlowerProduct(props: { product: Product }) {
  const { product } = props;
  const initialValues = {
    quantity: 0,
  };

  return (
    <section>
      <div>
        <h2 className="sr-only">Product information</h2>
      </div>
      <p className="text-sm">
        Shop / {product._source.category[0]} / Sub Category
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
        {product._source.price ? product._source.price[0] : '$$$ Not Set'}
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
                      label={'Select Weight'}
                      options={[
                        {
                          label: '3.5g',
                          value: '3.5g',
                        },
                        {
                          label: '7g',
                          value: '7g',
                        },
                        {
                          label: '14g',
                          value: '14g',
                        },
                        {
                          label: '28g',
                          value: '28g',
                        },
                      ]}
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
