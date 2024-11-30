import { useEffect,useState } from "react";
import { addEffect } from "@react-three/fiber";

import Lenis from "@studio-freight/lenis";
import Scene from "../../components/Landing/canvas/Scene";
import Manifesto from "../../components/Landing/Menifesto";
import BlackForest from "../../components/Landing/BlackForest";
import Honft from "../../components/Landing/Honft";
import NfcChip from "../../components/Landing/NfcChip";
import Store from "../../components/Landing/Store";
import Faq from "../../components/Landing/Faq";
import logo from "../../logo.svg"

const Landing = () => {
  const lenis = new Lenis();
  addEffect((t) => lenis.raf(t));
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await fetch('/fam-3.mp4');
      const contentLength:any = response.headers.get('Content-Length');
      if (!response.body || !contentLength) {
        console.error('Video or Content-Length header not found');
        return;
      }

      let receivedLength = 0; // received that many bytes at the moment
      const reader = response.body.getReader();
      new ReadableStream({
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            receivedLength += value.length;
            setLoadingProgress(Math.round((receivedLength / contentLength ) * 100));
            controller.enqueue(value);
          }
          controller.close();
          reader.releaseLock();
        }
      });
      // console.log('Loading progress', loadingProgress);
      // // Create a blob from the response stream
      // const blob = await new Response(stream).blob();
      // const blobUrl = URL.createObjectURL(blob);
      // setVideoUrl(blobUrl);
    };

    fetchVideo();
  }, []);

  return (
    <>
    {loadingProgress < 100 && 
        <div className="bg-black h-screen text-[#FFFFFF] flex justify-center items-center text-3xl space-x-6"><img className="text-xl" src={logo} alt="" /> <p className="long-title space-x-6" >  |  {loadingProgress}%</p></div>
    }
      <Scene />
      {loadingProgress === 100 && <main>
        <Manifesto />
        <Store />
        <Honft />
        <NfcChip />
        <BlackForest />
        <Faq />
      </main> }
      
    </>
  );
};

export default Landing;
