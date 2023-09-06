import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/usersSlice";

//create a store

const store = configureStore({
    reducer:{
        users: usersReducer
    }
})

export default store;