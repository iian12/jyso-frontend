import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BoardListPage from './pages/BoardListPage';
import CreateBoardPage from './pages/CreateBoardPage';
import BoardDetailPage from "./pages/BoardDetailPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/board/:id" element={<BoardDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/posts" element={<BoardListPage />} />
          <Route path="/new-board" element={<CreateBoardPage />} />
        </Routes>
      </Router>
  );
}

export default App;
