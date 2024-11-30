import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import soundOn from "../../mute.svg";
import soundOff from "../../unmute.svg";
// import pause from "../pause.svg";

gsap.registerPlugin(ScrollTrigger);

const Store = () => {
  const [mobile, setMobile] = useState(false);
  const [mute, setMute] = useState(true)

  useEffect(() => {
    if (window.innerWidth < 768) setMobile(true);
    else setMobile(false);
  }, [window.innerWidth]);

  const { innerHeight } = window;
  useEffect(() => {
    gsap.to("#zoom-in img", {
      scale: mobile ? 18 : 50,
      scrollTrigger: {
        trigger: "#zoom-in",
        pin: true,
        scrub: 1,
        end: `+=${innerHeight * 1.3}`,
      },
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);
  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 -z-10">
        <video
          src="/fam-3.mp4"
          autoPlay
          muted={mute}
          loop
          className="object-cover w-screen h-screen"
          playsInline
        />
      </div>
      <section
        id="zoom-in"
        className="h-screen w-screen flex justify-center items-center pointer-events-none bg-white mix-blend-screen"
      >
        <img className="w-[50rem] h-auto" src="/store.svg" />
      </section>
      <div className="fixed bottom-0 m-2 p-4 z-10">
        {mute ? (<img src={soundOn} onClick={() => {!mute ? setMute(true) :setMute(false)}} />) : <img src={soundOff} onClick={() => {!mute ? setMute(true) :setMute(false)}} /> }
        
      </div>
    </>
  );
};

export default Store;
