import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { SelectorIcon } from "@heroicons/react/solid";

interface FormikForm {
  getFieldMeta(name: string): any;
}

interface FormikField extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}
interface Options {
  id: string;
  label: string;
}

interface FieldProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
  label: React.ReactNode;
  labelHidden: boolean;
  options: Options[];
  form: FormikForm;
  field: FormikField;
  mask: string;
  handleBlur: (event: React.SyntheticEvent) => void;
  setFieldValue: Function;
  value: string;
  maskPlaceholder: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectDropdown(props: FieldProps) {
  const {
    id,
    disabled,
    field,
    form,
    options,
    placeholder,
    label,
    labelHidden,
    handleBlur,
    setFieldValue,
    value,
    maskPlaceholder,
    ...rest
  } = props;

  const [selected, setSelected] = useState(options[0]);

  let labelClasses = "block text-sm font-medium text-gray-700";
  if (labelHidden) {
    labelClasses += " sr-only";
  }

  const { name } = field;

  function handleChange(value: Options) {
    setFieldValue(id, value.id);
    setSelected(value);
  }

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleChange}>
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
        <div className="mt-1 relative">
          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green focus:border-green sm:text-sm">
            <span className="block">{selected.label}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    classNames(
                      active ? "text-white bg-green" : "text-gray-900",
                      "cursor-default select-none relative py-2 pl-8 pr-4"
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? "font-semibold" : "font-normal",
                          "block truncate"
                        )}
                      >
                        {option.label}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
