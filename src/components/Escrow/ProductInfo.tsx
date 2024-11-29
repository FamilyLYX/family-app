import { useState } from "react";
import { Button } from "..";
import { Link } from "react-router-dom";

export default function ProductInfo() {
  const [Trackinginfo,] = useState<string>(
    "https://auspost.com.au/mypost/track/#/search"
  );
  const [size,] = useState<string>("XXL");
  const [time,] = useState<string>("2023-09-04 09:59:20");
  const [price,] = useState<string>("1,4525403543647");

  const productStatus = "Confirm";
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
        <p className="text-[14px] font-medium leading-[13.5px] underline">
          {Trackinginfo}
        </p>
      </div>
      {/* Forth Content */}
      <div className="flex flex-col gap-2">
        <span className="text-black/30 text-[13px] font-medium">Size:</span>
        <p className="text-[14px] font-medium leading-[13.5px]">
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
        <span className="text-black/30 text-[13px] font-medium">Price:</span>
        <p className="text-[14px] font-medium leading-[13.5px]  font-normal">
          ETH: {price}
        </p>
      </div>

      <div className="flex gap-2">
        <Link to="/marketplace">
          <Button
            // variant="dark"
            onClick={console.log}
          >
            Back
          </Button>
        </Link>

        <Button
          // style={{ width: "286px", height: "40px" }}
          variant="dark"
          onClick={console.log}
        >
          Open Dispute
        </Button>
      </div>
    </div>
  );
}
