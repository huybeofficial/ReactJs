import React, { useContext, useState } from "react";
import { Col, Tooltip } from "reactstrap";
import AuthProvider, { AuthContext } from "../../contexts/AuthProvider";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NotePage from "./NotePage/NotePage";
import Sidebar from "./Sidebar/Sidebar";

const Container = styled.div`
  display: flex;

  .sidebar {
    width: 300px;
    display: flex;
    align-items: center;
    height: 100vh;
  }
  .sidebar-btn {
    width: 20px;
    height: 100vh;
    display: flex;
    align-items: center;
  }
  i#sidebar-close {
    font-size: 20px;
    color: #ccc;
    margin-left: 10px;
    font-weight: bold;
    left: 0;
  }
  i#sidebar-close:hover {
    font-size: 25px;
    color: black;
    cursor: pointer;
  }
  .note-page {
    flex: 1;
  }
`;

export default function NoteHome(props) {
  const [isHoverHideSidebar, setIsHoverHideSidebar] = useState(false);
  const [isCloseSidebar, setIsCloseSidebar] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Container>
      {!isCloseSidebar && (
        <div className="sidebar">
          <Sidebar className={isHoverHideSidebar ? "sidebar-close" : ""} />
        </div>
      )}
      <div className="sidebar-btn">
        <i
          onClick={() => setIsCloseSidebar(!isCloseSidebar)}
          onMouseEnter={() => setIsHoverHideSidebar(true)}
          onMouseLeave={() => setIsHoverHideSidebar(false)}
          id="sidebar-close"
          className={
            isCloseSidebar
              ? isHoverHideSidebar
                ? "bi bi-arrow-right"
                : "bi bi-arrow-right-short"
              : !isHoverHideSidebar
              ? "bi bi-arrow-left-short"
              : "bi bi-arrow-left"
          }
        ></i>
        <Tooltip
          isOpen={tooltipOpen}
          target="sidebar-close"
          toggle={toggle}
          placement="right"
        >
          {!isCloseSidebar ? "Close Sidebar" : " Open Sidebar"}
        </Tooltip>
      </div>
      <div className="note-page">
        <NotePage />
      </div>
    </Container>
  );
}
