import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { AppContext } from "../../contexts/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../contexts/AuthProvider";

export default function AddNoteModal() {
  const { isAddNoteVisible, setIsAddNoteVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const handleOk = () => {
    if (!title) return;
    addDocument("notes", { title: title, userId: uid });
    setIsAddNoteVisible(false);
    setTitle("");
  };
  const handleCancel = () => {
    setIsAddNoteVisible(false);
    setTitle("");
  };
  return (
    <div>
      <Modal
        isOpen={isAddNoteVisible}
        fade={false}
        toggle={() => setIsAddNoteVisible(!isAddNoteVisible)}
      >
        <ModalHeader toggle={() => setIsAddNoteVisible(!isAddNoteVisible)}>
          Thêm ghi chú
        </ModalHeader>
        <ModalBody>
          <Label for="exampleEmail" size="lg" sm={2}>
            Tiêu đề
          </Label>
          <Input
            bsSize="lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="exampleEmail"
            name="email"
            placeholder="Nhập tiêu đề"
            type="email"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleOk}>
            Thêm
          </Button>{" "}
          <Button color="secondary" onClick={handleCancel}>
            Huỷ
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
