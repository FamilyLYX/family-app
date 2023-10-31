import React from "react";
import Header from "../common/Header";

import storeHeroImg from "../assets/store-01.png";
import storeHoodieImg from "../assets/store-02.png";
import storeImg3 from "../assets/store-03.png";

const StoreLandingPage = () => {
  return (
    <div className="bg-black px-2">
      {/* section 1 */}
      <section className="min-h-screen flex flex-col ">
        <Header />
        <div
          className=" flex-grow flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${storeHeroImg})` }}
        ></div>
      </section>

      <section className="min-h-screen flex items-center justify-center mb-16 md:mb-0">
        <div className="flex flex-col-reverse md:flex-row  mx-auto container ">
          <div className="w-full md:w-1/2 flex items-center justify-end ">
            <div className="text-gray-400  flex flex-col items-center justify-center text-center gap-6 max-w-2xl ">
              <p>Who are we?</p>
              <h2 className="long-title text-5xl md:text-8xl text-white">
                Lorem ipsum dolor sit amet consectetur.
              </h2>
              <p className="px-4">
                Lorem ipsum dolor sit amet consectetur. Commodo sit neque libero
                arcu eget. Augue proin ac sit sit tellus diam pretium. Nunc
                consectetur eleifend risus dolor maecenas pharetra lectus.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img src={storeHoodieImg} className="w-full max-w-2xl" alt="" />
          </div>
        </div>
      </section>

      <section className="min-h-[20rem] md:min-h-screen flex flex-col">
        <div
          className=" flex-grow flex  justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${storeImg3})` }}
        >
          <p className="text-white text-5xl md:text-8xl long-title mt-10 text-center">
            Going towards the future
          </p>
        </div>
      </section>
    </div>
  );
};

export default StoreLandingPage;
