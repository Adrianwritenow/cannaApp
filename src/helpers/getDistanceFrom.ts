import { getDistance, getPreciseDistance } from 'geolib';

function getMiles(i: number) {
  return i * 0.000621371;
}

function getDistanceFrom(
  userCoords: { lat: number; lon: number },
  listingCoords: { lat: number[]; lon: number[] }
) {
  const distance = getDistance(
    {
      latitude: userCoords?.lat,
      longitude: userCoords?.lon,
    },
    {
      latitude: listingCoords?.lat[0],
      longitude: listingCoords?.lon[0],
    }
  );
  return `${getMiles(distance).toFixed(1)} mi`;
}

export default getDistanceFrom;
