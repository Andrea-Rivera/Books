import React, { useContext } from "react";

import Navigation from "./Navigation";

import classes from "./MainHeader.module.css";
import AuthContext from "../../store/auth-context";

const MainHeader = () => {
  const { onLogout } = useContext(AuthContext);
  return (
    <header className={classes["main-header"]}>
      <h1>Books Database</h1>
      <div className={classes.NavButtons}>
        <Navigation onLogout={onLogout} />
      </div>
    </header>
  );
};

export default MainHeader;
