import {
  Environment,
  Float,
  MeshPortalMaterial,
  Scroll,
  ScrollControls,
  meshBounds,
} from "@react-three/drei";
import { Canvas, extend, useThree } from "@react-three/fiber";
import Walk from "./models/Walk";
import { geometry } from "maath";
import {
  EffectComposer,
  Glitch,
  Select,
  Selection,
} from "@react-three/postprocessing";
import Chip from "./models/Chip";
import Male from "./models/Male";
import { useHoveredChip, useModelStore } from "./zustandStore/configStore";
import Female from "./models/Fem";
import HtmlSection from "./dom/HtmlSection";
import Lights from "./canvas/Lights";

extend(geometry);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedPlaneGeometry: any;
    }
  }
}

const Experience = () => {
  const { viewport } = useThree();
  const isChipHovered = useHoveredChip((state) => state.isChipHovered);
  const setChipHovered = useHoveredChip((state) => state.setChipHovered);

  const isModelOpen = useModelStore((state) => state.isModelOpen);

  return (
    <>
      <Lights />
      {/* jacket bg */}
      <mesh position={[0, -23.2, -0.001]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial color="black" />
      </mesh>
      {/* jacket */}
      <mesh
        onPointerEnter={() => setChipHovered(true)}
        onPointerLeave={() => setChipHovered(false)}
        raycast={meshBounds}
        position={[-5, -23, 0]}
        scale={0.5}
      >
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      {isChipHovered && (
        <Chip scale={8} position={[0, -23, 2]} rotation={[Math.PI / 2, 0, 0]} />
      )}
      <mesh position={[0, -40, -1]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial color="black" />
      </mesh>
      {isModelOpen ? (
        <Female position={[1, -42.5, 0]} scale={0.04} />
      ) : (
        <Male position={[1, -42.5, 0]} scale={0.04} />
      )}
    </>
  );
};

const StoreLandingPage = () => {
  return (
    <div className="absolute w-screen h-screen top-0 left-0">
      <Canvas gl={{ antialias: false }} dpr={[1, 2]}>
        <ScrollControls pages={7.21}>
          <Scroll>
            <Experience />
            {/* <EffectComposer disableNormalPass multisampling={0}>
                <Glitch
                  delay={[1.5, 3.5]} // min and max glitch delay
                  duration={[0.2, 0.6]} // min and max glitch duration
                  strength={[0.2, 0.6]} // min and max glitch strength
                  chromaticAberrationOffset={4} // min and max glitch strength
                />
              </EffectComposer> */}
            <mesh position={[4, -15.2, 0]}>
              <roundedPlaneGeometry args={[4, 5]} />
              <MeshPortalMaterial>
                <color attach="background" args={["#000"]} />
                <ambientLight />
                <directionalLight position={[10, 10, 10]} />
                <Walk scale={3} position={[0, -4, 0]} />
              </MeshPortalMaterial>
            </mesh>
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
