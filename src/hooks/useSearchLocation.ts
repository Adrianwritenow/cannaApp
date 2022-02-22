import { useMemo } from 'react';
import { RootState } from '@/reducers';
import { useSelector } from 'react-redux';

export function useSearchLocation() {
  const location = useSelector((root: RootState) => root.location);
  const { searchLocation } = useSelector((root: RootState) => root.search);

  return useMemo(() => {
    if (searchLocation?.label) {
      return [searchLocation.label, searchLocation.coords];
    }

    return [location.city, { lat: location.lat, lon: location.lon }];
  }, [location, searchLocation]);
}
