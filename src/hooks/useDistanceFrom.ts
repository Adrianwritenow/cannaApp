import { useSearchLocation } from '@/hooks/useSearchLocation';
import { Coordinates } from '@/interfaces/locationData';
import getDistanceFrom from '@/helpers/getDistanceFrom';
import { useEffect, useState } from 'react';

export function useDistanceFrom(end: Coordinates | undefined) {
  const [distanceFrom, setDistanceFrom] = useState('');
  const { coords } = useSearchLocation();

  useEffect(() => {
    if (end && coords?.lat && coords?.lon) {
      const distance = getDistanceFrom(coords, end);
      setDistanceFrom(distance);
    }
  }, [end, coords]);

  return distanceFrom;
}
