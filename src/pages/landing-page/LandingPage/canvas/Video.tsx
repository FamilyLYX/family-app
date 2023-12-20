import { useVideoTexture } from "@react-three/drei";

const Video = () => {
  const texture = useVideoTexture("/portal.mp4");

  return (
    <mesh position={[0, -16, -2]}>
      <planeGeometry args={[10, 6]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

export default Video;
