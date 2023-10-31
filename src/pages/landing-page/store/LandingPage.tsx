import React from "react";
import Header from "../common/Header";

import storeImage from "../assets/store-hero.png";
import storeImage2 from "../assets/store-screen-2.png";
import honftImage from "../assets/honft-black-forest-001.png";

import hangerIcon from "../assets/icons/hanger.svg";
import buildingIcon from "../assets/icons/building-factory.svg";

const StoreLandingPage = () => {
  return (
    <div className="">
      {/* section 1 */}
      <section className="min-h-screen flex flex-col bg-black ">
        <Header />
        <div className=" flex-grow flex items-center justify-center px-4">
          <div
            className="text-[11rem] sm:text-[20rem] md:text-[24rem] long-title font-bold text-transparent bg-clip-text bg-green-100 bg-contain"
            style={{ backgroundImage: `url(${storeImage})` }}
          >
            Store
          </div>
        </div>
      </section>
      {/* section 2 */}
      <section
        className="min-h-screen bg-center bg-cover hidden"
        style={{ backgroundImage: `url(${storeImage2})` }}
      ></section>

      {/* section 3 */}

      <div className="min-h-screen max-h-[800px] flex items-center justify-centerT">
        <div className="flex container mx-auto ">
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center p-16 space-y-16">
            <div>
              <h1 className="text-6xl font-bold long-title ">Honft</h1>
              <p className="leading-9 font-light text-sm">
                081 – Black Forest&gt;&gt;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-8">
              <div className="text-xl flex items-start gap-2">
                <img src={hangerIcon} className="w-6" />
                <span className="long-title">Fabric</span>
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur. Commodo sit neque libero
                arcu eget. Augue proin ac sit sit tellus diam pretium. Nunc
                consectetur eleifend risus dolor maecenas pharetra lectus.
              </div>
              <div className="long-title text-2xl flex items-start gap-2">
                <img src={buildingIcon} className="w-6" />
                <span className="long-title">Manufacturing</span>
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur. Commodo sit neque libero
                arcu eget. Augue proin ac sit sit tellus diam pretium. Nunc
                consectetur eleifend risus dolor maecenas pharetra lectus.
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 relative flex items-center justify-center">
            <img src={honftImage} alt="" className="w-full max-w-xl" />
          </div>
        </div>
      </div>
      {/* <section className="flex ">
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <img src={honftImage} alt="" className="w-full" />
        </div>
      </section> */}
    </div>
  );
};

export default StoreLandingPage;
