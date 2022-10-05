import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { API_URL } from "../helpers/Config";
import { useAppDispatch } from "../store/app/hooks";
import { addPost } from "../store/features/postSlice";

const InputComponent: React.FC = () => {
  const [newPost, setNewPost] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleKeyPress = (
    event: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => {
    if (event.key === "Enter") {
      handlAddPost();
      setNewPost("");
    }
  };

  const handlAddPost = () => {
    const options = {
      method: "POST",
      body: newPost,
    };

    fetch(`${API_URL}/posts`, options)
      .then((response) => response.json())
      .then((post) => dispatch(addPost(post)))
      .catch((error) => {
        console.log(error);
        alert("couldn't add Post");
      });
  };

  return (
    <div className="flex flex-row items-center justify-center w-full">
      <input
        type="text"
        value={newPost}
        onChange={(event) => setNewPost(event.target.value)}
        onKeyPress={handleKeyPress}
        className="border-2 p-2 border-black m-4 rounded-md"
      />
      <button
        onClick={handlAddPost}
        className="border-2 border-black rounded-md p-2 text-gray-700"
      >
        Add
      </button>
    </div>
  );
};

export default InputComponent;
