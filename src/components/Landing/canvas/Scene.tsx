import { Canvas } from "@react-three/fiber";
import { View, Preload, PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";
import { AgXToneMapping } from "three";

export default function Scene() {
  const [dpr, setDpr] = useState(1.5);
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 999,
        }}
        eventSource={document.body}
        dpr={dpr}
        gl={{ antialias: false, toneMapping: AgXToneMapping }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        />
        <View.Port />
        <Preload all />
      </Canvas>
    </>
  );
}
