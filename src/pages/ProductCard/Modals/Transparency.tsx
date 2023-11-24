import Modal from "react-modal";

import { IoClose } from "react-icons/io5";

Modal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const Transparency: React.FC<ModalProps> = ({ isOpen, handleClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="flex items-center justify-end  h-screen lg:h-[100vh]  relative w-[calc(100%-0.4rem)] mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-10  "
      contentLabel="Product Modal"
    >
      <div className="bg-white w-full md:max-w-[25rem] h-full  pb-2 overflow-hidden  absolute bottom-0 flex ">
        <div className="w-full mt-0 md:mt-10">
          <div className="sticky top-0  px-4 py-5 pt-8  flex flex-row items-center md:items-start justify-between md:justify-start md:flex-col-reverse gap-8 ">
            <h1 className="text-5xl long-title">Transparency</h1>
            <IoClose
              className="scale-[1.6] cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="overflow-auto h-full  p-4 lg:p-8 pb-28 app-scrollbar max-h-[30rem]">
            <div className="border-b py-3">
              <p className="text-sm font-normal text-black/25">Materials</p>
              <p className="text-md font-semibold text-black">Blue Rocks</p>
            </div>

            <div className="border-b py-3">
              <p className="text-sm font-normal text-black/25">Materials</p>
              <p className="text-md font-semibold text-black">Blue Rocks</p>
            </div>

            <div className="border-b py-3">
              <p className="text-sm font-normal text-black/25">Materials</p>
              <p className="text-md font-semibold text-black">Blue Rocks</p>
            </div>

            <div className="border-b py-3">
              <p className="text-sm font-normal text-black/25">Materials</p>
              <p className="text-md font-semibold text-black">Blue Rocks</p>
            </div>

            <div className="border-b py-3">
              <p className="text-sm font-normal text-black/25">Materials</p>
              <p className="text-md font-semibold text-black">Blue Rocks</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Transparency;
