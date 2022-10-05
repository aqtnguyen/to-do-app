import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../App";

const postSlice = createSlice({
  name: "post",
  initialState: <IPost[]>[],
  reducers: {
    addPost: (state, action: PayloadAction<IPost>) => {
      return [...state, action.payload];
    },
    updatePost: (state, action: PayloadAction<IPost>) => {
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletePost: (state, action: PayloadAction<IPost>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
