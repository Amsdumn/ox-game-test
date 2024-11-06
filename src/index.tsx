import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientID = process.env.REACT_APP_CLIENT_ID || '';
// console.log('clientID: ' + clientID);
if (!clientID) {
  console.warn("REACT_APP_CLIENT_ID is not defined. Make sure to set it in your .env file.");
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {clientID ? (
      <GoogleOAuthProvider clientId={clientID}>
        <App />
      </GoogleOAuthProvider>
    ) : (
      <div>Error: Google OAuth Client ID is not provided.</div>
    )}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
