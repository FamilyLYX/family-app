const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[-25, 2.5, 0.4]} intensity={7} />
    </>
  );
};

export default Lights;
