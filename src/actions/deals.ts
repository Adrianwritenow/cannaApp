import { IAxiosAction } from '@/interfaces/axios';

const SEARCH_URL = process.env.SEARCH_URL;
const SEARCH_INDEX_PREFIX = process.env.SEARCH_INDEX_PREFIX;

export const DEALS_REQUEST_SEARCH_NEAR_ME = 'deals/searchNearMe';
export const DEALS_REQUEST_SEARCH_FEATURED = 'deals/searchFeatured';

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
      url: `${SEARCH_URL}/elasticsearch_index_${SEARCH_INDEX_PREFIX}_coupons/_search`,
      data,
    },
  };
}
