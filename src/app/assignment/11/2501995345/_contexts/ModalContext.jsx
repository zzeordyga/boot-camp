"use client";

import { createContext, useState } from "react";

const ModalContext = createContext({
  modal: "",
  setModal: () => {},
});

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState("");

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
