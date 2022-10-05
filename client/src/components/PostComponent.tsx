import React from "react";
import { IPost } from "../App";
import { API_URL } from "../helpers/Config";
import { useAppDispatch } from "../store/app/hooks";
import { deletePost, updatePost } from "../store/features/postSlice";

interface IProps {
  post: IPost;
}

const PostComponent: React.FC<IProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    const updatedPost: IPost = { ...post, done: !post.done };

    const options = {
      method: "PUT",
      body: JSON.stringify(updatedPost),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`${API_URL}/posts/${post.id}`, options)
      .then((response) => response.json())
      .then((updatedPost) => dispatch(updatePost(updatedPost)))
      .catch((error) => {
        console.log(error);
        alert("couldn't update post");
      });
  };

  const handleDeletePost = () => {
    const options = { method: "DELETE" };

    fetch(`${API_URL}/posts/${post.id}`, options)
      .then((response) => {
        if (response.ok) {
          dispatch(deletePost(post));
        }
      })
      .catch((error) => {
        console.log(error);
        alert("couldn't delete post");
      });
  };

  return (
    <div className="flex flex-row justify-between items-center w-full py-4 px-60">
      <input
        type="checkbox"
        checked={post.done}
        onChange={handleToggle}
        className=""
      />

      <span>{post.content}</span>

      <button onClick={handleDeletePost}>X</button>
    </div>
  );
};

export default PostComponent;
