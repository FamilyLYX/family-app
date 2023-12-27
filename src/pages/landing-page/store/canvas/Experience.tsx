import { useThree } from "@react-three/fiber";
import { useHoveredChip } from "../zustandStore/configStore";
import Lights from "./Lights";
import Chip from "../models/Chip";
import Hoodie from "../../LandingPage/models/Hoodie";

const Experience = () => {
  const { viewport } = useThree();
  const isChipHovered = useHoveredChip((state) => state.isChipHovered);
  const isMobile = window.innerWidth < 768;

  return (
    <>
      <Lights />
      {isChipHovered && (
        <Chip
          scale={10}
          position={[1.2, -22.5, 2]}
          rotation={[1.9, 0.63, -0.68]}
        />
      )}
      <mesh position={isMobile ? [0, -38.7, 0] : [0, -37.5, 0]}>
        <planeGeometry args={[viewport.width * 5, viewport.height * 5]} />
        <meshBasicMaterial color="black" />
      </mesh>

      <Hoodie position={isMobile ? [0, -45, 0.9] : [0.7, -46, 1]} scale={5} />
    </>
  );
};

export default Experience;
