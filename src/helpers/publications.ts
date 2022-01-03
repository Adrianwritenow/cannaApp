import Publication_1 from '@/public/assets/images/png/newsletter/PHX-Jan-Feb-2021.png';
import Publication_2 from '@/public/assets/images/png/newsletter/COS-Nov-Dec-2020.png';
import Publication_3 from '@/public/assets/images/png/newsletter/COS-May-Jun-2020.png';
import Publication_4 from '@/public/assets/images/png/newsletter/PHX-May-Jun-2020.png';
import Publication_5 from '@/public/assets/images/png/newsletter/COS-Jul-Aug-2020.png';
import Publication_6 from '@/public/assets/images/png/newsletter/DEN-Sep-Oct-2020.png';

interface Publication {
  label: string;
  imgSrc: StaticImageData;
}

export const publications: Publication[] = [
  { label: 'PHX-Jan-Feb-2021', imgSrc: Publication_1 },
  { label: 'COS-Nov-Dec-2020', imgSrc: Publication_2 },
  { label: 'COS-May-Jun-2020', imgSrc: Publication_3 },
  { label: 'PHX-May-Jun-2020', imgSrc: Publication_4 },
  { label: 'COS-Jul-Aug-2020', imgSrc: Publication_5 },
  { label: 'DEN-Sep-Oct-2020', imgSrc: Publication_6 },
];
