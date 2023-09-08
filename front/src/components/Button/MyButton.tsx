import React from "react";
import * as styles from "./MyButton.module.scss";

type Props = {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

function MyButton({ children, onClick }: Props) {
  return (
    <button onClick={onClick} className={styles.btn}>
      <span className={`${styles.lineTop} ${styles.line}`} />
      <span className={`${styles.lineRight} ${styles.line}`} />
      <span className={`${styles.lineBottom} ${styles.line}`} />
      <span className={`${styles.lineLeft} ${styles.line}`} />
      {children}
    </button>
  );
}

export default MyButton;
