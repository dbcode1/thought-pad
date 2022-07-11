import { React, useContext, useEffect } from "react";
import { Navigate, History } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router";
import { Context } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import {Wrapper} from "../css/globalStyles"
import "../css/app.css";
import {FormWrapper} from "../css/globalStyles"

import styled from 'styled-components'
import {
  Button,
  ButtonContainer,
  Input,
  Submit,
  StyledLink,
} from "../css/buttons";
import { List } from "./List";

const AppWrapper = styled(Wrapper)`
  height: 100vh;
  grid-template-columns: auto 1fr;
  grid-auto-rows: auto;
  margin: 0; 
  padding: 0;
`
const AppForm = styled(FormWrapper)`
  grid-column: 1 / 2;
  align-content: center;
`
const history = createBrowserHistory();
const Header = styled("h1")`
  text-align: left;
  font-family: var(--main-font-family);`

function UserApp() {
  const { data, setData } = useContext(Context);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { thought } = data;
  const entries = data.entries;


  useEffect(() => {
     getEntries();
  }, []);

  // get entries
  async function getEntries() {
    await axios
      .post("/user/entries/user", { token })
      .then((res, req) => {
        console.log("entries", res.data);
        setData({ entries: res.data, thought: ""});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // add an entry
  async function handleSubmit(event) {
    console.log("saving a thought");
    await axios
      .post("/user/entries", { thought, token })
      .then((res) => {
        setData({thought: ""})
        getEntries();
        
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data);
      });
  }

  // logout
  const handleLogout = () => {
    setData({ isAuthenticated: false });
    const token = localStorage.setItem("");
    navigate("/", { replace: true });
  };

  // delete entry
  async function handleDelete(id) {
    await axios
      .post("user/delete", { id })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast("Thought Exists");
      });
  }

  async function onChange(event) {
    setData({ ...data, thought: event.target.value });
  }
  async function deleteAccount(data, setData) {
    try {
      axios.delete((res, err) => {
        console.log(res);
        setData({
          name: "",
          email: "",
          password: "",
          passwordTwo: "",
          isAuthenticated: false,
          entry: "",
          entries: [],
        });
        localStorage.setItem("token", "");
      });
    } catch (err) {
      console.log(err);
    }
  }

  const notify = () => {
    toast(<div style={{ color: "black" }}></div>);
  };
  return (
    <AppWrapper>
      <ToastContainer
        progressClassName="toastProgress"
        bodyClassName="toastBody"
      ></ToastContainer>
      
      <AppForm
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event);
        }}
      >
      <Header>Thought Pad</Header>
        <Input
          type="text" placeholder="Your Thought"
          onChange={onChange}
          required
        ></Input>
        <Submit className="go" type="submit"></Submit>
        </AppForm>
            {console.log(entries)}
      {entries && <List />}
      <ButtonContainer>
        <Button>
          <StyledLink to="/" onClick={handleLogout}>
            Logout
          </StyledLink>
        </Button>
        <Button>
          <StyledLink to="/" onClick={deleteAccount}>Delete Account</StyledLink>
        </Button>
      </ButtonContainer>
      {/* <div>entries</div> */}
    </AppWrapper>
  );
}

export default UserApp;
