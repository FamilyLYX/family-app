import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TokenId } from "./objects";
import { usePhygitalCollection } from "../hooks/usePhygitalCollection";
import { Button } from "./buttons";
import { useAssetPlaceholder } from "../hooks/useAssetPlaceholder";
import { useModal } from "@ebay/nice-modal-react";
import { useQuery as useApolloQuery } from "@apollo/client";
import { FETCH_LISTING } from "../queries/listing";
import { useMarketplace } from "../hooks/useMarketplace";
// import useUser from "../hooks/useUser";

export function ShortAddress({ address }: { address: string }) {
  return (
    <a
      className="cursor-pointer"
      onClick={() => navigator.clipboard.writeText(address)}
    >
      {address.slice(0, 7)}...{address.slice(address.length - 5)}
    </a>
  );
}

export function TokenCard({
  tokenId,
  address,
  showActions = true,
  tokenType = "phygital",
}: {
  tokenId: TokenId;
  address: string;
  showActions?: boolean;
  tokenType?: string;
}) {
  const { getTokenMetadata } = usePhygitalCollection(address);
  const { removeFromSale } = useMarketplace();
  const query = useQuery({
    queryKey: ["token", tokenId.toString()],
    queryFn: () => getTokenMetadata(tokenId),
  });
  console.log(`${address}:${tokenId.toString()}`);
  const {
    data,
    loading,
    error: listingError,
  } = useApolloQuery(FETCH_LISTING, {
    variables: {
      id: "0x6cc952f6439aa16058a10e51d22a85e8e19355a7:0x4b8edcec427e000000000000000000000000001d00000000000000000000003a",
    },
  });
  console.log(loading, data, address, tokenId.toString(), listingError);
  const modal = useModal(
    tokenType === "digital"
      ? "family-marketplace-digital-list"
      : "family-marketplace-list"
  );

  if (query.isLoading || loading) {
    return (
      <div className="w-full aspect-square animate-pulse p-5 bg-slate-200 rounded-3xl"></div>
    );
  }

  return (
    <div className="w-full">
      <img
        className="w-full aspect-square object-cover rounded-3xl"
        src={query.data.image}
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
      {showActions && (
        <>
          <div className="flex flex-row">
            {data?.listing ? (
              <Button
                variant="dark"
                onClick={() => {
                  removeFromSale(address, tokenId);
                }}
              >
                Remove
              </Button>
            ) : (
              <Button variant="dark" onClick={() => modal.show({ tokenId })}>
                Sell
              </Button>
            )}
            <Button onClick={() => window.alert(tokenId.toString())}>
              Info
            </Button>
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

export function CollectionCard({ address }: { address: string }) {
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
