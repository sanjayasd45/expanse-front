import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    picture: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.picture = action.payload.picture;
        },
    }
});

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer 