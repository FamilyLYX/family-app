import React, { useState } from "react";
import { Button } from "..";
import YourComponent from "./ImageSwiper";
import ChatMol from "./Chat/ChatMol";

interface ProductInfoMolProps {
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductInfoMol: React.FC<ProductInfoMolProps> = ({ setOpenChat }) => {
  const [Trackinginfo, setTrackingInfo] = useState<string>(
    "https://auspost.com.au/mypost/track/#/search"
  );
  const [size, setSize] = useState<string>("XXL");
  const [time, setTime] = useState<string>("2023-09-04 09:59:20");
  const [price, setPrice] = useState<string>("1,4525403543647");
  const [openchat, setOpenChatState] = useState<boolean>(false);

  const productStatus: string = "Confirm";
  const result: string = checkProductStatus(productStatus);

  function checkProductStatus(status: string): string {
    if (status === "Confirm") {
      return "Confirm";
    } else if (status === "Processing") {
      return "Processing";
    } else {
      return "Unknown status";
    }
  }

  return (
    <>
      {openchat ? (
        <div className="w-full h-screen">
          <ChatMol setOpenChat={setOpenChat} />
        </div>
      ) : (
        <div className="flex flex-col h-full gap-[50px]">
          {/* First Content */}
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="long-title text-start text-8xl">Honft</h2>
            <span className="text-black/30 text-[13px] font-medium">
              001 — Black Forest»
            </span>
          </div>
          {/* Image Section */}
          <div className="items-center ">
            <YourComponent />
          </div>
          {/* Second Content */}
          <div className="flex flex-col gap-2">
            <span className="text-black/30 text-[13px] font-medium">
              Status:
            </span>
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
              {Trackinginfo}
            </p>
          </div>
          {/* Fourth Content */}
          <div className="flex flex-col gap-2">
            <span className="text-black/30 text-[13px] font-medium">Size:</span>
            <p className="text-[14px] font-medium leading-[13.5px]  font-normal">
              {size}
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
            <span className="text-black/30 text-[13px] font-medium">
              Price:
            </span>
            <p className="text-[14px] font-medium leading-[13.5px]  font-normal">
              ETH: {price}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="dark" children={undefined} onClick={undefined}>
              Open Dispute
            </Button>

            <Button
              style={{ width: "286px", height: "40px" }}
              //   variant="dark"
              children={undefined}
              onClick={() => {
                setOpenChat(true);
              }}
            >
              Chat
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfoMol;
