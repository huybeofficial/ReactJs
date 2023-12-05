import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AddPostAPI } from "../../PostServices/PostService";
function PostForm(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = async (title, content) => {
    try {
      await AddPostAPI(title, content);
      setTitle("");
      setContent("");
      props.getAllPost();
    } catch (error) {
      console.log("error Post", error);
    }
  };
  return (
    <div className="post-form">
      <h3>New Post</h3>
      <div className="form">
        <div className="title-container">
          <label>Title</label>
          <Input
            size="lg"
            className="input-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="title-container">
          <label>Content</label>
          <Input
            size="lg"
            className="input-content"
            type="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />
        </div>
      </div>
      <Button
        className="btn-post"
        disabled={title && content ? false : true}
        onClick={() => handlePost(title, content)}
        color="primary"
        size="lg"
      >
        Post
      </Button>
    </div>
  );
}

export default PostForm;
