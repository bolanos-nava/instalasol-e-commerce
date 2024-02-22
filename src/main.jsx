import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import App from './App';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDdCYLDEbpIegsQ42TnyGiCMryiX_ThdLM',
  authDomain: 'coderhouse-prueba-bbde0.firebaseapp.com',
  projectId: 'coderhouse-prueba-bbde0',
  storageBucket: 'coderhouse-prueba-bbde0.appspot.com',
  messagingSenderId: '370735572271',
  appId: '1:370735572271:web:933c10ab099dd377b62dda',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
