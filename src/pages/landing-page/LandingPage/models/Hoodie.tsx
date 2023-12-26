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
    <>
      <group {...props} dispose={null}>
        <rectAreaLight
          castShadow
          position={[0, 2.2, 0.4]}
          rotation={[0, -0.7, 0.7]}
          intensity={7}
        />
        <PresentationControls
          global
          speed={1}
          polar={[0, 0]}
          azimuth={[-Infinity, Infinity]}
        >
          <mesh geometry={nodes.Default.geometry} material={materials.Mat} />
        </PresentationControls>
      </group>
    </>
  );
}

useGLTF.preload("/models/hoodie.glb");