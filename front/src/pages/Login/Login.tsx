import * as styles from "./login.module.scss";
import React, { useContext } from "react";
import { AuthContext } from "../../context";
import MyButton from "../../components/Button/MyButton";

export default function Login() {
  const { setIsAuth } = useContext(AuthContext);

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login page</h2>
      <form onSubmit={login} className={styles.form}>
        <input className={styles.input} type="text" placeholder="login.." />
        <input
          className={styles.input}
          type="password"
          placeholder="password.."
        />
        <div className={styles.btn}>
          <MyButton>Login</MyButton>
        </div>
      </form>
    </div>
  );
}
