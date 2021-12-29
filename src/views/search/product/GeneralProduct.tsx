import { Field, Form, Formik } from 'formik';

import { Product } from '../../../interfaces/searchProduct';
import QuantityField from '../../../components/forms/fields/QuantityField';
import { StarIcon } from '@heroicons/react/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function GeneralProduct(props: { product: Product }) {
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
        {product._source.field_brand
          ? product._source.field_brand[0]
          : 'Brand Unknown'}
      </p>
      <h1 className="text-lg font-normal tracking-tight text-gray-900">
        {product._source.name_1}
      </h1>

      {/* Reviews */}
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          <span className="font-normal text-gray-500 mr-1">
            {product._source.field_rating[0] || 0}
          </span>
          {[0, 1, 2, 3, 4].map(rating => (
            <StarIcon
              key={rating}
              className={classNames(
                product._source.field_rating[0] > rating
                  ? 'text-gray-900'
                  : 'text-gray-200',
                'h-3.5 w-3.5 flex-shrink-0'
              )}
              aria-hidden="true"
            />
          ))}
          <span className="font-normal text-gray-500">
            ({product._source.field_review_count || 0})
          </span>
        </div>
        <p className="sr-only">
          {product._source.field_rating[0] || 0} out of 5 stars
        </p>
      </div>
      <p className="text-xl font-bold text-black">
        {product._source.field_price || 'Price not known'}
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
