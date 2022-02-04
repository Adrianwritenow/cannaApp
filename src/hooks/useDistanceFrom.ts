import { Coordinates } from '@/interfaces/locationData';
import getDistanceFrom from '@/helpers/getDistanceFrom';
import { RootState } from '@/reducers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function useDistanceFrom(end: Coordinates | undefined) {
  const [distanceFrom, setDistanceFrom] = useState('');
  const userCoords = useSelector((root: RootState) => root.location);

  useEffect(() => {
    if (end && userCoords?.lat && userCoords?.lon) {
      const distance = getDistanceFrom(userCoords, end);
      setDistanceFrom(distance);
    }
  }, [end, userCoords]);

  return distanceFrom;
}
