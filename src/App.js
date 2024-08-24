import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Parent from './components/Parent';

const App = () => {
  return (
    <Router>
      <Parent/>
      
    </Router>
  );
};

export default App;

