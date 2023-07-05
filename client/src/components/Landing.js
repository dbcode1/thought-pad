import React from "react";
import styled from "styled-components";
import { StyledLink, Nav, Button } from "../css/buttons";
import { Wrapper } from "../css/global";

const Header = styled("h1")`
  text-align: center;
  font-family: var(--main-font-family);
`;

function Landing() {
  //
  return (
    <Wrapper>
      <Header>Simple Notepad as a boilerplate for MERN CRUD app.</Header>
      <Nav>
        <Button>
          <StyledLink to="/register">Register</StyledLink>{" "}
        </Button>
        <Button>
          <StyledLink to="/login">Login</StyledLink>{" "}
        </Button>
      </Nav>
    </Wrapper>
  );
}

export default Landing;
