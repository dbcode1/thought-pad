import { render } from "express/lib/response";
import React from "react";
import {
  Button,
  ButtonContainer,
  StyledLink,
  Input,
  Submit,
} from "../css/buttons";

function NavBar () {
  return (
  <ButtonContainer>
    <Button>
      <StyledLink to="/register">Register</StyledLink>{" "}
    </Button>
    <Button>
      <StyledLink to="/login">Login</StyledLink>{" "}
    </Button>
  </ButtonContainer>
  )
};

export default NavBar;
