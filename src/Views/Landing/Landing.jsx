import React from "react";
import LoginModalN from "../Login/Login";
import { GlobalContext } from "../../Context/globalContext";
import { useState } from "react";
import { useContext } from "react";
import styles from "./Landing.module.css";
const Landing = () => {
  const globalContext = useContext(GlobalContext);
  const { setShowLoginModal } = globalContext;
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className={styles.container}>
      <LoginModalN />
      <h1 className={styles.tittle}>Rivelle</h1>
      <p className={styles.subtittle}>Admin</p>
      {showLogin && (
        <>
          <div className={styles.containerLogin}>
            <h4
              className={styles.button}
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
