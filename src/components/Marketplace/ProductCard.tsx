import React from "react";

interface ProductCardProps {
  data: {
    image: string; // Assuming image is a URL or a file path
    title: string;
    price: string;
    price_unit: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  return (
    <div className="card rounded-xl overflow-hidden ">
      <img
        src={data.image}
        alt=""
        className="w-full rounded-3xl overflow-hidden h-[28rem] object-cover "
      />
      <div className="p-4 flex flex-col justify-center items-center">
        <h5 className="capitalize font-bold long-title text-xl">
          {data.title}
        </h5>
        <p className="text-black font-semibold">
          {data.price}{" "}
          <span className="text-black/30 font-medium">{data.price_unit}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
