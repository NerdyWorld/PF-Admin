import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [showUserFavsModal, setShowUserFavsModal] = useState(false);
  const [showUserCartModal, setShowUserCartModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [logged, setLogged] = useState(false);
  const data = {
    showUserFavsModal,
    logged,
    setLogged,
    setShowUserFavsModal,
    showUserCartModal,
    setShowUserCartModal,
    showColorModal,
    showLoginModal,
    setShowLoginModal,
    setShowColorModal,
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};
