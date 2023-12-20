import { useControls } from "leva";

const Lights = () => {
  const { position, rotation } = useControls("light", {
    position: {
      value: [6.8999999999999915, -2.400000000000003, 2.399999999999998],
      step: 0.1,
    },
    rotation: {
      value: [0, 0, 0],
      step: 0.1,
    },
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <rectAreaLight
        castShadow
        position={position}
        rotation={rotation}
        intensity={10}
      />
      <directionalLight position={[0, 0, 5]} intensity={0.5} />
    </>
  );
};

export default Lights;
