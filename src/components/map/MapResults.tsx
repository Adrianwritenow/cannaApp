import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MapResultCard } from './MapDispensaryResultCard';
import { MapContext } from './MapContainer';
import 'swiper/css';
import { ArrowCircleLeftIcon, ArrowLeftIcon } from '@heroicons/react/solid';

function MapResults({ data, userCoords }: any) {
  const { swiper, setSwiper, setActiveCard, showResults, activeCard } =
    useContext(MapContext);

    

  return (
    <>
      <div
        className={
          showResults
            ? 'transition duration-500 transform opacity-100 translate-y-0'
            : 'transition duration-500 transform  opacity-70 translate-y-52 '
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
            position: 'absolute',
            bottom: '30px',
            left: '0',
            right: '0',
          }}
        >
          <SwiperSlide
            id="blank"
            style={{
              height: '220px',
              maxWidth: '220px',
              transition: 'all 100ms linear',
              width: '100%',
              background: 'rgba(0,0,0,0.3)',
            }}
            className="flex w-full justify-center items-center rounded-xl"
          >
            <div className="h-10 w-10 bg-white rounded-3xl flex items-center justify-center">
              <ArrowLeftIcon className="text-green-400 w-7 h-7" />
            </div>
          </SwiperSlide>
          {data.map((listing: any, idx: number) => {
            const open = true;
            const closeTime = '8:00';
            return (
              <SwiperSlide
                key={listing._id}
                id={listing._id}
                style={{
                  height: '220px',
                  maxWidth: '250px',
                  opacity: activeCard - 1 === idx ? '1' : '.7',
                  transition: 'all 100ms linear',
                }}
              >
                <MapResultCard listing={listing} userCoords={userCoords}/>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

export default MapResults;
