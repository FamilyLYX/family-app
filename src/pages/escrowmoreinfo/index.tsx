import React, { useEffect, useState } from "react";
import ProductInfoMol from "../../components/Escrow/ProductInfoMol";
import ProductInfo from "../../components/Escrow/ProductInfo";
import Gallery from "../../components/Escrow/Gallery";
import Chat from "../../components/Escrow/Chat/Chat";

export default function EscrowMoreInfo() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1023);
  const [imageWidth, setImageWidth] = useState<number>(calculateImageWidth());

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

  function calculateImageWidth(): number {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 320 && screenWidth < 400) {
      return 320;
    } else {
      return 400;
    }
  }

  return (
    <div>
      {isMobile ? (
        <div className="px-5">
          <ProductInfoMol />
        </div>
      ) : (
        <div className="flex px-20 flex-row justify-around w-full mt-10 h-screen">
          <ProductInfo />
          <Gallery />
          <Chat />
        </div>
      )}
    </div>
  );
}
