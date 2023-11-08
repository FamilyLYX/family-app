import Header from "../common/Header";

import storeHeroImg from "../assets/store-01.png";
import storeHoodieImg from "../assets/store-02.png";
import storeImg3 from "../assets/store-03.png";
import { Scroll, ScrollControls } from "@react-three/drei";
import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

const StoreLandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, [isMobile]);
  return (
    <>
      <div className="absolute w-screen h-screen top-0 left-0 bg-black">
        <Canvas gl={{ antialias: false }}>
          <ScrollControls pages={3}>
            <Scroll>
              <Experience />
            </Scroll>
            <Scroll html>
              <div className="w-screen min-h-screen flex flex-col">
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
                          Lorem ipsum dolor sit amet consectetur. Commodo sit
                          neque libero arcu eget. Augue proin ac sit sit tellus
                          diam pretium. Nunc consectetur eleifend risus dolor
                          maecenas pharetra lectus.
                        </p>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 flex items-center justify-center">
                      {/* <img
                        src={storeHoodieImg}
                        className="w-full max-w-2xl"
                        alt=""
                      /> */}
                    </div>
                  </div>
                </section>

                <section className="min-h-[20rem] md:min-h-screen flex flex-col">
                  <div
                    className=" flex-grow flex  justify-center bg-cover bg-center"
                    // style={{ backgroundImage: `url(${storeImg3})` }}
                  >
                    <p className="text-white text-5xl md:text-8xl long-title mt-10 text-center">
                      Going towards the future
                    </p>
                  </div>
                </section>
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
};

export default StoreLandingPage;
