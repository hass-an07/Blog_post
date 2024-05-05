import { configureStore } from "@reduxjs/toolkit";
import { CreateBlogSlice } from "../features/create_post";
import { EditSlice } from "../features/Edit_delete";

const store = configureStore({
  reducer: {
    blogs: CreateBlogSlice.reducer,
    edit:EditSlice.reducer
  },
},);

export default store;
