import { Fragment, useState, useEffect, useContext } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { Button } from './buttons';
import OrderModalTable from '../components/common/Tables/OrderModalTable';
import AddressForm from '../components/AddressForm';
import { fetchPasses, DiscountPass } from '../services/DiscountService';
import { Elements, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getProductByLabel, getShippingCost } from '../utils/api';
import { getCryptoOrderQuote } from '../utils/api';
import { useTransactionSender } from '../hooks/transactions';
import { UserContext } from '../contexts/UserContext';

import safeGet from 'lodash/get';
import toast from 'react-hot-toast';
import { checkout } from '../utils/payment';
import { isAddress } from 'ethers';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, User } from 'firebase/auth';
import ConnectWallet from './ConnectWallet';

const stripe = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const sizeVariantMap: Record<string, string> = {
  xs: '0x000000000000000000000001',
  s: '0x000000000000000000000002',
  m: '0x000000000000000000000003',
  l: '0x000000000000000000000004',
  xl: '0x000000000000000000000005',
};

const sizes = [
  {
    name: 'xs',
    sleeve_length: 59,
    body_length: 52,
    body_width: 61,
  },
  {
    name: 's',
    sleeve_length: 60,
    body_length: 59,
    body_width: 65,
  },
  {
    name: 'm',
    sleeve_length: 61,
    body_length: 62,
    body_width: 67,
  },
  {
    name: 'l',
    sleeve_length: 62,
    body_length: 65,
    body_width: 69,
  },
  {
    name: 'xl',
    sleeve_length: 63,
    body_length: 71,
    body_width: 73,
  },
];

const props = ['sleeve_length', 'body_length', 'body_width'];

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
  passes: DiscountPass[];
  setOrderData: (param: any) => void;
  price: any;
  product: any;
  lyxFactor: number;
  user: User | undefined
};

