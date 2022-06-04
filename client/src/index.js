import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import UenPage from './pages/uen/uen.page';
import WeatherPage from './pages/weather/weather.page';
import NavBar from './components/navBar/navBar.component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NavBar />
    <div id = 'mainHolder'>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route path="/uen" element={<UenPage />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
