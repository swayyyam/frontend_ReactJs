import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Parent from './components/Parent';

const App = () => {
  return (
    <Router>
      <Parent/>
      {/* <Routes>
        <Route path="/" element={<CreateCourse />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/create-instance" element={<CreateCourseInstance />} />
        <Route path="/instance-list" element={<CourseInstanceList />} />
      </Routes> */}
    </Router>
  );
};

export default App;

