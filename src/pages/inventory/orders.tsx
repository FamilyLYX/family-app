import { useQuery } from "@tanstack/react-query";
import { useAssetPlaceholder } from "../../hooks/useAssetPlaceholder";
import { TokenId } from "../../common/objects";
import { OrderCard } from "../../common/components";
import EmptyState from "./emptyState";
import { Button } from "../../common/buttons";
import { useModal } from "@ebay/nice-modal-react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function TargetOrders({ address }: { address: string }) {
  const { getOrders } = useAssetPlaceholder();
  const { isLoading, data } = useQuery({
    queryKey: ["orders", address],
    queryFn: () => getOrders(address),
  });
  const modal = useModal("family-register-modal");

  if (isLoading) {
    return <p>Loading Orders</p>;
  }

  if (!data || data.length === 0) {
    return <div className="col-span-3"><EmptyState message="You don't have any pending orders" /></div>;
  }

  return (
    <>
      {(data as TokenId[]).map((tokenId, index) => (
        <div className="mb-4 px-2" key={`order-${index}`}>
          <OrderCard tokenId={tokenId} />
          {(window as any).lukso && (
            <div className="flex flex-row">
              <Button
                variant="dark"
                onClick={() => modal.show({ tokenId: tokenId })}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default function Orders() {
  const { target, user, loading } = useUser();
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading user info</p>;
  }

  if (!user) {
    navigate("/login");

    return <p></p>;
  }

  if (user && !target) {
    return <EmptyState message="You don't have any pending orders" />;
  }

  return (
    <div>
      {/* {!isAddress(user.uid) && (
        <div className="mb-4">
          <p className="p-4 w-full text-center">
            Connect wallet to register these items and get an NFT
          </p>
          <div className="max-w-xs mx-auto"><ConnectWallet /></div>
        </div>
      )} */}
      <div className="w-full grid grid-flow-row grid-cols-3">
        <TargetOrders address={target as string} />
      </div>
    </div>
  );
}
