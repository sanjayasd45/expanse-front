import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    username : "",
    email: "",
    loading : false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // console.log(action.payload);
            
            state.name = action?.payload?.name;
            state.username = action?.payload?.username;
            state.email = action?.payload?.email;
            state.createdAt = action?.payload?.createdAt            
        },
    }
});

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer 