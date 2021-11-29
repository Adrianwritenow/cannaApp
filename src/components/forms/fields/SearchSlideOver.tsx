import {
  ControlProps,
  OptionProps,
  SingleValue,
  components,
} from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, Ref, useState } from "react";

import CreatableSelect from "react-select/creatable";
import { XIcon } from "@heroicons/react/solid";
import styles from "./Fields.module.scss";

interface SelectOption {
  value: string;
  type: string;
  category: string;
}

interface LocationOption {
  value: string;
  area: string;
}

interface Props {
  options: any;
  id: string;
  innerRef: Ref<any>;
  onChange: any;
  handleFocus?: Function;
  setFieldValue: Function;
  handleSearch: Function;
  value: SelectOption | LocationOption;
  searchHelper?: string;
  focus?: boolean;
  icon?: React.ComponentProps<any>;
  placeholder: string;
}

// Custom control for react-select
const Control = ({ children, ...props }: ControlProps<any, false>) => {
  const { icon, searchHelper, value }: any = props.selectProps;
  const isEmpty = Object.keys(value).length === 0;

  return (
    <components.Control {...props}>
      {!props.isFocused && isEmpty ? (
        <span className="pl-1 h-5 w-5 text-gray-400 " aria-hidden="true">
          {icon}
        </span>
      ) : (
        <span className="pl-3 text-base text-gray-500 font-bold">
          {searchHelper}
        </span>
      )}
      {children}
    </components.Control>
  );
};

// Custom option for react-select
const Option = (props: OptionProps<any>) => {
  return (
    <components.Option
      className={`${styles.option} ${props.isFocused ? styles.isFocused : ""} ${
        props.isSelected ? styles.isSelected : ""
      }`}
      {...props}
    />
  );
};

export const SearchSlideOver = (SearchFieldpProps: Props) => {
  const [open, setOpen] = useState(false);

  const {
    id,
    handleFocus,
    innerRef,
    setFieldValue,
    value,
    icon,
    focus,
    searchHelper,
    placeholder,
    handleSearch,
    ...rest
  } = SearchFieldpProps;

  // Custom option label for react-select

  const searchOptionLabel = ({ value, type, category }: any) => (
    <div className="flex w-full ">
      <p className="text-sm focus:outline-none ">
        {value}
        {type ? <span className="text-gray-400"> in {type}</span> : ""}
        <span className="ml-1 text-green font-bold">{category}</span>
      </p>
    </div>
  );

  // Custom option label for locations for react-select

  // Handle change in value
  const changeHandler = (
    newValue: SingleValue<SelectOption> | SingleValue<LocationOption>
  ) => {
    if (newValue?.value) {
      setFieldValue(id, { value: newValue.value, label: newValue.value });
    }
  };

  const style = {
    control: (base: any, state: any) => ({
      ...base,
      border: "none",
      boxShadow: "none",
    }),
  };

  return (
    <div>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="search"
          className="w-full border-gray-400 indent-sm rounded-md focus:outline-none focus:ring-0 focus:border-0 focus:border-gray-400 shadow-sm"
          onClick={() => {
            console.log("FOCUS");
            setOpen(true);
          }}
        />
        <div className="absolute flex items-center left-0 top-0 bottom-0 mt-auto mb-auto ">
          <span className="mx-4">{icon}</span>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={() => setOpen(false)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Panel title
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        >
                          <CreatableSelect
                            {...SearchFieldpProps}
                            ref={innerRef}
                            className={`w-full hover:border-0 ${styles.input} ${
                              focus ? styles.isFocused : ""
                            }`}
                            styles={style}
                            // @ts-ignore
                            icon={icon ? icon : ""}
                            focus={true}
                            menuIsOpen={focus}
                            instanceId={id}
                            placeholder={placeholder}
                            searchHelper={searchHelper}
                            formatOptionLabel={searchOptionLabel}
                            options={SearchFieldpProps.options}
                            components={{
                              Control,
                              DropdownIndicator: () => null,
                              IndicatorSeparator: () => null,
                              Option,
                            }}
                            onChange={changeHandler}
                            value={value}
                          />
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
