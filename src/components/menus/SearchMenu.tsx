import { useSearchFilters } from '@/hooks/useSearchFilters';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SearchMenu() {
  const locationSearch = useSearchFilters();
  const router = useRouter();
  const { query, asPath } = router;
  const baseClass =
    'whitespace-nowrap pb-4 px-5 border-b-2 font-medium text-sm w-auto focus:outline-none';
  const inactiveClass =
    baseClass +
    ' border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  const activeClass = baseClass + ' border-green text-green';

  const links = [
    { title: 'All', path: '/search/all' + locationSearch },
    { title: 'Shopping', path: '/search/shopping' + locationSearch },
    { title: 'Dispensaries', path: '/search/dispensaries' + locationSearch },
    { title: 'Strains', path: '/search/strains' + locationSearch },
    { title: 'Map', path: '/search/map' + locationSearch },
    { title: 'News', path: '/search/news' + locationSearch },
    { title: 'Deals', path: '/search/deals' + locationSearch },
  ];

  return (
    <div className="w-full overflow-visible overflow-x-scroll flex max-w-7xl mx-auto">
      {links.map((link, index) => (
        <Link key={`search-link-${index}`} href={link.path} passHref>
          <a className={asPath === link.path ? activeClass : inactiveClass}>
            {link.title}
          </a>
        </Link>
      ))}
    </div>
  );
}
