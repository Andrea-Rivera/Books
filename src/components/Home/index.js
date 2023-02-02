import React, { useContext } from "react";

import Card from "../Card/index";
import Button from "../Button/index";
import classes from "./Home.module.css";

import AuthContext from "../../store/auth-context";

const Home = () => {
  const { name, onLogout } = useContext(AuthContext);

  return (
    <Card className={`${classes.home} `}>
      <h1>Welcome back {name}!</h1>
      <Button onClick={onLogout} title={"Logout"} />
    </Card>
  );
};

export default Home;
