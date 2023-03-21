import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogged: false,
        token: '',
        userId: ''
    },
    reducers: {
        connectUser: (state, action) => {
            state = {
                ...state,
                isLogged: true,
                token: action.payload.token,
                userId: action.payload.userId
            };
            return state;
        },
        disconnectUser: (state) => {
            state = {
                isLogged: false,
                token: '',
                userId: ''
            };
            return state;
        }
    }
});
export const { connectUser, disconnectUser } = userSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});