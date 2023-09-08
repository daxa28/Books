import * as commonStyles from "../../assets/styles/common.module.scss";
import * as styles from "./footer.module.scss";
import React from "react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={commonStyles.container}>
        <h2>osadasha201628@gmail.com</h2>
        <h2>
          <a href="https://t.me/DariaOsadchuk">t.me/DariaOsadchuk</a>
        </h2>
      </div>
    </footer>
  );
}
