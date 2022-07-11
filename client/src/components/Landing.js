import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledLink } from "../css/buttons";
import { Button } from "../css/buttons";
import { Wrapper } from "../css/globalStyles.js";

const Header = styled("h1")`
  text-align: center;
  font-family: var(--main-font-family);
`;


function Landing() {
  return (
    <Wrapper>
      <Header>This is your quiet place</Header>
      <div>
        <Button>
          <StyledLink to="/register">Register</StyledLink>{" "}
        </Button>
        <Button>
          <StyledLink to="/login">Login</StyledLink>{" "}
        </Button>
      </div>
    </Wrapper>
  );
}

export default Landing;
