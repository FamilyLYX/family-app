import React from "react";
import Header from "../common/Header";

import storeImage from "../assets/store-hero.png";
import storeImage2 from "../assets/store-screen-2.png";
import honftImage from "../assets/honft-black-forest-001.png";

import hangerIcon from "../assets/icons/hanger.svg";
import buildingIcon from "../assets/icons/building-factory.svg";
import nfcBadgeHoodie from "../assets/nfc-hoodie.png";
import backHoodie from "../assets/qr-code-back-hoodie.png";
import nfcTagIcon from "../assets/icons/nfc-icon.svg";

import qrIcon from "../assets/icons/qr-code.svg";
import sizeChartMan from "../assets/sizeChart-man.png";
import SizeChart from "../common/SizeChart";

import phygicalOrange from "../assets/phygital-01.png";
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
        className="min-h-screen bg-center bg-cover "
        style={{ backgroundImage: `url(${storeImage2})` }}
      ></section>

      {/* section 3 */}

      <section className="min-h-screen p-8 flex items-center justify-center ">
        <div className="flex container mx-auto flex-col-reverse md:flex-row">
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center md:p-16 space-y-16">
            <div className="hidden md:block">
              <h1 className="text-6xl font-bold long-title ">Honft</h1>
              <p className="leading-9 font-light text-sm">
                081 – Black Forest&gt;&gt;
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8">
              <div className="text-xl flex justify-center md:justify-start items-start gap-2">
                <img src={hangerIcon} className="w-6" />
                <span className="long-title">Fabric</span>
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur. Commodo sit neque libero
                arcu eget. Augue proin ac sit sit tellus diam pretium. Nunc
                consectetur eleifend risus dolor maecenas pharetra lectus.
              </div>
              <div className="long-title justify-center md:justify-start text-2xl flex items-start gap-2">
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
          <div className="flex-1 relative flex items-center justify-center flex-col text-centers">
            <div className="block md:hidden">
              <h1 className="text-6xl font-bold long-title text-center">
                Honft
              </h1>
              <p className="leading-9 font-light text-sm">
                081 – Black Forest&gt;&gt;
              </p>
            </div>
            <img src={honftImage} alt="" className="w-full max-w-xl" />
          </div>
        </div>
      </section>

      <section className="min-h-screen max-h-[800px]  items-center justify-center bg-black text-white hidden md:flex">
        <div className="flex container mx-auto ">
          {/* Left Content */}

          <div className="flex-1 relative flex items-center justify-center">
            <img src={nfcBadgeHoodie} alt="" className="w-full max-w-xl" />
          </div>

          {/* Right Content */}

          <div className="flex-1 flex flex-col justify-center p-16 space-y-16">
            <div className="flex gap-2 items-center">
              <img src={nfcTagIcon} alt="" className="w-[9rem]" />
              <h1 className="text-8xl font-bold long-title ">NFC Badge</h1>
            </div>
          </div>
        </div>
      </section>

      <section
        className="min-h-screen bg-center bg-cover flex items-center justify-center md:hidden"
        style={{ backgroundImage: `url(${nfcBadgeHoodie})` }}
      >
        <div className="flex gap-2 items  flex-col items-center">
          <img src={nfcTagIcon} alt="" className="w-[9rem]" />
          <h1 className="text-8xl text-white font-bold long-title ">
            NFC Badge
          </h1>
        </div>
      </section>

      <section className="min-h-screen flex flex-col ">
        <div
          className=" flex-grow flex  justify-start bg-cover bg-center"
          style={{ backgroundImage: `url(${backHoodie})` }}
        >
          <div className="flex container md:items-start items-center mx-auto  md:justify-start mt-20 px-5 md:px-20">
            <div className="flex flex-col   w-full md:w-fit">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-2  w-full">
                <img src={qrIcon} alt="" />

                <p className="text-white  text-8xl long-title md:mt-10 text-center">
                  QR Code Back
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-end gap-5 ml-0 md:ml-[110px]  w-full">
                <p className="text-white text-8xl long-title md:mt-10 text-center ">
                  Label
                </p>
                <button className="text-sm font-mono bg-black text-white p-5 md:p-10 px-20 md:px-40 rounded-full whitespace-nowrap w-full">
                  learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-[20rem] md:min-h-screen flex flex-col ">
        <div
          className=" flex-grow flex  justify-start bg-cover bg-center min-h-screen"
          style={{ backgroundImage: `url(${sizeChartMan})` }}
        >
          <div className="hidden md:flex justify-between items-start  py-20 container mx-auto ">
            <div className="flex flex-col h-screen justify-between p-8 gap-10">
              <SizeChart />
              <div className=" w-[36rem] rounded-xl h-80 bg-gray-100"></div>
            </div>
            <div className="p-8">
              <div className=" w-[25rem] rounded-xl h-60  bg-gray-100"></div>
              <div className="flex justify-between gap-4 mt-4">
                <div className=" w-full rounded-xl h-20  bg-gray-100"></div>
                <div className=" w-full rounded-xl h-20  bg-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto flex hidden">
        <div className="">
          {/* left */}
          <div>
            <div>
              <h4 className="long-title">PHygical NFT</h4>
              <img src={phygicalOrange} alt="" />
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur. Commodo sit neque libero
              arcu eget. Augue proin ac sit sit tellus diam pretium. Nunc
              consectetur eleifend risus dolor maecenas pharetra lectus.
            </p>

            <div>
              <span>Select Sizes:</span>

              <div>
                <span>XS</span>
                <span>S</span>
                <span>M</span>
                <span>L</span>
                <span>XL</span>
              </div>
            </div>

            <p>Orders open for next 7 days 6 hours</p>

            <div>
              <div>
                <span>7</span>
                <span>Day</span>
              </div>
              :
              <div>
                <span>6</span>
                <span>Hours</span>
              </div>
              :
              <div>
                <span>00</span>
                <span>Minutes</span>
              </div>
            </div>

            <div>
              <button>Buy</button>

              <div>
                <p>$256</p>
                <span>$256</span>
              </div>
            </div>
          </div>

          {/* attached */}
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default StoreLandingPage;
