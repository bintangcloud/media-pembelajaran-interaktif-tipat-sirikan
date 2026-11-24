import React from 'react';
import ReactDOM from 'react-dom/client';
import KlakatApp from './components/klakat/KlakatApp.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <KlakatApp onSwitchToTipat={() => { window.location.href = '/'; }} />
  </React.StrictMode>,
);
