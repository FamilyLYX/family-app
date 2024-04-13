import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
//@ts-ignore
import { GLTF } from "three-stdlib";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    topSculpt: THREE.Mesh;
    bot: THREE.Mesh;
    Plane: THREE.Mesh;
  };
  materials: {
    ["Mat.1"]: THREE.MeshStandardMaterial;
    ["Mat.2"]: THREE.MeshStandardMaterial;
    Mat: THREE.MeshStandardMaterial;
  };
};

export function Nfc(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/nfcChipV2.glb") as GLTFResult;
  const planeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!planeRef.current) return;
    planeRef.current.rotation.x += delta;
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group rotation={[0, 1.05, 0]}>
        <mesh
          ref={planeRef}
          scale={1.2}
          geometry={nodes.Plane.geometry}
          material={materials.Mat}
          rotation={[-0.035, Math.PI / 2, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/nfcChipV2.glb");
