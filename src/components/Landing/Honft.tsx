import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import { useModal } from "@ebay/nice-modal-react";
import CountdownTimer from "./common/CountdownTimer";

type Item = {
  title:string;
  desc:string;
}

function ItemTrait(item:Item) {
  return (
    <p className="text-center font-normal tracking-tighter mx-auto">
      <span className="font-bold">{item.title}: </span>
      {item.desc}
    </p>
  );
}

function Honft() {
  const navigate = useNavigate();
  const orderModal = useModal("family-order-modal")
  const [mobile,setMobile] = useState(false)

    useEffect(() => {
        console.log(window.innerWidth,'@@@@@@@')
        if (window.innerWidth > 768) setMobile(true);
        else setMobile(false);
    }, [window.innerWidth]);
  //const [loading, setLoading] = useState({ status: 0, message: "Not Loading" });

  function handleLogin (){
    return onAuthStateChanged(getAuth(), (user) => {
      console.log(user)
      if (!user) {
        return navigate("/login");
      }
      orderModal.show();
    });
  }

  return (
    <div className="xl:w-screen xl:h-screen bg-white flex flex-col justify-center">
      <div className="flex flex-col xl:flex-row ">
        <div className="xl:w-[50%]  flex flex-col justify-end p-2 xl:left-0 xl:top-0 xl:bottom-0 m-2 xl:m-0 rounded-3xl xl:rounded-none aspect-[1/1.5] xl:aspect-auto bg-[url('./assets/hoodie.png')] bg-cover">
          <div className="max-w-md mx-auto w-full p-2">
            <CountdownTimer />
            <button onClick={handleLogin} className="w-full py-2 rounded-3xl font-medium text-center text-[#FFFFFF] bg-black bg-opacity-25 hover:bg-opacity-50">
              127USD
            </button>
          </div> 
        </div>

        <div className="xl:h-screen xl:w-[50%] w-[100] mx-auto flex flex-col justify-center xl:p-10  p-4 mb-4 ">
          <h2 className="long-title text-center text-8xl">Honft</h2>

          <p className="text-center font-normal py-3 mx-auto">
            The next evolution of hoodies that blurs the line between the
            physical and digital world. Seamlessly synergising the power of
            technology and the comfort of luxury
          </p>

          <div className="border-b-2 border-t-2 px-2 py-3">
            <ItemTrait title="Product Code" desc="Honft 001 - Black Forest" />
            <ItemTrait title="Size" desc="X-Small to X-Large" />
            <ItemTrait
              title="Material"
              desc="100% French Terry Cotton (500GSM)"
            />
            <ItemTrait
              title="Extra Details"
              desc="Garment Dyed, Brushed Back, Peach Finish, Relaxed Fit"
            />
            <ItemTrait title="Manufacturing Cost" desc="$36" />
            <ItemTrait title="Development Cost" desc="$23" />
            <ItemTrait title="Total Sale Cost" desc="$127" />
            <p className=" text-center italic py-2 mx-auto">
              Made in China (NTG Textile)
            </p>
          </div>
          <br />
          <div className="flex flex-col justify-center space-x-8 text-center">
            <p className="tracking-tighter">Cold Gentle Machine Wash</p>
            <p className="tracking-tighter">With Similar Colours</p>
            <p className="tracking-tighter">Do not Bleach, Soak or Wring</p>
            <p className="tracking-tighter">Air Dry Only (Avoid Direct Sunlight)</p>
            <p className="tracking-tighter">Warm Iron</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Honft;
