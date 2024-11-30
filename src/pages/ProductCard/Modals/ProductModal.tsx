import React from "react";
import Modal from "react-modal";
import productImg from "../../../assets/product/product-01.png";
import { Select, TextInput } from "../../../components";
import { Button } from "../../../common/buttons";
import { IoClose } from "react-icons/io5";

Modal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, handleClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="flex items-center justify-center mt-8 mx-auto h-[calc(100vh-20px)] w-full  md:h-[calc(100vh-80px)] md:w-[calc(100vw-100px)]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-80"
      contentLabel="Product Modal"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center max-w-screen-2xl h-full w-full ">
        <div className="overflow-auto app-scrollbar bg-white rounded-t-3xl lg:rounded-3xl  mt-[-20rem] lg:mt-0 min-w-[25vw] w-full max-w-[35rem] max-h-full">
          <div className="flex flex-col gap-2 h-full overflow-y-scroll app-scrollbar p-8 max-h-full">
            <h4 className="text-8xl long-title text-center md:text-start">
              Buy <span className="text-black/50 long-title">Honft</span>
            </h4>
            <p className="mt-4 text-center md:text-start">
              To buy nft, please fill in all fields below
            </p>
            <div className="flex flex-col gap-3">
              <TextInput placeholder="Name*" onChange={console.log} value="" />
              <Select rounded="12px" data={[]} placeholder="Country*" onChange={console.log} value="" />
              <TextInput placeholder="Email*" onChange={console.log} value="" />
              <TextInput placeholder="Phone Number*" onChange={console.log} value="" />
              <TextInput placeholder="Address*" onChange={console.log} value="" />
              <div>
                <p className="text-black/25">Price</p>
                <div className="flex justify-between font-semibold mt-0.5">
                  <span>1,452540354367</span>
                  <span className="text-black/25">ETH</span>
                </div>
              </div>
              <Button variant="dark" onClick={console.log}>Buy</Button>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${productImg})` }}
          className="min-h-[40rem] w-full bg-cover bg-no-repeat rounded-3xl  lg:order-2  flex-1 h-full max-h-[40rem] max-w-[35rem]"
        >
          <div className="relative">
            <IoClose
              className="absolute top-8 right-10 scale-150 cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
