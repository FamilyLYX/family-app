import { Environment, View } from "@react-three/drei";
import { Nfc } from "./canvas/models/Nfc";
import { useEffect, useState } from "react";

function NfcChip() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) setMobile(true);
    else setMobile(false);
  }, [window.innerWidth]);
  return (
    <div className="xl:h-screen w-screen bg-white relative space-y-10 xl:space-y-0">
      {!mobile && (
        <View className="absolute top-0 left-0 aspect-square xl:aspect-auto w-screen xl:h-screen">
          <Nfc position-x={-3.9} scale={14} rotation={[Math.PI / 2, 0, 0]} />
          <Environment preset="warehouse" />
        </View>
      )}
      <div className="xl:h-screen flex flex-col xl:flex-row mt-12 xl:mt-0 space-y-6 xl:space-y-0">
        <div className=" aspect-square xl:aspect-auto xl:h-screen w-[50%] mx-auto rounded-none">
          {mobile && (
            <View className="absolute bottom-[35%] right-0 w-full h-full ">
              <Nfc scale={6} rotation={[Math.PI / 2, 0, 0]} />
              <Environment preset="warehouse" />
            </View>
          )}
        </div>
        

        <div className="xl:h-screen xl:w-[50%] w-[100] mx-auto flex flex-col justify-center xl:space-x-4 xl:p-10 p-4 ">
          <h2 className="long-title text-center text-8xl ">NFC Chip</h2>
          <br />
          <p className="text-center font-normal py-3 mx-auto">
            Each NFC Chip embedded in our products serves as your verifiable
            proof of ownership, powered by LUKSO blockchain technology. With
            this, you gain access to a global marketplace for peer-to-peer
            trading, breaking down geographical barriers and expanding your
            connections worldwide.
          </p>
          <br />
          <p className="text-center font-normal py-3 mx-auto">
            But our NFC Chip goes beyond ownership – it's the gateway to a
            digital realm of endless possibilities. Through LUKSO's innovative
            standards, your physical garment can seamlessly integrate with
            virtual environments in VR/AR and video games, transforming your
            wardrobe into a portal to immersive experiences. Embrace the future
            of fashion where physical and digital converge, and embark on a
            journey of limitless exploration with our NFC Chip technology.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NfcChip;
