import { Outlet, useNavigate } from "react-router-dom";
import { LinkButton } from "../../common/buttons";
import { isAddress } from "ethers";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ConnectWallet from "../../common/ConnectWallet";
import { Loader } from "../../common/BuyModal";

export default function Inventory() {
  const { profile, user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) {
    return <Loader />
  }

  if (!user) {
    navigate("/login");

    return <p></p>;
  }

  return (
    <div className="mt-24">
      <h2 className="long-title text-center text-8xl">Inventory</h2>
      <p className="text-center text-gray-400 py-2">Here you can fully interact with your NFTs, sell them, study them, etc.</p>
      <div className="max-w-2xl mx-auto flex flex-row justify-center mt-4">
        {/* <LinkButton variant="outline" to="/inventory/phygitals">Phygitals</LinkButton> */}
        {/* <LinkButton variant="outline" to="/inventory/digitals">Digitals</LinkButton> */}
        {/* <LinkButton variant="outline" to="/inventory/orders">Orders</LinkButton> */}
      </div>
      <div className="my-4 mx-auto w-full max-w-4xl space-y-4">
        <Outlet context={[profile]}/>
        { !isAddress(user?.uid) && <div className="space-y-4 text-center bg-gray-100 shadow-xl p-4 rounded-lg">
          <small>Connect to your universal profile to claim your assets.</small>
          <div className="max-w-xs mx-auto"><ConnectWallet /></div>
        </div> }
      </div>
    </div>
  );
}
