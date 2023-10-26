import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TokenId } from "./objects";
import { usePhygitalCollection } from "../hooks/usePhygitalCollection";
import { Button } from "./buttons";
import { useAssetPlaceholder } from "../hooks/useAssetPlaceholder";

export function ShortAddress ({ address }: { address: string }) {
  return <a className="cursor-pointer" onClick={() => navigator.clipboard.writeText(address)}>
    {address.slice(0,7)}...{address.slice(address.length - 5)}
  </a>
}

export function TokenCard ({ tokenId, showActions = true }: { tokenId: TokenId, showActions?: boolean }) {
  const { getTokenMetadata } = usePhygitalCollection();
  const query = useQuery({ queryKey: ['token', tokenId.toString()], queryFn: () => getTokenMetadata(tokenId) });

  if (query.isLoading) {
    return <div className="w-full aspect-square animate-pulse p-5 bg-slate-200 rounded-3xl"></div>
  }

  return <div className="w-full">
    <img className="w-full aspect-square object-cover rounded-3xl" src='/item_1.png' />
    { query.data && <>
        <p className="long-title text-2xl text-center py-2">{query.data.name}</p>
        <p className="text-center text-base text-gray-400 pb-2">{query.data.description}</p>
      </>
    }
    { 
      showActions && <>
        <div className="flex flex-row">
          <Button variant="dark" onClick={() => alert('Sell in not available currently. Marketplace is coming soon.')}>Sell</Button>
          <Button onClick={() => console.log('Info Clicked')}>Info</Button>
        </div>
      </>
    }
  </div>
}

export function TokenMetadata ({ tokenId }: { tokenId: TokenId }) {
  const { getTokenMetadata } = usePhygitalCollection();
  const query = useQuery({ queryKey: ['token', tokenId.toString()], queryFn: () => getTokenMetadata(tokenId) });

  if (query.isLoading) {
    return <p>Loading</p>
  }

  return <div className="w-full bg-slate-50 rounded-2xl text-slate-900 py-2 px-4 text-center">
    This token is owned by <ShortAddress address={query.data?.owner}/>
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
  const { getCollectionMetadata } = usePhygitalCollection();
  const query = useQuery({ queryKey: ['collection', address], queryFn: () => getCollectionMetadata() });

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