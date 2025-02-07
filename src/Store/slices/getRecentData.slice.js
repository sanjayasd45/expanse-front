import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

// Async thunk to fetch recent data
export const getRecentData = createAsyncThunk(
  "getRecentData",
  async (opt) => {
    try {
      const response = await axios.post(`${baseUrl}/spending/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: opt,
      });
      const data = await response;
      console.log(data.data);
      
      return data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const slice = createSlice({
  name: "getRecentData",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    deleteItemById: (state, action) => {
      const idToDelete = action.payload; // The _id of the item to delete
      console.log(action.payload);
      state.list.data = state.list.data.filter((item) => (
        item._id !== idToDelete
      ));
    },
    addItem: (state, action) => {
      // Check if the action.payload is the correct format (an object)
      if(state.list.currentPage === 1){
        
        if (action.payload && typeof action.payload === 'object') {
          state.list.data.unshift(action.payload);
        } else {
          console.error("Invalid item format:", action.payload);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecentData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = "";
      })
      .addCase(getRecentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

// Export the action for deleting an item by _id
export const { deleteItemById, addItem } = slice.actions;

// Selector to get the slice's state
export const getRecentDataList = (state) => state.getRecentData;

export default slice.reducer;
