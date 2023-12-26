import { useMobileStore } from "../../store/zustandStore/configStore";
import Hoodie from "../models/Hoodie";
import Lights from "./Lights";
import Video from "./Video";

const Experience = () => {
  const isMobile = useMobileStore((state) => state.isMobile);
  return (
    <>
      <Lights />
      <Hoodie
        scale={5}
        position={isMobile ? [0, -14, 0] : [3.5, -14, 0]}
      />
      <Video />
    </>
  );
};

export default Experience;