function OrderDetail({
  product,
  passes,
  setOrderData,
  price,
  lyxFactor,
  user
}: OrderDetailProps) {
  const elements = useElements();
  const [extra, setExtra] = useState({});
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedPass, setPass] = useState<DiscountPass | null>(null);
  const [variantId, selectVariantId] = useState<string | null>();
  const [shippingCost, setShippingCost] = useState<number>(20);
  const [passTokenId, setPassTokenId] = useState<string | null>(null);
  const [formReady, setFormReady] = useState(false);

  const [verifier, setVerifier] = useState<RecaptchaVerifier | null>(null);
  const mobileLoginModal = useModal('family-mobile-auth');
  const productCost = Number(
    (safeGet(price, 'unit_amount', 0) / 100).toFixed(2)
  );
  const productCurrency = safeGet(price, 'currency', '').toUpperCase();
  const discountedCost = (
    productCost * (selectedPass ? (100 - selectedPass.discount) / 100 : 1)
  ).toFixed(2);

  useEffect(() => {
    if (!selectedSize) {
      return;
    }

    selectVariantId(sizeVariantMap[selectedSize.toLowerCase()]);

    if (selectedPass && selectedPass.tokenIds.length === 1) {
      setPassTokenId(selectedPass.tokenIds[0]);
    }

    fetchShippingCost();
  }, [selectedSize, selectedPass]);

  useEffect(() => {
    const fbAuth = getAuth();

    fbAuth.useDeviceLanguage();

    const _verifier = new RecaptchaVerifier(fbAuth, 'recap', {
      size: 'invisible'
    });

    _verifier.render().then(() => {
      setVerifier(_verifier);
    });
  }, []);

  async function fetchShippingCost() {
    if (!elements) {
      return;
    }

    const addrEl = elements.getElement('address');

    if (!addrEl) {
      return;
    }

    const address = await addrEl.getValue();

    if (!address.complete) {
      return;
    }

    const countryCode = address.value.address.country;

    const shippingCost = await getShippingCost(countryCode);

    setShippingCost(shippingCost);
  }

  async function handleSave() {
    if (!elements) {
      return;
    }

    const addrEl = elements.getElement('address');
    if (!addrEl) {
      return;
    }

    const address = await addrEl.getValue();
    if (!address.complete) {
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size');

      return;
    }

    setOrderData({
      address,
      meta: extra,
      size: selectedSize,
      pass: selectedPass,
      variantId: variantId,
      collection: product.metadata.contract,
      passTokenId,
      shippingCost,
    });
  }

  async function handleMobileOtpLogin() {
    if (!elements) {
      return;
    }

    const addrEl = elements.getElement('address');
    if (!addrEl) {
      return;
    }

    const address = await addrEl.getValue();
    const phone = address.value.phone;

    if (!phone) {
      toast.error('Please enter a valid phone number');

      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size');

      return;
    }

    if (!verifier) {
      toast.error('Looks like an issue with re-captcha');

      return;
    }

    const fbAuth = getAuth();
    signInWithPhoneNumber(fbAuth, phone, verifier).then((confirmationResult) => {
      mobileLoginModal.show({ confirmationResult }).then(() => {
        handleSave();
      });
    });
  }

  return (
    <>
      <div id='recap'></div>
      <div className="flex flex-col xl:w-[50%] w-full p-4 m-2 space-y-6">
        {formReady && (
          <p className="long-title text-4xl">
            Buy
            <span className="long-title text-4xl text-gray-400 xl:inline ml-2">
              Honft
            </span>
          </p>
        )}
        <AddressForm onChange={setExtra} onReady={() => setFormReady(true)} />
      </div>
      {formReady && (
        <div className="flex flex-col xl:w-[50%] w-full h-auto p-4 m-2 space-y-4 ">
          <p className="long-title text-4xl text-gray-400">Size Chart</p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img
              src="/size.png"
              className="block md:max-w-[35%]"
              alt="size-image"
            />
            <div className="overflow-x-auto w-full md:flex-1">
              <div className="overflow-x-auto w-full border-2 border-gray-200 rounded-3xl">
                <OrderModalTable data={sizes} columns={props} />
              </div>
            </div>
          </div>
          <div>
            <span className="text-gray-400 mb-2">Select Size:</span>
            <div className="flex flex-row">
              {sizes.map((size, sizeIdx) => {
                return (
                  <Button
                    key={sizeIdx}
                    variant={selectedSize === size.name ? 'dark' : ''}
                    onClick={() => setSelectedSize(size.name)}
                  >
                    {size.name.toUpperCase()}
                  </Button>
                );
              })}
            </div>
          </div>

          {!user && <ConnectWallet label='Connect UP Wallet to Avail Discounts' />}

          {passes && passes.length !== 0 && (
            <div>
              <span className="text-gray-400 mb-2">Reedem:</span>
              <div className="flex flex-row">
                {passes.map((pass, passIdx) => {
                  return (
                    <Button
                      key={passIdx}
                      variant={selectedPass === pass ? 'dark' : ''}
                      onClick={() =>
                        setPass(selectedPass === pass ? null : pass)
                      }
                    >
                      <span className="capitalize">
                        {pass.label}:{' '}
                        {(Number(productCost) * (100 - pass.discount)) / 100}{' '}
                        {productCurrency}
                        <span className="line-through text-gray-400 ml-2">
                          {productCost} {productCurrency}
                        </span>
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedPass && selectedPass.tokenIds.length > 1 && (
            <div>
              <span className="text-gray-400 mb-2">Select Pass:</span>
              <div className="flex flex-row">
                {selectedPass.tokenIds.map((tokenId, passTokenIdx) => {
                  return (
                    <Button
                      key={passTokenIdx}
                      variant={tokenId === passTokenId ? 'dark' : ''}
                      onClick={() =>
                        setPassTokenId(tokenId === passTokenId ? null : tokenId)
                      }
                    >
                      <span className="capitalize">
                        {tokenId.substring(0, 5)}...
                        {tokenId.substring(tokenId.length - 5)}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-grow"></div>
          <div className="">
            <span className=" text-gray-400">Price:</span>
            <br />
            <span className="">
              {((Number(discountedCost) + shippingCost) * lyxFactor).toFixed(2)}{' '}
              LYX
            </span>
          </div>

          <div className="">
            <span className=" text-gray-400">
              ≈ {discountedCost} {productCurrency} +{' '}
              {shippingCost ? (
                <span>{shippingCost}USD (Shipping Cost) </span>
              ) : (
                'Shipping Cost'
              )}
            </span>
            <div>

              {user && <Button
                variant="dark"
                onClick={() => {
                  handleSave();
                }}
              >
                Continue To Payment
              </Button>}
              {!user && <Button
                variant="dark"
                id="mobile-login-button"
                onClick={handleMobileOtpLogin}
              >
                Continue To Payment
              </Button>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PaymentDetail({
  product,
  price,
  shippingCost,
  discountPass,
  account,
  collection,
  variantId,
  address,
  lyxFactor,
}: any) {
  const { executeTransactionRequest } = useTransactionSender();
  const [loading, setLoading] = useState({ status: 0, message: 'Not Loading' });
  const [error, setError] = useState<null | string>(null);

  const discountFactor =
    discountPass && discountPass.pass
      ? (100 - discountPass.pass.discount) / 100
      : 1;
  const totalCost = (price.unit_amount / 100) * discountFactor + shippingCost;

  const pass =
    discountPass && discountPass.pass
      ? {
        address: discountPass.pass.address,
        id: discountPass.tokenId,
      }
      : null;

  function buyWithCrypto() {
    setLoading({ status: 1, message: 'Fetching quotes for the order' });

    getCryptoOrderQuote(
      account,
      collection,
      variantId,
      address,
      product.id,
      pass
    ).then((quote) => {
      setLoading({ status: 2, message: 'Preparing mint transaction' });

      if (!quote || !quote.value || !quote.calldata) {
        console.log('Invalid Quote');

        return;
      }

      executeTransactionRequest({
        to: import.meta.env.VITE_FAMILY_PROFILE,
        value: BigInt(quote.value),
        data: quote.calldata,
      })
        .then(() => {
          // response.wait(1);
          return new Promise((resolve) => setTimeout(resolve, 10000));
        })
        .then(() => {
          window.location.pathname = `/orders/${quote.order.id}`;
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ status: 0, message: 'Not Loading' });
        });
    });
  }

  async function payWithFiat() {
    setLoading({ status: 1, message: 'Fetching quotes for the order' });

    const url = await checkout(
      collection,
      variantId,
      address,
      product.id,
      pass,
      'stripe'
    );

    window.location = url;
  }

  async function payWithCoinbase() {
    setLoading({ status: 1, message: 'Fetching quotes for the order' });

    const url = await checkout(
      collection,
      variantId,
      address,
      product.id,
      pass,
      'coinbase'
    );

    window.location = url;
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="text-2xl pl-4 m-4 font-medium leading-6 text-gray-900 text-center">
        Choose payment method
      </h2>
      <div className="space-y-2">
        {error && (
          <p className="p-4 bg-red-100 text-red-900 w-full rounded-md text-center">
            {error}
          </p>
        )}
        {!loading.status && (window as any).lukso && (
          <Button variant="dark" onClick={() => buyWithCrypto()}>
            LYX ({(totalCost * lyxFactor).toFixed(3)} LYX)
          </Button>
        )}
        {!loading.status && (
          <Button onClick={() => payWithFiat()}>
            Fiat ({totalCost} {price.currency.toUpperCase()})
          </Button>
        )}
        {!loading.status && (
          <Button onClick={() => payWithCoinbase()}>
            Other Cryptocurrencies ({totalCost} {price.currency.toUpperCase()})
          </Button>
        )}
        {loading.status > 0 && <p className="text-center">{loading.message}</p>}
      </div>
    </div>
  );
}

type OrderViewProps = {
  label: string;
};
export function OrderView({ label }: OrderViewProps) {
  const [orderDetail, setOrderDetails] = useState();
  const [passes, setPasses] = useState<any>([]);
  const { user, loading } = useContext(UserContext);
  const [data, setData] = useState<undefined | null>();

  useEffect(() => {
    if (loading) {
      console.log('user does not exists');
      return;
    }

    console.log('fetch product by label');

    getProductByLabel(label).then((_data) => {
      setData(_data);

      const productContract = safeGet(_data, 'product.metadata.contract');

      if (!isAddress(productContract)) {
        return;
      }

      if (!user) { return; }

      fetchPasses(user.uid, productContract).then((userPasses) => {
        setPasses(userPasses.filter((pass) => pass.tokenIds.length > 0));
      });
    });
  }, [loading, user]);

  if (loading || data === undefined) {
    console.log({ loading, data });
    return <Loader />;
  }

  if (!orderDetail) {
    return (
      <div className="flex xl:flex-row flex-col">
        <Elements stripe={stripe} options={options}>
          <OrderDetail
            passes={passes}
            setOrderData={setOrderDetails}
            product={safeGet(data, 'product', {})}
            price={safeGet(data, 'price')}
            lyxFactor={safeGet(data, 'lyxFactor', 0)}
            user={user}
          />
        </Elements>
      </div>
    );
  }

  return (
    <PaymentDetail
      product={safeGet(data, 'product')}
      price={safeGet(data, 'price')}
      account={user?.uid}
      variantId={safeGet(orderDetail, 'variantId', '')}
      address={safeGet(orderDetail, 'address', '')}
      shippingCost={safeGet(orderDetail, 'shippingCost', '')}
      lyxFactor={safeGet(data, 'lyxFactor', 0)}
      discountPass={{
        pass: safeGet(orderDetail, 'pass', ''),
        tokenId: safeGet(orderDetail, 'passTokenId', ''),
      }}
    />
  );
}

const options = {
  // Fully customizable with appearance API.
  appearance: {
    rules: {
      // ".Label": {
      //   color: "transparent",
      //   fontSize: "0px",
      // },
      '.Input': {
        borderColor: '#e5e7eb',
        borderWidth: '2px',
        paddingTop: '0.85rem',
        paddingBottom: '0.85rem',
        borderRadius: '0.75rem',
      },
    },
  },
};

const OrderModal = NiceModal.create(() => {
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
                <OrderView label="cherry-blossoms" />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

export default OrderModal;
