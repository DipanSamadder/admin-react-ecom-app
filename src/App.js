import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Fix import here
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Forget from "./pages/Forget";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
