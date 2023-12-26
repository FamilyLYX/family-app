import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, Scroll, ScrollControls } from "@react-three/drei";
import Experience from "./canvas/Experience";
import HtmlSection from "./dom/HtmlSection";
import { useEffect, useState } from "react";
import { useMobileStore } from "../store/zustandStore/configStore";

const StoreLandingPage = () => {
  // Zustand Store To Manage 3D Mobile View
  const setIsMobile = useMobileStore((state) => state.setIsMobile);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, [window.innerWidth]);

  // R3F Optimization
  const [dpr, setDpr] = useState<number>(1.5);
  return (
    <>
      <div className="absolute w-screen h-screen top-0 left-0 bg-black">
        <Canvas dpr={dpr} gl={{ antialias: false }}>
          <PerformanceMonitor
            onIncline={() => setDpr(2)}
            onDecline={() => setDpr(1)}
          />
          <ScrollControls pages={2}>
            <Scroll>
              <Experience />
            </Scroll>
            <Scroll html>
              <HtmlSection />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
};

export default StoreLandingPage;
