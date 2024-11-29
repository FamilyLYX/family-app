import styles from "./EscrowSystem.module.css";

export default function Gallery() {
  return (
    <div className="flex flex-col gap-1 h-screen items-center wsmallss relative">
      <div>
        <img
          src="./src/assets/escrow/gallery.png"
          className={` ${styles.wsmalls}`}
          alt="product"
        />
      </div>
      <div>
        <img
          src="./src/assets/escrow/gallery.png"
          className={` ${styles.wsmalls}`}
          alt="product"
        />
      </div>
      <div>
        <img
          src="./src/assets/escrow/gallery.png"
          className={` ${styles.wsmalls}`}
          alt="product"
        />
      </div>
    </div>
  );
}
