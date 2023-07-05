import React, { useContext } from "react";
import axios from "axios";
import { Context } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import {AuthForm} from '../css/global'
import { SpecialButton, Nav, Input, Submit,StyledLink } from "../css/buttons";
import {Wrapper} from '../css/global'
function Register() {
  const { data, setData } = useContext(Context);
  const { isAuthenticated, password, passwordTwo } = data;
  async function handleSubmit(event) {
    // send data to backend setData
    if(password !== passwordTwo) {
      toast("Passwords must match.");
      return null;
    }
    await axios
      .post("/user", data)
      .then((res) => {
        console.log("res", res);
        setData({ isAuthenticated: true });
        localStorage.setItem("token", res.data.token);
      })
      .catch((err, res) => {
        toast(err.response.data);
      });
  }

  if (isAuthenticated) {
    return <Navigate to="/userApp" />;
  }

  return (
    <Wrapper>
      <ToastContainer></ToastContainer>
      <AuthForm
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event);
        }}
      >
        <Input
          type="text"
          id="name"
          className="input"
          placeholder="Full Name"
          onChange={(event) => setData({ ...data, name: event.target.value })}
        ></Input>
        <Input
          type="email"
          className="email"
          placeholder="Email"
          onChange={(event) => setData({ ...data, email: event.target.value })}
        ></Input>
        <Input
          type="password"
          minlength="8"
          placeholder="Password"
          onChange={(event) =>
            setData({ ...data, password: event.target.value })
          }
        ></Input>
        <Input
          type="password"
          minlength="8"
          placeholder="Confirm Password"
          onChange={(event) =>
            setData({ ...data, passwordTwo: event.target.value })
          }
        ></Input>
        <Submit className="go" type="submit"></Submit>
      </AuthForm>
      <Nav>
        <SpecialButton>
          <StyledLink to="/login">Login</StyledLink>
        </SpecialButton>
      </Nav>
    </Wrapper>
  );
}

export default Register;
