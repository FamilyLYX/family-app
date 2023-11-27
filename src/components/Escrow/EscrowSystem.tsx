import React, { useEffect, useState } from "react";
import { Button } from "..";
import styles from "./EscrowSystem.module.css";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@apollo/client";
import { INDEX_TRADES } from "../../queries/trades";
import { Navigation } from "swiper/modules";

interface EscrowSystemProps {
  setInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EscrowSystem({ setInfo }: EscrowSystemProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);
  const [imageWidth, setImageWidth] = useState(calculateImageWidth());
  const [productstatus, setProductStatus] = useState("Confirm");
  const { data, loading } = useQuery(INDEX_TRADES);
  console.log(data?.trades);
  // const loading = false;
  // const data = { trades: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
      setImageWidth(calculateImageWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function calculateImageWidth() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 320 && screenWidth < 400) {
      return 320;
    } else {
      return 400;
    }
  }

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {isMobile ? (
        // Mobile Screen
        <div className={`flex w-full justify-center items-center gap-3 h-full`}>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col gap-4 items-cente flex-wrap justify-center">
              <div className="flex flex-wrap gap-4 justify-center">
                <div
                  className={`justify-center ${styles.imagesize} items-center flex h-full relative`}
                >
                  {productstatus === "Confirm" && (
                    <div className="absolute top-0 right-5 mt-5  inline-flex p-2 items-center gap-2 rounded-full bg-green-500">
                      <img
                        src="./src/assets/escrow/checkiconn.svg"
                        // className="w-8 h-8 rounded-full"
                        alt="check mark"
                      />
                      <p className="text-white"> {productstatus}</p>
                    </div>
                  )}
                  <img
                    src="./src/assets/escrow/product2.png"
                    alt="product"
                    style={{ width: `${imageWidth}px ` }}
                    className="rounded-[42px] w-[289px] h-[374px]"
                  />
                </div>
                {/* <img
                  className={styles.rightImage}
                  src="./src/assets/escrow/molrecright.svg"
                  alt="rectangle"
                /> */}
              </div>
            </div>
            <div className="flex gap-10  items-center justify-around flex-row">
              <div className={`flex flex-col text-center gap-2`}>
                <h5 className="capitalize font-bold long-title text-xl">
                  Honft
                </h5>
                <p>001 — Black Forest»</p>
                <Link to="/escrowmoreinfo">
                  <Button
                    children={undefined}
                    style={{ minWidth: "289px", height: "40px" }}
                    variant="dark"
                    onClick={undefined}
                  >
                    More info
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Desktop Screen
        <div className="w-full flex flex-row space-x-2">
          <div className="w-12 flex items-center cursor-pointer">
            <a id="prev-page">
              <ArrowLeftIcon
                className="rounded-full border p-1"
                height={48}
                width={48}
              />
            </a>
          </div>
          <Swiper
            className="w-full"
            spaceBetween={50}
            slidesPerView={3}
            navigation={{
              enabled: true,
              nextEl: "#next-page",
              prevEl: "#prev-page",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            modules={[Navigation]}
          >
            {!loading &&
              data?.trades?.map((token, idx) => (
                <SwiperSlide
                  key={`token:${token.id.toString()}`}
                  virtualIndex={idx}
                >
                  <div className={`w-full`}>
                    {/* <img src="./src/assets/escrow/arrowright.svg" alt="arrowleft" /> */}
                    <div className="flex flex-col gap-4 items-center justify-center">
                      <div className="flex flex-wrap gap-4 justify-center">
                        <div
                          className={`justify-center ${styles.wsmall} items-center flex h-full relative`}
                        >
                          {productstatus === "Confirm" && (
                            <div className="absolute top-0 right-5 mt-5  inline-flex p-2 items-center gap-2 rounded-full bg-green-500">
                              <img
                                src="./src/assets/escrow/checkiconn.svg"
                                // className="w-8 h-8 rounded-full"
                                alt="check mark"
                              />
                              <p className="text-white"> {productstatus}</p>
                            </div>
                          )}
                          <img
                            src="./src/assets/escrow/product2.png"
                            className={`${styles.wsmall} rounded-[42px] w-[568px] h-[374px]`}
                            alt="product"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 items-center justify-center flex-row">
                        {/* <img src="./src/assets/escrow/smallRectangle.svg" alt="product" /> */}
                        <div className="flex flex-col text-center gap-2">
                          <h5 className="capitalize font-bold long-title text-xl">
                            Honft
                          </h5>
                          <p>001 — Black Forest»</p>
                          <Link to={`/trade/${token?.id.toString()}`}>
                            <Button
                              children={undefined}
                              // style={{ width: "550px", height: "40px" }}
                              variant="dark"
                              onClick={() => {
                                setInfo(true);
                              }}
                            >
                              More info
                            </Button>
                          </Link>
                        </div>
                        {/* <img
                src="./src/assets/escrow/smallrightRectangle.svg"
                alt="product"
              /> */}
                      </div>
                    </div>
                    {/* <img src="./src/assets/escrow/arrowleft.svg" alt="arrowright" /> */}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="w-12 flex items-center cursor-pointer">
            <a id="next-page">
              <ArrowRightIcon
                className="rounded-full border p-1"
                height={48}
                width={48}
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
