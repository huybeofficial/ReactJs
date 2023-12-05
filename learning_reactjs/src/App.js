// import "./App.css";

import { useEffect, useState } from "react";
import PostForm from "./features/Post/PostForm/components";
import PostList from "./features/Post/PostList/components";
import { GetAllPostAPI } from "./features/Post/PostServices/PostService";

function App() {
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
    <div className="App">
      <PostForm getAllPost={getAllPost} />
      <PostList postList={postList} getAllPost={getAllPost} />
    </div>
  );
}

export default App;
