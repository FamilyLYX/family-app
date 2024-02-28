// import classes from "./src/pages/escrowmoreinfo/EscrowMore.module.css";

const Avatar = ({ imageUrl, initials }: any) => {
  return (
    <div className={``}>
      {imageUrl ? (
        <img src={imageUrl} alt="User Avatar" className="avatar-image" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
