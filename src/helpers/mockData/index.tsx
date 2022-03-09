import { Coupon } from '../../interfaces/coupon';
import { Dispensary } from '@/interfaces/dispensary';
import { Faq } from '@/interfaces/faq';
import { Product } from '@/interfaces/product';
import { Review } from '@/interfaces/review';
import { Strain } from '@/interfaces/strain';

export const products: Array<Product> = [
  {
    _id: 'entity:product_entity/86898:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 6,
    _source: {
      id: 86898,
      category: ['Dummy'],
      manufacture: ['Dummy'],
      created: [1556767],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      delivery_and_pickup_info: [''],
      top_rated_effects: ['Relaxed', 'Happy', 'Sleepy'],
      top_reported_flavors: ['Pine', 'Spicy/Herbal', 'Coffee'],
      rating: [3.5],
      reviews_count: [123],
      brand: ['Fake Brand'],
      price: [12],
      price_label: ['per 1/2 oz'],
      image: ['#'],
      sponsored: [false],
      langcode: ['en'],
      name: ['Fake Product'],
      status: [true],
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
      id: 86898,
      category: ['Dummy'],
      created: [1556767],
      manufacture: ['Dummy'],

      description: [
        'rem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      delivery_and_pickup_info: [''],
      top_rated_effects: ['Relaxed', 'Happy', 'Sleepy'],
      top_reported_flavors: ['Pine', 'Spicy/Herbal', 'Coffee'],
      rating: [3.5],
      brand: ['Fake Brand'],
      reviews_count: [123],
      price: [12],
      price_label: ['per 1/2 oz'],
      image: ['#'],
      sponsored: [false],
      langcode: ['en'],
      name: ['Fake Product'],
      status: [true],
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
      id: 86898,
      category: ['Dummy'],
      manufacture: ['Dummy'],
      created: [1556767],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      delivery_and_pickup_info: [''],
      top_rated_effects: ['Relaxed', 'Happy', 'Sleepy'],
      top_reported_flavors: ['Pine', 'Spicy/Herbal', 'Coffee'],
      rating: [3.5],
      brand: ['Fake Brand'],
      reviews_count: [123],
      price: [12],
      price_label: ['per 1/2 oz'],
      image: ['#'],
      sponsored: [false],
      langcode: ['en'],
      name: ['Fake Product'],
      status: [true],
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
      id: 6029,
      address_line1: ['3518 Conowingo Rd'],
      address_line2: [''],
      country_code: ['US'],
      amenities: ['1'],
      license_type: ['Medical'],
      featured: [false],
      created_: [456788],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      delivery_and_pickup_info: [''],
      phone_number: ['(123) 456 789'],
      postal_code: ['12345'],
      email: ['Fake@place.com'],
      coordinates: ['POINT(-76.270470 39.635418)'],
      rating: [4.5],
      reviews_count: [123],
      image: ['#'],
      sponsored: [false],
      lat: [39.635418],
      lon: [-76.27047],
      time_zone: ['est'],
      langcode: ['en'],
      name: ['Fake Dispensary'],
      status: [true],
      _language: 'en',
      _type: 'doc',
      facebook: ['https://www.facebook.com/Fake-Dispensary-6029'],
      instagram: ['https://www.instagram.com/fake_dispensary'],
      twitter: ['https://twitter.com/fake_dispensary'],
      monday_hours: ['9:00 AM - 9:00 PM'],
      tuesday_hours: ['9:00 AM - 9:00 PM'],
      wednesday_hours: ['9:00 AM - 9:00 PM'],
      thursday_hours: ['9:00 AM - 9:00 PM'],
      friday_hours: ['9:00 AM - 9:00 PM'],
      saturday_hours: ['9:00 AM - 9:00 PM'],
      sunday_hours: ['9:00 AM - 9:00 PM'],
      locality: ['Key West'],
      administrative_area: ['FL'],
      website: ['https://www.google.com'],
    },
  },
  {
    _id: 'entity:dispensary_entity/6029:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 7.0,
    _source: {
      id: 6029,
      address_line1: ['3518 Conowingo Rd'],
      address_line2: [''],
      country_code: ['US'],
      time_zone: ['est'],
      amenities: ['1'],
      license_type: ['Medical'],
      featured: [false],

      created_: [456788],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      delivery_and_pickup_info: [''],
      phone_number: ['(123) 456 789'],
      postal_code: ['12345'],
      email: ['Fake@place.com'],
      coordinates: ['POINT(-76.270470 39.635418)'],
      rating: [4.5],
      reviews_count: [123],
      image: ['#'],

      sponsored: [false],
      lat: [39.635418],
      lon: [-76.27047],
      langcode: ['en'],
      name: ['Fake Dispensary'],
      status: [true],
      _language: 'en',
      _type: 'doc',
      facebook: ['https://www.facebook.com/Fake-Dispensary-6029'],
      instagram: ['https://www.instagram.com/fake_dispensary'],
      twitter: ['https://twitter.com/fake_dispensary'],
      monday_hours: ['9:00 AM - 9:00 PM'],
      tuesday_hours: ['9:00 AM - 9:00 PM'],
      wednesday_hours: ['9:00 AM - 9:00 PM'],
      thursday_hours: ['9:00 AM - 9:00 PM'],
      friday_hours: ['9:00 AM - 9:00 PM'],
      saturday_hours: ['9:00 AM - 9:00 PM'],
      sunday_hours: ['9:00 AM - 9:00 PM'],
      locality: ['Key West'],
      administrative_area: ['FL'],
      website: ['https://www.google.com'],
    },
  },
  {
    _id: 'entity:dispensary_entity/6029:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 7.0,
    _source: {
      id: 6029,
      address_line1: ['3518 Conowingo Rd'],
      address_line2: [''],
      country_code: ['US'],
      amenities: ['1'],
      license_type: ['Medical'],
      featured: [false],

      time_zone: ['est'],

      created_: [456788],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      delivery_and_pickup_info: [''],
      phone_number: ['(123) 456 789'],
      postal_code: ['12345'],
      email: ['Fake@place.com'],
      coordinates: ['POINT(-76.270470 39.635418)'],
      rating: [4.5],
      reviews_count: [123],
      image: ['#'],

      sponsored: [false],
      lat: [39.635418],
      lon: [-76.27047],
      langcode: ['en'],
      name: ['Fake Dispensary'],
      status: [true],
      _language: 'en',
      _type: 'doc',
      facebook: ['https://www.facebook.com/Fake-Dispensary-6029'],
      instagram: ['https://www.instagram.com/fake_dispensary'],
      twitter: ['https://twitter.com/fake_dispensary'],
      monday_hours: ['9:00 AM - 9:00 PM'],
      tuesday_hours: ['9:00 AM - 9:00 PM'],
      wednesday_hours: ['9:00 AM - 9:00 PM'],
      thursday_hours: ['9:00 AM - 9:00 PM'],
      friday_hours: ['9:00 AM - 9:00 PM'],
      saturday_hours: ['9:00 AM - 9:00 PM'],
      sunday_hours: ['9:00 AM - 9:00 PM'],
      locality: ['Key West'],
      administrative_area: ['FL'],
      website: ['https://www.google.com'],
    },
  },
  {
    _id: 'entity:dispensary_entity/6029:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 7.0,
    _source: {
      id: 6029,
      address_line1: ['3518 Conowingo Rd'],
      address_line2: [''],
      country_code: ['US'],
      time_zone: ['est'],
      amenities: ['1'],
      license_type: ['Medical'],
      featured: [false],

      created_: [456788],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      delivery_and_pickup_info: [''],
      phone_number: ['(123) 456 789'],
      postal_code: ['12345'],
      email: ['Fake@place.com'],
      coordinates: ['POINT(-76.270470 39.635418)'],
      rating: [4.5],
      reviews_count: [123],
      image: ['#'],

      sponsored: [false],
      lat: [39.635418],
      lon: [-76.27047],
      langcode: ['en'],
      name: ['Fake Dispensary'],
      status: [true],
      _language: 'en',
      _type: 'doc',
      facebook: ['https://www.facebook.com/Fake-Dispensary-6029'],
      instagram: ['https://www.instagram.com/fake_dispensary'],
      twitter: ['https://twitter.com/fake_dispensary'],
      monday_hours: ['9:00 AM - 9:00 PM'],
      tuesday_hours: ['9:00 AM - 9:00 PM'],
      wednesday_hours: ['9:00 AM - 9:00 PM'],
      thursday_hours: ['9:00 AM - 9:00 PM'],
      friday_hours: ['9:00 AM - 9:00 PM'],
      saturday_hours: ['9:00 AM - 9:00 PM'],
      sunday_hours: ['9:00 AM - 9:00 PM'],
      locality: ['Key West'],
      administrative_area: ['FL'],
      website: ['https://www.google.com'],
    },
  },
  {
    _id: 'entity:dispensary_entity/6029:en',
    _index: 'elasticsearch_index_pantheon_index01',
    _score: 7.0,
    _source: {
      id: 6029,
      address_line1: ['3518 Conowingo Rd'],
      address_line2: [''],
      country_code: ['US'],
      time_zone: ['est'],
      amenities: ['1'],
      created_: [456788],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      license_type: ['Medical'],
      featured: [false],
      delivery_and_pickup_info: [''],
      phone_number: ['(123) 456 789'],
      postal_code: ['12345'],
      email: ['Fake@place.com'],
      coordinates: ['POINT(-76.270470 39.635418)'],
      rating: [4.5],
      reviews_count: [123],
      image: ['#'],

      sponsored: [false],
      lat: [39.635418],
      lon: [-76.27047],
      langcode: ['en'],
      name: ['Fake Dispensary'],
      status: [true],
      _language: 'en',
      _type: 'doc',
      facebook: ['https://www.facebook.com/Fake-Dispensary-6029'],
      instagram: ['https://www.instagram.com/fake_dispensary'],
      twitter: ['https://twitter.com/fake_dispensary'],
      monday_hours: ['9:00 AM - 9:00 PM'],
      tuesday_hours: ['9:00 AM - 9:00 PM'],
      wednesday_hours: ['9:00 AM - 9:00 PM'],
      thursday_hours: ['9:00 AM - 9:00 PM'],
      friday_hours: ['9:00 AM - 9:00 PM'],

      saturday_hours: ['9:00 AM - 9:00 PM'],
      sunday_hours: ['9:00 AM - 9:00 PM'],
      locality: ['Key West'],
      administrative_area: ['FL'],
      website: ['https://www.google.com'],
    },
  },
];

export const strain: Strain = {
  _id: 'entity:strain_entity/1430:en',
  _index: 'elasticsearch_index_pantheon_index01',
  _score: 4.4,
  _source: {
    id: 1430,
    created: [1635912414],
    image: ['123'],
    rating: [3.5],
    review_count: [123],
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
    ],
    featured: [false],
    top_rated_effects: ['Aroused', 'Sleepy', 'Creative'],
    top_reported_flavors: ['Woody', 'Nutty', 'Skunk'],
    url: ['#'],

    langcode: ['en'],
    name: ['Fake Strain'],
    status: [true],
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
      id: 1430,
      created: [1635912414],
      image: ['123'],
      rating: [3.5],
      featured: [false],
      url: ['#'],

      review_count: [123],

      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      top_rated_effects: ['Aroused', 'Sleepy', 'Creative'],
      top_reported_flavors: ['Woody', 'Nutty', 'Skunk'],

      langcode: ['en'],
      name: ['Fake Strain'],
      status: [true],
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
      id: 1430,
      created: [1635912414],
      featured: [false],
      url: ['#'],

      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      image: ['123'],
      rating: [3.5],
      review_count: [123],

      top_rated_effects: ['Aroused', 'Sleepy', 'Creative'],
      top_reported_flavors: ['Woody', 'Nutty', 'Skunk'],

      langcode: ['en'],

      name: ['Fake Strain'],
      status: [true],
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
      id: 1430,
      created: [1635912414],
      featured: [false],
      url: ['#'],

      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      image: ['123'],
      rating: [3.5],
      review_count: [123],

      top_rated_effects: ['Aroused', 'Sleepy', 'Creative'],
      top_reported_flavors: ['Woody', 'Nutty', 'Skunk'],

      langcode: ['en'],
      name: ['Fake Strain'],
      status: [true],
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
      id: 1430,
      created: [1635912414],
      featured: [false],
      url: ['#'],
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis et eros et scelerisque. Maecenas vitae augue quis tortor luctus fermentum eget non quam.',
      ],
      image: ['123'],
      rating: [3.5],
      review_count: [123],

      top_rated_effects: ['Aroused', 'Sleepy', 'Creative'],
      top_reported_flavors: ['Woody', 'Nutty', 'Skunk'],

      langcode: ['en'],
      name: ['Fake Strain'],
      status: [true],
      uuid: ['9becd266-99e6-4b83-b4c7-3c2ae1886a24'],
      _language: 'en',
      type: '_doc',
    },
  },
];

export const coupons: Array<any> = [
  {
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
      "I ordered three items, when I went to pick up 2 weren't available. The person behind the counter was very nice and helped with a replacement. It was all good.",
    time: '12:00pm',
    date: '1/01/2022',
  },
  {
    recommended: true,
    by: 'Jane Doe',
    caption: 'Great place',
    review: 'Loving coming here always got good deals',
    time: '12:00pm',
    date: '1/01/2022',
  },
  {
    recommended: false,
    by: 'Jack Doe',
    caption: 'Great place',
    review:
      "Need Customer service training BAD. No knowledge I've been smoking longer than these kids budtending. It's a money grab now. No. Patient friendly",
    time: '12:00pm',
    date: '1/01/2022',
  },
];
