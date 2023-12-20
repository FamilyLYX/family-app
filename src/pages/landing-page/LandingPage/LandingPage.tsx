import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Experience from "./canvas/Experience";
import HtmlSection from "./dom/HtmlSection";

const StoreLandingPage = () => {
  return (
    <>
      <div className="absolute w-screen h-screen top-0 left-0 bg-black">
        <Canvas gl={{ antialias: false }}>
          <ScrollControls pages={3}>
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
