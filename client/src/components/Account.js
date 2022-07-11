import axios from "axios";
import React from "react";
import styled from "styled-components";
import { Context } from "../Context";

function Home() {
    function deleteUser() {
        axios.delete()
    }
  return (
    <div>
      <h1>Sorry you to see you go.</h1>
      <button onClick={deleteUser}>
      </button>
    </div>
  );
}

export default Home;