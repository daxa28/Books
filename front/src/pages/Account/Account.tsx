import * as styles from "./account.module.scss";
import React, { useContext } from "react";
import { AuthContext } from "../../context";
import MyButton from "../../components/Button/MyButton";

function Account() {
  const { setIsAuth } = useContext(AuthContext);

  const login = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Account page</h2>
      <div className={styles.btn}>
        <MyButton onClick={login}>Exit</MyButton>
      </div>
    </div>
  );
}

export default Account;
