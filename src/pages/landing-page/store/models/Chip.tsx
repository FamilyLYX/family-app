import * as THREE from "three";
import { Float, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useEffect, useRef } from "react";
import { useHoveredChip } from "../zustandStore/configStore";
import gsap from "gsap";

type GLTFResult = GLTF & {
  nodes: {
    nfc1: THREE.Mesh;
    nfc2: THREE.Mesh;
    topSculpt: THREE.Mesh;
    bot: THREE.Mesh;
  };
  materials: {
    nfcbot: THREE.MeshStandardMaterial;
    nfctop: THREE.MeshStandardMaterial;
    ["Mat.1"]: THREE.MeshStandardMaterial;
    ["Mat.2"]: THREE.MeshStandardMaterial;
  };
};

export default function Chip(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/nfcChip.glb") as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const topRef = useRef<THREE.Mesh>(null);
  const bottomRef = useRef<THREE.Mesh>(null);
  const chipRef = useRef<THREE.Mesh>(null);
  const tl = useRef<gsap.core.Timeline>();

  const isChipHovered = useHoveredChip((state) => state.isChipHovered);

  useEffect(() => {
    tl.current = gsap
      .timeline()
      .to(groupRef.current!.rotation, { z: -0.3, x: 0.2, duration: 1 })
      .to(bottomRef.current!.position, { y: -0.04, duration: 1, delay: 1 }, "<")
      .to(chipRef.current!.position, { y: -0.9, duration: 1 }, "<")
      .to(topRef.current!.position, { z: 0.1, duration: 1 }, "<")
      .to(topRef.current!.rotation, { x: 1.2, duration: 1 }, "<");
  }, [isChipHovered]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group position={[0, 0.04, 0]}>
        <mesh
          ref={bottomRef}
          geometry={nodes.nfc1.geometry}
          material={materials.nfcbot}
          position={[0, -0.02, 0]}
          scale={[1, 0.5, 1]}
        />
        <Float floatIntensity={0.1}>
          <mesh
            ref={topRef}
            geometry={nodes.nfc2.geometry}
            material={materials.nfctop}
            position={[0, -0.04, 0]}
            scale={[1, 0.5, 1]}
          />
        </Float>
      </group>
      <group position={[0, 0.01, 0]} scale={0.1}>
        <mesh
          ref={chipRef}
          geometry={nodes.topSculpt.geometry}
          material={materials["Mat.1"]}
          position={[0, 0.01, 0]}
        />
        <mesh
          ref={chipRef}
          geometry={nodes.bot.geometry}
          material={materials["Mat.2"]}
          position={[0, -0.01, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/nfcChip.glb");
