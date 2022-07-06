import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from "./routes/AppRouter";
import { Provider } from 'react-redux';
import { store } from "./redux/store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
