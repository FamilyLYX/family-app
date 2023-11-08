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
import phygicalGray from "../assets/phygital-02.png";
import Footer from "../common/Footer";
const StoreLandingPage = () => {
  return (
    <div>
      {/* section 1 */}
      <section className="min-h-screen flex flex-col bg-black hidden">
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
        className="min-h-screen bg-center bg-cover hidden "
        style={{ backgroundImage: `url(${storeImage2})` }}
      ></section>

      {/* section 3 */}

      <section className="min-h-screen p-8 flex items-center justify-center hidden">
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

      <section
        className="min-h-screen max-h-[800px]  items-center justify-center bg-black text-white hidden
      hidden"
      >
        {/* md:flex  */}
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
        className="min-h-screen bg-center bg-cover flex items-center justify-center md:hidden  hidden"
        style={{ backgroundImage: `url(${nfcBadgeHoodie})` }}
      >
        <div className="flex gap-2 items  flex-col items-center">
          <img src={nfcTagIcon} alt="" className="w-[9rem]" />
          <h1 className="text-8xl text-white font-bold long-title ">
            NFC Badge
          </h1>
        </div>
      </section>

      <section className="min-h-screen flex flex-col hidden">
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

      <section className="min-h-[20rem] md:min-h-screen flex flex-col hidden">
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

      <section className="container mx-auto flex py-10 ">
        <div className="flex  gap-8 flex-col md:flex-row px-4">
          {/* left */}
          <div className="w-full md:w-1/2">
            <div className="relative mt-14">
              <h4 className="long-title absolute -top-14 text-8xl whitespace-nowrap left-[50%] translate-x-[-50%]">
                Phygical NFT
              </h4>
              <img src={phygicalOrange} alt="" className="mx-auto" />
            </div>

            <div className="px-4 md:px-16 flex flex-col gap-6 mt-10">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium whitespace-nowrap text-black/50">
                  limited to
                </span>

                <div className="w-full bg-gray-300 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    className="bg-black h-1.5 rounded-full"
                    style={{ width: `calc(100% * (${42} / ${180}))` }}
                  ></div>
                </div>

                <span className="text-sm font-medium whitespace-nowrap">{`42/180pcs`}</span>
              </div>

              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur. Commodo sit neque libero
                arcu eget. Augue proin ac sit sit tellus diam pretium. Nunc
                consectetur eleifend risus dolor maecenas pharetra lectus.
              </p>

              <div className="">
                <span className="text-black/50">Select Sizes:</span>

                <div className="flex items-stretch gap-2 mt-2">
                  <span className="border w-full p-3 rounded-full text-center">
                    XS
                  </span>
                  <span className="border w-full p-3 rounded-full text-center">
                    S
                  </span>
                  <span className="border w-full p-3 rounded-full text-center">
                    M
                  </span>
                  <span className="border w-full p-3 rounded-full text-center">
                    L
                  </span>
                  <span className="border w-full p-3 rounded-full text-center">
                    XL
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-[#F5F5F5] p-2 rounded-3xl">
                <p className="text-center">
                  Orders open for next 7 days 6 hours
                </p>

                <div className="flex items-center gap-3 ">
                  <div className="border rounded-3xl flex flex-col gap-2 items-center p-4 w-full">
                    <span className="text-5xl long-title">7</span>
                    <span>Day</span>
                  </div>
                  <span className="text-6xl long-title">:</span>
                  <div className="border rounded-3xl flex flex-col gap-2 items-center p-4 w-full">
                    <span className="text-5xl long-title">6</span>
                    <span>Hours</span>
                  </div>
                  <span className="text-6xl long-title">:</span>

                  <div className="border rounded-3xl flex flex-col gap-2 items-center p-4 w-full">
                    <span className="text-5xl long-title">00</span>
                    <span>Minutes</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="bg-black text-white w-full p-3 rounded-full flex-1s">
                  Buy
                </button>

                <div className="flex items-center">
                  <p className="whitespace-nowrap font-bold">$ 256</p>
                </div>
                <div className="h-full">
                  <span className="line-through text-black/50 whitespace-nowrap">
                    $ 556
                  </span>
                </div>
              </div>

              <hr />

              <div className="flex items-center justify-between">
                <p>The discount will expire in</p>

                <div className="flex gap-[2px] text-3xl">
                  <p className="long-title">
                    22
                    <span className="long-title text-black/50">h</span>
                  </p>
                  <span className="long-title">:</span>
                  <p className="long-title">
                    32
                    <span className="long-title text-black/50">m</span>
                  </p>
                  <span className="long-title">:</span>
                  <p className="long-title">
                    23
                    <span className="long-title text-black/50">s</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* attached */}
          <div className="w-full md:w-1/2 ">
            <div className="relative mt-14">
              <h4 className="long-title absolute -top-14 text-8xl whitespace-nowrap left-[50%] translate-x-[-50%]">
                Digital NFT
              </h4>
              <img src={phygicalGray} alt="" className="mx-auto" />
            </div>

            <div className="px-4 md:px-16 flex flex-col gap-6 mt-10">
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur. Commodo sit neque libero
                arcu eget. Augue proin ac sit sit tellus diam pretium. Nunc
                consectetur eleifend risus dolor maecenas pharetra lectus.
              </p>

              <div className="flex gap-2">
                <button className="bg-black text-white w-full p-3 rounded-full flex-1s">
                  Buy
                </button>

                <div className="flex items-center">
                  <p className="whitespace-nowrap font-bold">$ 256</p>
                </div>
                <div className="h-full">
                  <span className="line-through text-black/50 whitespace-nowrap">
                    $ 556
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-gray-100/80 py-4 rounded-full px-6">
                <p>The discount will expire in</p>

                <div className="flex gap-[2px] text-3xl">
                  <p className="long-title">
                    22
                    <span className="long-title text-black/50">h</span>
                  </p>
                  <span className="long-title">:</span>
                  <p className="long-title">
                    32
                    <span className="long-title text-black/50">m</span>
                  </p>
                  <span className="long-title">:</span>
                  <p className="long-title">
                    23
                    <span className="long-title text-black/50">s</span>
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StoreLandingPage;
