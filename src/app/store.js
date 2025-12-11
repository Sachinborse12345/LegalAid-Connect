// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../Redux/registerSlice";

export const store = configureStore({
    reducer: {
        register: registerReducer,   // <-- FIXED
    },
});

export default store;
