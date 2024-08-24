import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import CourseInstanceList from './components/CourseInstanceList';
import CourseInstanceDetails from './components/CourseInstanceDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/instances" element={<CourseInstanceList />} />
          <Route path="/instances/:year/:semester/:courseId" element={<CourseInstanceDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;