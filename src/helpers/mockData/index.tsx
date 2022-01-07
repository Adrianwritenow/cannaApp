import { Coupon } from '../../interfaces/coupon';
import { Dispensary } from '@/interfaces/searchDispensary';
import { Faq } from '@/interfaces/faq';
import { Product } from '@/interfaces/searchProduct';
import { Review } from '@/interfaces/review';
import { Strain } from '@/interfaces/SearchStrain';

export const products: Array<Product> = [
  {
    _id: 'entity:product_entity/86898:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 6,
    _source: {
      category: ['Dummy'],
      created_1: [1556767],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_delivery_and_pickup_info: [''],
      field_image: [123],
      field_top_rated_effects: ['Relaxed', 'Happy', 'Sleepy'],
      field_top_reported_flavors: ['Pine', 'Spicy/Herbal', 'Coffee'],
      field_rating: [3.5],
      field_review_count: [123],
      field_brand: ['Fake Brand'],
      field_price: ['12.99'],
      field_price_label: ['per 1/2 oz'],
      field_source_url_1: ['#'],
      field_sponsored: [false],
      langcode_1: ['en'],
      name_1: ['Fake Product'],
      status_1: [true],
      uuid: ['/'],
      _language: 'en',
      _type: '_doc',
    },
  },
  {
    _id: 'entity:product_entity/86898:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 6,
    _source: {
      category: ['Dummy'],
      created_1: [1556767],
      description: [
        'rem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_delivery_and_pickup_info: [''],
      field_image: [123],
      field_top_rated_effects: ['Relaxed', 'Happy', 'Sleepy'],
      field_top_reported_flavors: ['Pine', 'Spicy/Herbal', 'Coffee'],
      field_rating: [3.5],
      field_brand: ['Fake Brand'],
      field_review_count: [123],
      field_price: ['12.99'],
      field_price_label: ['per 1/2 oz'],
      field_source_url_1: ['#'],
      field_sponsored: [false],
      langcode_1: ['en'],
      name_1: ['Fake Product'],
      status_1: [true],
      uuid: ['/'],
      _language: 'en',
      _type: '_doc',
    },
  },
  {
    _id: 'entity:product_entity/86898:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 6,
    _source: {
      category: ['Dummy'],
      created_1: [1556767],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_delivery_and_pickup_info: [''],
      field_image: [123],
      field_top_rated_effects: ['Relaxed', 'Happy', 'Sleepy'],
      field_top_reported_flavors: ['Pine', 'Spicy/Herbal', 'Coffee'],
      field_rating: [3.5],
      field_brand: ['Fake Brand'],
      field_review_count: [123],
      field_price: ['12.99'],
      field_price_label: ['per 1/2 oz'],
      field_source_url_1: ['#'],
      field_sponsored: [false],
      langcode_1: ['en'],
      name_1: ['Fake Product'],
      status_1: [true],
      uuid: ['/'],
      _language: 'en',
      _type: '_doc',
    },
  },
];

export const listings: Array<Dispensary> = [
  {
    _id: 'entity:dispensary_entity/6029:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 7.0,
    _source: {
      address_line1: ['3518 Conowingo Rd'],
      address_line2: [''],
      country_code: ['US'],
      created_: [456788],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_delivery_and_pickup_info: [''],
      field_image: [123],
      field_phone_number: ['(123) 456 789'],
      postal_code: ['12345'],
      field_email: ['Fake@place.com'],
      field_coordinates: ['POINT(-76.270470 39.635418)'],
      field_rating: ['4.50'],
      field_reviews_count: [123],
      field_source_url: ['#'],
      field_sponsored: [false],
      lat: [39.635418],
      lon: [-76.27047],
      langcode: ['en'],
      name: ['Fake Dispensary'],
      status: [true],
      _language: 'en',
      _type: 'doc',
      field_facebook: ['https://www.facebook.com/Fake-Dispensary-6029'],
      field_instagram: ['https://www.instagram.com/fake_dispensary'],
      field_twitter: ['https://twitter.com/fake_dispensary'],
      field_monday_hours: ['9:00 AM - 9:00 PM'],
      field_tuesday_hours: ['9:00 AM - 9:00 PM'],
      field_wednesday_hours: ['9:00 AM - 9:00 PM'],
      field_thursday_hours: ['9:00 AM - 9:00 PM'],
      field_friday_hours: ['9:00 AM - 9:00 PM'],
      field_saturday_hours: ['9:00 AM - 9:00 PM'],
      field_sunday_hours: ['9:00 AM - 9:00 PM'],
      locality: ['Key West'],
      administrative_area: ['FL'],
    },
  },
  {
    _id: 'entity:dispensary_entity/6029:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 7.0,
    _source: {
      address_line1: ['3518 Conowingo Rd'],
      address_line2: [''],
      country_code: ['US'],
      created_: [456788],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_delivery_and_pickup_info: [''],
      field_image: [123],
      field_phone_number: ['(123) 456 789'],
      postal_code: ['12345'],
      field_email: ['Fake@place.com'],
      field_coordinates: ['POINT(-76.270470 39.635418)'],
      field_rating: ['4.50'],
      field_reviews_count: [123],
      field_source_url: ['#'],
      field_sponsored: [false],
      lat: [39.635418],
      lon: [-76.27047],
      langcode: ['en'],
      name: ['Fake Dispensary'],
      status: [true],
      _language: 'en',
      _type: 'doc',
      field_facebook: ['https://www.facebook.com/Fake-Dispensary-6029'],
      field_instagram: ['https://www.instagram.com/fake_dispensary'],
      field_twitter: ['https://twitter.com/fake_dispensary'],
      field_monday_hours: ['9:00 AM - 9:00 PM'],
      field_tuesday_hours: ['9:00 AM - 9:00 PM'],
      field_wednesday_hours: ['9:00 AM - 9:00 PM'],
      field_thursday_hours: ['9:00 AM - 9:00 PM'],
      field_friday_hours: ['9:00 AM - 9:00 PM'],
      field_saturday_hours: ['9:00 AM - 9:00 PM'],
      field_sunday_hours: ['9:00 AM - 9:00 PM'],
      locality: ['Key West'],
      administrative_area: ['FL'],
    },
  },
  {
    _id: 'entity:dispensary_entity/6029:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 7.0,
    _source: {
      address_line1: ['3518 Conowingo Rd'],
      address_line2: [''],
      country_code: ['US'],
      created_: [456788],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_delivery_and_pickup_info: [''],
      field_image: [123],
      field_phone_number: ['(123) 456 789'],
      postal_code: ['12345'],
      field_email: ['Fake@place.com'],
      field_coordinates: ['POINT(-76.270470 39.635418)'],
      field_rating: ['4.50'],
      field_reviews_count: [123],
      field_source_url: ['#'],
      field_sponsored: [false],
      lat: [39.635418],
      lon: [-76.27047],
      langcode: ['en'],
      name: ['Fake Dispensary'],
      status: [true],
      _language: 'en',
      _type: 'doc',
      field_facebook: ['https://www.facebook.com/Fake-Dispensary-6029'],
      field_instagram: ['https://www.instagram.com/fake_dispensary'],
      field_twitter: ['https://twitter.com/fake_dispensary'],
      field_monday_hours: ['9:00 AM - 9:00 PM'],
      field_tuesday_hours: ['9:00 AM - 9:00 PM'],
      field_wednesday_hours: ['9:00 AM - 9:00 PM'],
      field_thursday_hours: ['9:00 AM - 9:00 PM'],
      field_friday_hours: ['9:00 AM - 9:00 PM'],
      field_saturday_hours: ['9:00 AM - 9:00 PM'],
      field_sunday_hours: ['9:00 AM - 9:00 PM'],
      locality: ['Key West'],
      administrative_area: ['FL'],
    },
  },
  {
    _id: 'entity:dispensary_entity/6029:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 7.0,
    _source: {
      address_line1: ['3518 Conowingo Rd'],
      address_line2: [''],
      country_code: ['US'],
      created_: [456788],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_delivery_and_pickup_info: [''],
      field_image: [123],
      field_phone_number: ['(123) 456 789'],
      postal_code: ['12345'],
      field_email: ['Fake@place.com'],
      field_coordinates: ['POINT(-76.270470 39.635418)'],
      field_rating: ['4.50'],
      field_reviews_count: [123],
      field_source_url: ['#'],
      field_sponsored: [false],
      lat: [39.635418],
      lon: [-76.27047],
      langcode: ['en'],
      name: ['Fake Dispensary'],
      status: [true],
      _language: 'en',
      _type: 'doc',
      field_facebook: ['https://www.facebook.com/Fake-Dispensary-6029'],
      field_instagram: ['https://www.instagram.com/fake_dispensary'],
      field_twitter: ['https://twitter.com/fake_dispensary'],
      field_monday_hours: ['9:00 AM - 9:00 PM'],
      field_tuesday_hours: ['9:00 AM - 9:00 PM'],
      field_wednesday_hours: ['9:00 AM - 9:00 PM'],
      field_thursday_hours: ['9:00 AM - 9:00 PM'],
      field_friday_hours: ['9:00 AM - 9:00 PM'],
      field_saturday_hours: ['9:00 AM - 9:00 PM'],
      field_sunday_hours: ['9:00 AM - 9:00 PM'],
      locality: ['Key West'],
      administrative_area: ['FL'],
    },
  },
  {
    _id: 'entity:dispensary_entity/6029:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 7.0,
    _source: {
      address_line1: ['3518 Conowingo Rd'],
      address_line2: [''],
      country_code: ['US'],
      created_: [456788],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_delivery_and_pickup_info: [''],
      field_image: [123],
      field_phone_number: ['(123) 456 789'],
      postal_code: ['12345'],
      field_email: ['Fake@place.com'],
      field_coordinates: ['POINT(-76.270470 39.635418)'],
      field_rating: ['4.50'],
      field_reviews_count: [123],
      field_source_url: ['#'],
      field_sponsored: [false],
      lat: [39.635418],
      lon: [-76.27047],
      langcode: ['en'],
      name: ['Fake Dispensary'],
      status: [true],
      _language: 'en',
      _type: 'doc',
      field_facebook: ['https://www.facebook.com/Fake-Dispensary-6029'],
      field_instagram: ['https://www.instagram.com/fake_dispensary'],
      field_twitter: ['https://twitter.com/fake_dispensary'],
      field_monday_hours: ['9:00 AM - 9:00 PM'],
      field_tuesday_hours: ['9:00 AM - 9:00 PM'],
      field_wednesday_hours: ['9:00 AM - 9:00 PM'],
      field_thursday_hours: ['9:00 AM - 9:00 PM'],
      field_friday_hours: ['9:00 AM - 9:00 PM'],
      field_saturday_hours: ['9:00 AM - 9:00 PM'],
      field_sunday_hours: ['9:00 AM - 9:00 PM'],
      locality: ['Key West'],
      administrative_area: ['FL'],
    },
  },
];

export const strain: Strain = {
  _id: 'entity:strain_entity/1430:en',
  _index: 'elasticsearch_index_pantheon_index01',
  _score: 4.4,
  _source: {
    created_2: [1635912414],
    field_image: [123],
    field_rating: [3.5],
    field_review_count: [123],
    description_1: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
    ],
    field_top_rated_effects_1: ['Aroused', 'Sleepy', 'Creative'],
    field_top_reported_flavors_1: ['Woody', 'Nutty', 'Skunk'],
    field_source_url_2: ['#'],
    langcode_2: ['en'],
    name_2: ['Fake Strain'],
    status_2: [true],
    uuid: ['9becd266-99e6-4b83-b4c7-3c2ae1886a24'],
    _language: 'en',
    type: '_doc',
  },
};

