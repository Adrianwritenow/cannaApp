import { CheckIcon } from "@heroicons/react/solid";

interface AmenitiesProps {
  amenities: Array<string>;
}

export default function AmenitiesSection(props: AmenitiesProps) {
  const { amenities } = props;
  return (
    <section className="pb-7">
      <h2 id="business-amenities" className="sr-only">
        Amenities
      </h2>
      <h2
        id="business-amenities"
        className="text-lg text-gray-700 font-semibold pt-3"
      >
        Amenities
      </h2>

      {/* General Amenities */}

      <div className="grid grid-flow-row auto-rows-max space-y-2">
        <div className="flex flex-wrap border-b border-gray-200">
          <h3 id="business-amenities-general" className="sr-only">
            General
          </h3>
          <h3
            id="business-amenities-general"
            className="text-sm text-green block pt-3"
          >
            General
          </h3>
          <div className="flex py-2">
            {amenities.map((amenity, index) => (
              <div key={`amenity-${index}`}>
                <p className="flex flex-wrap items-center text-gray-500 py-2 px-3">
                  <span className="text-green">
                    <CheckIcon className="w-4 mr-2" />
                  </span>
                  {amenity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Amenities */}

        <div className="flex flex-wrap border-b border-gray-200">
          <h3 id="business-amenities-service" className="sr-only">
            Service Options
          </h3>
          <h3
            id="business-amenities-service"
            className="text-sm text-green pt-3"
          >
            Service Options
          </h3>
          <div className="flex py-2">
            {amenities.map((amenity, index) => (
              <div key={`amenity-${index}`}>
                <p className="flex flex-wrap items-center text-gray-500 py-2 px-3">
                  <span className="text-green">
                    <CheckIcon className="w-4 mr-2" />
                  </span>
                  {amenity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Amenities */}

        <div className="flex flex-wrap border-b border-gray-200">
          <h3 id="business-amenities-payment" className="sr-only">
            Payment
          </h3>
          <h3
            id="business-amenities-payment"
            className="text-sm text-green pt-3"
          >
            Payment
          </h3>
          <div className="flex py-2">
            {amenities.map((amenity, index) => (
              <div key={`amenity-${index}`}>
                <p className="flex flex-wrap items-center text-gray-500 py-2 px-3">
                  <span className="text-green">
                    <CheckIcon className="w-4 mr-2" />
                  </span>
                  {amenity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Crowd Amenities */}

        <div className="flex flex-wrap border-b border-gray-200">
          <h3 id="business-amenities-crowd" className="sr-only">
            Crowd
          </h3>
          <h3 id="business-amenities-crowd" className="text-sm text-green pt-3">
            Crowd
          </h3>
          <div className="flex py-2">
            {amenities.map((amenity, index) => (
              <div key={`amenity-${index}`}>
                <p className="flex flex-wrap items-center text-gray-500 py-2 px-3">
                  <span className="text-green">
                    <CheckIcon className="w-4 mr-2" />
                  </span>
                  {amenity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Atmosphere Amenities */}

        <div className="flex flex-wrap border-b border-gray-200">
          <h3 id="business-amenities-atmosphere" className="sr-only">
            Atmosphere
          </h3>
          <h3
            id="business-amenities-atmosphere"
            className="text-sm text-green pt-3"
          >
            Atmosphere
          </h3>
          <div className="flex py-2">
            {amenities.map((amenity, index) => (
              <div key={`amenity-${index}`}>
                <p className="flex flex-wrap items-center text-gray-500 py-2 px-3">
                  <span className="text-green">
                    <CheckIcon className="w-4 mr-2" />
                  </span>
                  {amenity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
