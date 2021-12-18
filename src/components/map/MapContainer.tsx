import { Transition } from "@headlessui/react";
import { MapIcon, MenuIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";
import { Map } from "./Map";
import MapResults from "./MapResults";
import { MapContext } from "./mapContext";
import { useCurrentWidth } from "./useCurrentWidth";

function MapContainer({ data }: any) {
  const [mapShowing, setMapShowing] = useState(true);
  const width = useCurrentWidth();
  return (
    <MapContext>
      {!mapShowing && (
        <div className="w-screen relative py-2 bg-gray-50">
          <button
            className="mx-auto my-auto flex justify-around px-3 items-center z-10  h-10  w-28 rounded-3xl text-white bg-green-400"
            onClick={() => setMapShowing(!mapShowing)}
          >
            Map <MapIcon className=" w-8" />
          </button>
        </div>
      )}
      <Transition
        show={mapShowing}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-95"
        enterTo=" transform opacity-100 scale-100"
        leave="transition-opacity duration-400 "
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <section className=" relative w-screen">
          <>
            <Map data={data} currentViewport={width}></Map>
            <div className="absolute bottom-64 w-screen flex justify-center">
              <button
                className=" flex  justify-around items-center z-10 px-5 py-4 h-10  w-28 rounded-3xl  text-white bg-green-400"
                onClick={() => setMapShowing(!mapShowing)}
              >
                List
                <MenuIcon className=" w-8" />
              </button>
            </div>
            <div className="">
              <MapResults data={data} />
            </div>
          </>
        </section>
      </Transition>
    </MapContext>
  );
}

export default MapContainer;
