import { createContext, useState } from "react";

export const Context = createContext("");

export default function GlobalContext({ children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Context.Provider value={{ showModal, setShowModal }}>
      {children}
    </Context.Provider>
  );
}
