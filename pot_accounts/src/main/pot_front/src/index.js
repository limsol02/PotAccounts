import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './styles/global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* 글로벌 스타일 적용 컴포넌트 */}
    <GlobalStyle/>
  </React.StrictMode>
);

reportWebVitals();
