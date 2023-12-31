// import "./App.css";

import { useEffect, useState } from "react";
import { GetAllPostAPI } from "./PostServices/PostService";
import PostList from "./PostList/components";
import PostForm from "./PostForm/components";

function Post() {
  const [postList, setPostList] = useState([]);

  const getAllPost = async () => {
    try {
      const res = await GetAllPostAPI();
      setPostList(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <div className="Post">
      <PostForm getAllPost={getAllPost} />
      <PostList postList={postList} getAllPost={getAllPost} />
    </div>
  );
}

export default Post;
