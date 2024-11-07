import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { LSP4DigitalAssetMetadata } from '@lukso/lsp-factory.js';
import ImageUploading from 'react-images-uploading';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button } from './buttons';
import { axiosClient, requestToClaimHandover } from '../utils/api';
import { TokenId } from './objects';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import overlay1 from '../assets/overlays/Vector 13.png';
import OtpInput from 'react-otp-input';
import { useMarketplace } from '../hooks/useMarketplace';
import { IPFS_GATEWAY, marketplaceContractAddress } from '../constants';
import { usePhygitalCollection } from '../hooks/usePhygitalCollection';
import { hexlify } from 'ethers6';
import axios from 'axios';
import { useStorage, useStorageUpload } from '@thirdweb-dev/react';

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

const ListDigitalModal = NiceModal.create(() => {
  // const { mutateAsync: upload, isLoading } = useStorageUpload();
  const storage = useStorage();

  const modal = useModal();
  const assetAddress = modal.args?.address as string;
  const [waiting, setWaiting] = useState<number>(0);
  const [code, setCode] = useState<string>();
  const [formData, setForm] = useState<Record<any, any>>({});
  const [operator, setOperator] = useState(false);
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const { authorize, listToken } = useMarketplace(assetAddress);
  const { phygital } = usePhygitalCollection(assetAddress);

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const uploadToIPFS = async () => {
    console.log(images);
    // const _formData = new FormData();
    // _formData.append('data', formData);
    // _formData.append('images', images[0]);
    // const data=await LSP4DigitalAssetMetadata.pre
    // const res = await axiosClient.post('/upload', { ...formData, images });

    // const base64Data = (images[0] as any).data_url.split(',')[1]; // Extract base64 data
    // const buffer = Buffer.from(base64Data, 'base64'); // Convert to binary

    const imagesBuffer = images.map((image: any) => {
      const base64Data = image.data_url.split(',')[1]; // Extract base64 data
      const buffer = Buffer.from(base64Data, 'base64'); // Convert to binary
      return buffer;
    });

    const res = await storage!.upload({ ...formData, images: imagesBuffer });

    console.log(res);
    return res[0]!.replace('ipfs://', IPFS_GATEWAY);
  };

  async function getIsOperator() {
    const isOperator = await phygital.getFunction('isOperatorFor')(
      marketplaceContractAddress,
      hexlify((modal.args?.tokenId as TokenId).toString())
    );
    setOperator(isOperator);
  }

  // async function list() {
  //   const listingUrl = await uploadToIPFS();
  //   console.log(listingUrl);

  //   await listToken(
  //     import.meta.env.VITE_ASSET_CONTRACT,
  //     modal.args?.tokenId as TokenId,
  //     Number(formData?.price ?? 0),
  //     listingUrl,
  //     false
  //   );
  // }

  async function list() {
    const listingUrl = await uploadToIPFS();
    console.log(listingUrl);

    await listToken(
      assetAddress,
      modal.args?.tokenId as TokenId,
      Number(formData?.price ?? 0),
      listingUrl,
      false
    );
  }

  async function register(tokenId: TokenId, code: string) {
    tokenId;
    const idToken = await getAuth().currentUser?.getIdToken();

    console.log('handling over');
    const handoverData = await requestToClaimHandover(
      idToken as string,
      code as string
    );
    console.log('handed over', handoverData);
    setWaiting(2);

    onSnapshot(doc(getFirestore(), `handover/${handoverData.hash}`), (snap) => {
      const data: any = snap.data();
      console.log(data);

      if (data.status === 'completed' && data.signature) {
        list();
        // list(data.uid, data.signature);

        setWaiting(3);

        alert('signature received');
      }
    });
  }

  async function authorizeMarket() {
    await authorize(modal.args?.tokenId as TokenId);
    setOperator(true);
  }

  useEffect(() => {
    getIsOperator();
  }, []);

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
              <Dialog.Panel className="w-auto max-w-[80%] transform overflow-hidden rounded-2xl bg-transparent  text-left align-middle shadow-xl transition-all">
                {waiting === 0 && (
                  <div className="flex gap-2 justify-between ">
                    <div className="w-1/2 max-h-[80vh] overflow-y-auto p-10 rounded-[42px] flex flex-col gap-8 bg-white">
                      <div className="long-title text-6xl">
                        Sell{' '}
                        <span className="text-black/50 long-title ">Honft</span>
                      </div>
                      <div className="text-black/60">
                        To sell nft please fill in all the fields below
                      </div>
                      <div className="flex flex-col gap-6">
                        <input
                          className="w-full border px-2 py-4 rounded-lg"
                          placeholder="Loacation"
                          name="location"
                          type="text"
                          onChange={onFormChange}
                        />
                        <input
                          className="w-full border  px-2 py-4 rounded-lg"
                          placeholder="Condition"
                          name="condition"
                          type="text"
                          onChange={onFormChange}
                        />
                        <div>
                          <div className="text-black/25 mb-2">Pictures:</div>
                          <div>
                            <ImageUploading
                              multiple
                              value={images}
                              onChange={onChange}
                              maxNumber={maxNumber}
                              dataURLKey="data_url"
                              acceptType={['jpg', 'png']}
                            >
                              {({
                                imageList,
                                onImageUpload,
                                isDragging,
                                dragProps,
                              }) => (
                                // write your building UI
                                <div className="flex gap-2 items-center">
                                  <button
                                    style={isDragging ? { color: 'red' } : {}}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    className="block w-[62px] h-[62px] border rounded-full"
                                  >
                                    +
                                  </button>
                                  {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                      <img
                                        src={image.data_url}
                                        alt=""
                                        // width="100"
                                        className="block w-[62px] h-[62px] rounded-xl"
                                      />
                                      {/* <div className="image-item__btn-wrapper">
                                      <button
                                        onClick={() => onImageUpdate(index)}
                                      >
                                        Update
                                      </button>
                                      <button
                                        onClick={() => onImageRemove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div> */}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </ImageUploading>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center w-full border justify-between  px-3 py-4 rounded-lg">
                            <input
                              className="block focus:border-black/100 focus:outline-none"
                              placeholder="Price"
                              type="text"
                              name="price"
                              onChange={onFormChange}
                            />
                            <div className="text-black/25 font-bold">LYX</div>
                          </div>
                          <div className="mt-5 flex gap-3">
                            <input type="checkbox"></input>
                            Accept Fiat Payment
                          </div>
                        </div>
                        {operator ? (
                          <Button
                            variant="dark"
                            // disabled={true}
                            // onClick={() => setWaiting(1)}
                            onClick={() => list()}
                          >
                            Sell
                          </Button>
                        ) : (
                          <Button
                            variant="dark"
                            // disabled={true}
                            onClick={() => authorizeMarket()}
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="w-1/2 rounded-[42px] relative">
                      <img
                        className="w-full aspect-square object-cover h-full rounded-[42px]"
                        src="/item_1.png"
                      />
                      <img
                        className=" block absolute z-10 top-0 left-0 w-10 h-full object-cover"
                        src={overlay1}
                      />
                    </div>
                  </div>
                )}
                {waiting > 0 && (
                  <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-8  text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h2"
                      className="font-medium text-gray-900 text-center long-title text-5xl"
                    >
                      List on marketplace
                    </Dialog.Title>
                    <Dialog.Description
                      as="p"
                      className="text-center px-8 mt-4 text-gray-400"
                    >
                      {waiting === 1 && 'Enter your 6-digit code'}
                      {waiting === 2 && 'Waiting for confirmation'}
                      {waiting === 3 &&
                        'Preparing and sending registration transaction'}
                    </Dialog.Description>
                    {waiting === 1 && (
                      <>
                        <OtpInput
                          containerStyle="justify-center my-4"
                          inputStyle={{ width: '32px' }}
                          value={code}
                          onChange={setCode}
                          numInputs={6}
                          renderSeparator={<span></span>}
                          inputType="number"
                          renderInput={({ className, ...props }) => (
                            <input className="border mx-2 py-2" {...props} />
                          )}
                        />
                        <Button
                          variant="dark"
                          onClick={() =>
                            register(
                              modal.args?.tokenId as TokenId,
                              code as string
                            )
                          }
                        >
                          Continue
                        </Button>
                      </>
                    )}
                    {waiting === 2 && (
                      <p className="text-xs text-center text-gray-400">
                        Please accept the request on your mobile device to
                        complete registration.
                      </p>
                    )}
                    {waiting === 3 && (
                      <>
                        <Loader />
                      </>
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

export default ListDigitalModal;
