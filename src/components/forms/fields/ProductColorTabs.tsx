import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
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
  options: Array<string>;
  label: string;
  labelHidden: boolean;
  field: FormikField;
  handleBlur: (event: React.SyntheticEvent) => void;
  handleChange: (event: React.SyntheticEvent) => void;
  setFieldValue: any;
  value: string;
  maskPlaceholder: string;
}

export function ProductColorTabs(props: FieldProps) {
  const { options, label } = props;
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <RadioGroup
      value={selectedOption}
      onChange={setSelectedOption}
      className="mt-2"
    >
      <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      <h3 className="text-sm pb-2">{label}</h3>
      <div className="grid grid-flow-col auto-cols-max gap-2">
        {options.map((option, index) => {
          const color = `${option}-500`;
          const background = `bg-${color}`;

          return (
            <RadioGroup.Option
              key={`${option}-${index}`}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  active ? `ring-2 ring-offset-2 ring-${color}` : "",
                  checked ? " border-transparent " : " border-gray-200",
                  `border rounded-md py-2 px-3 text-white flex items-center justify-center text-xs font-medium uppercase sm:flex-1 focus:outline-none ${background} rounded-full w-8 h-8`
                )
              }
            >
              <RadioGroup.Label as="button"></RadioGroup.Label>
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
}
