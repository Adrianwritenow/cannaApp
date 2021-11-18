import {
  ControlProps,
  OptionProps,
  SingleValue,
  components,
} from "react-select";
import React, { Ref } from "react";

import CreatableSelect from "react-select/creatable";
import LocationIcon from "../../../../public/assets/icons/iconComponents/Location";
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
  handleFocus: Function;
  setFieldValue: Function;
  handleSearch: Function;
  value: SelectOption | LocationOption;
  searchHelper: string;
  focus: boolean;
  icon: React.ComponentProps<any>;
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

export const SearchField = (SearchFieldpProps: Props) => {
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

  const locationOptionLabel = ({ value, area }: any) =>
    value !== "use my current location" ? (
      <div className="flex w-full ">
        <p className="text-sm">
          {value}
          {area ? (
            <span className="ml-1 text-gray-400 font-bold">{area}</span>
          ) : (
            ""
          )}
        </p>
      </div>
    ) : (
      <div className="flex w-full text-green items-center">
        <p className="text-sm font-bold pr-2">{value}</p>
        <LocationIcon />
      </div>
    );

  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    handleFocus(id, false);
  };

  const focusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    handleFocus(id, true);
  };

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
    <CreatableSelect
      {...SearchFieldpProps}
      ref={innerRef}
      className={`w-full hover:border-0 ${styles.input} ${
        focus ? styles.isFocused : ""
      }`}
      onBlur={blurHandler}
      onFocus={focusHandler}
      styles={style}
      // @ts-ignore
      icon={icon}
      focus={true}
      menuIsOpen={focus}
      instanceId={id}
      placeholder={placeholder}
      searchHelper={searchHelper}
      formatOptionLabel={
        id === "search" ? searchOptionLabel : locationOptionLabel
      }
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
  );
};
