import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
// import { AuthProvider } from './AuthContext';

// import { AuthProvider } from './features/AuthContext';

import './index.css';
// import axios from 'axios'; // Import axios at the top
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


import App from './App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

// axios.defaults.baseURL = 'http://localhost:5001'; // Set the base URL for axios
root.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <AuthProvider> */}

      <App />
      {/* </AuthProvider> */}

    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
