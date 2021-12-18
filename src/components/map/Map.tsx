import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactMapGL, { FlyToInterpolator, Marker, Popup } from "react-map-gl";
import Image from "next/image";
import mapmarker from "./mapmarker.png";
import { Context } from "./mapContext";

export function Map({ data, currentViewport }: any) {
  const [viewport, setViewport] = useState<any>({
    width: "100vh",
    height: "61vh",
    latitude: 37.0902,
    longitude: 95.7219,
    zoom: 2,
  });

  const { activeCard, setActiveCard, swiper, setSwiper } = useContext(Context);
  const mapRef = useRef(null);

  console.log(activeCard);
  useEffect(() => {
    setViewport({
      ...viewport,
      width: currentViewport,
    });
  }, [currentViewport]);

  const slideTo = (index: any) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  const markers = useMemo(
    () =>
      data.map((place: any, idx: number) => {
        if (place._source.lat && place._source.lon) {
          let lng = place._source.lon[0];
          let lat = place._source.lat[0];
          return (
            <Marker
              latitude={lat}
              longitude={lng}
              key={idx}
              offsetTop={-10}
              offsetLeft={-10}
            >
              <button
                onClick={() => {
                  swiper.slideTo(idx);
                }}
              >
                <Image src={mapmarker} height={30} width={30} alt="marker" />
              </button>
            </Marker>
          );
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  useEffect(() => {
    if (!!data[activeCard] && !!data[activeCard]._source.lat && !!data[activeCard]._source.lon) {
      console.log(data[activeCard]);
      setViewport({
        ...viewport,
        latitude: data[activeCard]._source.lat[0] - 0.002,
        longitude: data[activeCard]._source.lon[0],
        transitionDuration: 2000,
        zoom: 15,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  }, [activeCard]);

  return (
    <ReactMapGL
      ref={mapRef}
      mapStyle="mapbox://styles/cannapages420/ckwqrmkc60dj414pd8ts1mm01"
      mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
      onViewportChange={(viewport: any) => setViewport(viewport)}
      {...viewport}
    >
      {markers}
      {/* {popup} */}
    </ReactMapGL>
  );
}
