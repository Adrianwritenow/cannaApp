import { getLocationByIP, setLocation } from '@/actions/location';
import { Feature } from '@/interfaces/feature';
import { FeatureCollection } from 'geojson';
import { LocationData } from '@/interfaces/locationData';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import { receiveResults } from '@/actions/search';
import { RootState } from '@/reducers';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryParams, StringParam } from 'next-query-params';
import { useRouter } from 'next/router';
import { useSearchLocation } from './useSearchLocation';
import { useSearchFilters } from './useSearchFilters';

export function useGeocoder(geocoderRef: any, open: boolean = false) {
  const router = useRouter();
  const { type: searchType } = router.query;

  const dispatch = useDispatch();
  const [query, setQuery] = useQueryParams({
    qsCoords: StringParam,
    qsLocation: StringParam,
  });
  const [geocodeInitialized, setGeocodeInitialized] = useState(false);
  const [geolocationSet, setGeolocationSet] = useState(false);
  const initialLocationCleared = useRef(false);
  const { label } = useSearchLocation();
  const location = useSelector((root: RootState) => root.location);
  const [locationOptions, setLocationOptions] = useState<Feature[]>();
  const locationSearch = useSearchFilters();

  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN as string;
  let geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: 'place',
  });

  geocoder.on('results', function (results: FeatureCollection) {
    setLocationOptions(results.features as unknown as Feature[]);
  });

  async function handleLocationRequest() {
    if (!location.preciseLocationSet) {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            setGeolocationSet(true);
            if (searchType !== 'map') {
              router.push('/search/all' + locationSearch);
            }
            dispatch(
              setLocation({
                city: location.city,
                state: location.state,
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                preciseLocationSet: true,
              })
            );
            dispatch(
              receiveResults({
                searchLocation: {
                  coords: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                  },
                  label: location.city,
                },
              })
            );

            setQuery({
              qsCoords: `${position.coords.latitude},${position.coords.longitude}`,
            });

            if (geolocationSet && geocoderRef.current) {
              geocoderRef.current.children[0].children[1].value =
                'Your Location';
            }
          },
          err => console.log(err)
        );
      }
    } else {
      dispatch(
        receiveResults({
          searchLocation: {
            coords: {
              lat: location.lat,
              lon: location.lon,
            },
            label: location.city,
          },
        })
      );
      setQuery({
        qsLocation: location.city,
        qsCoords: `${location.lat},${location.lon}`,
      });
      if (searchType !== 'map') {
        router.push('/search/all' + locationSearch);
      }
    }

    setGeolocationSet(true);
  }

  function handleDispatchLocation(location: Feature) {
    if (geocoderRef.current.children[0].children[1]) {
      geocoderRef.current.children[0].children[1].placeholder = 'Location...';
      geocoderRef.current.children[0].children[1].value = location.place_name;
    }
    const geoCoords = location.geometry.coordinates;
    dispatch(
      receiveResults({
        searchLocation: {
          coords: {
            lon: geoCoords[0],
            lat: geoCoords[1],
          },
          label: location.place_name,
        },
      })
    );
    setQuery({
      qsLocation: location.place_name,
      qsCoords: `${geoCoords[1]},${geoCoords[0]}`,
    });
    setGeolocationSet(false);
  }

  function handleClearLocation() {
    if (geocoderRef.current.children[0].children[1]) {
      geocoderRef.current.children[0].children[1].placeholder = 'Location...';
      geocoderRef.current.children[0].children[1].value = '';
    }
    initialLocationCleared.current = true;
    dispatch(
      receiveResults({
        searchLocation: {
          coords: {
            lat: null,
            lon: null,
          },
          label: null,
        },
      })
    );
    setQuery({ qsLocation: undefined, qsCoords: undefined });
    setGeolocationSet(false);
  }

  useEffect(() => {
    // Wait for transition to complete so ref exists
    setTimeout(() => {
      if (geocoderRef.current !== null && !geocodeInitialized && open) {
        geocoder.addTo(geocoderRef.current);
        // Set input and query to label value
        geocoder.setInput(label);
        geocoder.query(label);

        setGeocodeInitialized(true);
        if (geocoderRef.current.children[0].children[1]) {
          geocoderRef.current.children[0].children[1].placeholder =
            'Location...';
          geocoderRef.current.children[0].children[1].value =
            initialLocationCleared && label ? label : '';
        }
      }
      if (geolocationSet && geocoderRef.current) {
        // If geolocater is set use your location value
        geocoderRef.current.children[0].children[1].value = 'Your Location';
      }
    }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    geocoderRef.current,
    geocodeInitialized,
    open,
    geolocationSet,
    locationOptions,
  ]);

  // prevent geocoder from rendering multiple times
  useEffect(() => {
    setGeocodeInitialized(false);
  }, [open]);

  // Get initial location data based on Client IP
  useEffect(() => {
    async function getLocation() {
      const data: LocationData = await getLocationByIP();
      dispatch(setLocation(data));
    }

    if (!Object.keys(location).length && !location.fLo) {
      getLocation();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    geolocationSet,
    handleClearLocation,
    handleLocationRequest,
    handleDispatchLocation,
    locationOptions,
  };
}
