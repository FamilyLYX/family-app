/*
Author: Stefan William Rudebjer (https://sketchfab.com/stefan_wr)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/stone-wall-0788f8b362a6463fa08ad75273c530ea
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    wall_stone_low_stone_wall_low_0: THREE.Mesh;
    wall_stone_triplet_stone_wall_low_0: THREE.Mesh;
    wall_single_rock_2_stone_wall_low_0: THREE.Mesh;
    wall_single_rock_stone_wall_low_0: THREE.Mesh;
    wall_stone_stone_wall_low_0: THREE.Mesh;
    wall_stone_medium_stone_wall_low_0: THREE.Mesh;
    wall_single_rock_2001_stone_wall_low001_0: THREE.Mesh;
  };
  materials: {
    stone_wall_low: THREE.MeshStandardMaterial;
    ["stone_wall_low.001"]: THREE.MeshStandardMaterial;
  };
};

export default function Wall(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/wall.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.wall_stone_low_stone_wall_low_0.geometry}
        material={materials.stone_wall_low}
        position={[-52.21, 0, -0.93]}
        rotation={[-Math.PI / 2, 0, 3.12]}
        scale={100}
      />
      <mesh
        geometry={nodes.wall_stone_triplet_stone_wall_low_0.geometry}
        material={materials.stone_wall_low}
        position={[183.2, 0, -20.83]}
        rotation={[-Math.PI / 2, 0, -0.1]}
        scale={100}
      />
      <mesh
        geometry={nodes.wall_single_rock_2_stone_wall_low_0.geometry}
        material={materials.stone_wall_low}
        position={[24.92, 0, -45.08]}
        rotation={[-Math.PI / 2, 0, -0.33]}
        scale={100}
      />
      <mesh
        geometry={nodes.wall_single_rock_stone_wall_low_0.geometry}
        material={materials.stone_wall_low}
        position={[94.29, 0, -0.94]}
        rotation={[-Math.PI / 2, 0, 0.38]}
        scale={100}
      />
      <mesh
        geometry={nodes.wall_stone_stone_wall_low_0.geometry}
        material={materials.stone_wall_low}
        position={[2.96, 0, 50.03]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        geometry={nodes.wall_stone_medium_stone_wall_low_0.geometry}
        material={materials.stone_wall_low}
        position={[192.15, 0, 42.41]}
        rotation={[-Math.PI / 2, 0, -0.03]}
        scale={100}
      />
      <mesh
        geometry={nodes.wall_single_rock_2001_stone_wall_low001_0.geometry}
        material={materials["stone_wall_low.001"]}
        position={[129.66, 0, 87.64]}
        rotation={[-Math.PI / 2, 0, -0.59]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/models/wall.glb");
