import React, { useEffect, useState } from "react";
import { Button } from "..";
import styles from "./EscrowSystem.module.css";
import { Link } from "react-router-dom";

interface EscrowSystemProps {
  setInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EscrowSystem({ setInfo }: EscrowSystemProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);
  const [imageWidth, setImageWidth] = useState(calculateImageWidth());

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
                <img
                  src="./src/assets/escrow/molrecleft.svg"
                  className={styles.leftImage}
                  alt="rectangle"
                />
                <div
                  className={`justify-center ${styles.imagesize} items-center flex h-full`}
                >
                  <img
                    src="./src/assets/escrow/productmol.png"
                    alt="product"
                    style={{ width: `${imageWidth}px ` }}
                  />
                </div>
                <img
                  className={styles.rightImage}
                  src="./src/assets/escrow/molrecright.svg"
                  alt="rectangle"
                />
              </div>
            </div>
            <div className="flex gap-10  items-center justify-around flex-row">
              <img
                className={styles.leftImage}
                src="./src/assets/escrow/smallrecleft.svg"
                alt="product"
              />

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

              <img
                className={styles.rightImage}
                src="./src/assets/escrow/smallrecright.svg"
                alt="product"
              />
            </div>
          </div>
        </div>
      ) : (
        // Desktop Screen
        <div
          className={`flex ${styles.molscreen} md:w-full w-full justify-center items-center gap-3 h-full`}
        >
          <img src="./src/assets/escrow/arrowright.svg" alt="arrowleft" />
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-wrap gap-4 justify-center">
              <img
                src="./src/assets/escrow/rectangleleft.svg"
                alt="rectangle"
              />
              <div
                className={`justify-center ${styles.wsmall} items-center flex h-full`}
              >
                <img
                  src="./src/assets/escrow/product1.png"
                  className={` ${styles.wsmall}`}
                  alt="product"
                />
              </div>
              <img
                src="./src/assets/escrow/rectangleright.svg"
                alt="rectangle"
              />
            </div>
            <div className="flex gap-4 items-center justify-center flex-row">
              <img src="./src/assets/escrow/smallRectangle.svg" alt="product" />
              <div className="flex flex-col text-center gap-2">
                <h5 className="capitalize font-bold long-title text-xl">
                  Honft
                </h5>
                <p>001 — Black Forest»</p>
                <Link to="/escrowmoreinfo">
                  <Button
                    children={undefined}
                    style={{ width: "550px", height: "40px" }}
                    variant="dark"
                    onClick={() => {
                      setInfo(true);
                    }}
                  >
                    More info
                  </Button>
                </Link>
              </div>
              <img
                src="./src/assets/escrow/smallrightRectangle.svg"
                alt="product"
              />
            </div>
          </div>
          <img src="./src/assets/escrow/arrowleft.svg" alt="arrowright" />
        </div>
      )}
    </div>
  );
}
