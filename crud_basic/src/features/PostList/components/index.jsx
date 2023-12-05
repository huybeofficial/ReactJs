import React from "react";
import Post from "../../Post/components";
import "./index.css";
function PostList(props) {
  const { postList } = props;

  return (
    <div>
      <ul className="post-list">
        {postList.map((item, index) => {
          return (
            <li key={item?.id}>
              <Post
                title={item?.title}
                content={item?.content}
                postId={item?.id}
                getAllPost={props?.getAllPost}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PostList;
