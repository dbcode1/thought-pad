import { React, useContext, useEffect, useRef } from "react";
import { Navigate, History } from "react-router-dom";
import axios from "axios";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router";
import { Context } from "../Context";
import { SearchForm } from "../css/global";
import { ToastContainer, toast } from "react-toastify";
import "../css/app.css";

import styled from "styled-components";
import { Nav, Button, SearchInput, Submit } from "../css/buttons";
import { List } from "./List";

const AppWrapper = styled("div")`
  height: 100vh;
  margin: 0;
  padding: 0;
`;
const Header = styled("h1")`
  text-align: center;
  font-family: var(--main-font-family);
`;

function UserApp() {
  const formRef = useRef()
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
        setData({ ...data, entries: res.data, thought: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // add an entry
  async function handleSubmit(event) {
    console.log("saving a thought");
    event.preventDefault();

    await axios
      .post("/user/entries", { thought, token })
      .then((res) => {
        getEntries();
        setData({ ...data, thought: "" });
        formRef.current.reset()
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data);
      });
  }

  // logout
  const handleLogout = () => {
    setData({ isAuthenticated: false });
    localStorage.clear();
    navigate("/", { replace: true });
  };

  async function onChange(event) {
    setData({ ...data, thought: event.target.value });
  }

  async function deleteAccount(data, setData) {
    console.log("DELETE ACCOUNT");
    if (
      window.confirm("Are you sure you want to permanently erase your account?")
    ) {
      try {
        const removeUser = await axios.post("user/remove", { token });
        console.log("DELETE ACCOUNT SUCCESS", removeUser.data);
        toast(removeUser.data);
        handleLogout()
      } catch (error) {
        console.log("DELETE ACCOUNT ERROR", error);
        toast("Account not Deleted");
      }
    } else {
      navigate("/UserApp", { replace: true });
    }
  }

  return (
    <AppWrapper>
      <ToastContainer
        progressClassName="toastProgress"
        bodyClassName="toastBody"
      ></ToastContainer>

      <SearchForm
        ref={formRef}
        onSubmit={(event) => {
          handleSubmit(event);
          event.preventDefault();
          return false;
        }}
      >
        <Header>Thought Pad</Header>
        <SearchInput
          type="text"
          placeholder="Your Thought"
          onChange={onChange}
          required
        />

        <Submit className="go" type="submit"></Submit>
      </SearchForm>
      {entries && <List />}
      <Nav>
        <Button onClick={handleLogout}>Logout</Button>
        <Button to="/" onClick={deleteAccount}>
          Delete Account
        </Button>
      </Nav>
      {/* <div>entries</div> */}
    </AppWrapper>
  );
}

export default UserApp;
