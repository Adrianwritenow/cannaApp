import { Coupon } from '@/interfaces/coupon';
import { Dispensary } from '@/interfaces/dispensary';
import { ListingProps } from '@/interfaces/listing';
import { Product } from '@/interfaces/product';
import { ResultWithLocationHours } from '@/interfaces/locationData';

const API_URL = process.env.API_URL;

const formatImageUrl = (src: string): string => {
  if (src.charAt(0) === '/') {
    src = API_URL + src;
  }

  // TODO: Remove the protocol replacement eventually.
  // Workaround for dev server using http instead of https when
  // generating absolute urls.
  return src.replace('http://', 'https://');
};

export const formatImageWithFallback = (
  src: string[] | string | undefined
): string => {
  // Field probably not returned in ElasticSearch result object.
  if (typeof src === 'undefined') {
    return '#';
  }

  // Field passed in directly from ElasticSearch result object.
  if (typeof src !== 'string') {
    src = src[0];
  }

  // Check if image url includes "image_missing" somewhere in it,
  // in which case we want to provide our own fallback instead.
  if (src.includes('image_missing')) {
    return '#';
  }

  return formatImageUrl(src);
};

/**
 * Format an object that contains location hours.
 */
export const formatHoursData = (listing: ResultWithLocationHours) => {
  return {
    monday_hours: listing._source.monday_hours,
    tuesday_hours: listing._source.tuesday_hours,
    wednesday_hours: listing._source.wednesday_hours,
    thursday_hours: listing._source.thursday_hours,
    friday_hours: listing._source.friday_hours,
    saturday_hours: listing._source.saturday_hours,
    sunday_hours: listing._source.sunday_hours,
    time_zone: listing._source.time_zone,
  };
};

/**
 * Format a coupon/deal to display in a card.
 */
export const formatDealCard = (listing: Coupon): ListingProps => {
  return {
    url: `/deal/${listing._source.id}`,
    id: listing._source.id,
    image: formatImageWithFallback(listing._source.deal_image),
    dispensary: listing._source.dispensary[0],
    thumbnail: listing._source?.dispensary_image
      ? listing._source.dispensary_image[0]
      : '',
    name: listing._source.dispensary_name[0],
    title: listing._source.title[0],
    rating: listing._source.dispensary_rating
      ? listing._source.dispensary_rating[0]
      : 0,
    reviews_count: listing._source.dispensary_reviews_count
      ? listing._source.dispensary_reviews_count[0]
      : 0,
    lat: listing._source.lat[0],
    lon: listing._source.lon[0],
    amenities: '',
    discount: listing._source.discount[0],
    type: listing._source.type ? listing._source.type[0] : '',
    categories: listing._source.category || [''],
    city: listing._source.dispensary_city[0],
    state: listing._source.dispensary_state[0],
    hours: formatHoursData(listing),
  };
};

/**
 * Format a dispensary to display in a card.
 */
export const formatDispensaryCard = (listing: Dispensary): ListingProps => {
  return {
    url: `/business/${listing._source.id}`,
    id: listing._source.id,
    image: formatImageWithFallback(listing._source.image),
    title: listing._source.name[0],
    rating: listing._source.rating ? listing._source.rating[0] : 0,
    reviews_count: listing._source.reviews_count
      ? listing._source.reviews_count[0]
      : 0,
    lat: listing._source.lat[0],
    lon: listing._source.lon[0],
    amenities: listing._source?.amenities ? listing._source.amenities[0] : '',
    hours: formatHoursData(listing),
  };
};

/**
 * Format a product to display in a card.
 */
export const formatProductCard = (listing: Product): ListingProps => {
  return {
    url: `/product/${listing._source.id}`,
    id: listing._source.id,
    image: formatImageWithFallback(listing._source.image),
    eyebrow: listing._source.category[0],
    title: listing._source.name[0],
    lat: 0,
    lon: 0,
    rating: listing._source.rating ? listing._source.rating[0] : 0,
    reviews_count: listing._source.reviews_count
      ? listing._source.reviews_count[0]
      : 0,
    categories: listing._source.category || [''],
    price: listing._source.price ? listing._source.price[0] : undefined,
    price_label: listing._source.price_label
      ? listing._source.price_label[0]
      : '',
  };
};
