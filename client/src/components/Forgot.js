import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button, Input } from "../css/buttons";
import {AuthForm, Wrapper} from '../css/global'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
//const token = JSON.parse(localStorage.getItem("token"));
let token = ''

const Reset = styled(Button)`
    padding: 10px;
    width: 87%;
    margin-bottom: 2em;
`
const Forgot = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    buttonText: "Reset",
  });

  const { email, buttonText } = values;
 
  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios
      .post("/password/forgot", { token , email})

      .then((response) => {
        console.log("Forgot Password SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Requested" });
      })
      .catch((error) => {
        console.log("RESET ERROR", error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error);
      });
  };

  const passwordForgotForm = () => (
    <form>
      <Wrapper>
        <h1 style={{ "fontFamily": "courier", "margin-top": "-2em" }}>
          Forgot Password
        </h1>
      <AuthForm>
        <Input
          type="text"
          value={email}
          placeholder="email"
          onChange={handleChange("email")}
        ></Input>

        <Reset className=" btn btn-primary" onClick={handleSubmit}>
          {buttonText}
        </Reset>
        </AuthForm>
      </Wrapper>
    </form>
  );

  return (
    <div>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />

        {passwordForgotForm()}
      </div>
    </div>
  );
};

export default Forgot;
