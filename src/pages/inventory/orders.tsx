import { useQueries } from "@tanstack/react-query";
import { useAssetPlaceholder } from "../../hooks/useAssetPlaceholder";
import { OrderCard } from "../../common/components";
import EmptyState from "./emptyState";
import { Button } from "../../common/buttons";
import { useModal } from "@ebay/nice-modal-react";
import { useOutletContext } from "react-router-dom";
import { Loader } from "../../common/BuyModal";

function TargetOrders({ targets }: { targets: string[] }) {
  const { getOrders } = useAssetPlaceholder();
  const queries = useQueries({
    queries: targets.map((target) => ({
      queryKey: ["orders", target],
      queryFn: () => getOrders(target),
    })),
  });
  const modal = useModal("family-register-modal");

  const isLoading = !!queries.find((q) => q.isLoading);
  const orders = !isLoading
    ? queries.reduce((acc: any[], query, idx) => {
        if (query.isLoading || query.isError) {
          return acc;
        }

        return acc.concat(
          query.data.map((tokenId) => ({
            id: tokenId,
            owner: targets[idx],
          }))
        );
      }, [])
    : [];

  if (isLoading) {
    return <Loader />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="col-span-3">
        <EmptyState message="You don't have any pending orders" />
      </div>
    );
  }

  return (
    <>
      {(orders as any[]).map((order, index) => (
        <div className="mb-4 px-2" key={`order-${index}`}>
          <OrderCard tokenId={order.id} />
          <div className="flex flex-row">
            {(window as any).lukso && (
              <Button
                variant="dark"
                onClick={() => modal.show({ order })}
              >
                Register
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default function Orders() {
  const targets = useOutletContext<string[]>();

  return (
    <div className="space-y-4">  
      <div className="grid grid-flow-row grid-cols-3 w-full">
        <TargetOrders targets={targets} />
      </div>
    </div>
  );
}
