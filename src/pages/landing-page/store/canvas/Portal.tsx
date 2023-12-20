import Walk from "../models/Walk";
import { MeshPortalMaterial } from "@react-three/drei";
import { geometry } from "maath";
import { extend } from "@react-three/fiber";

extend(geometry);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedPlaneGeometry: any;
    }
  }
}

const Portal = () => {
  return (
    <mesh position={[4, -15.2, 0]}>
      <roundedPlaneGeometry args={[4, 5]} />
      <MeshPortalMaterial>
        <color attach="background" args={["#000"]} />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <Walk scale={3} position={[0, -4, 0]} />
      </MeshPortalMaterial>
    </mesh>
  );
};

export default Portal;
