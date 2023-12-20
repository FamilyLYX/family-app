import { useThree } from "@react-three/fiber";
import { useHoveredChip, useModelStore } from "../zustandStore/configStore";
import Lights from "./Lights";
import { meshBounds } from "@react-three/drei";
import Female from "../models/Fem";
import Male from "../models/Male";
import Chip from "../models/Chip";

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

export default Experience;
