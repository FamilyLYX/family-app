import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { Button } from "./buttons";
import OrderModalTable from "../components/common/Tables/OrderModalTable";
import AddressForm from "../components/AddressForm";


const sizes = [
        {
            name: 'xs',
            sleeve_length: 59,
            body_length: 52,
            body_width: 61
        },
        {
            name: 's',
            sleeve_length: 60,
            body_length: 59,
            body_width: 65
        },
        {
            name: 'md',
            sleeve_length: 61,
            body_length: 62,
            body_width: 67
        },
        {
            name: 'l',
            sleeve_length: 62,
            body_length: 65,
            body_width: 69
        },
        {
            name: 'xl',
            sleeve_length: 63,
            body_length: 71,
            body_width: 73
        }
    ];
const props = ['sleeve_length', 'body_length', 'body_width'];


const OrderModal = NiceModal.create(() => {
    const [address, setAddress] = useState();
    const [buy, setBuy] = useState(false);

    const modal = useModal();
    return (
        <Transition appear show={modal.visible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={modal.remove}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-8 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <Dialog.Panel className="mx-auto w-full max-w-7xl transform overflow-hidden xl:rounded-2xl bg-white px-2 py-6 border text-left align-middle shadow-xl transition-all">
                        {
                            !buy ? (
                                <div className="flex xl:flex-row flex-col">
                                    <div className="flex flex-col xl:w-[50%] w-full p-4 m-2 space-y-6">
                                        <p className="long-title text-4xl">Buy <span className="long-title text-4xl text-gray-400 xl:inline">Honft</span> </p>
                                        <AddressForm update={setAddress} />
                                    </div>
                                    <div className="flex flex-col xl:w-[50%] w-full p-4 m-2 space-y-4 ">
                                        <p className="long-title text-4xl text-gray-400">Size Chart</p>
                                        <div className="overflow-hidden border-2 border-gray-200 rounded-3xl">
                                            <OrderModalTable data={sizes} columns={props} />
                                        </div>
                                        <div className="">
                                            <div className="">
                                                <span className="text-gray-400 p-2 m-2">Select sizes:</span>
                                                <div className="flex flex-row p-2 m-2">
                                                    <Button variant="" onClick="" >XS</Button>
                                                    <Button variant="" onClick="" >S</Button>
                                                    <Button variant="" onClick="" >M</Button>
                                                    <Button variant="" onClick="" >L</Button>
                                                    <Button variant="" onClick="" >XL</Button>
                                                </div>
                                            </div>

                                            <div className="">
                                                <span className="text-gray-400 p-2 m-2">Reedem:</span>
                                                <div className="flex flex-row p-2 m-2">
                                                    <Button variant="" onClick="" >Honft Pass:</Button>
                                                    <Button variant="" onClick="" >Giveaway Pass:</Button>
                                                    <Button variant="" onClick="" >Genesis Perk NFT:</Button>
                                                </div>
                                            </div>

                                            <div className="">
                                                <span className="p-2 m-2 text-gray-400">Price:</span>
                                                <br />
                                                <span className="p-2 m-2">1.45655 ETH</span>
                                            </div>

                                            <div className="">
                                                <span className="p-2 m-2 text-gray-400">117USD + 10USD (Shipping Cost)</span>
                                                <div className="p-2">
                                                    <Button variant="dark" onClick={() => {setBuy(true)}} >127</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ): (
                                <div className="mx-auto max-w-md">
                                    <Dialog.Title as="h2" className="text-2xl pl-4 m-4 font-medium leading-6 text-gray-900 text-center">
                                    {"Choose payment method"}
                                    </Dialog.Title>
                                    <div className="space-y-4">
                                        <Button variant="dark" onClick="">
                                            Pay with LYX 1.27
                                        </Button>
                                        
                                        <Button onClick="">
                                            Continue without LYX 127
                                        </Button>
                                    </div>
                                </div>
                            ) 
                        }
                        
                    
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            
        </Dialog>
        </Transition>
    );
});

export default OrderModal