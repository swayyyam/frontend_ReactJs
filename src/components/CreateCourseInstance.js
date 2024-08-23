import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCourseInstance = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInstance = { year, semester, course: courseId };

    axios.post('http://127.0.0.1:8000/instances/', newInstance)
      .then(response => {
        console.log("Course instance created successfully!", response.data);
        setYear('');
        setSemester('');
        setCourseId('');
      })
      .catch(error => {
        console.error("There was an error creating the course instance!", error);
      });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Course Instance</h1>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="year" style={{ display: 'block', marginBottom: '5px' }}>Year (YYYY)</label>
        <input
          type="text"
          id="year"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="semester" style={{ display: 'block', marginBottom: '5px' }}>Semester</label>
        <input
          type="text"
          id="semester"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="courseId" style={{ display: 'block', marginBottom: '5px' }}>Course</label>
        <select
          id="courseId"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        >
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>
      <button 
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#2e73b8',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Add Instance
      </button>
    </form>
  );
};

export default CreateCourseInstance;

