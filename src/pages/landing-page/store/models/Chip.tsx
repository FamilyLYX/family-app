import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
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
  const nfcRef = useRef<THREE.Mesh>(null);
  const secondNfcRef = useRef<THREE.Mesh>(null);
  const botRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const tl = useRef<gsap.core.Timeline>();

  const isChipHovered = useHoveredChip((state) => state.isChipHovered);

  useEffect(() => {
    tl.current = gsap
      .timeline()
      .fromTo(
        groupRef.current!.scale,
        { y: 0, x: 0, z: 0 },
        { y: 7, x: 7, z: 7, duration: 0.65, ease: "power2.inOut" }
      )
      .to(textRef.current!.position, { y: 1.5, duration: 1, delay: 1 }, "<")
      .to(
        botRef.current!.position,
        { y: -1.5, duration: 1, ease: "ease.in" },
        "<"
      )
      //nfc part
      .to(
        secondNfcRef.current!.position,
        { y: -0.05, duration: 1, delay: 1 },
        "<"
      )
      .to(nfcRef.current!.position, { y: 0.01, duration: 1 }, "<");
  }, [isChipHovered]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group position={[0, 0.04, 0]}>
          <mesh
            ref={secondNfcRef}
            geometry={nodes.nfc1.geometry}
            material={materials.nfcbot}
            position={[0, -0.02, 0]}
            scale={[1, 0.5, 1]}
          />
          <mesh
            ref={nfcRef}
            geometry={nodes.nfc2.geometry}
            material={materials.nfctop}
            position={[0, -0.04, 0]}
            scale={[1, 0.5, 1]}
          />
      </group>
      <group position={[0, 0.01, 0]} scale={0.1}>
        <mesh
          ref={textRef}
          geometry={nodes.topSculpt.geometry}
          material={materials["Mat.1"]}
          position={[0, 0.01, 0]}
        />
        <mesh
          ref={botRef}
          geometry={nodes.bot.geometry}
          material={materials["Mat.2"]}
          position={[0, -0.01, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/nfcChip.glb");
