import { useQuery } from "@tanstack/react-query";

import Countdown from "react-countdown";

import { getAllProducts } from "../../utils/api";
import { QueryResultView } from "../../common/components";
import { Button } from "../../common/buttons";
import { hooks } from "../../connectors/default";
import { usePhygitalCollection } from "../../hooks/usePhygitalCollection";
import { useModal } from "@ebay/nice-modal-react";

function ProductCard({
  product
}: {
  product: ProductType
}) {
  const account = hooks.useAccount();
  const buyModal = useModal('family-buy-modal');
  const { getMintStatus } = usePhygitalCollection(product.metadata.contract);
  const mintStatus = useQuery({
    queryKey: ["collection", product.metadata.contract, "status"],
    queryFn: getMintStatus,
  });

  async function handleCheckout () {
    buyModal.show({
      addressRequired: true,
      collection: import.meta.env.VITE_ASSET_CONTRACT,
      variant: '0x00000000000000000000001d',
      to: account as string
    });
  }

  return (
    <div className="max-w-xs">
      <img
        className="w-full aspect-square object-cover rounded-3xl"
        src={product.images[0]}
      />
      {!mintStatus.isLoading && (
        <div className="flex flex-row text-xs text-gray-400 justify-self-end my-8">
          <div className="w-44">Limited to</div>
          <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700 mt-1">
            <div
              className="bg-blue-600 h-1 rounded-full"
              style={{
                width: `${
                  ((mintStatus.data?.minted as number) * 100) /
                  (mintStatus.data?.supply as number)
                }%`,
              }}
            ></div>
          </div>
          <div className="w-44">{mintStatus.data?.minted}/{mintStatus.data?.supply} pcs</div>
        </div>
      )}
      <p className="text-center text-xs text-gray-400">{product.description}</p>
      {!mintStatus.isLoading && (
        <Countdown
          date={new Date((mintStatus.data?.endAt as number) * 1000)}
          intervalDelay={60000}
          renderer={({ days, hours, minutes, completed }) => {
            if (completed) {
              return <p>Minting Closed</p>;
            }

            return (
              <div className="rounded-lg bg-gray-50 text-center p-4 my-4">
                <p className="text-xs">Orders open for next {days} days {hours} hours</p>
                <div className="flex flex-row mt-4 space-x-2">
                  <div className="grow text-2xl border rounded-lg"><span className="long-title">{String(days).padStart(2)}</span><span className="block text-xs">Days</span></div>
                  <div className="grow text-2xl border rounded-lg"><span className="long-title">{String(hours).padStart(2)}</span><span className="block text-xs">Hours</span></div>
                  <div className="grow text-2xl border rounded-lg"><span className="long-title">{String(minutes).padStart(2)}</span><span className="block text-xs">Minutes</span></div>
                </div>
              </div>
            );
          }}
        />
      )}
      <div className="inline">
        <div className="inline-block w-2/3">
          <Button onClick={handleCheckout} variant="dark">
            Buy
          </Button>
        </div>
        <div className="inline-block w-1/3 text-center font-bold">
          <p>$ {product.price.unit_amount / 100}</p>
        </div>
      </div>
    </div>
  );
}

export default function Store() {
  const productQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  return (
    <div className="mt-24">
      <h2 className="long-title text-center text-8xl">Store</h2>
      <div className="flex flex-row justify-center space-x-8">
        <QueryResultView
          query={productQuery}
          element={(data) =>
            (data as ProductType[]).map((product, index) => (
              <ProductCard
                product={product}
                key={index}
              />
            ))
          }
        />
      </div>
    </div>
  );
}
