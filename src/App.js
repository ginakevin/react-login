import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import {AuthContext} from './ContextInfo'

function App() {
  const [auth, setAuth] = useState({ isAuthenticated: false, username: '' });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