export const strains: Array<Strain> = [
  {
    _id: 'entity:strain_entity/1430:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 4.4,
    _source: {
      created_2: [1635912414],
      field_image: [123],
      field_rating: [3.5],
      field_review_count: [123],

      description_1: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_top_rated_effects_1: ['Aroused', 'Sleepy', 'Creative'],
      field_top_reported_flavors_1: ['Woody', 'Nutty', 'Skunk'],
      field_source_url_2: ['#'],
      langcode_2: ['en'],
      name_2: ['Fake Strain'],
      status_2: [true],
      uuid: ['9becd266-99e6-4b83-b4c7-3c2ae1886a24'],
      _language: 'en',
      type: '_doc',
    },
  },
  {
    _id: 'entity:strain_entity/1430:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 4.4,
    _source: {
      created_2: [1635912414],
      description_1: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_image: [123],
      field_rating: [3.5],
      field_review_count: [123],

      field_top_rated_effects_1: ['Aroused', 'Sleepy', 'Creative'],
      field_top_reported_flavors_1: ['Woody', 'Nutty', 'Skunk'],
      field_source_url_2: ['#'],
      langcode_2: ['en'],
      name_2: ['Fake Strain'],
      status_2: [true],
      uuid: ['9becd266-99e6-4b83-b4c7-3c2ae1886a24'],
      _language: 'en',
      type: '_doc',
    },
  },
  {
    _id: 'entity:strain_entity/1430:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 4.4,
    _source: {
      created_2: [1635912414],
      description_1: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_image: [123],
      field_rating: [3.5],
      field_review_count: [123],

      field_top_rated_effects_1: ['Aroused', 'Sleepy', 'Creative'],
      field_top_reported_flavors_1: ['Woody', 'Nutty', 'Skunk'],
      field_source_url_2: ['#'],
      langcode_2: ['en'],
      name_2: ['Fake Strain'],
      status_2: [true],
      uuid: ['9becd266-99e6-4b83-b4c7-3c2ae1886a24'],
      _language: 'en',
      type: '_doc',
    },
  },
  {
    _id: 'entity:strain_entity/1430:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 4.4,
    _source: {
      created_2: [1635912414],
      description_1: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      field_image: [123],
      field_rating: [3.5],
      field_review_count: [123],

      field_top_rated_effects_1: ['Aroused', 'Sleepy', 'Creative'],
      field_top_reported_flavors_1: ['Woody', 'Nutty', 'Skunk'],
      field_source_url_2: ['#'],
      langcode_2: ['en'],
      name_2: ['Fake Strain'],
      status_2: [true],
      uuid: ['9becd266-99e6-4b83-b4c7-3c2ae1886a24'],
      _language: 'en',
      type: '_doc',
    },
  },
];

