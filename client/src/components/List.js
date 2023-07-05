import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Context";
import { getEntries } from "./UserApp";
import styled from "styled-components";
import uniqid from "uniqid";
import { Button } from "../css/buttons";

const token = localStorage.getItem("token");

const EntriesContainer = styled("div")`
  display: grid;
`;

const Card = styled("li")`
  list-style: none;
  font-family: courier;
  font-weight: bold;
  padding: 10px;
`;

const CardContainer = styled("div")`
  text-align: center;
  width: 100%;
`;

const DeleteEntry = styled("span")`
  padding: 6px;
  margin-left: 8px;
  cursor: pointer;
`;
const Container = styled("div")``;
const ListWrapper = styled("ul")`
  display: grid;
  grid-template-areas: list list list;
`;

export function List(props) {
  const { data, setData } = useContext(Context);
  let entries = data.entries;

  useEffect(() => {
    console.log("handle entires", entries);
  }, [entries]);

  async function getEntries() {
    await axios
      .post("/user/entries/user", { token })
      .then((res, req) => {
        console.log("entries", res.data);
        setData({ entries: res.data, thought: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // delete entry
  async function handleDelete(e) {
    const title = e.target.parentNode.childNodes[0].innerHTML;
    console.log("delete token", token);
    const response = await axios.post("user/delete", { title, token });
    if (response.status === 200) {
      setData({
        ...data,
        entry: "",
        entries: entries.filter((entry) => entry !== title),
      });
      console.log(entries);
      getEntries();
    } else {
      console.log("delete error");
    }
  }

  return (
    <>
      {entries.length > 0 &&
        entries.map((entry) => {
          return (
            <CardContainer>
              <Card id={uniqid()} onClick={(e) => handleDelete(e)}>
                {entry.text}
              </Card>
            </CardContainer>
          );
        })}
    </>
  );
}
