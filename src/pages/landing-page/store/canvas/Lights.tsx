const Lights = () => {
  return (
    <>
      <ambientLight intensity={2} />
      <rectAreaLight
        intensity={2}
        position={[0, -37.5, 2.1]}
        rotation={[-0.8, -1.2, 0]}
      />
    </>
  );
};

export default Lights;
