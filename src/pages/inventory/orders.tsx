import { useQuery } from "@tanstack/react-query";
import { useAssetPlaceholder } from "../../hooks/useAssetPlaceholder";
import { TokenId } from "../../common/objects";
import { OrderCard } from "../../common/components";
import EmptyState from "./emptyState";
import { Button } from "../../common/buttons";
import { useModal } from "@ebay/nice-modal-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getAddress, isAddress } from "ethers";

function TargetOrders({ target, canRegister = false, showEmptyState }: { target: string, canRegister: boolean, showEmptyState: boolean }) {
  const { getOrders } = useAssetPlaceholder();
  const { isLoading, data } = useQuery({
    queryKey: ["orders", target],
    queryFn: () => getOrders(target),
  });
  const modal = useModal("family-register-modal");

  if (isLoading) {
    return showEmptyState ? <p>Loading Orders</p> : <></>;
  }

  if (!data || data.length === 0) {
    return showEmptyState ? <div className="col-span-3"><EmptyState message="You don't have any pending orders" /></div> : <></>;
  }

  return (
    <>
      {(data as TokenId[]).map((tokenId, index) => (
        <div className="mb-4 px-2" key={`order-${index}`}>
          <OrderCard tokenId={tokenId} />
          {(window as any).lukso && canRegister && (
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
  const { vault, user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading user info</p>;
  }

  if (!user) {
    navigate("/login");

    return <p></p>;
  }

  return <div className="space-y-4">
    { isAddress(user?.uid) && <div>
      <div className="grid grid-flow-row grid-cols-3 w-full">
        <TargetOrders target={getAddress(user?.uid)} canRegister={true} showEmptyState={true} />
      </div>
    </div> }
    { vault && <div>
      <div className="grid grid-flow-row grid-cols-3 w-full">
        <TargetOrders target={vault} canRegister={false} showEmptyState={!isAddress(user?.uid)}/>
      </div>
    </div> }
  </div>
}
