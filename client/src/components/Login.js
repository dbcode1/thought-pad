import React, { useRef, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import { Context } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import { AuthForm } from "../css/global";
import { SpecialButton, Nav, Input, Submit, StyledLink } from "../css/buttons";
import { Wrapper } from "../css/global";

const ForgotButton = styled("button")`
  display: block;
  border: none;
  bottom-border: 1px solid blue;
  margin: 0 auto 2em auto;
  font-family: courier;
`;
function Login() {
  const ref = useRef()
  const { data, setData } = useContext(Context);
  const { email, password, passwordTwo, isAuthenticated } = data;
  const navigate = useNavigate();

  
  function forgot() {
    navigate("/forgot", { replace: true });
  }
  async function handleSubmit(event) {
    console.log("LOGIN");
    await axios
      .post("/user/login", { email, password })
      .then((res) => {
        setData({ isAuthenticated: true });
        localStorage.setItem("token", res.data.token);
        ref.current.reset()
        console.log("LOGIN RESPONSE", res);
      })
      .catch((err, res) => {
        console.log("trigger alert", err.response.data);
        toast(err.response.data);
      });
  }

  if (isAuthenticated) {
    return <Navigate to="/userApp" />;
  }

  return (
    <>
      {" "}
      <ToastContainer
        progressClassName="toastProgress"
        // bodyClassName="toastBody"
      ></ToastContainer>
      <Wrapper>
        <AuthForm
        ref={ref}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}
        >
          <Input
            type="email"
            className="email"
            placeholder="Email"
            onChange={(event) =>
              setData({ ...data, email: event.target.value })
            }
          ></Input>
          <Input
            type="password"
            placeholder="Password"
            minlength="10"
            onChange={(event) =>
              setData({ ...data, password: event.target.value })
            }
          ></Input>
          <Submit type="submit" value="Submit"></Submit>
          <ForgotButton onClick={forgot}>Forgot Password</ForgotButton>
        </AuthForm>
      </Wrapper>
      <Nav>
        <SpecialButton>
          <StyledLink to="/register">Register</StyledLink>{" "}
        </SpecialButton>
      </Nav>
    </>
  );
}

export default Login;
