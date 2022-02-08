import bodybuilder from 'bodybuilder';

export const combinedQueryBody = (searchProps: {
  q?: string;
  coords?: any;
  distance?: string;
  filters?: any;
  total?: number;
}): object => {
  const { q, coords, distance, filters, total } = searchProps;
  const body = bodybuilder().size(total ?? 15);

  if (q) {
    body.query('query_string', 'query', q);
  } else if (q == '' || q == '*') {
    body.query('match_all', {});
  }

  // Add filters and sorts in to the query.
  if (filters) {
    Object.keys(filters).map((key, index) => {
      if (key === 'category') {
        if (filters?.category[0]) {
          body.filter('match', 'category', filters.category[0]);
        }
        if (filters?.amenities) {
          filters.amenities.map((filter: string) => {
            body.filter('term', 'amenities', filter);
          });
        }
      }

      if (key === 'sort') {
        const sort = filters?.sort[0] || '';

        switch (sort) {
          case 'Price: High to Low':
            body.sort('price', 'desc');
            break;

          case 'Highest Rated':
            body.sort('rating', 'desc');
            break;

          case 'Most Reviewed':
            body.sort('reviews_count', 'desc');
            break;

          case 'Price: Low to High':
            body.sort('price', 'asc');
            break;

          case 'Rating':
            body.sort('rating', 'desc');
            break;

          case 'Rating':
            body.sort('rating', 'desc');
            break;

          default:
            break;
        }
      }

      if (key !== 'category' && key !== 'sort' && filters[key][0]) {
        body.filter('match', `${key}`, filters[key][0]);
      }
    });
  }

  /**
   * Filter by distance and sort ASC.
   * We're using the "plane" distance type which is faster
   * but innacurate for longer distances and near the poles,
   * which is not a problem for our use case
   */
  if (coords?.lat && coords?.lon) {
    body.orFilter('geo_distance', {
      distance: distance ?? '20000mi',
      coordinates: { lat: coords.lat, lon: coords.lon },
      ignore_unmapped: true,
    });

    body.orFilter('bool', b => b.notFilter('exists', 'field', 'coordinates'));

    body.sort('_geo_distance', {
      coordinates: { lat: coords.lat, lon: coords.lon },
      order: 'asc',
      unit: 'mi',
      distance_type: 'plane',
      ignore_unmapped: true,
    });
  }

  // Build the body (JSON payload).
  return body.build();
};
