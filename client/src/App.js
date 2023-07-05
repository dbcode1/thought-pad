import React from "react";
import { Outlet} from "react-router-dom";
import './css/app.css'
import { injectStyle } from "react-toastify/dist/inject-style";
// import Nav from './components/Nav'


if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  return (
    <div>
      {/* <Nav /> */}
      <Outlet />
    </div>
  );
}

export default App;
