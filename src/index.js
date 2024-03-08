import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
const defaultTheme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
      <ToastContainer />
    </ThemeProvider>
  </Provider>
);
