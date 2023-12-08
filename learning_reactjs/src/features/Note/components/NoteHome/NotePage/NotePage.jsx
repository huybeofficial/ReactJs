import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import UserInfo from "../../UserInfo";
import { AppContext } from "../../../contexts/AppProvider";
import NoteContent from "./NoteContent";
import ToggleTheme from "../../ToggleTheme";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${(props) => (props.darkTheme ? "#343541" : "white")};
  color: ${(props) => (props.darkTheme ? "white" : "black")};
  z-index: 10;

  .more-control {
    margin: 50px;
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .note-content {
    height: 100vh;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
`;
export default function NotePage() {
  const { darkTheme } = useContext(AppContext);
  console.log(darkTheme);
  return (
    <Container darkTheme={darkTheme}>
      <div className="note-content">
        <NoteContent />
      </div>
      <div className="more-control">
        <UserInfo />
        <ToggleTheme />
      </div>
    </Container>
  );
}
