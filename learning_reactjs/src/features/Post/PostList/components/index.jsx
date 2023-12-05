import React from "react";
import "./index.css";
import PostItem from "../../PostItem/components";
function PostList(props) {
  const { postList } = props;

  return (
    <div>
      <ul className="post-list">
        {postList.map((item, index) => {
          return (
            <li key={item?.id}>
              <PostItem
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
