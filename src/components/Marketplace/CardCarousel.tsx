import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import "./CardCarousel.css"; // This will be your custom CSS file
import ProductCard from "./ProductCard";
import product1 from "../../assets/marketplace/product-01.png";
import product2 from "../../assets/marketplace/product-02.png";
type Props = {};

const CardCarousel = (props: Props) => {
  // Dummy data for the cards, replace with your actual data
  const cards = [
    {
      id: 1,
      image: product1,
      title: "XXL",
      price: "1,452540",
      price_unit: "ETH",
    },
    {
      id: 2,
      image: product2,
      title: "Honft",
      price: "1,452540",
      price_unit: "ETH",
    },
    {
      id: 3,
      image: product2,
      title: "Honft",
      price: "1,452540",
      price_unit: "ETH",
    },

    {
      id: 4,
      image: product2,
      title: "Honft",
      price: "1,452540",
      price_unit: "ETH",
    },
    {
      id: 5,
      image: product2,
      title: "Honft",
      price: "1,452540",
      price_unit: "ETH",
    },
    {
      id: 6,
      image: product2,
      title: "Honft",
      price: "1,452540",
      price_unit: "ETH",
    },
    {
      id: 7,
      image: product2,
      title: "Honft",
      price: "1,452540",
      price_unit: "ETH",
    },
    {
      id: 8,
      image: product2,
      title: "Honft",
      price: "1,452540",
      price_unit: "ETH",
    },
  ];

  return (
    <Swiper
      pagination={{
        type: "progressbar",
      }}
      cssMode={true}
      navigation={true}
      mousewheel={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      spaceBetween={35}
      slidesPerView={"auto"}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {cards.map((card) => (
        <SwiperSlide key={card.id}>
          <ProductCard data={card} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardCarousel;
