// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';       // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Bootstrap JS + Popper
import './index.css';           
                     // Your custom CSS
import './firebase'  // so it runs before anything else

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
