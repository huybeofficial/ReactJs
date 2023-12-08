import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import styled from "styled-components";
import { auth } from "../firebase/config";
import { AppContext } from "../contexts/AppProvider";
import { Button, Tooltip } from "reactstrap";

const WrapperStyled = styled.div`
  margin: 50px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  column-gap: 15px;
  .user-avatar {
    height: 50px;
    width: 50px;
    padding: 5px;
    border-radius: 50px;
    cursor: pointer;
  }
  .user-avatar:hover {
    background-color: #ebe5e5;
  }
`;
export default function UserInfo(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const {
    user: { displayName, photoURL },
  } = useContext(AuthContext);
  const { clearState } = React.useContext(AppContext);

  const handleLogout = () => {
    clearState();
    auth.signOut();
  };

  return (
    <WrapperStyled>
      <div>
        <img
          id="user-info"
          className="user-avatar"
          alt="Avatar"
          src={photoURL}
        />
        <Tooltip
          isOpen={tooltipOpen}
          target="user-info"
          toggle={() => setTooltipOpen(!tooltipOpen)}
          placement="bottom"
        >
          {displayName}
        </Tooltip>
      </div>
      <Button onClick={handleLogout} color="danger" size="">
        Đăng xuất
      </Button>
    </WrapperStyled>
  );
}
