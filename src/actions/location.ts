const axios = require('axios');
const IPSTACK_ACCESS_KEY = process.env.IPSTACK_ACCESS_KEY;
const IPSTACK_API_URL = process.env.IPSTACK_API_URL;

import { LocationData } from '../interfaces/locationData';

export const LOCATION_SET = 'location/set';

export const setLocation = (data: LocationData) => ({
  type: LOCATION_SET,
  data,
});

export async function getLocationByIP() {
  try {
    const response = await axios(
      `${IPSTACK_API_URL}/check?access_key=${IPSTACK_ACCESS_KEY}`
    );

    return {
      city: response.data.city,
      state: response.data.region_code,
      lat: response.data.latitude,
      lon: response.data.longitude,
      preciseLocationSet: false,
    };
  } catch (error: any) {
    return error.response;
  }
}

export async function getCurrentLocation() {
  try {
    const location = await getLocation();
    return {
      city: '',
      state: '',
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      preciseLocationSet: false,
    };
  } catch (error: any) {
    return {
      response: 'There was an error getting your location.',
    };
  }
}

function getLocation(options?: PositionOptions): Promise<any> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}
