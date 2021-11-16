import { Field } from "formik";
import React from "react";

export default function QuantityField() {
  const stock = 10;
  const options: Array<
    React.DetailedHTMLProps<
      React.OptionHTMLAttributes<HTMLOptionElement>,
      HTMLOptionElement
    >
  > = [];

  for (var i = 0; i <= stock; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return (
    <div className="relative w-max">
      <h3 className="text-sm">Quantity</h3>
      <Field
        as="select"
        id="quantity"
        name="quantity"
        className="mt-2 border-gray-400 rounded-lg shadow-sm text-green text-xs font-medium pr-6"
      >
        {options}
      </Field>
    </div>
  );
}
