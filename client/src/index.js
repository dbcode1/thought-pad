import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import "./index.css";
import App from "./App";
import { ContextProvider } from "./Context";
import Register from "./components/Register";
import Login from "./components/Login";
import UserApp from "./components/UserApp";
import Landing from "./components/Landing"


const rootElement = document.getElementById("root");
ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="Login" element={<Login />} />
          <Route path="UserApp" element={<UserApp />} />
          {/* PRIVATE ROUTE */}
        </Route>
      </Routes>
    </BrowserRouter>
  </ContextProvider>,
  rootElement
);
