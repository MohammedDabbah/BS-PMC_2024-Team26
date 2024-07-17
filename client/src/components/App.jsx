import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import DeveloperPage from "./DeveloperPage";
import ManagerPage from "./ManagerPage";
import TesterPage from "./TesterPage";
import Login from "./Login";
import ChangePassword from "./ChangePassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/Developer" element={<DeveloperPage />} />
        <Route path="/Manager" element={<ManagerPage />} />
        <Route path="/Tester" element={<TesterPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
