import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const YourComponent: React.FC = () => {
  const imageArray = [
    "/src/assets/escrow/molslide.svg",
    "/src/assets/escrow/molslide.svg",
    "/src/assets/escrow/molslide.svg",
  ];

  return (
    <Swiper
      cssMode={true}
      navigation={true}
      mousewheel={true}
      modules={[Navigation]}
      className="mySwiper"
      spaceBetween={35}
      slidesPerView={"auto"}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {imageArray.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Image ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default YourComponent;
