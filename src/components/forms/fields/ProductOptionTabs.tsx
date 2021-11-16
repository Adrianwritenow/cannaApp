import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

interface Option {
  label: string;
  value: string;
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
  options: Array<Option>;
  label: string;
  labelHidden: boolean;
  field: FormikField;
  handleBlur: (event: React.SyntheticEvent) => void;
  handleChange: (event: React.SyntheticEvent) => void;
  setFieldValue: any;
  value: string;
  maskPlaceholder: string;
}

export function ProductOptionTabs(props: FieldProps) {
  const { options, label } = props;
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  return (
    <RadioGroup
      value={selectedOption}
      onChange={setSelectedOption}
      className="mt-2"
    >
      <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      <h3 className="text-sm pb-2">{label}</h3>
      <div className="grid grid-flow-col auto-cols-max gap-2">
        {options.map((option, index) => (
          <RadioGroup.Option
            key={`${option.label}-${index}`}
            value={option.value}
            className={({ active, checked }) =>
              classNames(
                active ? "ring-2 ring-offset-2 ring-green" : "",
                checked
                  ? "bg-green border-transparent text-white hover:bg-green-500"
                  : "bg-white border-gray-200 text-green hover:bg-gray-50",
                "border rounded-md py-2 px-3 flex items-center justify-center text-xs font-medium uppercase sm:flex-1 focus:outline-none"
              )
            }
          >
            <RadioGroup.Label as="p">{option.label}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
