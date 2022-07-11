import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Context";
import styled from "styled-components";
import uniqid from "uniqid";
import {Button} from "../css/buttons"

const token = localStorage.getItem("token");

const EntriesContainer = styled("div")`
  height: 600px;
  display: grid;
`;

const Card = styled("li")`
  display: inline-block;
  margin: auto;
  list-style: none;
  font-family: courier;
  font-weight: bold;
  padding: 10px;
  box-shadow: 0px 2px 8px -4px grey;
  padding: 12px;
  margin: 8px 0;
`;

const DeleteEntry = styled("span")`
  padding: 6px;
  margin-left: 8px;
  cursor: pointer;
`;

const ListWrapper = styled('div')`
  display: grid;
  grid-auto-column: auto;
  Card {
    grid-column: 2 / -1;
  }
`

export function List(props) {
  const { data, setData } = useContext(Context);
  let entries = data.entries;

  useEffect(() => {
    console.log("handle entires", entries);
  }, [entries]);

  // grab id from thought
  async function deleteEntry(e) {
    console.log("delete entry");
    e.preventDefault();
    const id = e.target.id;
    console.log("entry id", id);
    const data = {
      token: token,
      id: id,
    };
    await axios
      .delete("/user/delete", { data })
      .then((res) => {
        const returnId = res.data
        console.log("returnId", res.data)
        setData({entries: res.data.entries})
        // getDeletedEntries()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {entries.length > 0 &&
        entries.map((entry) => {
          return (
            <Card id={entry._id} key={uniqid()} onClick={deleteEntry}>
              {entry.text}
            
            </Card>
          );
        })}
    </>
  );
}
