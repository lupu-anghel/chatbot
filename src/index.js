import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MessagesProvider } from './context/messages.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MessagesProvider>
      <App />
    </MessagesProvider>
  </React.StrictMode>
);


