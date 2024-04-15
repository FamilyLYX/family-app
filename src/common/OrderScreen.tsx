import React, { useState } from "react";
import AddressForm from "../components/AddressForm";
import { Button, LinkButton } from "./buttons";
import OrderModalTable from "../components/common/Tables/OrderModalTable";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const sizes = [
  {
    name: "xs",
    sleeve_length: 59,
    body_length: 52,
    body_width: 61,
  },
  {
    name: "s",
    sleeve_length: 60,
    body_length: 59,
    body_width: 65,
  },
  {
    name: "md",
    sleeve_length: 61,
    body_length: 62,
    body_width: 67,
  },
  {
    name: "l",
    sleeve_length: 62,
    body_length: 65,
    body_width: 69,
  },
  {
    name: "xl",
    sleeve_length: 63,
    body_length: 71,
    body_width: 73,
  },
];
const props = ["sleeve_length", "body_length", "body_width"];

const stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const options = {
  // Fully customizable with appearance API.
  appearance: {
    rules: {
      // ".Label": {
      //   color: "transparent",
      //   fontSize: "0px",
      // },
      ".Input": {
        borderColor: "#e5e7eb",
        borderWidth: "2px",
        paddingTop: "0.85rem",
        paddingBottom: "0.85rem",
        borderRadius: "0.75rem",
      },
    },
  },
};

function OrderScreen() {
  const [next, setNext] = useState(false);
  const [buy, setBuy] = useState(false);
  const [address, setAddress] = useState();

  return (
    <Elements stripe={stripe} options={options}>
      <div className="h-screen w-full p-4 m-2 ">
        <div className="flex flex-col space-y-4">
          {/* Address Screen Mobile */}
          {!next && !buy && (
            <>
              <div className="flex flex-row justify-between">
                <p className="long-title text-8xl ">
                  Buy{" "}
                  <span className="long-title text-8xl text-gray-400 xl:inline">
                    Honft
                  </span>
                </p>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  onClick={() => {
                    window.location.href = "/landing";
                  }}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="black"
                    strokeOpacity="0.07"
                  />

                  <path
                    d="M25 15L15 25M15 15L25 25"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <AddressForm onChange={setAddress} />
              <Button
                variant="dark"
                onClick={() => {
                  setNext(true);
                }}
              >
                Next
              </Button>
            </>
          )}

          {/* Buy Screen Mobile */}
          {next && !buy && (
            <>
              <div className="flex flex-row justify-start space-x-8">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  onClick={() => {
                    setNext(false);
                  }}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="black"
                    strokeOpacity="0.07"
                  />
                  <path
                    d="M25.8334 20H14.1667M14.1667 20L20.0001 25.8334M14.1667 20L20.0001 14.1667"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="long-title text-6xl text-gray-400">Size Chart</p>
              </div>

              <div className="overflow-hidden border-2 border-gray-200 rounded-2xl">
                <OrderModalTable data={sizes} columns={props} />
              </div>

              <div>
                <div>
                  <span className="text-gray-400 p-2 m-2">Select sizes:</span>
                  <div className="flex flex-row p-2 m-2">
                    <Button variant="" onClick="">
                      XS
                    </Button>
                    <Button variant="" onClick="">
                      S
                    </Button>
                    <Button variant="" onClick="">
                      M
                    </Button>
                    <Button variant="" onClick="">
                      L
                    </Button>
                    <Button variant="" onClick="">
                      XL
                    </Button>
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 p-2 m-2">Reedem:</span>
                  <div className="flex flex-row p-2 m-2">
                    <Button variant="" onClick="">
                      Honft Pass:
                    </Button>
                    <Button variant="" onClick="">
                      Giveaway Pass:
                    </Button>
                    <Button variant="" onClick="">
                      Genesis Perk NFT:
                    </Button>
                  </div>
                </div>

                <div>
                  <span className="p-2 m-2 text-gray-400">Price:</span>
                  <br />
                  <span className="p-2 m-2">1.45655 ETH</span>
                </div>

                <div>
                  <span className="p-2 m-2 text-gray-400">
                    117USD + 10USD (Shipping Cost)
                  </span>
                  <div className="p-2">
                    <Button
                      variant="dark"
                      onClick={() => {
                        setBuy(true);
                      }}
                    >
                      127
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Payment method screen Mobile */}
          {buy && (
            <>
              <div className="flex flex-row justify-between">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  onClick={() => {
                    setBuy(false);
                    setNext(true);
                  }}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="black"
                    strokeOpacity="0.07"
                  />
                  <path
                    d="M25.8334 20H14.1667M14.1667 20L20.0001 25.8334M14.1667 20L20.0001 14.1667"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="black"
                    strokeOpacity="0.07"
                  />
                  <path
                    d="M25 15L15 25M15 15L25 25"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="space-y-2 flex flex-col min-h-screen justify-center items-center ">
                <h2 className="text-2xl pl-4 font-medium leading-6 text-gray-900 text-center">
                  Choose Payment Method
                </h2>
                <Button variant="dark" onClick="">
                  Pay with LYX 1.27
                </Button>

                <Button onClick="">Continue without LYX 127</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Elements>
  );
}

export default OrderScreen;
