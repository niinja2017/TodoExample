import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/TodoSlice";
import cardReducer from "./slices/CardSlice";
const store = configureStore({
    reducer : {todo : todoReducer , card : cardReducer}
})

export default store
