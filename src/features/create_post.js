import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create post
export const createBlog = createAsyncThunk("createBlog", async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("short_desc", data.short_desc);
  formData.append("description", data.description);
  formData.append("author", data.author);
  formData.append("image", data.image); // Assuming 'image' is the file field name

  try {
    const response = await fetch("http://127.0.0.1:8000/api/added", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to create blog post");
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    throw error;
  }
});


// getting data
export const ReadBlog = createAsyncThunk("ReadBlog", async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/getBlog");

    const data = await response.json();
    const result = data.data;
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// fetch single data
export const SingleBlog = createAsyncThunk("SingleBlog", async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/getBlog/${id}`);

    const data = await response.json();
    const result = data.data;
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const CreateBlogSlice = createSlice({
  name: "CreateBlogSlice",
  initialState: {
    blog: [],
    singleBlog: [],
    loading: false,
    error: false,
    searchData: [],

  },
  reducers: {
    searchItem: (state, action) => {
      state.searchData = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog.push(action.payload);
      })
      .addCase(createBlog.rejected, (state) => {
        state.loading = true;
        state.error = true;
      })
      .addCase(ReadBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(ReadBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(ReadBlog.rejected, (state) => {
        state.loading = true;
        state.error = true;
      })
      .addCase(SingleBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(SingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(SingleBlog.rejected, (state) => {
        state.loading = true;
        state.error = true;
      });
  },
});

export const CreateBlogActions = CreateBlogSlice.actions;
export const {searchItem} = CreateBlogSlice.actions;

