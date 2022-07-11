import React, { useContext } from "react";
import axios from "axios";
import { Context } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
//import {Wrapper} from "../css/globalStyles"
import { Button, ButtonContainer, Input, Submit } from "../css/buttons";
import { StyledLink } from "../css/buttons";
import { Wrapper } from "../css/globalStyles";
import { FormWrapper } from "../css/globalStyles";

function Register() {
  const { data, setData } = useContext(Context);
  const { isAuthenticated } = data;
  async function handleSubmit(event) {
    // send data to backend setData
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
      <FormWrapper
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
          type="text"
          placeholder="Password"
          onChange={(event) =>
            setData({ ...data, password: event.target.value })
          }
        ></Input>
        <Input
          type="text"
          placeholder="Confirm Password"
          onChange={(event) =>
            setData({ ...data, passwordTwo: event.target.value })
          }
        ></Input>
        <Submit className="go" type="submit"></Submit>
      </FormWrapper>
      <ButtonContainer>
        <Button>
          <StyledLink to="/login">Login</StyledLink>{" "}
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
}

export default Register;
