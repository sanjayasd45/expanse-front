import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const getRecentData = createAsyncThunk(
    "getRecentData",
    async(opt) => {
        try{
            const responce = await axios.post(`${baseUrl}/spending/get`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body : opt
            })
            const data = await responce
            return data.data
        }catch(err){
            console.log(err);
        }
    }
)

const slice  = createSlice({
    name : "getRecentData",
    initialState: {
        loading: false,
        list: [],
        error: '',
    },
    extraReducers: (builder) => {
        builder
          .addCase(getRecentData.pending, (state) => {
            state.loading = true
          })
          .addCase(getRecentData.fulfilled, (state, action) => {
            state.loading = false
            state.list = action.payload
            state.error = ''
          })
          .addCase(getRecentData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Something went wrong!'
          })
      },
})

export const getRecentDataList = (state) => state.getRecentData
// export const {addTxn} = getRecentData.actions


export default slice.reducer