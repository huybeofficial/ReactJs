import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/AppProvider";
const ToogleStyled = styled.div`
  .icon {
    font-size: 30px;
    cursor: pointer;
  }
  .dark {
    color: darkcyan;
  }
  .light {
    color: lightcyan;
  }
`;

export default function ToggleTheme() {
  const { darkTheme, setDarkTheme } = useContext(AppContext);
  return (
    <ToogleStyled>
      {darkTheme ? (
        <i
          className="bi bi-sun-fill icon light"
          onClick={() => setDarkTheme(!darkTheme)}
        ></i>
      ) : (
        <i
          className="bi bi-moon-stars-fill icon dark "
          onClick={() => setDarkTheme(!darkTheme)}
        ></i>
      )}
    </ToogleStyled>
  );
}
