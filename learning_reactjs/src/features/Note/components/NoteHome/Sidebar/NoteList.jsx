import React, { useContext, useEffect, useState } from "react";
import { GetAllNoteAPI } from "../../../services/NoteService";
import NoteItem from "./NoteItem";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { AppContext } from "../../../contexts/AppProvider";
const NoteListStyled = styled.div`
  margin: 30px 0;
  width: 100%;
  flex: 1;
`;
const NewNoteStyled = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  margin: 10px 10px 30px 10px;
  padding: 0 10px;
  column-gap: 10px;
  color: white;
  font-size: medium;
  font-weight: 500;
  transition: background-color 0.3s;
  &:hover {
    background-color: #202123;
  }
`;
const LogoNoteStyled = styled.img`
  height: 65%;
  padding: 3px;
  background-color: white;
  border-radius: 15px;
`;
export default function NoteList(props) {
  const { isSelectedItem } = useContext(AppContext);
  const { notes, setIsAddNoteVisible } = useContext(AppContext);

  const handleAddNote = () => {
    setIsAddNoteVisible(true);
  };
  return (
    <NoteListStyled>
      <NewNoteStyled onClick={handleAddNote}>
        <LogoNoteStyled
          src="https://cdn-icons-png.flaticon.com/128/12260/12260428.png"
          alt="logoNote"
        />
        <span>Ghi chú mới</span>
        <i className="bi bi-pencil-square"></i>
      </NewNoteStyled>
      {notes.map((item, index) => (
        <div key={item.id}>
          <NoteItem
            className={isSelectedItem === item.id ? "selected-item" : ""}
            id={item?.id}
            title={item?.title}
            content={item?.content}
          />
        </div>
      ))}
    </NoteListStyled>
  );
}
