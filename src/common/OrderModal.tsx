import { Fragment, useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { Button } from "./buttons";
import OrderModalTable from "../components/common/Tables/OrderModalTable";
import AddressForm from "../components/AddressForm";
import { fetchPasses, DiscountPass } from "../services/DiscountService";
import { Elements, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { isEmpty } from "lodash";
import { getShippingCost } from "../utils/api";
import { getCryptoOrderQuote } from "../utils/api";
import {
  ExtensionInterface,
  useTransactionSender,
} from "../hooks/transactions";
import { checkout } from "../utils/payment";

const stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const ORDER_FUNCTION_NAME =
  "placeOrder(address collection, uint256 value, uint256 maxBlockNumber, bytes32 nonce, bytes data, bytes signature)";

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

type OrderDetailProps = {
  passes: DiscountPass[]
  setOrderData: (param: any) => void;
};

function OrderDetail({ passes, setOrderData }: OrderDetailProps) {
  const elements = useElements();
  const [extra, setExtra] = useState({});
  const [size, setSize] = useState({});
  const [pass, setPass] = useState({});
  
  //const [price, setPrice] = useState();

  const sizeVariantMap = {
     "XS":"v1",
     "S":"v2",
     "MD":"v3",
     "L":"v4",
     "XL":"v1"
  }

  const sizes = [
{
    name: "XS",
    sleeve_length: 59,
    body_length: 52,
    body_width: 61,
},
{
    name: "S",
    sleeve_length: 60,
    body_length: 59,
    body_width: 65,
},
{
    name: "MD",
    sleeve_length: 61,
    body_length: 62,
    body_width: 67,
},
{
    name: "L",
    sleeve_length: 62,
    body_length: 65,
    body_width: 69,
},
{
    name: "XL",
    sleeve_length: 63,
    body_length: 71,
    body_width: 73,
},
  ];
  
  const props = ["sleeve_length", "body_length", "body_width"];

  

  async function handleShippingCost(selectedSize:{name:string, variant:string}){
    if (!elements) {
      return;
    }
    const addrEl = elements.getElement("address");
    if (!addrEl) {
      return;
    }

    const address = await addrEl.getValue();
    if (!address.complete) {
      return;
    }

    const countryCode = address.value.address.country;
    console.log(address.value.address.country,'####')
    const shippingCost = await getShippingCost(countryCode); 
    console.log(shippingCost,'!!!!!!')
  }

  async function handleSave() {
      console.log('1')
    if (!elements) {
      return;
    }

    const addrEl = elements.getElement("address");
    console.log('2')
    if (!addrEl) {
      return;
    }

    const address = await addrEl.getValue();
    console.log('3')
    if (!address.complete) {
      return;
    }
    console.log('4',size)
    if (!size){
        return;
    }
    console.log('5',pass)
    if (isEmpty(pass) ){
        return;
    }
    console.log({ address, extra, size, pass }, 'Sab ka sab ek sasath kr diya')
    setOrderData({ address, extra, size, pass });
  }

  return (
    <>
      <div className="flex flex-col xl:w-[50%] w-full p-4 m-2 space-y-6">
        <p className="long-title text-4xl">
          Buy{" "}
          <span className="long-title text-4xl text-gray-400 xl:inline">
            Honft
          </span>{" "}
        </p>
        <AddressForm onChange={setExtra} />
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
              {sizes.map((size) => {
                  return <Button variant="" onClick={()=>handleShippingCost({ name: size.name, variant: sizeVariantMap[size.name] })}>{size.name}</Button>
              })}  
            </div>
          </div>

          <div className="">
            <span className="text-gray-400 p-2 m-2">Reedem:</span>
            <div className="flex flex-row p-2 m-2">
              {passes.map((pass) => {
                return <Button variant="" onClick={()=>setPass(pass)}>{pass.label}</Button>;
              })}
            </div>
          </div>

          <div className="">
            <span className="p-2 m-2 text-gray-400">Price:</span>
            <br />
            <span className="p-2 m-2">1.45655 ETH</span>
          </div>

          <div className="">
            <span className="p-2 m-2 text-gray-400">
              117USD + 10USD (Shipping Cost)
            </span>
            <div className="p-2">
              <Button variant="dark" onClick={()=>{handleSave()}}>
                127
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PaymentDetail() {
  const modal = useModal();
  const { executeTransactionRequest } = useTransactionSender();
  const [loading, setLoading] = useState({ status: 0, message: "Not Loading" });
  const [error, setError] = useState<null | string>(null);
  const product = modal.args?.product as ProductType;

  function buyWithCrypto() {
    if (typeof modal.args?.to !== "string") {
      window.alert("wallet not connected");
      return;
    }

    const profile = modal.args?.to;
    const collection = modal.args?.collection as string;
    const variantId = modal.args?.variant as string;
    const priceId = product.price.id as string;

    setLoading({ status: 1, message: "Fetching quotes for the order" });

    getCryptoOrderQuote(profile, collection, variantId, address, priceId).then(
      (quote) => {
        const [placeholder, value, maxBlockNumber, nonce, data, signature] =
          quote?.params as any[];
        const orderId = quote?.order.id;

        setLoading({ status: 2, message: "Preparing mint transaction" });

        const orderCalldata = ExtensionInterface.encodeFunctionData(
          ORDER_FUNCTION_NAME,
          [placeholder, value, maxBlockNumber, nonce, data, signature]
        );

        executeTransactionRequest({
          to: import.meta.env.VITE_FAMILY_PROFILE,
          value: BigInt(value),
          data: orderCalldata,
        })
          .then(() => {
            // response.wait(1);
            return new Promise((resolve) => setTimeout(resolve, 10000));
          })
          .then(() => {
            window.location.pathname = `/orders/${orderId}`;
          })
          .catch((error) => {
            setError(error.message);
            setLoading({ status: 0, message: "Not Loading" });
          });
      }
    );
  }
  return (
    <div className="mx-auto max-w-md">
      <Dialog.Title
        as="h2"
        className="text-2xl pl-4 m-4 font-medium leading-6 text-gray-900 text-center"
      >
        {"Choose payment method"}
      </Dialog.Title>
      <div className="space-y-2">
        {error && (
          <p className="p-4 bg-red-100 text-red-900 w-full rounded-md text-center">
            {error}
          </p>
        )}
        {!loading.status && (
          <Button variant="dark" onClick={() => buyWithCrypto()}>
            Pay with LYX (
            {(modal.args?.product as ProductType).lyxPrice} LYX)
          </Button>
        )}
        {!loading.status && (
          <Button onClick={() => payWithFiat()}>
            Continue without LYX ({product.price.unit_amount / 100}{" "}
            {product.price.currency.toUpperCase()})
          </Button>
        )}
        {loading.status > 0 && (
          <p className="text-center">{loading.message}</p>
        )}
      </div>
    </div>
  );
}

const options = {
  // Fully customizable with appearance API.
  appearance: {
    rules: {
      ".Label": {
        color: "transparent",
        fontSize: "0px",
      },
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

const OrderModal = NiceModal.create(() => {
  const [orderDetail, setOrderDetails] = useState();
  const [passes, setPasses] = useState<any>([]);

  useEffect(() => {
    fetchPasses().then((data) => {
      console.log(data, "$$$$");
      setPasses(data);
    });
  }, []);

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
                {!orderDetail ? (
                  <div className="flex xl:flex-row flex-col">
                    <Elements stripe={stripe} options={options}>
                      <OrderDetail passes={passes} setOrderData={setOrderDetails} />
                    </Elements>
                  </div>
                ) : (
                  <PaymentDetail />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

export default OrderModal;
