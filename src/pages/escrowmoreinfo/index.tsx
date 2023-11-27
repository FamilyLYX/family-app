import React, { useEffect, useState } from "react";
import ProductInfoMol from "../../components/Escrow/ProductInfoMol";
import ProductInfo from "../../components/Escrow/ProductInfo";
import Gallery from "../../components/Escrow/Gallery";
import Chat from "../../components/Escrow/Chat/Chat";
import { FETCH_TRADE } from "../../queries/trades";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useQuery as reactQuery } from "@tanstack/react-query";
import { usePhygitalCollection } from "../../hooks/usePhygitalCollection";
import { TokenId } from "../../common/objects";

export default function EscrowMoreInfo() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1023);
  const [imageWidth, setImageWidth] = useState<number>(calculateImageWidth());
  const { id } = useParams();
  const { data, loading, error } = useQuery(FETCH_TRADE, {
    variables: { id: id },
  });
  console.log(data, loading, error);
  const { getTokenMetadata } = usePhygitalCollection(data?.trade?.collection);
  const { data: tokenData } = reactQuery({
    queryKey: ["meta", data?.tokenId],
    queryFn: () => getTokenMetadata(TokenId.parseTokenId(data?.trade?.tokenId)),
  });
  console.log("data:", tokenData);
  //variables: { id: `${collectionAddress}:${tokenId}` }
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
          <ProductInfo data={data?.trade} />
          <Gallery data={tokenData} />
          <Chat data={data?.trade} />
        </div>
      )}
    </div>
  );
}
