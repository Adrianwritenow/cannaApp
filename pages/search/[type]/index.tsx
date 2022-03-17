import { MapContainer } from '@/components/map/MapContainer';
import SearchAll from '@/views/search/SearchAll';
import SearchDeals from '@/views/search/SearchDeals';
import SearchDispensary from '@/views/search/SearchDispensary';
import SearchMenu from '@/components/menus/SearchMenu';
import SearchNews from '@/views/search/SearchNews';
import SearchShopping from '@/views/search/SearchShopping';
import SearchStrain from '@/views/search/SearchStrain';
import { useRouter } from 'next/router';

export default function SearchType() {
  const router = useRouter();
  const { type } = router.query;

  let bgClass = 'bg-white';
  let wrapperClass =
    'overflow-visible overflow-scroll border-b border-gray-200 bg-white';
  let showMenu = true;

  if (type === 'map') {
    bgClass = 'bg-white';
    wrapperClass = '';
    showMenu = false;
  }

  let component;
  switch (type) {
    case 'shopping':
      component = <SearchShopping />;
      break;

    case 'dispensaries':
      component = <SearchDispensary />;
      break;

    case 'strains':
      component = <SearchStrain />;
      break;

    case 'map':
      component = <MapContainer />;
      break;

    case 'news':
      component = <SearchNews />;
      break;

    case 'deals':
      component = <SearchDeals />;
      break;

    default:
      component = <SearchAll />;
      break;
  }

  return (
    <div className={bgClass}>
      <div className={wrapperClass}>
        {showMenu && <SearchMenu />}
        {component}
      </div>
    </div>
  );
}
