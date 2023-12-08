import React from "react";
import { Col, Row } from "reactstrap";
import styled from "styled-components";
import NoteList from "./NoteList";
import NoteItem from "./NoteItem";

const SidebarStyled = styled.div`
  height: 100vh;
  background-color: black;
  color: white;
  width: 100%;
  padding: 0;
  &.sidebar-close {
    color: gray;
    z-index: 1;
  }
`;

export default function Sidebar(props) {
  return (
    <SidebarStyled className={props.className}>
      <NoteList />
    </SidebarStyled>
  );
}
