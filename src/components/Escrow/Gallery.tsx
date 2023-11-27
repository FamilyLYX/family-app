import React from "react";
import styles from "./EscrowSystem.module.css";

export default function Gallery({ data }: { data: any }) {
  return (
    <div className="flex flex-col gap-1 h-screen items-center wsmallss relative">
      <div>
        <img
          src={` ${data?.image}`}
          className={` ${styles.wsmalls}`}
          alt="product"
        />
      </div>
    </div>
  );
}
