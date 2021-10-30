interface FormikForm {
  getFieldMeta(name: string): any;
}

interface FormikField extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

interface FieldProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  wrapperClassname?: React.HTMLAttributes<HTMLDivElement>["className"];
  autoComplete: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  label: React.ReactNode;
  labelHidden: boolean;
  form: FormikForm;
  field: FormikField;
  mask: string;
  handleBlur: (event: React.SyntheticEvent) => void;
  handleChange: (event: React.SyntheticEvent) => void;
  setFieldValue: any;
  value: string;
  maskPlaceholder: string;
}

export function InputAddOnField(props: FieldProps) {
  const {
    id,
    wrapperClassname,
    autoComplete,
    disabled,
    field,
    form,
    type,
    placeholder,
    label,
    labelHidden,
    mask,
    handleBlur,
    handleChange,
    setFieldValue,
    value,
    maskPlaceholder,
    ...rest
  } = props;

  const { name } = field;
  const meta = form.getFieldMeta(name);

  let labelClasses = "block text-sm font-medium text-gray-700";
  if (labelHidden) {
    labelClasses += " sr-only";
  }

  let inputClass =
    "placeholder-gray-400  focus:ring-green focus:border-green  disabled:bg-gray-300 disabled:text-gray-500";
  if (meta && meta.touched && meta.error) {
    inputClass =
      "border-red-300 text-red-900 placeholder-red-900 focus:ring-red-500 focus:border-red-500 ";
  }

  return (
    <div {...rest} className={wrapperClassname}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm relative">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          cannapages.com/
        </span>
        <input
          type={type}
          id={id}
          className={`block w-full px-3 py-2 border border-gray-300 shadow-sm rounded-r-md focus:outline-none sm:text-sm ${inputClass}`}
          {...field}
        />
        {meta && meta.touched && meta.error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
      </div>
    </div>
  );
}

InputAddOnField.defaultProps = {
  disabled: false,
  type: "text",
  autoComplete: "off",
  placeholder: "",
  label: "",
  labelHidden: false,
};
