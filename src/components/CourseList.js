import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/courses/')
      .then(response => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError("There was an error fetching the courses!");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/courses/${id}/`)
      .then(() => {
        setCourses(courses.filter(course => course.id !== id));
        // Close the details view if the deleted course was selected
        if (selectedCourse && selectedCourse.id === id) {
          setSelectedCourse(null);
        }
      })
      .catch(error => {
        console.error("There was an error deleting the course!", error);
      });
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseDetails = () => {
    setSelectedCourse(null);
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (courses.length === 0) {
    return <p>No courses available.</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Course List</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {courses.map(course => (
          <li 
            key={course.id} 
            style={{
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{course.title}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: '0', color: '#777' }}>Code: {course.code}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => handleViewDetails(course)} 
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#add8e6', 
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleDelete(course.id)} 
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#add8e6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div 
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 1000
          }}
        >
          <h2>Course Details</h2>
          <p><strong>Title:</strong> {selectedCourse.title}</p>
          <p><strong>Code:</strong> {selectedCourse.code}</p>
          <p><strong>Description:</strong> {selectedCourse.description || 'No description available'}</p>
          <button 
            onClick={handleCloseDetails}
            style={{
              padding: '10px',
              backgroundColor: '#add8e6', 
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseList;

