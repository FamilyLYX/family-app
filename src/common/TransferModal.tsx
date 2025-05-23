import { useContext } from "react";
import { Transition, Dialog } from "@headlessui/react";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button } from "./buttons";
import { TokenId } from "./objects";
import { UserContext } from "../contexts/UserContext";
import { Contract } from "ethers";
import { useVaultFactory } from "../hooks/useVault";
import { useTransactionSender } from "../hooks/transactions";
import { usePhygitalCollection } from "../hooks/usePhygitalCollection";

export function Loader() {
  return (
    <div className="p-4 mx-auto w-20" role="status">
      <svg
        aria-hidden="true"
        className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function ModalWrapper({
  children,
  visible,
  remove,
}: {
  children: any;
  visible: boolean;
  remove: any;
}) {
  return (
    <Transition appear show={visible}>
      <Dialog as="div" className="relative z-10" onClose={remove}>
        <Transition.Child
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
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            ></Transition.Child>
            {children}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function ModalContent({ title, description, children }: any) {
  return (
    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-8  text-left align-middle shadow-xl transition-all">
      <Dialog.Title
        as="h2"
        className="font-medium text-gray-900 text-center long-title text-5xl"
      >
        {title}
      </Dialog.Title>
      {description && (
        <Dialog.Description
          as="p"
          className="text-center px-8 mt-4 text-gray-400"
        >
          {description}
        </Dialog.Description>
      )}
      {children}
    </Dialog.Panel>
  );
}

const TransferModal = NiceModal.create(() => {
  const modal = useModal();
  const { vault } = useContext(UserContext);
  const { from, to } = modal.args as { from: string; to: string };
  const tokenId = modal.args?.tokenId as TokenId;
  const address = modal.args?.address as string;
  const vaultFactory = useVaultFactory();
  const { phygital } = usePhygitalCollection(address);
  const { sendTransaction } = useTransactionSender();

  function transfer() {
    const transferParams = [
      from,
      to,
      tokenId.toString(),
      false,
      '0x'
    ];

    if (from === vault) {
      const transferCalldata = phygital.interface.encodeFunctionData('transfer', transferParams);

      const vaultContract = vaultFactory.attach(vault) as Contract;
      
      return sendTransaction(vaultContract, 'execute', [0, address, 0, transferCalldata]);
    }

    return sendTransaction(phygital, 'transfer', transferParams)
  }

  return (
    <ModalWrapper remove={modal.remove} visible={modal.visible}>
      <ModalContent title="Transfer" description="You need to transfer asset to your profile before listing on marketplace">
        <div className="text-center space-y-4">
        <small>Transfering to</small><br/>
        <small className="font-bold">{to}</small>
        <Button variant="dark" onClick={() => transfer()}>
          Transfer
        </Button>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
});

export default TransferModal;
