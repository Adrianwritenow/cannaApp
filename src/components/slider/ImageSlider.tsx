import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

export default function ImageSlider(props: any) {
  const { images } = props;
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class=" ${className}"></span>`;
          },
        }}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
      >
        {images.map((image: any, index: any) => (
          <SwiperSlide key={`${image.alt}-${index}`}>
            <div className="relative w-full relative w-full pb-full">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit={"cover"}
                className={"w-full h-full"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
