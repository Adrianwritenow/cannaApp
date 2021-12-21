import React, { useContext, useEffect, useMemo, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Image from "next/image";
import mapmarker from "./mapmarker.png";
import { Context } from "./mapContext";


export function Map({ data }: any) {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "70vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13,
  });
const {
  activeCard,
  setActiveCard,
  ref0,
  ref1,
  ref2,
  ref3,
  ref4,
  ref5,
  ref6,
  ref7,
  ref8,
  ref9,
} = useContext(Context);
  const activeCoords = data.find((item: any) => item._id === activeCard.id);

  useEffect(() => {
    setTimeout(() => {
      if (activeCard.id) {
        const lat = activeCoords._source.lat[0];
        const lng = activeCoords._source.lon[0];

        setViewport({
          ...viewport,
          latitude: lat - 0.005,
          longitude: lng,
          zoom: 14
        });
      }
    }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCard]);
  const markers = useMemo(
    () =>
      data.map((place: any, idx: number) => {
        const currentRef =
          idx === 0
            ? ref0
            : idx === 1
            ? ref1
            : idx === 2
            ? ref2
            : idx === 3
            ? ref3
            : idx === 4
            ? ref4
            : idx === 5
            ? ref5
            : idx === 6
            ? ref6
            : idx === 7
            ? ref7
            : idx === 8
            ? ref8
            : ref9;
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
                  currentRef.current.scrollIntoView( {behavior: "smooth", block: "end", inline: "nearest"})
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

/* component skeleton for rendering a popup. leaving for now in case this is desired in the near future */
  // const popup = useMemo(
  //   () =>

  //       selected && selected.coords ? (

  //       <Popup
  //         latitude={selected.coords.lat}
  //         longitude={selected.coords.lng}
  //         closeButton={true}
  //         closeOnClick={false}
  //         onClose={() => setSelected(-1)}
  //         anchor="top"
  //         offsetTop={10}
  //       >
  //         <div>
  //           <h3>{selected._source.name[0]}</h3>
  //           <p>{selected._source.address_line1}</p>
  //           <p>
  //             {selected._source.locality},{" "}
  //             {selected._source.administrative_area}{" "}
  //             {selected._source.postal_code}{" "}
  //           </p>
  //           <p>{selected._source.field_phone_number}</p>
  //         </div>
  //       </Popup>
  //     ) : null,
  //   [selected]
  // );

  return (
    <ReactMapGL
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
