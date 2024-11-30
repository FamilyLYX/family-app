
import { useEffect, useState } from "react";
import { Button, LinkButton } from "../../common/buttons";
import { useModal } from "@ebay/nice-modal-react";

function Landing() {
  const orderModal = useModal("family-order-modal")
  const [mobile,setMobile] = useState(false)

    useEffect(() => {
        console.log(window.innerWidth,'@@@@@@@')
        if (window.innerWidth > 768) setMobile(true);
        else setMobile(false);
    }, [window.innerWidth]);

  async function CreateOrder() {
    orderModal.show();
  } 

  return (
    <div className="mt24">
        <div className="h-screen flex justify-center max-w-3xl mx-auto items-center space-x-8">
          {!mobile ? <LinkButton to="/mob-order" variant="dark"> Mobile Buy </LinkButton> : <Button onClick={() => {CreateOrder()}} variant="dark"> Buy </Button>}

            
        </div>
    </div>
  )
}

export default Landing