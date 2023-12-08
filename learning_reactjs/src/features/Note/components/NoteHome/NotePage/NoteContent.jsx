import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../../contexts/AppProvider";
import styled from "styled-components";
import { updateDocument } from "../../../firebase/services";

const ContentStyled = styled.div`
  margin: 50px 100px;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 10px;
  height: 80%;
  background-color: ${(props) => (props.darkTheme ? "black" : "white")};
  border-radius: 10px;
`;
const Input = styled.textarea`
  flex: 1;
  width: 100%;
  border: 1px solid #ccc;
  resize: none;
  background-color: ${(props) => (props.darkTheme ? "black" : "white")};
  height: 100%;
`;
export default function NoteContent() {
  const { notes, isSelectedItem, darkTheme } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === isSelectedItem),
    [notes, isSelectedItem]
  );
  const [content, setContent] = useState(selectedNote?.content);

  const handleContentClick = () => {
    setIsEditing(true);
    setContent(selectedNote?.content || "");
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleInputBlur = async () => {
    setIsEditing(false);
    setContent(selectedNote.content);
    if (!content || content === selectedNote?.content) return;
    await updateDocument("notes", selectedNote.id, { content: content });
  };
  return (
    <ContentStyled darkTheme={darkTheme}>
      {selectedNote?.content ? (
        isEditing ? (
          <Input
            className="content-input"
            value={content}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            bsSize="lg"
            type="textarea"
            autoFocus
          />
        ) : (
          <p onClick={handleContentClick}>{selectedNote?.content}</p>
        )
      ) : isSelectedItem ? (
        <Input
          darkTheme={darkTheme}
          value={content}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          bsSize="lg"
          type="textarea"
          autoFocus
          placeholder="Nhập nội dung vào đây"
        />
      ) : null}
    </ContentStyled>
  );
}
