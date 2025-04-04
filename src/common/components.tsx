import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TokenId } from "./objects";
import { usePhygitalCollection } from "../hooks/usePhygitalCollection";
import { Button } from "./buttons";
import { useAssetPlaceholder } from "../hooks/useAssetPlaceholder";
import { useModal } from "@ebay/nice-modal-react";
import { useTransactionSender } from "../hooks/transactions";
import { getAddress } from "ethers";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { initiateHandover, updateHandover } from "../utils/api";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { User } from "firebase/auth";
// import useUser from "../hooks/useUser";

type HandoverObj = {
  status: string;
  code: string;
  hash: string;
  expiry: Date;
  target: string;
  signature: string;
};

export function ShortAddress({ address }: { address: string }) {
  return (
    <a
      className="cursor-pointer"
      onClick={() => navigator.clipboard.writeText(address)}
    >
      {address?.slice(0, 7)}...{address?.slice(address.length - 5)}
    </a>
  );
}

export function TokenCard({
  tokenId,
  owner,
  address,
  transfer,
  showActions = true,
}: {
  tokenId: TokenId;
  owner?: string;
  address: string;
  showActions?: boolean;
  transfer?: boolean;
}) {
  const { vault, user } = useContext(UserContext);
  const { phygital, getTokenMetadata } = usePhygitalCollection(address);
  const { sendTransaction } = useTransactionSender();
  const query = useQuery({
    queryKey: ["token", tokenId.toString()],
    queryFn: () => getTokenMetadata(tokenId),
  });
  const modal = useModal("family-marketplace-list");
  const transferModal = useModal("family-transfer-modal");
  const registerModal = useModal("family-register-modal");
  const order = { id: tokenId, owner: owner };
  if (query.isLoading) {
    return (
      <div className="w-full aspect-square animate-pulse p-5 bg-slate-200 rounded-3xl"></div>
    );
  }

  function internalTransfer() {
    const address = window.prompt("Address:");

    if (!address) {
      return;
    }
    sendTransaction(phygital, "transfer", [
      "0x31a546976fBa6Fe647D85329a4b774636CD17a41",
      getAddress(address),
      tokenId.toString(),
      false,
      "0x",
    ]);
  }

  return (
    <div className="w-full">
      <img
        className="w-full aspect-square object-cover rounded-3xl"
        src={query.data?.image}
      />
      {/* <img className="w-full aspect-square object-cover rounded-3xl" src='/item_1.png' /> */}
      {query.data && (
        <>
          <p className="long-title text-2xl text-center py-2">
            {query.data?.name}
          </p>
          <p className="text-center text-base text-gray-400 pb-2 h-12 overflow-hidden text-ellipsis">
            {query.data?.description}
          </p>
        </>
      )}
      {address === import.meta.env.VITE_ASSET_PLACEHOLDER && showActions ? (
        <>
          <div className="flex flex-row my-4">
            {(window as any).lukso && (
              <Button
                variant="dark"
                onClick={() => registerModal.show({ order })}
              >
                Register
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row">
            {!transfer && (
              <Button
                variant="dark"
                onClick={() => modal.show({ tokenId, address })}
              >
                Sell
              </Button>
            )}
            {transfer && (
              <Button
                variant="dark"
                onClick={() =>
                  transferModal.show({
                    from: vault,
                    to: user?.uid,
                    tokenId,
                    address,
                  })
                }
              >
                Transfer
              </Button>
            )}
            <Button onClick={() => internalTransfer()}>Info</Button>
          </div>
        </>
      )}
    </div>
  );
}

export function TokenMetadata({
  address,
  tokenId,
  children,
}: {
  address: string;
  tokenId: TokenId;
  children: (owner: string) => any;
}) {
  const { getTokenMetadata } = usePhygitalCollection(address);
  const query = useQuery({
    queryKey: ["token", tokenId.toString()],
    queryFn: () => getTokenMetadata(tokenId),
  });

  if (query.isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="w-full bg-slate-50 rounded-2xl text-slate-900 py-2 px-4 text-center">
      <p>
        This token is owned by <ShortAddress address={query.data?.owner} />
      </p>
      {children(query.data?.owner)}
    </div>
  );
}

export function OrderCard({ tokenId }: { tokenId: TokenId }) {
  const { getTokenMetadata } = useAssetPlaceholder();
  const query = useQuery({
    queryKey: ["token", tokenId.toString()],
    queryFn: () => getTokenMetadata(tokenId),
  });

  return (
    <div className="max-w-xs">
      <img
        className="w-full aspect-square object-cover rounded-3xl"
        src="/item_1.png"
      />
      {query.data && (
        <>
          <p className="long-title text-2xl text-center py-2">
            {query.data.name}
          </p>
          <p className="text-center text-base text-gray-400 pb-2">
            {query.data.description}
          </p>
        </>
      )}
    </div>
  );
}

export function Property({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <span className="font-bold">{title}</span>
      {": "}
      <span>{value}</span>
    </div>
  );
}

export function CollectionCard({ address }: { address: string }) {
  console.log(address);

  const { getCollectionMetadata } = usePhygitalCollection(address);
  const query = useQuery({
    queryKey: ["collection", address],
    queryFn: () => getCollectionMetadata(),
  });

  return (
    <div className="max-w-xs">
      <img
        className="w-full aspect-square object-cover rounded-3xl"
        src="/item_1.png"
      />
      {query.data && (
        <>
          <p className="long-title text-2xl text-center py-2">
            {query.data.name}
          </p>
          <p className="text-center text-base text-gray-400 pb-2">
            {query.data.description}
          </p>
        </>
      )}
    </div>
  );
}

export function NFCCollectionRegCard({
  address,
  uid,
  secret,
  user,
}: {
  address: string;
  uid: string;
  secret: string;
  user: User;
}) {
  console.log(address);

  // uid={uid as string}
  //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //       user={tempUser!}
  //       secret={signature() as string}

  const [handover, setHandover] = useState<HandoverObj | null>(null);
  const [code, setCode] = useState<number | null>(null);

  async function initHandover() {
    const _handover = await initiateHandover(await user.getIdToken(), uid);

    setCode(_handover?.code);
    setHandover(_handover as HandoverObj);
  }

  async function acceptRegistration(codeHash: string) {
    return updateHandover(codeHash, secret);
  }

  useEffect(() => {
    if (!handover) {
      return;
    }

    const db = getFirestore();
    const docRef = doc(db, `handover/${handover.hash}`);

    onSnapshot(docRef, (snapshot) => {
      setHandover(snapshot.data() as HandoverObj);
    });
  }, [handover]);

  // const { getCollectionMetadata } = usePhygitalCollection(address);
  // const query = useQuery({
  //   queryKey: ["collection", address],
  //   queryFn: () => getCollectionMetadata(),
  // });

  const items = [
    <div>Download the UP Extension on your Laptop/PC</div>,
    <div>Login to your account on Familylyx.com</div>,
    <div>Go to your Inventory</div>,
    <div>Merge your Vault to your UP Extension</div>,
    <div>The Claim Button can now be activated</div>,
    <div>Click Claim below to receive your OTP</div>,
    <div>Input the OTP onto the NFT</div>,
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-full relative rounded-lg md:rounded-none">
        <img
          className="w-full md:h-[100vh] object-cover rounded-2xl md:rounded-none"
          src="/honft.png"
        />
        <img
          src="/overlay.svg"
          className="absolute top-0 right-0 h-full hidden md:block"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2 mt-10 md:mt-0 md:h-[100vh] justify-center items-center">
        {code && (
          <div>
            <h3 className="long-title text-8xl mb-4 text-center">{code}</h3>
            <p className="text-xs text-center text-gray-400 py-2">
              Enter this code on the desktop browser to continue registration
            </p>
          </div>
        )}
        {handover?.target && (
          <div>
            <h3 className="long-title text-8xl mb-4 text-center">Register</h3>
            <p className="text-xs text-center text-gray-400 mb-4">
              <b>{handover.target}</b> is trying to regiter this token
            </p>

            <Button onClick={() => acceptRegistration(handover.hash)}>
              Accept
            </Button>
          </div>
        )}
        {!code && !handover?.target && (
          <div className="text-center md:max-w-[529px] p-3 md:p-0">
            <div className="long-title text-8xl mb-4">NFT Claim</div>

            <div className="flex flex-col gap-3 mb-5">
              {items.map((item, idx) => (
                <div className="flex gap-3 items-center">
                  <div className="flex items-center justify-center rounded-full bg-black/50 text-white w-10 h-10">
                    {idx + 1}
                  </div>
                  <div className="flex-1 text-left"> {item}</div>
                </div>
              ))}
            </div>

            <Button variant="dark" onClick={initHandover}>
              Start Registration
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export function NFCCollectionCard({
  address,
  uid,
  secret,
  user,
}: {
  address: string;
  uid: string;
  secret: string;
  user: User;
}) {
  console.log(address);

  const [handover, setHandover] = useState<HandoverObj | null>(null);
  const [code, setCode] = useState<number | null>(null);

  async function initHandover() {
    const _handover = await initiateHandover(await user.getIdToken(), uid);

    setCode(_handover?.code);
    setHandover(_handover as HandoverObj);
  }

  async function acceptRegistration(codeHash: string) {
    return updateHandover(codeHash, secret);
  }

  useEffect(() => {
    if (!handover) {
      return;
    }

    const db = getFirestore();
    const docRef = doc(db, `handover/${handover.hash}`);

    onSnapshot(docRef, (snapshot) => {
      setHandover(snapshot.data() as HandoverObj);
    });
  }, [handover]);

  // const { getCollectionMetadata } = usePhygitalCollection(address);
  // const query = useQuery({
  //   queryKey: ["collection", address],
  //   queryFn: () => getCollectionMetadata(),
  // });

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-full relative rounded-lg md:rounded-none">
        <img
          className="w-full md:h-[100vh] object-cover rounded-2xl md:rounded-none"
          src="/honft.png"
        />
        <img
          src="/overlay.svg"
          className="absolute top-0 right-0 h-full hidden md:block"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2 mt-10 md:mt-0 md:h-[100vh] justify-center items-center">
        {code && (
          <div>
            <h3 className="long-title text-8xl mb-4 text-center">{code}</h3>
            <p className="text-xs text-center text-gray-400 py-2">
              Enter this code on the desktop browser to continue registration
            </p>
          </div>
        )}
        {handover?.target && (
          <div>
            <h3 className="long-title text-8xl mb-4 text-center">Register</h3>
            <p className="text-xs text-center text-gray-400 mb-4">
              <b>{handover.target}</b> is trying to regiter this token
            </p>

            <Button onClick={() => acceptRegistration(handover.hash)}>
              Accept
            </Button>
          </div>
        )}

        {!code && handover?.target && (
          <div className="text-center max-w-[529px]">
            <div className="long-title text-8xl mb-4">Honft</div>
            <div>
              <div className="mb-2.5">
                <img className="mx-auto" src="/honftPronunciation.svg" />
              </div>
              The next evolution of hoodies that blurs the line between the
              physical and digital world. Seamlessly synergising the power of
              technology and the comfort of luxury
            </div>
            <hr className="my-5" />
            <div>
              <Property title="Product Code" value="Honft 001 - Black Forest" />
              <Property title="Owner" value="[Hyperlink]" />
              <Property title="Size" value="[Dynamic]" />
              <Property
                title="Material"
                value="100% French Terry Cotton (500GSM)"
              />
              <Property
                title="Extra Details"
                value="Garment Dyed, Brushed Back, Peach Finish, Relaxed Fit"
              />
              <Property title=" Manufacturing Cost" value="$36" />
              <Property title="Development Cost" value="$23" />
              <Property title="Total Sale Cost" value="$117" />
              Made in China (NTG Textile)
            </div>
            <hr className="my-5" />
            <div className="max-w-[280px] mx-auto">
              Cold Gentle Machine Wash With Similar Colours Do not Bleach, Soak
              or Wring Air Dry Only (Avoid Direct Sunlight) Warm Iron
            </div>
            {/* {query.data && (
            <>
              <p className="long-title text-2xl text-center py-2">
                {query.data.name}
              </p>
              <p className="text-center text-base text-gray-400 pb-2">
                {query.data.description}
              </p>
            </>
          )} */}

            <Button variant="dark" onClick={initHandover}>
              Start Registration
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

type QueryResultViewType = {
  query: UseQueryResult;
  element: (data: any) => JSX.Element | JSX.Element[];
};

export function QueryResultView({ query, element }: QueryResultViewType) {
  const { isLoading, isError, error, data } = query;

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{(error as Error).message}</p>;
  }

  return <>{element(data)}</>;
}
