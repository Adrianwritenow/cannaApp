import {
  ArrowLeftIcon,
  ChevronDoubleRightIcon,
  LocationMarkerIcon,
  SearchIcon,
  XIcon,
} from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { getLocationByIP, setLocation } from '@/actions/location';
import { receiveResults, searchMulti } from '@/actions/search';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { LocationData } from '@/interfaces/locationData';
import LogoText from '@/public/assets/logos/logo-text.png';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { RootState } from '@/reducers';
import { SearchBar } from './SearchBar';
import SearchDealCard from '@/components/search/SearchDealCard';
import SearchDispensaryCard from '@/components/search/SearchDispensaryCard';
import SearchProductCard from '@/components/search/SearchProductCard';
import SearchStrainCard from '@/components/search/SearchStrainCard';
import Target from '@/public/assets/icons/iconComponents/Target';
import mapboxgl from 'mapbox-gl';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'next/router';
import { useSearchLocation } from '@/hooks/useSearchLocation';
import { FeatureCollection } from 'geojson';
import { Feature } from '@/interfaces/feature';
import SearchLocationCard from '@/components/search/SearchLocationCard';

export default function SearchSlideOver(props: {
  searchRoute?: string;
  root?: boolean;
}) {
  const { root } = props;
  const [dispatchSearch] = useAxios(false);
  const [open, setOpen] = useState(false);
  const location = useSelector((root: RootState) => root.location);
  const [geolocationSet, setGeolocationSet] = useState(false);
  const [geocodeInitialized, setGeocodeInitialized] = useState(false);
  const initialLocationCleared = useRef(false);
  const [focus, setFocus] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { listResults, query } = useSelector((root: RootState) => root.search);
  const { label, coords } = useSearchLocation();
  const geocoderRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [locationOptions, setLocationOptions] = useState<Feature[]>();

  const initialValues = {
    search: query,
  };

  // Flatten search lists.
  let results: any = [];
  Object.values(listResults).forEach(resultsByList => {
    results = results.concat(resultsByList);
  });

  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN as string;
  let geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: 'place',
  });

  function handleSubmit(search: any) {
    if (router.pathname !== '/search' && router.pathname !== '/map') {
      router.push('/search');
    }
    setOpen(false);
  }

  geocoder.on('results', function (results: FeatureCollection) {
    setLocationOptions(results.features as unknown as Feature[]);
  });

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

  useEffect(() => {}, [focus, open, locationOptions]);

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

  async function handleLocationRequest() {
    if (!location.preciseLocationSet) {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            setGeolocationSet(true);
            router.pathname === '/map' ? router.push('/map') : '';
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
      router.pathname === '/map' ? router.push('/map') : '';
    }

    setGeolocationSet(true);
  }

  // adds short delay to prevent search from firing until the user has stopped typing
  let timeout: ReturnType<typeof setTimeout>;
  function handleSearch(e: any) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (e.target.name === 'search') {
        executeSearchQuery(e.target.value);
      }
    }, 500);
  }

  function executeSearchQuery(q: string, resultProps: any = {}) {
    let coords = location.city ? location : undefined;

    // Use new location coords if available.
    if (resultProps?.searchLocation?.coords) {
      coords = resultProps.searchLocation.coords;
    }

    dispatchSearch(
      searchMulti({
        q,
        coords,
        endpoints: [
          { name: 'products' },
          { name: 'coupons', geolocate: true },
          { name: 'dispenaries', geolocate: true },
          { name: 'strains' },
          { name: 'blogs' },
        ],
        total: 10,
      })
    );

    dispatch(
      receiveResults({
        search: q,
        ...resultProps,
      })
    );
  }

  function handleFocus() {
    // Wait for transition to finish then focus on input
    setTimeout(() => {
      const node = inputRef.current;
      if (node) {
        node.focus();
      }
    }, 500);
  }

  function handleDispatchLocation(location: Feature) {
    if (geocoderRef.current.children[0].children[1]) {
      geocoderRef.current.children[0].children[1].placeholder = 'Location...';
      geocoderRef.current.children[0].children[1].value = location.place_name;
    }
    dispatch(
      receiveResults({
        searchLocation: {
          coords: {
            lon: location.geometry.coordinates[0],
            lat: location.geometry.coordinates[1],
          },
          label: location.place_name,
        },
      })
    );
    setGeolocationSet(false);
  }

  function handleClearSearchTerm() {
    dispatch(receiveResults({ data: [], search: '' }));
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
    setGeolocationSet(false);
  }

  return (
    <div className="print:hidden">
      <div className="w-full relative pb-4">
        <div className="flex flex-row border-solid border border-gray-400 text-gray-500 rounded-md focus:outline-none focus:ring-0 shadow-sm items-center justify-center">
          {router.pathname === '/map' ? (
            <button
              onClick={() => {
                router.back;
              }}
            >
              <ArrowLeftIcon className="w-5 h-5 ml-3" />
            </button>
          ) : !root ? (
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              <SearchIcon className="w-5 h-5 ml-3" />
            </button>
          ) : null}
          <button
            type="button"
            placeholder="search"
            className="w-full items-center rounded-md flex py-2 text-gray-500 bg-white"
            onClick={() => {
              setOpen(true);
              handleFocus();
            }}
          >
            {root ? (
              <div className="flex items-center">
                <SearchIcon className=" w-5 h-5 text-green-500 ml-3" />
                <div className="w-full pl-2 shrink-0">
                  <span className="font-bold">Find</span> dispensaries, strains,
                  flower ...
                </div>
              </div>
            ) : (
              <>
                <span className="pl-2">{query ? query : 'Search'}</span>
              </>
            )}
          </button>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={() => setOpen(false)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="fixed inset-y-0 right-0 max-w-full desktop:max-w-2xl	flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="">
                      <div className="inset-0">
                        <div aria-hidden="true">
                          <div className="flex items-center">
                            <Formik
                              initialValues={initialValues}
                              enableReinitialize
                              onSubmit={handleSubmit}
                            >
                              {({
                                handleSubmit,
                                values,
                                handleChange,
                                resetForm,
                                setFieldValue,
                              }) => {
                                return (
                                  <div className="w-full">
                                    <Form
                                      className={'w-full shadow-md '}
                                      onSubmit={handleSubmit}
                                    >
                                      <div className="w-full flex justify-between items-center px-4 ">
                                        <button
                                          type="button"
                                          className="font-bold text-gray-600"
                                          onClick={() => {
                                            setOpen(false);
                                          }}
                                        >
                                          Cancel
                                        </button>
                                        <div className="space-x-2 pt-4 flex justify-center items-center pb-4">
                                          <div className="h-6 w-25 relative">
                                            <Image
                                              src={LogoText}
                                              alt="Image logo"
                                              layout="intrinsic"
                                            />
                                          </div>
                                        </div>
                                        <button
                                          className="font-bold text-gray-600"
                                          onClick={() => {
                                            handleSubmit();
                                          }}
                                        >
                                          Search
                                        </button>
                                      </div>
                                      <div className="divide-y px-4 relative">
                                        <div className="w-full ">
                                          <div className="flex w-full">
                                            <div className=" w-full">
                                              <div>
                                                <Field
                                                  name={'search'}
                                                  type={'text'}
                                                  innerRef={inputRef}
                                                  onFocus={() => {
                                                    setFocus('search');
                                                  }}
                                                  component={SearchBar}
                                                  value={values.search}
                                                  id={'search'}
                                                  className="w-full border-none p-4 focus:border-0 focus:outline-none focus:ring-transparent "
                                                  onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                  ) => {
                                                    handleChange(e);
                                                    handleSearch(e);
                                                  }}
                                                  placeholder={'Search...'}
                                                />
                                              </div>
                                            </div>
                                            <button
                                              type="button"
                                              className="bg-white rounded-md text-gray-500 focus:outline-none focus:ring-transparent"
                                              onClick={() => {
                                                resetForm();
                                                handleClearSearchTerm();
                                                setFieldValue('search', '');
                                              }}
                                            >
                                              <span className="sr-only">
                                                Clear Search
                                              </span>
                                              <XIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                              />
                                            </button>
                                          </div>
                                        </div>
                                        <div className="flex w-full items-center">
                                          <div className="flex justify-center items-center">
                                            <LocationMarkerIcon
                                              className={`h-6 w-6  ${
                                                focus == 'location'
                                                  ? 'text-green-500'
                                                  : 'text-gray-500'
                                              }`}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <div className="w-full flex items-center relative">
                                            {/* geocoder autocomplete field */}
                                            <div
                                              className={'w-full'}
                                              ref={geocoderRef}
                                              onFocus={() => {
                                                setFocus('location');
                                              }}
                                            />
                                            <button
                                              className="w-6 h-6 right-0 flex items-center"
                                              onClick={(e: any) => {
                                                e.preventDefault();
                                                handleClearLocation();
                                              }}
                                            >
                                              <XIcon className="text-gray-500" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </Form>

                                    {results.length && focus !== 'location' ? (
                                      <ul className="px-4 desktop:max-w-2xl">
                                        <li>
                                          <button
                                            key={`generalSearch`}
                                            onClick={() => {
                                              router.push('/search');
                                              setOpen(false);
                                            }}
                                            className="text-gray-700 w-full flex px-4 py-3"
                                          >
                                            <span className="ml-2 font-bold hover:text-green-500 hover">
                                              Search for&nbsp;{' '}
                                              {`"${values.search}"`}
                                            </span>
                                          </button>
                                        </li>
                                        {results.map(
                                          (result: any, index: number) => {
                                            switch (true) {
                                              case result._id.includes(
                                                'strain_entity'
                                              ):
                                                return (
                                                  <li
                                                    key={`result-${index}`}
                                                    onClick={() => {
                                                      setOpen(false);
                                                    }}
                                                  >
                                                    <SearchStrainCard
                                                      data={result}
                                                    />
                                                  </li>
                                                );
                                              case result._id.includes(
                                                'product_entity'
                                              ):
                                                return (
                                                  <li
                                                    key={`result-${index}`}
                                                    onClick={() => {
                                                      setOpen(false);
                                                    }}
                                                  >
                                                    <SearchProductCard
                                                      data={result}
                                                    />
                                                  </li>
                                                );
                                              case result._id.includes(
                                                'dispensary_entity'
                                              ):
                                                return (
                                                  <li
                                                    key={`result-${index}`}
                                                    onClick={() => {
                                                      setOpen(false);
                                                    }}
                                                  >
                                                    <SearchDispensaryCard
                                                      data={result}
                                                    />
                                                  </li>
                                                );
                                              case result._id.includes(
                                                'coupon'
                                              ):
                                                return (
                                                  <li
                                                    key={`result-${index}`}
                                                    onClick={() => {
                                                      setOpen(false);
                                                    }}
                                                  >
                                                    <SearchDealCard
                                                      data={result}
                                                    />
                                                  </li>
                                                );
                                            }
                                          }
                                        )}
                                      </ul>
                                    ) : (
                                      ''
                                    )}
                                    {/* Location Results */}
                                    {locationOptions?.length &&
                                    focus == 'location' ? (
                                      <ul className="px-4 desktop:max-w-2xl">
                                        {!geolocationSet ? (
                                          <li className="">
                                            <button
                                              onClick={handleLocationRequest}
                                              className="flex w-full items-center "
                                            >
                                              <div className=" flex items-center justify-center">
                                                <Target className=" text-green-500" />

                                                <p className="p-4 text-green-500 font-medium">
                                                  Current Location
                                                </p>
                                              </div>
                                            </button>
                                          </li>
                                        ) : (
                                          ''
                                        )}
                                        {locationOptions.map(
                                          (location: Feature, index: any) => {
                                            return (
                                              <li
                                                key={`lcoation-result-${index}`}
                                                onClick={() => {
                                                  // setOpen(false);
                                                  handleDispatchLocation(
                                                    location
                                                  );
                                                }}
                                              >
                                                <SearchLocationCard
                                                  data={location}
                                                />
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                );
                              }}
                            </Formik>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
