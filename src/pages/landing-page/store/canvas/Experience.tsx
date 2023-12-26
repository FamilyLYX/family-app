import { useThree } from "@react-three/fiber";
import {
  useHoveredChip,
  useMobileStore,
  useModelStore,
} from "../zustandStore/configStore";
import Lights from "./Lights";
import { OrbitControls, meshBounds } from "@react-three/drei";
import Female from "../models/Fem";
import Chip from "../models/Chip";
import Hoodie from "../../LandingPage/models/Hoodie";

const Experience = () => {
  const { viewport } = useThree();
  const isChipHovered = useHoveredChip((state) => state.isChipHovered);
  const setChipHovered = useHoveredChip((state) => state.setChipHovered);
  const isMobile = useMobileStore((state) => state.isMobile);

  return (
    <>
      <Lights />
      {/* jacket */}
      {/* this is just a placeholder cube, put the jacket arm here */}
      <mesh
        onPointerEnter={() => setChipHovered(true)}
        onPointerLeave={() => setChipHovered(false)}
        raycast={meshBounds}
        position={isMobile ? [0, -23, 0] : [-5, -23, 0]}
        scale={0.5}
      >
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      {isChipHovered && (
        <Chip scale={8} position={[0, -23, 2]} rotation={[Math.PI / 2, 0, 0]} />
      )}
      <mesh position={[0, -38, 0]}>
        <planeGeometry args={[viewport.width * 5, viewport.height * 5]} />
        <meshBasicMaterial color="black" />
      </mesh>

      <Hoodie position={isMobile ? [0, -46, 0.9] : [0.7, -46, 1]} scale={5} />
    </>
  );
};

export default Experience;
