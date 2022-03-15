import { useMemo } from 'react';
import { useRouter } from 'next/router';

export function useSearchFilters() {
  const router = useRouter();
  const { query } = router;

  return useMemo(() => {
    // Build querystring to preserve in url.
    return Object.keys(query).reduce(
      (prev: string, current: string, index: number) => {
        const prefix = current.substring(0, 2);
        // Only aggregate values starting with our 'qs' prefix.
        if ('qs' !== prefix) {
          return prev;
        }
        const separator = !prev ? '?' : '&';
        return `${prev}${separator}${current}=${query[current]}`;
      },
      ''
    );
  }, [query]);
}
