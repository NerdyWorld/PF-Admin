import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) =>{

  const [showUserFavsModal, setShowUserFavsModal] = useState(false);
  const [showUserCartModal, setShowUserCartModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  const data = {
    showUserFavsModal,
    setShowUserFavsModal,
    showUserCartModal,
    setShowUserCartModal,
    showColorModal,
    setShowColorModal
  };

  return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
};