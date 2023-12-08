import React, { useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";
export const AppContext = React.createContext();
export default function AppProvider({ children }) {
  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);
  const [isSelectedItem, setIsSelectedItem] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);
  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const notesCondition = React.useMemo(() => {
    return {
      fieldName: "userId",
      operator: "==",
      compareValue: uid,
    };
  }, [uid]);
  const notes = useFirestore("notes", notesCondition);

  const selectNote = React.useMemo(
    () => notes.find((note) => note.id === isSelectedItem) || {},
    [notes, isSelectedItem]
  );
  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "==",
      compareValue: selectNote.userId,
    };
  }, [selectNote.userId]);

  const currentUser = useFirestore("users", usersCondition);

  const clearState = () => {
    setIsSelectedItem(null);
    setIsAddNoteVisible(false);
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        isAddNoteVisible,
        setIsAddNoteVisible,
        isSelectedItem,
        setIsSelectedItem,
        clearState,
        selectNote,
        currentUser,
        darkTheme,
        setDarkTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
