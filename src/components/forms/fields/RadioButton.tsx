interface FormikForm {
  getFieldMeta(name: string): any;
}

interface FormikField extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

interface FieldProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  autoComplete: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
  disabled?: React.InputHTMLAttributes<HTMLInputElement>['disabled'];
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  label: React.ReactNode;
  labelHidden: boolean;
  icon?: JSX.Element;
  form: FormikForm;
  helperText: string;
  field: FormikField;
  handleBlur: (event: React.SyntheticEvent) => void;
  handleChange: (event: React.SyntheticEvent) => void;
  setFieldValue: any;
  currentValue: any;
  value: string;
}

export function RadioButton(props: FieldProps) {
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
    currentValue,
    helperText,
    icon,
    value,
    ...rest
  } = props;

  return (
    <div {...rest} className="w-full text-sm center ">
      <label htmlFor={id} className="w-full flex items-center">
        <button
          className={`${
            currentValue == value
              ? 'bg-green-500 text-white border-2 border-green-500'
              : 'bg-white border-2 border-gray-500 overflow-hidden '
          } flex justify-center w-full justify-start focus:outline-none w-full py-2 rounded-md `}
          onClick={() => setFieldValue(field.name, value)}
        >
          <input
            id={id}
            type="radio"
            disabled={disabled}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={value}
            className="radioButton"
            {...field}
          />
          <div
            className={`${
              currentValue == value
                ? 'text-white font-semibold'
                : 'text-gray-700'
            } flex space-x-2 items-center `}
          >
            {icon}
            <span>{label}</span>
          </div>
        </button>
      </label>
    </div>
  );
}
