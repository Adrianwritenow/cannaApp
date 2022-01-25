import { InputField } from './InputField';
import { SearchIcon } from '@heroicons/react/solid';

interface FormikForm {
  getFieldMeta(name: string): any;
}

interface FormikField extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

interface FieldProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  wrapperClassname?: React.HTMLAttributes<HTMLDivElement>['className'];
  autoComplete: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
  disabled?: React.InputHTMLAttributes<HTMLInputElement>['disabled'];
  innerRef?: any;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
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
  className: string;
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
    className,
    label,
    innerRef,
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

  let labelClasses = 'block text-sm font-medium text-gray-700';
  if (labelHidden) {
    labelClasses += ' sr-only';
  }

  return (
    <div {...rest} className={wrapperClassname}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>

      <div className="flex justify-center items-center">
        <SearchIcon className="w-5 h-5 left-0 top-0 bottom-0 mt-auto mb-auto text-gray-500" />
        <input
          type={type}
          ref={innerRef}
          value={value}
          className={className}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          {...field}
        />
      </div>
    </div>
  );
}

InputField.defaultProps = {
  disabled: false,
  type: 'text',
  autoComplete: 'off',
  placeholder: '',
  label: '',
  labelHidden: false,
};
