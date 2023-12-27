import { useAspect, useVideoTexture } from "@react-three/drei";

const Video = () => {
  // put the asset link here
  const texture = useVideoTexture("/asset3d/portal.mp4");
  const scale = useAspect(
    1280, // Pixel-width
    720, // Pixel-height
    1 // Optional scaling factor, usually just put 1 dont change
  );

  return (
    <mesh scale={scale} position={[0, -16, -2]}>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

export default Video;
