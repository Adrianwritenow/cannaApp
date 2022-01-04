const axios = require("axios");
const IPSTACK_ACCESS_KEY = process.env.IPSTACK_ACCESS_KEY;

import { LocationData } from '../interfaces/locationData';

export const LOCATION_BY_IP_GET = 'location/get_by_ip';
export const LOCATION_API_GET = 'location/get_by_api';

export const getLocationByIP = (data: LocationData) => ({
  type: LOCATION_BY_IP_GET,
  data,
});

export const getLocationByAPI = (data: LocationData) => ({
  type: LOCATION_API_GET,
  data,
});

export async function lookupLocationByIP () {
  try {
    const response = await axios(`http://api.ipstack.com/check?access_key=${IPSTACK_ACCESS_KEY}`);
    return {
      city: response.data.city,
      state: response.data.region_code,
      lat: response.data.latitude,
      lng: response.data.longitude,
    };
  } catch (error: any) {
    return error.response;
  }
}

export async function getCurrentLocation () {
  try {
    const location = await getLocation();
    return {
      city: '',
      state: '',
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
  } catch(error: any) {
    return {
      response: 'There was an error getting your location.',
    }
  }
}

function getLocation (options?: PositionOptions): Promise<any> {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
}