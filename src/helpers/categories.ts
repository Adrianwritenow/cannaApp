import Care from '@/public/assets/images/png/categories/category_care.png';
import Concentrate from '@/public/assets/images/png/categories/category_concentrate.png';
import Edibles from '@/public/assets/images/png/categories/category_edible.png';
import Flower from '@/public/assets/images/png/categories/category_flower.png';
import Grinders from '@/public/assets/images/png/categories/category_grinder.png';
import Papers from '@/public/assets/images/png/categories/category_papers.png';
import Pipes from '@/public/assets/images/png/categories/category_pipes.png';
import Rigs from '@/public/assets/images/png/categories/category_rigs.png';
import Vapes from '@/public/assets/images/png/categories/category_vape.png';

interface Category {
  label: string;
  imgSrc: StaticImageData;
}

export const categories: Category[] = [
  { label: 'Flower', imgSrc: Flower },
  { label: 'Edibles', imgSrc: Edibles },
  { label: 'Pipes', imgSrc: Pipes },
  { label: 'Vape Pens', imgSrc: Vapes },
  { label: 'Concentrates', imgSrc: Concentrate },
  { label: 'Bongs', imgSrc: Rigs },
  { label: 'Topicals', imgSrc: Care },
  { label: 'Rolling Papers', imgSrc: Papers },
  { label: 'Grinders', imgSrc: Grinders },
];
