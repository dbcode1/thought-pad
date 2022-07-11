import React, { useState, useContext } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const state = {
    name: "",
    email: "",
    password: "",
    passwordTwo: "",
    isAuthenticated: false,
    loading: false,
    alert: false,
    entry: "",
    entries: [""],
  };

  const [data, setData] = useState(state);

  return (
    <Context.Provider value={{ data, setData }}>{children}</Context.Provider>
  );
};
