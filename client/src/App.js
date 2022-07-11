import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Outlet, useNavigate } from "react-router-dom";
import { useHistory } from "react-router";
import styled from "styled-components";
import './css/app.css'
import { Button } from "./css/buttons";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
// import Nav from './components/Nav'
import { Context } from "./Context";
import { Transition } from "react-transition-group";

if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  const { data, setData } = useContext(Context);
  const navigate = useNavigate();
  const entries = data.entries;
  useEffect(() => {
    if (entries) {
      window.localStorage.setItem("entries", JSON.stringify(entries));
    }
  });

  useEffect(() => {
    JSON.parse(window.localStorage.getItem("entries"));
  });

  return (
    <div>
      {/* <Nav /> */}
      <Outlet />
    </div>
  );
}

export default App;
