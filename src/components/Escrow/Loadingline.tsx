import React, { useState, useEffect } from "react";
import styles from "./EscrowSystem.module.css";

interface LoadingLineProps {
  text: React.ReactNode;
}

const LoadingLine: React.FC<LoadingLineProps> = ({ text }) => {
  const [, setLoading] = useState(false);

  useEffect(() => {
    const startAnimation = setTimeout(() => {
      setLoading(true);
    }, 1000);

    const stopAnimation = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(startAnimation);
      clearTimeout(stopAnimation);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div
      className={`flex relative z-10 justify-center flex-col items-center gap-10`}
    >
      <br />
      <div className={`flex flex-col-reverse`}>
        <br />
        <div className="flex flex-col gap-4">{text}</div>

        <div
          className={`justify-around items-center ${styles.loadingLine}`}
        ></div>
      </div>
    </div>
  );
};

export default LoadingLine;
