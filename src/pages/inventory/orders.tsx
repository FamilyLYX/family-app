import { useQuery } from "@tanstack/react-query";
import { useAssetPlaceholder } from "../../hooks/useAssetPlaceholder";
import { TokenId } from "../../common/objects";
import { OrderCard } from "../../common/components";
import EmptyState from "./emptyState";
import { Button } from "../../common/buttons";
import { useModal } from "@ebay/nice-modal-react";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

export default function Orders () {
  const { getOrders } = useAssetPlaceholder();
  const { data: target } = useQuery({ queryKey: ['user-claims'], queryFn: () => getAuth().currentUser?.getIdTokenResult(true).then(token => {
    console.log(token.claims);

    return token.claims?.target
  }) })
  const { isLoading, data } = useQuery({ queryKey: ['orders', target], enabled: !!target, queryFn: () => getOrders(target as string) });
  const modal = useModal('family-register-modal');

  if (!target) {
    return <p>Wallet not connected</p>
  }

  if (isLoading) {
    return <p>Loading Orders</p>
  }

  if (!data || data.length === 0) {
    return <EmptyState message="You don't have any pending orders"/>
  }

  return <div className="w-full grid grid-flow-row grid-cols-3">
    { (data as TokenId[]).map((tokenId, index) => <div className="mb-4 px-2" key={`order-${index}`}>
      <OrderCard tokenId={tokenId}/>
      <div className="flex flex-row">
        <Button variant="dark" onClick={() => modal.show({ tokenId: tokenId })}>Register</Button>
      </div>
    </div>) }
  </div>
}