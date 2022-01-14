import Amsterdamn from '@/public/assets/images/png/destinations/amsterdam.png';
import Barcelona from '@/public/assets/images/png/destinations/barcelona.png';
import Chicago from '@/public/assets/images/png/destinations/chicago.png';
import Denver from '@/public/assets/images/png/destinations/denver.png';
import Ibiza from '@/public/assets/images/png/destinations/ibiza.png';
import Kingston from '@/public/assets/images/png/destinations/kingston.png';
import La from '@/public/assets/images/png/destinations/la.png';
import Montevideo from '@/public/assets/images/png/destinations/montevideo.png';
import Nimbin from '@/public/assets/images/png/destinations/nimbin.png';
import Portland from '@/public/assets/images/png/destinations/portland.png';
import SanFran from '@/public/assets/images/png/destinations/sanfran.png';
import Seattle from '@/public/assets/images/png/destinations/seattle.png';
import Toronto from '@/public/assets/images/png/destinations/toronto.png';
import Vancouver from '@/public/assets/images/png/destinations/vancouver.png';
import Vegas from '@/public/assets/images/png/destinations/vegas.png';

interface Destination {
  label: string;
  imgSrc: StaticImageData;
  coords: {
    lat: number;
    lon: number;
  };
}

export const destinations: Destination[] = [
  {
    label: 'Los Angeles',
    imgSrc: La,
    coords: {
      lat: 34.05223,
      lon: -118.24368,
    },
  },
  {
    label: 'Denver',
    imgSrc: Denver,
    coords: {
      lat: 39.7392,
      lon: -104.9903,
    },
  },
  {
    label: 'Vancouver',
    imgSrc: Vancouver,
    coords: {
      lat: 49.2827,
      lon: -123.1207,
    },
  },
  {
    label: 'Amsterdam',
    imgSrc: Amsterdamn,
    coords: {
      lat: 52.377956,
      lon: 4.89707,
    },
  },
  {
    label: 'Barcelona',
    imgSrc: Barcelona,
    coords: {
      lat: 41.390205,
      lon: 2.154007,
    },
  },
  {
    label: 'Chicago',
    imgSrc: Chicago,
    coords: {
      lat: 41.881832,
      lon: -87.623177,
    },
  },

  {
    label: 'Ibiza',
    imgSrc: Ibiza,
    coords: {
      lat: 38.906986,
      lon: 1.421416,
    },
  },

  {
    label: 'Montevideo',
    imgSrc: Montevideo,
    coords: {
      lat: -34.901112,
      lon: -56.164532,
    },
  },

  {
    label: 'Portland',
    imgSrc: Portland,
    coords: {
      lat: 45.523064,
      lon: -122.676483,
    },
  },
  {
    label: 'San Francisco',
    imgSrc: SanFran,
    coords: {
      lat: 37.773972,
      lon: -122.431297,
    },
  },
  {
    label: 'Seattle',
    imgSrc: Seattle,
    coords: {
      lat: 47.608013,
      lon: -122.335167,
    },
  },
  {
    label: 'Toronto',
    imgSrc: Toronto,
    coords: {
      lat: 43.65107,
      lon: -79.347015,
    },
  },

  {
    label: 'Vegas',
    imgSrc: Vegas,
    coords: {
      lat: 36.114647,
      lon: -115.172813,
    },
  },
];
