import * as commonStyles from "../../assets/styles/common.module.scss";
import * as styles from "./header.module.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { ROUTES } from "../../routes/constants";

function Header() {
  return (
    <header className={styles.header}>
      <div className={commonStyles.container}>
        <nav className={styles.content}>
          <NavLink to={ROUTES.BOOKS}>
            <Logo />
          </NavLink>
          <div className={styles.right}>
            <NavLink to={ROUTES.LOGIN}>Login</NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
