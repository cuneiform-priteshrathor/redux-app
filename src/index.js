import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import axios from "axios";
import * as _redux from "./redux";
const root = ReactDOM.createRoot(document.getElementById('root'));
_redux.setupAxios(axios, store);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <React.StrictMode>
        <App />

      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
