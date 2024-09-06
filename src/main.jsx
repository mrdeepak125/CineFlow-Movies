import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import { store } from "./store/store";
import { Provider } from "react-redux";
import { UserProvider } from './contexts/UserContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
         <UserProvider>
            <App />
        </UserProvider>
    </Provider>
);
