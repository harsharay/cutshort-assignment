import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {RootReducer} from './Reducers/rootReducer'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const Store = configureStore({reducer : RootReducer});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={Store}>
      <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
