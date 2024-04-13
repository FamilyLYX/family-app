import * as THREE from "three";
import { PresentationControls, useGLTF } from "@react-three/drei";
//@ts-ignore
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Hoodie_1: THREE.Mesh;
    Hoodie_2: THREE.Mesh;
  };
  materials: {
    ["logo2-white"]: THREE.MeshStandardMaterial;
    Mat: THREE.MeshStandardMaterial;
  };
};

export function Hoodie2(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/hoodie.glb") as GLTFResult;

  return (
    <PresentationControls
      global
      zoom={0.8}
      rotation={[0, 0, 0]}
      polar={[0, 0]}
      azimuth={[-Infinity, Infinity]}
    >
      <group {...props} dispose={null}>
        <group position={[-0.021, 7.279, 0.319]} rotation={[1.119, 0, 0]}>
          <mesh
            geometry={nodes.Hoodie_1.geometry}
            material={materials["logo2-white"]}
          />
          <mesh
            geometry={nodes.Hoodie_2.geometry}
            material={materials.Mat}
            material-color={"#edebe9"}
          />
        </group>
      </group>
    </PresentationControls>
  );
}

useGLTF.preload("/hoodie.glb");
