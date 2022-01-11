export const getField = (
  OrigObject: Object,
  field: string,
  valueKey: string = 'value'
): any => {
  type PropField = keyof typeof OrigObject;

  function isValidKey(value: string): value is PropField {
    return value in OrigObject;
  }

  if (!isValidKey(field)) {
    return;
  }

  const fieldValue = OrigObject[field];
  if (!Array.isArray(fieldValue)) {
    return fieldValue;
  }

  const values = fieldValue.map((value: any) => {
    return value[valueKey];
  });

  // No proper value.
  if (!values.length) {
    return;
  }

  // Only one value, so return that.
  if (values.length === 1) {
    return values[0];
  }

  // Multiple values, so return the whole array.
  return values;
};
