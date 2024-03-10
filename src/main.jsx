import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import App from './App';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'instalasol-e-store.firebaseapp.com',
  projectId: 'instalasol-e-store',
  storageBucket: 'instalasol-e-store.appspot.com',
  messagingSenderId: '332823164213',
  appId: '1:332823164213:web:271b3159af3af73b6b487c',
  measurementId: 'G-EKN85QCPLD',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
