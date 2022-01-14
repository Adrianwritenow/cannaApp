import { LocationMarkerIcon, PlusCircleIcon } from '@heroicons/react/outline';

import Autocomplete from 'react-autocomplete';
import { AutocompleteItem } from '@/interfaces/autocomplete';
import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import styles from './AutoCompleteInput.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  field: React.InputHTMLAttributes<HTMLInputElement>;
  form: any;
  options: Array<AutocompleteItem>;
  onRequestOptions(value: any): any;
  onHandleSelect(value: number | string): any;
}

export function AutoCompleteInput(props: IProps) {
  const {
    form,
    field,
    options,
    onHandleSelect,
    onRequestOptions,
    placeholder,
  } = props;
  const { name, value } = field;
  const { setFieldValue } = form;
  const inputClasses =
    'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-green focus:border-green sm:text-sm disabled:bg-gray-300 disabled:text-gray-500 relative pl-12 hover:border-0';

  function handleOnChange(event: any, value: string) {
    setFieldValue(name!, value);
    onRequestOptions(value);
  }

  function handleOnSelect(event: any, value: AutocompleteItem) {
    setFieldValue(name!, value.label);
    onHandleSelect(value.id);
  }

  return (
    <div className={styles.root}>
      <SearchIcon className={`${styles.icon} text-gray-500`} />
      <Autocomplete
        {...field}
        value={value}
        items={options}
        onChange={handleOnChange}
        onSelect={handleOnSelect}
        inputProps={{
          placeholder,
          type: 'text',
          className: inputClasses,
        }}
        wrapperStyle={{
          display: 'inline-block',
          width: '100%',
        }}
        getItemValue={(item: AutocompleteItem) => `${item.id}`}
        renderItem={(item: AutocompleteItem, highlighted: boolean) => (
          <div
            key={`autocomplete-item--${item.id}`}
            className={`${styles.item} ${
              highlighted ? 'bg-gray-50' : 'bg-gray-50'
            }`}
          >
            <LocationMarkerIcon
              className={`${styles.icon} ${styles.iconBold} text-gray-500`}
            />
            {item.label}
          </div>
        )}
      />
    </div>
  );
}

AutoCompleteInput.defaultProps = {
  placeholder: ' ',
};
