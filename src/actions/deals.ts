import { IAxiosAction } from '@/interfaces/axios';

const SEARCH_URL = process.env.SEARCH_URL;
export const DEALS_REQUEST_SEARCH_NEAR_ME = 'deals/searchNearMe';
export const DEALS_REQUEST_SEARCH_FEATURED = 'deals/searchFeatured';

export function searchDealsNearMe(
  filter: string,
  from: number = 0
): IAxiosAction {
  const data = {
    query: {
      function_score: {
        query: {
          bool: {
            must: {
              match_all: {},
            },
            filter: [],
          },
        },
      },
    },
    aggs: {
      category: {
        terms: {
          field: 'category',
          size: 15,
        },
      },
    },
    size: 15,
    from,
  };

  if (filter !== 'All') {
    data.query.function_score.query.bool.filter = [
      {
        term: {
          category: filter,
        },
      },
    ] as any;
  }

  return {
    type: DEALS_REQUEST_SEARCH_NEAR_ME,
    config: {
      method: 'POST',
      // url: `${SEARCH_URL}/elasticsearch_index_dev_cannapages_coupons/_search`,
      url: `${SEARCH_URL}/elasticsearch_index_database_coupons/_search`,
      data,
    },
  };
}

export function searchFeaturedDeals(): IAxiosAction {
  const data = {
    query: {
      function_score: {
        query: {
          bool: {
            must: {
              match_all: {},
            },
            filter: [
              {
                term: {
                  showcased: true,
                },
              },
            ],
          },
        },
        boost: '5',
        random_score: {},
        boost_mode: 'multiply',
      },
    },
  };

  return {
    type: DEALS_REQUEST_SEARCH_FEATURED,
    config: {
      method: 'POST',
      // url: `${SEARCH_URL}/elasticsearch_index_dev_cannapages_coupons/_search`,
      url: `${SEARCH_URL}/elasticsearch_index_database_coupons/_search`,
      data,
    },
  };
}
