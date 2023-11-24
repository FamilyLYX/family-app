import React from "react";

import product1 from "../../assets/product/product-01.png";
import product2 from "../../assets/product/product-02.png";
import product3 from "../../assets/product/product-03.png";
type Props = {};

const HistoryCard = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 p-4">
        <div className="lg:col-span-1  rounded-xl p-4  bg-black/5">
          <div className="text-xs font-medium text-black/25">Date</div>
          <div className="text-sm font-medium text-gray-900">11 Aug 2023</div>
        </div>
        <div className="lg:col-span-3  border border-black/5 rounded-xl p-4">
          <div className="text-xs text-black/25">Accounts Involved</div>
          <div className="text-sm font-medium text-black">
            TESnUzOkAVukZzFxZlpud2wzNScZJDsbZd6
            <br />
            rJn2zAPdFA193sixJwuFixkRYDUtx3apQh
          </div>
        </div>
        <div className="lg:col-span-2  border border-black/5 rounded-xl p-4">
          <div className="text-xs font-medium text-black/25">Location</div>
          <div className="text-sm font-medium text-black">
            Toronto, Ontario, M3J 3H9
          </div>
        </div>
        <div className="lg:col-span-3  border border-black/5 rounded-xl p-4">
          <div className="text-xs font-medium text-black/25">
            Seller's Description
          </div>
          <div className="text-sm font-medium text-black">
            Lorem ipsum dolor sit amet consectetur. Sit.
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-3 gap-2 max-w-[20rem]">
          <div className="aspect-square w-full">
            <div
              style={{ backgroundImage: `url(${product1})` }}
              className="w-full h-full bg-cover bg-center rounded-xl"
            ></div>
          </div>

          <div className="aspect-square w-full">
            <div
              style={{ backgroundImage: `url(${product2})` }}
              className="w-full h-full bg-cover bg-center rounded-xl"
            ></div>
          </div>

          <div className="aspect-square w-full">
            <div
              style={{ backgroundImage: `url(${product3})` }}
              className="w-full h-full bg-cover bg-center rounded-xl"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
