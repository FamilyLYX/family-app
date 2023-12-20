import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas} from "@react-three/fiber";
import HtmlSection from "./dom/HtmlSection";
import Experience from "./canvas/Experience";
import Portal from "./canvas/Portal";
import FX from "./canvas/FX";

const StoreLandingPage = () => {
  return (
    <div className="absolute w-screen h-screen top-0 left-0">
      <Canvas gl={{ antialias: false }} dpr={[1, 2]}>
        <ScrollControls pages={7.21}>
          <Scroll>
            <Experience />
            <FX />
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
