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
}

export const destinations: Destination[] = [
  {
    label: 'Los Angeles',
    imgSrc: La,
  },
  {
    label: 'Denver',
    imgSrc: Denver,
  },
  {
    label: 'Vancouver',
    imgSrc: Vancouver,
  },
  {
    label: 'Amsetdam',
    imgSrc: Amsterdamn,
  },
  {
    label: 'Barcelona',
    imgSrc: Barcelona,
  },
  {
    label: 'Chicago',
    imgSrc: Chicago,
  },

  {
    label: 'Ibiza',
    imgSrc: Ibiza,
  },
  {
    label: 'Kingston',
    imgSrc: Kingston,
  },

  {
    label: 'Montevideo',
    imgSrc: Montevideo,
  },
  {
    label: 'Nimbin',
    imgSrc: Nimbin,
  },

  {
    label: 'Portland',
    imgSrc: Portland,
  },
  {
    label: 'San Francisco',
    imgSrc: SanFran,
  },
  {
    label: 'Seattle',
    imgSrc: Seattle,
  },
  {
    label: 'Toronto',
    imgSrc: Toronto,
  },

  {
    label: 'Vegas',
    imgSrc: Vegas,
  },
];