export const coupons: Array<Coupon> = [
  {
    code: 'HHH-111-222-333',
    saving: '10%',
    products: [products[0], products[1], products[2]],
    business: listings[0],
    image: {
      id: 14,
      name: 'Bongs',
      src: 'https://images.unsplash.com/photo-1601505612614-178f7ca0077c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      alt: 'Bongs',
    },
  },

  {
    code: 'HHH-111-222-333',
    saving: '10%',
    products: [products[0], products[1], products[2]],
    business: listings[0],
    image: {
      id: 56,
      name: 'Pipes',
      src: 'https://images.unsplash.com/photo-1592410115363-e8dc156e4113?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      alt: 'Pipes',
    },
  },
  {
    code: 'HHH-111-222-333',
    saving: '10%',
    products: [products[0], products[1], products[2]],
    business: listings[0],

    image: {
      id: 45,
      name: 'Pipes',
      src: 'https://images.unsplash.com/photo-1621541694081-aef305865f51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      alt: 'Pipes',
    },
  },
  {
    code: 'HHH-111-222-333',
    saving: '10%',
    products: [products[0], products[1], products[2]],
    business: listings[0],
    image: {
      id: 24,
      name: 'Grinder',
      src: 'https://images.unsplash.com/photo-1513114412776-6169617cdcf3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2VlZCUyMGdyaW5kZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      alt: 'Grinder',
    },
  },
];

