import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {store} from './Store/store.js'
import {ToastContainer} from "react-toastify"
import 'react-toastify/ReactToastify.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer
      autoClose={2000}
    />
  </StrictMode>

);