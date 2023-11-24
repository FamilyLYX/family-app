import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import productImg from "../../../assets/product/product-01.png";
import { Select, TextInput } from "../../../components";
import { Button } from "../../../common/buttons";
import { IoClose } from "react-icons/io5";
import HistoryCard from "../../../components/Product/HistoryCard";

// Make sure you have initialized TailwindCSS by creating a tailwind.config.js and including the Tailwind base styles in your CSS.

// Bind the modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const ProductHistory = ({ isOpen, handleClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="flex items-center justify-center  h-screen lg:h-[100vh]  relative w-[calc(100%-0.4rem)] mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-80  "
      contentLabel="Product Modal"
    >
      <div className="bg-white rounded-none lg:rounded-t-3xl w-full h-full  pb-2 overflow-hidden max-h-full lg:max-h-[40rem]  absolute bottom-0">
        <div className="sticky top-0 px-8 py-5 pt-8 bg-white flex items-center justify-between">
          <h1 className="text-5xl long-title">History</h1>
          <IoClose
            className="scale-[1.6] cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="overflow-auto h-full  p-4 lg:p-8 pb-28 app-scrollbar">
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
        </div>
      </div>
    </Modal>
  );
};

export default ProductHistory;
