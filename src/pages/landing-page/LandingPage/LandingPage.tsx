import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, Scroll, ScrollControls } from "@react-three/drei";
import Experience from "./canvas/Experience";
import HtmlSection from "./dom/HtmlSection";
import { useState } from "react";

const StoreLandingPage = () => {
  // R3F Optimization
  const [dpr, setDpr] = useState<number>(1.5);
  return (
    <>
      <div className="absolute w-screen h-screen top-0 left-0 bg-black ">
        <Canvas dpr={dpr} gl={{ antialias: false }}>
          <PerformanceMonitor
            onIncline={() => setDpr(2)}
            onDecline={() => setDpr(1)}
          />
          {/* Uncomment the video in Experience.tsx file, and change to pages={3} here */}
          <ScrollControls pages={2}>
            {/* 3d components */}
            <Scroll>
              <Experience />
            </Scroll>
            {/* DOM components */}
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
