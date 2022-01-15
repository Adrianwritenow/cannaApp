import {
  ArrowLeftIcon,
  LocationMarkerIcon,
  SearchIcon,
  XIcon,
} from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Field, FieldAttributes, Form, Formik } from 'formik';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { combinedSearchQuery, receiveResults } from '../../../actions/search';
import { getLocationByIP, setLocation } from '../../../actions/location';
import { useDispatch, useSelector } from 'react-redux';
import { LocationData } from '../../../interfaces/locationData';
import { RootState } from '@/reducers';
import { SearchBar } from './SearchBar';
import SearchDispensaryCard from '../../search/SearchDispensaryCard';
import SearchProductCard from '../../search/SearchProductCard';
import SearchStrainCard from '../../search/SearchStrainCard';
import { useRouter } from 'next/router';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Target from '@/public/assets/icons/iconComponents/Target';

export default function SearchSlideOver(props: {
  searchRoute?: string;
  root?: boolean;
}) {
  const { root } = props;
  const { searchRoute } = props;
  const [open, setOpen] = useState(false);
  const location = useSelector((root: RootState) => root.location);
  const [geolocationSet, setGeolocationSet] = useState(false);
  const [geocodeInitialized, setGeocodeInitialized] = useState(false);
  const initialLocationCleared = useRef(false);
  const [initialResultsSet, setInitialResultsSet] = useState(false);
  const [focus, setFocus] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { results, query, searchLocation } = useSelector(
    (root: RootState) => root.search
  );
  const geocoderRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialValues = {
    search: '',
    // searchLocation: searchLocation,
  };

  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN as string;
  let geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: 'place',
  });

  async function handleSubmit(search: any) {
    const hits = await combinedSearchQuery({
      q: search,
      total: 10,
      endpoints: ['products', 'dispenaries', 'strains', 'blogs'],
    });
    if (hits) {
      if (hits.length) {
        dispatch(receiveResults({ search: search, data: hits }));
      }
    }
  }

  useEffect(() => {
    if (geocoderRef.current !== null && !geocodeInitialized) {
      geocoder.addTo(geocoderRef.current);
      setGeocodeInitialized(true);
      if (geocoderRef.current.children[0].children[1]) {
        geocoderRef.current.children[0].children[1].placeholder = 'Location...';
        geocoderRef.current.children[0].children[1].value =
          initialLocationCleared && searchLocation.label
            ? searchLocation.label
            : '';
        // : '';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geocoderRef.current, geocodeInitialized, open]);

  // prevent geocoder from rendering multiple times
  useEffect(() => {
    setGeocodeInitialized(false);
  }, [open]);

  // handle new location selected
  geocoder.on('result', e => {
    setGeolocationSet(false);
    dispatch(
      receiveResults({
        searchLocation: {
          coords: { lat: e.result.center[1], lon: e.result.center[0] },
          label: e.result.text,
          boundingBox: e.result.bbox,
        },
      })
    );
    router.pathname === '/map' ? setOpen(false) : router.push('/map');
  });

  async function handleLocationRequest() {
    if (!location.preciseLocationSet) {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            setGeolocationSet(true);
            setOpen(false);
            router.pathname === '/map' ? setOpen(false) : router.push('/map');
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
            if (geocoderRef.current.children[0].children[1]) {
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
          // search: city,
          searchLocation: {
            coords: {
              lat: location.lat,
              lon: location.lon,
            },
            label: location.city,
          },
        })
      );
      setOpen(false);
      router.pathname === '/map' ? setOpen(false) : router.push('/map');
    }
  }

  // adds short delay to prevent search from firing until the user has stopped typing
  let timeout: ReturnType<typeof setTimeout>;
  function handleSearch(e: any) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (e.target.name === 'search') {
        handleSubmit(e.target.value);
      }
    }, 500);
  }

  // Get initial location data based on Client IP
  useEffect(() => {
    async function getLocation() {
      const data: LocationData = await getLocationByIP();
      dispatch(setLocation(data));
    }

    if (!Object.keys(location).length && !location.preciseLocationSet) {
      getLocation();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getInitialDispensaryResults() {
      if (location) {
        const hits: any = await combinedSearchQuery({
          endpoints: ['dispenaries'],
          coords: { lat: location.lat, lon: location.lon },
        });
        dispatch(
          receiveResults({
            search: location.city,
            data: hits,
            searchLocation: {
              coords: { lat: location.lat, lon: location.lon },
              label: location.city,
            },
          })
        );
      }
    }
    if (
      location.city &&
      query === '' &&
      !initialResultsSet &&
      router.pathname === '/map' &&
      searchLocation.label === null
    ) {
      setInitialResultsSet(true);
      getInitialDispensaryResults();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function handleFocus() {
    // Wait for transition to finish then focus on input
    setTimeout(() => {
      const node = inputRef.current;
      if (node) {
        node.focus();
      }
    }, 500);
  }

  function handleClearLocation() {
    if (geocoderRef.current.children[0].children[1]) {
      geocoderRef.current.children[0].children[1].placeholder = 'Location...';
      geocoderRef.current.children[0].children[1].value = '';
    }
    initialLocationCleared.current = true;
    dispatch(
      receiveResults({
        query: '',
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

  function handleClearSearchTerm() {
    dispatch(receiveResults({ data: [], query: '' }));
  }

  return (
    <div>
      <div className="w-full relative pb-4">
        <div className="flex flex-row border-solid border border-gray-400 text-gray-500 rounded-md focus:outline-none focus:ring-0 shadow-sm items-center justify-center">
          {router.pathname === '/map' ? (
            <button
              onClick={() => {
                router.push('/search');
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
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="">
                      <div className="inset-0">
                        <div aria-hidden="true">
                          <div className="flex items-center">
                            <Formik
                              initialValues={initialValues}
                              enableReinitialize
                              onSubmit={() => {}}
                            >
                              {({
                                handleSubmit,
                                values,
                                handleChange,
                                resetForm,
                              }) => {
                                return (
                                  <div className="w-full">
                                    <Form
                                      className={
                                        'w-full  shadow-md px-4 divide-y '
                                      }
                                      onSubmit={handleSubmit}
                                    >
                                      <div className="flex w-full">
                                        <button
                                          type="button"
                                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-transparent"
                                          onClick={() => setOpen(false)}
                                        >
                                          <span className="sr-only">Back</span>
                                          <ArrowLeftIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                          />
                                        </button>
                                        <div className="grid grid-cols-7 gap-1 w-full">
                                          <div className={'col-span-7'}>
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
                                              className="w-full border-none p-4 focus:border-0 focus:outline-none focus:ring-transparent"
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
                                        <div className="grid grid-cols-7 gap-1 w-full relative">
                                          {/* geocoder autocomplete field */}
                                          <div
                                            className={
                                              'col-span-7 h-14 flex items-center'
                                            }
                                            ref={geocoderRef}
                                          />
                                          <button
                                            className="absolute w-6 h-6 right-0 bottom-4"
                                            onClick={handleClearLocation}
                                          >
                                            <XIcon className="text-gray-500" />
                                          </button>

                                          {/* <Field
                                              name={'searchLocation'}
                                              type={'text'}
                                              onFocus={() => {
                                                setFocus('searchLocation');
                                              }}

                                              onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                              ) => {
                                                handleChange(e);
                                                handleSearch(e);
                                              }}
                                              id={'searchLocation'}
                                              className="w-full border-none p-4 focus:border-0 focus:outline-none focus:ring-transparent"
                                              value={values.searchLocation}
                                              placeholder="Location..."
                                            /> */}
                                        </div>
                                        {/* </div> */}
                                      </div>
                                      <div>
                                        {!geolocationSet ? (
                                          <button
                                            onClick={handleLocationRequest}
                                            className="flex w-full items-center "
                                          >
                                            <div className=" flex items-center justify-center">
                                              <Target className=" text-gray-500" />

                                              <p className="p-4">
                                                Current Location
                                              </p>
                                            </div>
                                          </button>
                                        ) : null}
                                      </div>
                                    </Form>
                                    {results.length ? (
                                      <ul className="px-4 ">
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
                                            }
                                          }
                                        )}
                                      </ul>
                                    ) : (
                                      ''
                                    )}
                                    <div
                                      key={`generalSearch`}
                                      onClick={() => {
                                        router.push('/search');
                                        setOpen(false);
                                      }}
                                      className="text-gray-700 w-full flex px-4 py-3"
                                    >
                                      <div className="w-6 h-6 flex items-center justify-center">
                                        <SearchIcon className="w-4 h-4" />
                                      </div>
                                      <span className="ml-2">
                                        Search for{' '}
                                        {values.search
                                          ? `${values.search}`
                                          : query}
                                      </span>
                                    </div>
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
