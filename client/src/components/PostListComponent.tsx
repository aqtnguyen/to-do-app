import React, { useEffect, useState } from "react";
import { IPost } from "../App";
import { API_URL } from "../helpers/Config";
import PostComponent from "./PostComponent";

const PostListComponent: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const options = { method: "GET" };

    fetch(`${API_URL}/posts`, options)
      .then((response) => response.json())
      .then((fetchedPosts) => setPosts(fetchedPosts))
      .catch((error) => {
        console.log(error);
        alert("couldn't fetch tasks");
      });
  }, [posts]);

  return (
    <div>
      <hr />
      {posts.map((item) => (
        <PostComponent post={item} />
      ))}
    </div>
  );
};

export default PostListComponent;
