import { useEffect } from "react";
import InputComponent from "./components/InputComponent";
import PostListComponent from "./components/PostListComponent";
import { API_URL } from "./helpers/Config";
import { useAppDispatch } from "./store/app/hooks";
import { addPost } from "./store/features/postSlice";

export interface IPost {
  id: number;
  content: string;
  done: boolean;
}

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const options = { method: "GET" };

    fetch(`${API_URL}/posts`, options)
      .then((response) => response.json())
      .then((fetchedPosts) =>
        fetchedPosts.forEach((item: IPost) => dispatch(addPost(item)))
      )
      .catch((error) => {
        console.log(error);
        alert("couldn't fetch posts");
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="">
      <h1 className="text-blue-700 text-7xl text-center my-10">To Do App</h1>
      <InputComponent />
      <PostListComponent />
    </div>
  );
}

export default App;
