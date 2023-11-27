import React, { useState } from "react";
import { Button } from "..";
import { Link } from "react-router-dom";
import { useMarketplace } from "../../hooks/useMarketplace";
import { useQuery } from "@tanstack/react-query";
import { usePhygitalCollection } from "../../hooks/usePhygitalCollection";
import { TokenId } from "../../common/objects";
import { hooks } from "../../connectors/default";
import AddAddressModal from "./addAddressModal";

export default function ProductInfo({ data }: { data: any }) {
  const account = hooks.useAccount();
  const [Trackinginfo, setTrackingInfo] = useState<string>(
    "https://auspost.com.au/mypost/track/#/search"
  );
  const [size, setSize] = useState<string>("XXL");
  const [time, setTime] = useState<string>("2023-09-04 09:59:20");
  const [price, setPrice] = useState<string>("1,4525403543647");
  const [trackingModal, setTracking] = useState<boolean>(false);

  const { confirmSent } = useMarketplace();

  const productStatus = "Confirm";
  const result: string = checkProductStatus(productStatus);
  console.log(
    data?.seller?.toString(),
    account?.toString(),
    data?.buyer == account
  );

  function checkProductStatus(status: string): string {
    if (status === "Confirm") {
      return "Confirm";
    } else if (status === "Processing") {
      return "Processing";
    } else {
      return "Unknown status";
    }
  }
  // {
  //   queryKey: ["token", tokenId.toString()],
  //   queryFn: () => getTokenMetadata(tokenId),
  // }
  const { getTokenMetadata } = usePhygitalCollection(data?.collection);
  const { data: tokenData, error } = useQuery({
    queryKey: ["meta", data?.tokenId],
    queryFn: () => getTokenMetadata(TokenId.parseTokenId(data?.tokenId)),
  });
  console.log("data:", tokenData, error);

  return (
    <>
      <div className="flex flex-col h-full gap-[50px]">
        {/* First Content */}
        <div className="flex flex-col gap-2">
          <h2 className="long-title text-start text-8xl">Honft</h2>
          <span className="text-black/30 text-[13px] font-medium">
            001 — Black Forest»
          </span>
        </div>
        {/* Second Content */}
        <div className="flex flex-col gap-2">
          <span className="text-black/30 text-[13px] font-medium">Status:</span>
          <div className="flex flex-row gap-1">
            <img src="/src/assets/escrow/checkIcon.svg" alt="check" />
            <p style={{ color: "#1DCE00" }} className="">
              {result}
            </p>
          </div>
        </div>

        {/* Third Content */}
        <div className="flex flex-col gap-2">
          <span className="text-black/30 text-[13px] font-medium">
            Tracking info:
          </span>
          <p className="text-[14px] font-medium leading-[13.5px] underline font-normal">
            {data?.trackingId ? data?.trackingId : "Not added yet"}
          </p>
        </div>
        {/* Forth Content */}
        <div className="flex flex-col gap-2">
          <span className="text-black/30 text-[13px] font-medium">Size:</span>
          <p className="text-[14px] font-medium leading-[13.5px]  font-normal">
            {tokenData?.size}
          </p>
        </div>

        {/* Fifth Content */}
        <div className="flex flex-col gap-2">
          <span className="text-black/30 text-[13px] font-medium">Time:</span>
          <p className="text-[14px] font-medium leading-[13.5px]  font-normal">
            {time}
          </p>
        </div>

        {/* Sixth Content */}
        <div className="flex flex-col gap-2">
          <span className="text-black/30 text-[13px] font-medium">Price:</span>
          <p className="text-[14px] font-medium leading-[13.5px]  font-normal">
            LYX: {(data?.price ?? 0) / 10 ** 18}
          </p>
          <div className="flex gap-2"></div>

          <Link to="/marketplace">
            <Button
              // variant="dark"
              onClick={console.log}
            >
              Back
            </Button>
          </Link>
          {data?.seller === account?.toLowerCase() && !data?.trackingId && (
            <Button
              // style={{ width: "286px", height: "40px" }}
              variant="dark"
              onClick={() => setTracking(true)}
            >
              Mark as Sent
            </Button>
          )}

          <Button
            style={{ width: "286px", height: "40px" }}
            variant="dark"
            onClick={console.log}
          >
            Open Dispute
          </Button>
          {data?.buyer === account?.toLowerCase() && data?.trackingId && (
            <Button
              // style={{ width: "286px", height: "40px" }}
              variant="dark"
              onClick={() => setTracking(true)}
            >
              Confirm Trade
            </Button>
          )}
        </div>
      </div>
      <AddAddressModal
        isOpen={trackingModal}
        close={() => setTracking(false)}
        action={(link: string) => {
          confirmSent(data?.id ?? "", link);
        }}
      ></AddAddressModal>
    </>
  );
}
