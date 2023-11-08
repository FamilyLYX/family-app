import {
  PresentationControls,
  useVideoTexture,
} from "@react-three/drei";
import Rocks from "./Rocks";
import Hoodie from "./Hoodie";

const Experience = () => {
  const texture = useVideoTexture("/portal.mp4");


  return (
    <>
      {/* light */}
      <ambientLight intensity={2} />
      <directionalLight castShadow position={[0, 7, 5]} intensity={2} />
      {/* logo asset */}
      <PresentationControls
        enabled={true} // the controls can be disabled by setting this to false
        global={false} // Spin globally or by dragging the model
        cursor={true} // Whether to toggle cursor style on drag
        snap={true} // Snap-back to center (can also be a spring config)
        speed={1} // Speed factor
        zoom={1} // Zoom factor when half the polar-max is reached
        rotation={[0, 0, 0]} // Default rotation
        polar={[0, Math.PI / 2]} // Vertical limits
        azimuth={[-Infinity, Infinity]} // Horizontal limits
        config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
      >
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </PresentationControls>
      {/* hoodie asset */}
      <Hoodie scale={0.05} position={[3, -15, 0]} />
      {/* video */}
      <mesh position={[0, -16, -2]}>
        <planeGeometry args={[10, 6]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <Rocks scale={0.7} position={[6, -18, 0]} />
      <Rocks scale={0.7} rotation-y={Math.PI} position={[-6, -18, 0]} />
    </>
  );
};

export default Experience;
