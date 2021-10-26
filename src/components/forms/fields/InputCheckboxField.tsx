import React from "react";

interface FormikForm {
  getFieldMeta(name: string): any;
}

interface FormikField extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

interface FieldProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  autoComplete: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  label: React.ReactNode;
  labelHidden: boolean;
  form: FormikForm;
  helperText: string;
  field: FormikField;
  handleBlur: (event: React.SyntheticEvent) => void;
  handleChange: (event: React.SyntheticEvent) => void;
  setFieldValue: any;
  value: string;
}

export function InputCheckboxField(props: FieldProps) {
  const {
    id,
    disabled,
    field,
    form,
    label,
    labelHidden,
    handleBlur,
    handleChange,
    setFieldValue,
    helperText,
    value,
    ...rest
  } = props;

  const { name } = field;
  const meta = form.getFieldMeta(name);

  let labelClasses = "block text-sm font-medium text-gray-700 ";
  if (labelHidden) {
    labelClasses += " sr-only";
  }

  return (
    <div {...rest} className={"flex w-full"}>
      <input
        type="checkbox"
        className="focus:ring-green-500 h-4 w-4 mt-1 text-green border-gray-300 rounded"
        disabled={disabled}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={value}
        {...field}
      />
      {meta && meta.touched && meta.error && (
        <div className="inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      <div className="ml-3 block">
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
        <p className="text-gray-500 text-sm">{helperText}</p>
      </div>
    </div>
  );
}
