import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {Button, Input, Submit} from '../css/buttons'
import {AuthForm, Wrapper} from '../css/global'
import "react-toastify/dist/ReactToastify.min.css";

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset Password",
  });

  let key = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let token = key.token;
    if (token) {
      setValues({ ...values, /*name*/ token });
    }
  }, []);

  const { /*name,*/ token, newPassword, buttonText } = values;

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios
      .put(`${process.env.REACT_APP_API}/password/reset`, {
        newPassword,
        resetPasswordLink: token,
      })
      .then((response) => {
        console.log("RESET Password SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Done" });
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.log("SIGNIN ERROR", error.response.data);
        setValues({ ...values, buttonText: "Reset Password" });
        toast.error(error.response.data.error);
      });
  };

  const resetPasswordForm = () => (
    <AuthForm>
      
        <Input
          className="form-control"
          type="password"
          onChange={handleChange}
          placeholder="type new password "
          required
          value={newPassword}
        ></Input>
      
     
        <Button className=" btn btn-primary" onClick={handleSubmit}>
          {buttonText}
        </Button>

    </AuthForm>
  );

  return (
 
      <Wrapper>
        <ToastContainer />
        {/* <h1 className="p-5 text-center">Hey {name}, type your new password.</h1> */}
        {resetPasswordForm()}
      </Wrapper>
   
  );
};

export default Reset;
