import rootReducers from "./reducer";
import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({reducer: rootReducers});

export default store;