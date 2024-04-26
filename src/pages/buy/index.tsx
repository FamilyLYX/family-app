import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { OrderView,Loader } from "../../common/OrderModal";

export default function BuyItem() {
  const { user, loading } = useContext(UserContext);
  console.log(loading);

  // If user is not logged in, navigate to login page
  if(loading){
    return <Loader />;
  }
  if (!user  && !loading) {
    window.location.href = "/login";
    return null; // or a loading indicator while navigating
  }


  return <div>
    <OrderView label="honft" />
  </div>
}