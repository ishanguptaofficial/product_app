import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./actions";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
