import Hoodie from "../models/Hoodie";
import Lights from "./Lights";
import { isMobile } from "../../store/zustandStore/configStore";

const Experience = () => {
  return (
    <>
      <Lights />
      <Hoodie
        scale={5}
        position={isMobile ? [0, -14, 0] : [3.5, -14, 0]}
      />
      {/* <Video /> */}
    </>
  );
};

export default Experience;
