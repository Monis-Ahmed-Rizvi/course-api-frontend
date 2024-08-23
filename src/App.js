import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CourseList from './components/CourseList';
import CourseInstanceList from './components/CourseInstanceList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/instances" element={<CourseInstanceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;