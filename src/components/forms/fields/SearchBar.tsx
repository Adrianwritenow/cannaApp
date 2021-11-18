import { InputField } from "./InputField";
import { SearchIcon } from "@heroicons/react/solid";

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

export function SearchBar(props: FieldProps) {
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

  return (
    <div {...rest} className={wrapperClassname}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type={type}
          className={
            "block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm disabled:bg-gray-300 disabled:text-gray-500 relative pl-12 hover:border-0"
          }
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          {...field}
        />
        <SearchIcon className="w-5 h-5 absolute left-0 top-0 bottom-0 mt-auto mb-auto mx-4 text-gray-500" />
      </div>
    </div>
  );
}

InputField.defaultProps = {
  disabled: false,
  type: "text",
  autoComplete: "off",
  placeholder: "",
  label: "",
  labelHidden: false,
};
