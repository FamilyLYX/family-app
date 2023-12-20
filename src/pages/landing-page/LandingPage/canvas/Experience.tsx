import Hoodie from "../models/Hoodie";
import Wall from "../models/Wall";
import Lights from "./Lights";
import Video from "./Video";

const Experience = () => {
  return (
    <>
      <Lights />
      <Hoodie />
      <Video />
      <Wall position={[5, -19, -2]} scale={0.02} />
      <Wall position={[-6, -19, -1]} scale={0.02} />
    </>
  );
};

export default Experience;
