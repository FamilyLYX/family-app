import * as THREE from "three";
import { PresentationControls, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Default: THREE.Mesh;
  };
  materials: {
    Mat: THREE.MeshStandardMaterial;
  };
};

export default function Hoodie(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/hoodie.glb") as GLTFResult;
  return (
    <group {...props} dispose={null} scale={5} position={[3.5, -14, 0]}>
      <PresentationControls
        global
        speed={1}
        polar={[0, 0]}
        azimuth={[-Infinity, Infinity]}
      >
        <mesh geometry={nodes.Default.geometry} material={materials.Mat} />
      </PresentationControls>
    </group>
  );
}

useGLTF.preload("/models/hoodie.glb");
