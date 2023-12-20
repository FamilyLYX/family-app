import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    cloth_parentShape: THREE.Mesh;
    cloth_parentShape_1: THREE.Mesh;
  };
  materials: {
    cloth_parentShape: THREE.MeshStandardMaterial;
  };
};

export default function Walk(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/asset3d/walk.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions["Object_0"]) {
      actions["Object_0"].play();
    }
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Walking-testabccleanermaterialmergergles">
            <group name="Object_2" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Object_3">
                <group name="MorphMainGroup">
                  <mesh
                    name="cloth_parentShape"
                    geometry={nodes.cloth_parentShape.geometry}
                    material={materials.cloth_parentShape}
                    morphTargetDictionary={
                      nodes.cloth_parentShape.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.cloth_parentShape.morphTargetInfluences
                    }
                  />
                  <mesh
                    name="cloth_parentShape_1"
                    geometry={nodes.cloth_parentShape_1.geometry}
                    material={materials.cloth_parentShape}
                    morphTargetDictionary={
                      nodes.cloth_parentShape_1.morphTargetDictionary
                    }
                    morphTargetInfluences={
                      nodes.cloth_parentShape_1.morphTargetInfluences
                    }
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/asset3d/walk.glb");
