import { Filter } from '@/interfaces/filter';

// Flattens filters parent child relationship to one array to be searched by

export function filterFlatten(filters: Filter) {
  const primaryValue = filters.value;
  const filterList = filters.list
    .map(filter => {
      if (filter.subList) {
        let filters = filter.subList.map(subFilter => {
          if (subFilter.list) {
            let tertFilters = subFilter.list.map(tertFilter => {
              return tertFilter.value;
            });
            tertFilters.push(subFilter.value);
            return tertFilters.flat(1);
          } else {
            return subFilter.value;
          }
        });
        filters.push(filter.value);

        return filters.flat(1);
      } else {
        return filter.value;
      }
    })
    .flat(1);
  filterList.push(primaryValue);
  return filterList;
}
