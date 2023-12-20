import { useControls } from "leva";

const Lights = () => {
  const { position, rotation } = useControls("second", {
    position: {
      value: [0, -37.5, 2.1],
      step: 0.1,
    },
    rotation: {
      value: [-0.8, -1.2, 0],
      step: 0.1,
    },
  });
  return (
    <>
      <ambientLight intensity={2} />
      <rectAreaLight intensity={2} position={position} rotation={rotation} />
    </>
  );
};

export default Lights;
