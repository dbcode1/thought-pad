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
`;

export const Nav = styled("div")`
  width: 100%;
  position: fixed;
  bottom: 0;
  overflow: hidden;
`;

export const Button = styled("button")`
  margin: 1em;
  background: none;
  transition-duration: 0.4s;
  border: 1px solid black;
  font-family: var(--main-font-family);
  font-size: 16px;
  color: lightblue;
  :hover {
    background-color: lightblue;
    color: white;
  }
`;


export const SpecialButton = styled(Button)`
  width: 100%;
  border: none;
  margin: 1em auto;
  :hover {
    color: red;
    background: none;
    
  }
`;

export const Input = styled("input")`
  margin: 1em;
  padding: 10px;
  text-align: center;
  font-family: courier;
  font-weight: bold;
  ::placeholder {
    font-family: var(--main-font-family);
    color: grey;
  }
`;

export const SearchInput = styled(Input)`
  text-align: center;
`;

export const Submit = styled(Input)`
  font-family: var(--main-font-family);
  background-color: white;
  border: 1px solid green;
  border-radius: 4px;
  margin-bottom: 2em;
  :hover {
    background-color: green;
    color: white;
  }
`;