export const articles = [
  {
    id: '0',
    title:
      'Parturient eu a elit volutpat eget tristique nisi. Commodo amet nulla felis.',
    href: '#',
    topic: {
      name: '%Topic%',
      href: '#',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1605570381616-4d1dc384e9e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    imageAltText: 'Alt Text',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Janette Doe',
      href: '#',
    },
  },
  {
    id: '1',
    title:
      'Parturient eu a elit volutpat eget tristique nisi. Commodo amet nulla felis.',
    href: '#',
    topic: {
      name: '%Topic%',
      href: '#',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1606752815564-979a1c23af95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    imageAltText: 'Alt Text',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Janette Doe',
      href: '#',
    },
  },
  {
    id: '2',
    title:
      'Parturient eu a elit volutpat eget tristique nisi. Commodo amet nulla felis.',
    href: '#',
    topic: {
      name: '%Topic%',
      href: '#',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1606752815564-979a1c23af95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    imageAltText: 'Alt Text',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Janette Doe',
      href: '#',
    },
  },
  {
    id: '3',
    title:
      'Parturient eu a elit volutpat eget tristique nisi. Commodo amet nulla felis.',
    href: '#',
    topic: {
      name: '%Topic%',
      href: '#',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1606752815564-979a1c23af95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    imageAltText: 'Alt Text',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Janette Doe',
      href: '#',
    },
  },
];

export const faqs: Faq[] = [
  {
    id: 123,
    question: 'Lorem Ipsum Dolor sit Amet?',
    answer:
      'Ivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam',
  },
];

export const reviews: Review[] = [
  {
    recommended: true,
    by: 'Jon Doe',
    caption: 'Great place',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
    time: '12:00pm',
    date: '1/01/2022',
  },
  {
    recommended: true,
    by: 'Jane Doe',
    caption: 'Great place',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
    time: '12:00pm',
    date: '1/01/2022',
  },
  {
    recommended: false,
    by: 'Jack Doe',
    caption: 'Great place',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
    time: '12:00pm',
    date: '1/01/2022',
  },
];
