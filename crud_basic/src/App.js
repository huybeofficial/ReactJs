// import "./App.css";

import { useEffect, useState } from "react";
import PostForm from "./features/PostForm/components";
import PostList from "./features/PostList/components";
import { GetAllPostAPI } from "./services/PostServices/PostService";

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
