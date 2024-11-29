import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TokenId } from "./objects";
import { usePhygitalCollection } from "../hooks/usePhygitalCollection";
import { Button } from "./buttons";
import { useAssetPlaceholder } from "../hooks/useAssetPlaceholder";
import { useModal } from "@ebay/nice-modal-react";
import { useTransactionSender } from "../hooks/transactions";
import { getAddress } from "ethers";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
// import useUser from "../hooks/useUser";

export function ShortAddress ({ address }: { address: string }) {
  return <a className="cursor-pointer" onClick={() => navigator.clipboard.writeText(address)}>
    {address.slice(0,7)}...{address.slice(address.length - 5)}
  </a>
}

export function TokenCard ({ tokenId, owner, address, transfer, showActions = true }: { tokenId: TokenId,owner?:string, address: string, showActions?: boolean, transfer?: boolean }) {
  const { vault, user } = useContext(UserContext);
  const { phygital, getTokenMetadata } = usePhygitalCollection(address);
  const { sendTransaction } = useTransactionSender();
  const query = useQuery({ queryKey: ['token', tokenId.toString()], queryFn: () => getTokenMetadata(tokenId) });
  const modal = useModal('family-marketplace-list');
  const transferModal = useModal('family-transfer-modal');
  const registerModal = useModal("family-register-modal");
  const order = {id:tokenId,owner:owner};
  if (query.isLoading) {
    return <div className="w-full aspect-square animate-pulse p-5 bg-slate-200 rounded-3xl"></div>
  }

  function internalTransfer() {
    const address = window.prompt('Address:');

    if (!address) { return; }
    sendTransaction(phygital, 'transfer', [
      '0x31a546976fBa6Fe647D85329a4b774636CD17a41',
      getAddress(address),
      tokenId.toString(),
      false,
      '0x'
    ]);
  }

  // return <div className=" bg-white flex flex-col justify-center">
  //   <div className="flex flex-col xl:flex-row ">
  //     <img className="xl:w-[50%]  flex flex-col justify-end xl:left-0 xl:top-0 xl:bottom-0 m-2 xl:m-0 rounded-3xl xl:rounded-none aspect-[1/1.5] xl:aspect-auto  bg-cover w-full " src='/blackhoodie.png' />
    
  //     <div className="xl:w-[50%] w-[100] mx-auto flex flex-col justify-center xl:p-10  p-4 mb-4">

  //       <h2 className="long-title text-center text-8xl">NFT Claim</h2>

  //       <div className="flex ml-[24.5%] py-3">
  //         <img src="/dots/one.ico" alt="Icon" className="inline-block mr-3" />
  //         <p className="font-normal tracking-tighter">         
  //           Download the <span className="font-bold">UP Extension</span> on your Laptop/PC
  //         </p>
  //       </div>

  //       <div className="flex ml-[25%] items-start py-3">
  //         <img src="/dots/two.ico" alt="Icon" className="inline-block mr-4" />
  //         <p className="font-normal tracking-tighter ">         
  //           Login to your account on <span className="font-bold">Familylyx.com</span>
  //         </p>
  //       </div>

  //       <div className="flex ml-[25%] items-start py-3">
  //         <img src="/dots/three.ico" alt="Icon" className="inline-block mr-4" />
  //         <p className="font-normal tracking-tighter">         
  //           Go to your <span className="font-bold">Inventory</span>
  //         </p>
  //       </div>

  //       <div className="flex ml-[25%] items-start py-3">
  //         <img src="/dots/four.ico" alt="Icon" className="inline-block mr-4" />
  //         <p className="font-normal tracking-tighter">         
  //           Merge your <span className="font-bold">Vault</span> to your <span className="font-bold">UP Extension</span>
  //         </p>
  //       </div>

  //       <div className="flex ml-[25%] items-start py-3">
  //         <img src="/dots/five.ico" alt="Icon" className="inline-block mr-4" />
  //         <p className="font-normal tracking-tighter">         
  //           The <span className="font-bold">Claim Button</span> can now be activated
  //         </p>
  //       </div>

  //       <div className="flex ml-[25%] items-start py-3">
  //         <img src="/dots/six.ico" alt="Icon" className="inline-block mr-4" />
  //         <p className="font-normal tracking-tighter">         
  //           Input the <span className="font-bold">OTP</span> onto the NFT
  //         </p>
  //       </div>

  //       <div className="flex ml-[25%] items-start py-3">
  //         <img src="/dots/seven.ico" alt="Icon" className="inline-block mr-4" />
  //         <p className="font-normal tracking-tighter">         
  //           Click <span className="font-bold">Claim</span> below to receive your OTP
  //         </p>
  //       </div>

  //       <div className="mt-[15%] max-w-md mx-auto w-full p-2">
  //         {(window as any).lukso && (
  //         <Button
  //           variant="dark"
  //           onClick={() => registerModal.show({order})}
  //         >
  //           Claim
  //         </Button>
  //       )}
  //       </div>  
      
  //     </div>
  //   </div>
  // </div>
  /* ---------------- ################ ----------------- */

  return <div className="w-full">
    <img className="w-full aspect-square object-cover rounded-3xl" src={query.data.image} />
    <img className="w-full aspect-square object-cover rounded-3xl" src='/item_1.png' />
    { query.data && <>
        <p className="long-title text-2xl text-center py-2">{query.data.name}</p>
        <p className="text-center text-base text-gray-400 pb-2 h-12 overflow-hidden text-ellipsis">{query.data.description}</p>
      </>
    }
    { 
      (address === import.meta.env.VITE_ASSET_PLACEHOLDER && showActions) ? <><div className="flex flex-row my-4">
      {(window as any).lukso && (
        <Button
          variant="dark"
          onClick={() => registerModal.show({order})}
        >
          Register
        </Button>
      )}
    </div></> : <>
        <div className="flex flex-row">
          { !transfer &&  <Button variant="dark" onClick={() => modal.show({ tokenId, address })}>Sell</Button> }
          { transfer &&  <Button variant="dark" onClick={() => transferModal.show({ from: vault, to: user?.uid, tokenId, address })}>Transfer</Button> }
          <Button onClick={() => internalTransfer()}>Info</Button>
        </div>
      </>
    }
  </div>
}

