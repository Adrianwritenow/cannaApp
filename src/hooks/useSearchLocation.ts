import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { RootState } from '@/reducers';
import { useSelector } from 'react-redux';
import { useQueryParams, StringParam } from 'next-query-params';

export function useSearchLocation() {
  const router = useRouter();
  const { isReady } = router;
  const location = useSelector((root: RootState) => root.location);
  const { searchLocation } = useSelector((root: RootState) => root.search);
  const [query] = useQueryParams({
    qsCoords: StringParam,
    qsLocation: StringParam,
  });
  const { qsCoords, qsLocation } = query;

  return useMemo(() => {
    if (!isReady) {
      return {
        label: '',
        coords: { lat: 0, lon: 0 },
      };
    }

    // Use coords/location from query params first.
    if (qsCoords && qsLocation) {
      const [lat, lon] = qsCoords.split(',');

      if (lat && lon) {
        return {
          label: qsLocation,
          coords: { lat, lon },
        };
      }
    }

    if (searchLocation?.label) {
      return { label: searchLocation.label, coords: searchLocation.coords };
    }

    return {
      label: location.city,
      coords: { lat: location.lat, lon: location.lon },
    };
  }, [location, searchLocation, qsCoords, qsLocation, isReady]);
}
