import styles from "./AdCard.module.css";

export type AdCardProps = {
  title: string;
  description?: string | null;
  price?: number | null;
  picture?: string | null;
};

function AdCard({ title, description, price, picture }: AdCardProps) {
  return (
    <div className={styles["ad-card-container"]}>
      {/* <a className={styles["ad-card-link"]} href={link}> */}
      <img className={styles["ad-card-image"]} src={picture} alt={title} />
      <div className={styles["ad-card-text"]}>
        <div className={styles["ad-card-title"]}>{title}</div>
        <div className={styles["ad-card-price"]}>{price} €</div>
      </div>
      {/* </a> */}
    </div>
  );
}

export default AdCard;
