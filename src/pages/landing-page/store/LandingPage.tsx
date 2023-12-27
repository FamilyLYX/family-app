import { PerformanceMonitor, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HtmlSection from "./dom/HtmlSection";
import Experience from "./canvas/Experience";
import { useState } from "react";

const StoreLandingPage = () => {
  // R3F Optimization
  const [dpr, setDpr] = useState<number>(1.5);
  return (
    <div className="relative h-screen w-screen top-0 left-0">
      <Canvas gl={{ antialias: false }} dpr={dpr}>
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        />
        <ScrollControls pages={7}>
          <Scroll>
            <Experience />
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
