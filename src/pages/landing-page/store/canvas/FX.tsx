import { EffectComposer, Glitch } from "@react-three/postprocessing";
import * as THREE from "three";

const FX = () => {
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <Glitch
        delay={new THREE.Vector2(1.5, 3.5)} // min and max glitch delay
        duration={new THREE.Vector2(0.2, 0.6)} // min and max glitch duration
        strength={new THREE.Vector2(0.2, 0.6)} // min and max glitch strength
        chromaticAberrationOffset={new THREE.Vector2(4, 4)} // min and max glitch strength
      />
    </EffectComposer>
  );
};

export default FX;
