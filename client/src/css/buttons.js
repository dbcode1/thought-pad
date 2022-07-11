import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  underline: none;
  font-family: var(--main-font-family);
  font-size: 16px;
  margin-top: 16px;
  border-radius: 4px;
  padding: 4px;
  :hover {
    background-color: lightblue;
    color: white;
  }
`;

export const Button = styled("button")`
  background: none;
  transition-duration: 0.4s;
  border: none;
  padding-top: 1em;
  text-align: center;
  
  width: 100%;
`;

export const Input = styled("input")`
  padding: 10px;
  margin: 10px;
  font-family: courier;
  font-weight: bold;
  ::placeholder {
    font-family: var(--main-font-family);
    color: grey;
  }
`;

export const Submit = styled(Input)`
  font-family: var(--main-font-family);
  font-size: 18px;
  background-color: white;
  border: none;  border-radius: 4px;
  font-weight: bold;
  :hover {
    background-color: lightblue;
    color: white;
  }
`;

export const ButtonContainer = styled("div")`
  height: 80px;
  display: grid;
  align-content: center;
  `;
