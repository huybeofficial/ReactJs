import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import styled from "styled-components";
import {
  DeleteNoteAPIbyId,
  UpdateNoteAPIbyId,
} from "../../../services/NoteService";
import { AppContext } from "../../../contexts/AppProvider";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { updateDocument } from "../../../firebase/services";
const NoteItemStyled = styled.div`
  height: 38px;
  cursor: pointer;
  margin: 1px 10px;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  border-radius: 5px;
  &.selected-item {
    background-color: #202123;
  }
  &:hover {
    background-color: #202123;
  }
  .dropdown-content {
    background-color: white;
    padding: 5px 10px;
    min-width: 150px;
    border-radius: 10px;
    position: absolute;
    margin-left: 220px;
    margin-top: 100px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    display: grid;
  }
  .rename-btn {
    color: black;
    font-size: 15px;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    column-gap: 10px;
  }
  .delete-btn {
    cursor: pointer;
    font-size: 15px;
    border-radius: 5px;
    color: red;
    padding: 5px 10px;
    display: flex;
    column-gap: 10px;
  }
  .delete-btn:hover {
    background-color: #ebe5e5;
  }
  .rename-btn:hover {
    background-color: #ebe5e5;
  }
  .rename-input {
    background-color: transparent;
    color: white;
    border: 1px solid white;
    width: 100%;
  }
`;
export default function NoteItem(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isSelectedItem, setIsSelectedItem, notes } = useContext(AppContext);
  const [modalDelete, setModalDelete] = useState(false);
  const [isRename, setIsRename] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);

  const dropdownRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideInput);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideInput);
    };
  }, [isRename]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  const toggleDelete = () => {
    setDropdownOpen(false);
    setModalDelete(!modalDelete);
  };

  const handleClickOutsideDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      if (isRename) {
        setIsRename(false);
      }
      setDropdownOpen(false);
    }
  };
  const handleClickOutsideInput = async (e) => {
    if (isRename && !e.target.closest(".rename-input")) {
      setIsRename(false);
      if (!newTitle || newTitle === selectedNote?.title) return;
      await updateDocument("notes", selectedNote.id, { title: newTitle });
      setNewTitle("");
    }
  };
  const handleRename = () => {
    setDropdownOpen(false);
    setIsRename(true);
  };
  const selectedNote = useMemo(
    () => notes.find((note) => note.id === isSelectedItem),
    [notes, isSelectedItem]
  );
  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && isRename) {
      e.preventDefault();
      setIsRename(false);
      if (!newTitle || newTitle === selectedNote?.title) return;
      await updateDocument("notes", selectedNote.id, { title: newTitle });
      setNewTitle("");
    }
  };

  const handleDelete = async () => {
    try {
      // await DeleteNoteAPIbyId(props?.id);
      await deleteDoc(doc(db, "notes", props.id));
      setModalDelete(false);
    } catch (error) {
      console.log("error Delete", error);
    }
  };
  return (
    <NoteItemStyled
      className={props.className}
      onClick={() => setIsSelectedItem(props.id)}
    >
      {isRename ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="New title"
          className="rename-input"
        />
      ) : (
        <>
          {props?.title}
          {props.className && (
            <>
              <i
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bi bi-three-dots"
              ></i>
              {dropdownOpen && (
                <>
                  <div className="dropdown-content" ref={dropdownRef}>
                    <div onClick={handleRename} className="rename-btn">
                      <i className="bi bi-pen"></i>
                      Đổi tên
                    </div>
                    <div onClick={toggleDelete} className="delete-btn">
                      <i className="bi bi-trash3"></i>
                      Xoá ghi chú
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}

      <Modal isOpen={modalDelete} toggle={toggleDelete} {...props}>
        <ModalHeader toggle={toggleDelete}>Xoá ghi chú</ModalHeader>
        <ModalBody>
          Xoá <b>{props.title}</b> ?
          <p>Việc này đồng nghĩa với không thể khôi phục.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Xác nhận
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            Huỷ bỏ
          </Button>
        </ModalFooter>
      </Modal>
    </NoteItemStyled>
  );
}
