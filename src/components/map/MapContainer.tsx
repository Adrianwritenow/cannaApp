import { Transition } from "@headlessui/react";
import { MapIcon, MenuIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";
import { Map } from "./Map";
import MapResults from "./MapResults";
import { MapContext } from "./mapContext";

function MapContainer({ data }: any) {
  const [mapShowing, setMapShowing] = useState(true);

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
        enter="all"
        enterFrom="opacity-0"
        enterTo="opacity-100 h-full"
        leave="transition-opacity duration-400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <section className=" relative w-screen">
          {!!data && (
            <>
              <Map data={data} />
              <div className="absolute bottom-72 w-screen flex justify-center">
                <button
                  className=" flex justify-around items-center z-10 px-5 py-4 h-10  w-28 rounded-3xl  text-white bg-green-400"
                  onClick={() => setMapShowing(!mapShowing)}
                >
                  List
                  <MenuIcon className=" w-8" />
                </button>
              </div>

              <MapResults data={data} />
            </>
          )}
        </section>
      </Transition>
    </MapContext>
  );
}

export default MapContainer;
