import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MapResultCard } from "./MapDispensaryResultCard";
import { MapContext } from "./MapContainer";
import "swiper/css";

function MapResults({ data }: any) {
  const { swiper, setSwiper, setActiveCard, showResults } =
    useContext(MapContext);

  return (
    <>
      <div
        className={
          showResults
            ? "transition duration-500 transform opacity-100 translate-y-0"
            : "transition duration-500 transform  opacity-70 translate-y-52 "
        }
      >
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          onSwiper={setSwiper}
          centeredSlides={true}
          freeMode
          onSlideChange={() => {
            
            setActiveCard(swiper.realIndex);
          }}
          style={{
            position: "absolute",
            bottom: "30px",
            left: "0",
            right: "0",
          }}
        >
          {data.map((listing: any, idx: number) => {
            const open = true;
            const closeTime = "8:00";
            return (
              <SwiperSlide
                key={listing._id}
                id={listing._id}
                style={{ height: "200px", maxWidth: "80%" }}
              >
                <MapResultCard listing={listing} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

export default MapResults;
