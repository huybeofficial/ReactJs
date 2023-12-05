import React, { useCallback, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  DeletePostAPIbyId,
  UpdatePostAPIbyId,
} from "../../../services/PostServices/PostService";
import "./index.css";
const Post = (props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const handleEdit = useCallback(() => {
    setEdit(true);
  }, []);

  const toggle = () => setModalDelete(!modalDelete);

  const handleSave = async (newTitle, newContent) => {
    try {
      setEdit(true);
      await UpdatePostAPIbyId(props?.postId, newTitle, newContent);
      props.getAllPost();
      setNewContent("");
      setNewTitle("");
    } catch (error) {
      console.log("error Update", error);
    } finally {
      setEdit(false);
    }
  };

  const handleCancel = useCallback(() => {
    setNewTitle("");
    setNewContent("");
    setEdit(false);
  }, []);

  const handleDelete = async () => {
    try {
      await DeletePostAPIbyId(props?.postId);
      props.getAllPost();
      toggle();
    } catch (error) {
      console.log("error Delete", error);
    }
  };
  return (
    <div className="post-item">
      <div className="content">
        {!isEdit ? (
          <>
            <h4 className="post-title">{props?.title}</h4>
            <p className="post-content">{props?.content}</p>
          </>
        ) : (
          <>
            <Input
              size="sm"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="New title"
            />
            <Input
              size=""
              type="textarea"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="New content"
            />
          </>
        )}
      </div>
      <div className="btn">
        {!isEdit && (
          <>
            <Button className="btn-edit btn-item" onClick={handleEdit} outline>
              Edit
            </Button>
            <Button
              onClick={toggle}
              className="btn-delete btn-item"
              color="danger"
            >
              Delete
            </Button>
          </>
        )}
        {isEdit && (
          <>
            <Button
              className="btn-save btn-item"
              onClick={() => handleSave(newTitle, newContent)}
              color="primary"
              outline={
                newTitle !== "" && newTitle !== props?.title ? false : true
              }
              disabled={
                newTitle !== "" && newTitle !== props?.title ? false : true
              }
            >
              Save
            </Button>

            <Button
              className="btn-cancel btn-item"
              onClick={handleCancel}
              outline
            >
              Cancel
            </Button>
          </>
        )}
      </div>
      <Modal isOpen={modalDelete} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Delete Post</ModalHeader>
        <ModalBody>
          You sure about deleting post <b>{props.title}</b> ?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Post;
