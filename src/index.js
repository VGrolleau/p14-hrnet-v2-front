import React from 'react';
import ReactDOM from 'react-dom/client';
import './utils/style/index.css';
import App from './pages/App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
