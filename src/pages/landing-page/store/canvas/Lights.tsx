const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <rectAreaLight
        intensity={5}
        position={[0, -37.5, 4.1]}
        rotation={[-0.8, -1.2, 0]}
      />
    </>
  );
};

export default Lights;
