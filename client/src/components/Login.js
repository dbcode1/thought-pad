import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, Link } from "react-router-dom";
import { FormWrapper } from "../css/globalStyles";
import { Wrapper } from "../css/globalStyles";
import { Button, ButtonContainer, Input, Submit } from "../css/buttons";
import { StyledLink } from "../css/buttons";

function Login() {
  const { data, setData } = useContext(Context);
  const { email, password, isAuthenticated } = data;

  async function handleSubmit(event) {
    console.log("login attempt", email);
    await axios
      .post("/user/login", { email, password })
      .then((res) => {
        setData({ isAuthenticated: true });
        localStorage.setItem("token", res.data.token);
        // if(res.status === 200){
        //   notify("Sucess")
        // }
        console.log(res);
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
    <Wrapper>
      <ToastContainer
        progressClassName="toastProgress"
        // bodyClassName="toastBody"
      ></ToastContainer>
      <FormWrapper
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event);
        }}
      >
        <Input
          type="email"
          className="email"
          placeholder="Email"
          onChange={(event) => setData({ ...data, email: event.target.value })}
        ></Input>
        <Input
          type="password"
          placeholder="Password"
          minlength="10"
          onChange={(event) =>
            setData({ ...data, password: event.target.value })
          }
        ></Input>
        <Submit type="submit"></Submit>
      </FormWrapper>
      <ButtonContainer>
        <Button>
          <StyledLink to="/register">Register</StyledLink>{" "}
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
}

export default Login;
