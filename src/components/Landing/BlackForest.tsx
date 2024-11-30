import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CountdownTimerBlack from './common/CountdownTimerBlack';
import { useModal } from '@ebay/nice-modal-react';

function BlackForest() {
  const navigate = useNavigate();
  const orderModal = useModal('family-order-modal');
  // @ts-expect-error
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    console.log(window.innerWidth, '@@@@@@@');
    if (window.innerWidth > 768) setMobile(true);
    else setMobile(false);
  }, [window.innerWidth]);
  //const [loading, setLoading] = useState({ status: 0, message: "Not Loading" });

  function handleLogin() {
    return onAuthStateChanged(getAuth(), (user) => {
      console.log(user);
      // if (!user) {
      //   return navigate("/login");
      // }
      orderModal.show();
    });
  }

  return (
    <div className="xl:h-screen relative overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full -z-[1] object-cover"
        autoPlay
        playsInline
        loop
        muted
        src="/forest.mp4"
      ></video>
      <div className="xl:relative xl:h-screen md:flex md:flex-col justify-center p-2 m-2 xl:p-0 xl:m-0">
        <div className="xl:w-[50%] text-white text-center pt-10 xl:pt-4 mt-2">
          <p className="text-6xl xl:text-8xl xl:mb-14 mb-6 long-title">
            Honft - 001
            <span className="long-title block xl:inline xl:mx-8">
              Black Forest
            </span>
          </p>
        </div>

        <div className="xl:absolute xl:left-[50%] xl:right-0 xl:top-0 xl:h-screen  flex flex-col ">
          <div className="relative xl:absolute xl:top-0 xl:left-0 xl:right-0 xl:bottom-0 xl:rounded-l-3xl aspect-[1/1.5] xl:aspect-auto">
            <video
              className=" xl:rounded-none w-full h-full  object-cover rounded-3xl "
              autoPlay
              playsInline
              loop
              muted
              src="/hoodie-1.mp4"
            ></video>
            {/* <div className="xl:absolute xl:top-[2%] xl:left-0 xl:right-0 xl:bottom-[2%]  flex justify-center">
              <View className="w-full h-full aspect-square xl:aspect-auto rounded-3xl bg-red-100">
                <Lights />
                <Center>
                  <Hoodie2 scale={0.54} />
                </Center>
              </View>
            </div> */}
            <CountdownTimerBlack />
            <button
              onClick={handleLogin}
              className="absolute bottom-4 left-0 right-0 w-full max-w-md  mx-auto  py-3 rounded-full font-medium text-white bg-black bg-opacity-25 hover:bg-opacity-50"
            >
              127USD
            </button>
          </div>
        </div>

        <div className="text-6xl xl:text-7xl text-center text-white xl:w-[50%] leading-tight mt-2 pt-2">
          <p className="long-title">500 GSM</p>
          <p className="long-title">100% BRUSHED FRENCH TERRY</p>
          <p className="long-title">GARMENT DYED</p>
          <p className="long-title">UNISEX</p>
          <p className="long-title">RELAXED FIT</p>
        </div>
      </div>
    </div>
  );
}

export default BlackForest;