export function TokenMetadata ({ address, tokenId, children }: { address: string, tokenId: TokenId, children: (owner: string) => any }) {
  const { getTokenMetadata } = usePhygitalCollection(address);
  const query = useQuery({ queryKey: ['token', tokenId.toString()], queryFn: () => getTokenMetadata(tokenId) });

  if (query.isLoading) {
    return <p>Loading</p>
  }

  return <div className="w-full bg-slate-50 rounded-2xl text-slate-900 py-2 px-4 text-center">
    <p>This token is owned by <ShortAddress address={query.data?.owner}/></p>
    {children(query.data?.owner)}
  </div>
}

export function OrderCard ({ tokenId }: { tokenId: TokenId }) {
  const { getTokenMetadata } = useAssetPlaceholder();
  const query = useQuery({ queryKey: ['token', tokenId.toString()], queryFn: () => getTokenMetadata(tokenId) });

  return <div className="max-w-xs">
    <img className="w-full aspect-square object-cover rounded-3xl" src='/item_1.png' />
    { query.data && <>
        <p className="long-title text-2xl text-center py-2">{query.data.name}</p>
        <p className="text-center text-base text-gray-400 pb-2">{query.data.description}</p>
      </>
    }
  </div>
}

export function CollectionCard ({ address }: { address: string }) {
  const { getCollectionMetadata } = usePhygitalCollection(address);
  const query = useQuery({ queryKey: ['collection', address], queryFn: () => getCollectionMetadata() });
 console.log(query)
  return <div className="max-w-xs">
    <img className="w-full aspect-square object-cover rounded-3xl" src='/item_1.png' />
    { query.data && <>
        <p className="long-title text-2xl text-center py-2">{query.data.name}</p>
        <p className="text-center text-base text-gray-400 pb-2">{query.data.description}</p>
      </>
    }
  </div>
}

type QueryResultViewType = { query: UseQueryResult, element: (data: any) => JSX.Element | JSX.Element[]};

export function QueryResultView ({ query, element }: QueryResultViewType) {
  const { isLoading, isError, error, data } = query;

  if (isLoading) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>{(error as Error).message}</p>
  }

  return <>{element(data)}</>;
}