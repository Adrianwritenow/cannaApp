import { getDistance } from 'geolib';

function getMiles(i: number) {
  return i * 0.000621371192;
}

function getDistanceFrom(
    
  userCoords: { lat: number; lon: number },
  listingCoords: { lat: number[]; lon: number[] }
) {
  const distance = getDistance(
    {
      latitude: listingCoords?.lat[0],
      longitude: listingCoords?.lon[0],
    },
    {
      latitude: userCoords?.lat,
      longitude: userCoords?.lon,
    }
  );
  return `${getMiles(distance).toFixed(1)} mi`;
}

export default getDistanceFrom;
