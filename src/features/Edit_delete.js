import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// update blog

export const UpdateBlog = createAsyncThunk("UpdateBlog", async (data) => {
  await fetch(`http://127.0.0.1:8000/api/update/${data.id}`, {
    method: "PUT" /* or PATCH */,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
});

// delete blog
export const deleteBlog = createAsyncThunk("deleteBlog", async (id) => {
  await fetch(
    `http://127.0.0.1:8000/api/delete/${id}`,
    {
      method: "DELETE",
    }
  );

  try {
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
});

export const EditSlice = createSlice({
  name: "EditSlice",
  initialState: {
    blog: [],
    loading: false,
    error: false,
    deleteSuccess: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(UpdateBlog.pending, (state) =>{
      state.loading = true;
    })
    .addCase(UpdateBlog.fulfilled, (state,action) =>{
      state.loading = false;
      state.blog.push(action.payload)
    })
    .addCase(UpdateBlog.rejected, (state) =>{
      state.loading = true;
    })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg;
        state.blog = action.payload.filter((blog) => blog.id !== id);
        state.deleteSuccess = true;
      })
      .addCase(deleteBlog.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const EditActions = EditSlice.actions;
