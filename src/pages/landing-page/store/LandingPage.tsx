import { PerformanceMonitor, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HtmlSection from "./dom/HtmlSection";
import Experience from "./canvas/Experience";
import Portal from "./canvas/Portal";
import { useMobileStore } from "./zustandStore/configStore";
import { useEffect, useState } from "react";

const StoreLandingPage = () => {
  const setIsMobile = useMobileStore((state) => state.setIsMobile);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, [window.innerWidth]);
  // R3F Optimization
  const [dpr, setDpr] = useState<number>(1.5);
  return (
    <div className="absolute w-screen h-screen top-0 left-0">
      <Canvas gl={{ antialias: false }} dpr={dpr}>
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        />
        <ScrollControls pages={7.21}>
          <Scroll>
            <Experience />
            {/* turn on the effect once wouter is implemented, and only 1 canvas is used */}
            {/* <FX /> */}
            <Portal />
          </Scroll>
          <Scroll html>
            <HtmlSection />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default StoreLandingPage;
