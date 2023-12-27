const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight
        position={[0, -16.6, 0]}
        color={"#b0e8e6"}
        decay={2}
        intensity={7}
      />
    </>
  );
};

export default Lights;
