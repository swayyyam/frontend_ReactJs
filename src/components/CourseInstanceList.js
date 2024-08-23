import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInstance, setSelectedInstance] = useState(null);

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

  const fetchInstances = () => {
    axios.get(`http://127.0.0.1:8000/instances/${year}/${semester}/`)
      .then(response => {
        setInstances(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the instances!", error);
      });
  };

  const handleDeleteInstance = (courseId, year, semester) => {
    axios.delete(`http://127.0.0.1:8000/instances/${year}/${semester}/${courseId}/`)
      .then(() => {
        // Filter out the deleted instance from the instances array
        setInstances(prevInstances =>
          prevInstances.filter(instance =>
            !(instance.course === courseId && instance.year === year && instance.semester === semester)
          )
        );
      })
      .catch(error => {
        console.error("There was an error deleting the instance!", error);
      });
  };

  const handleViewInstanceDetails = (instance) => {
    setSelectedInstance(instance);
  };

  const handleCloseDetails = () => {
    setSelectedInstance(null);
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Course Instance List</h1>
      
      <div style={{ marginBottom: '20px' }}>
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
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
        />
        <label htmlFor="semester" style={{ display: 'block', marginBottom: '5px' }}>Semester</label>
        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
        >
          <option value="">Select a semester</option>
          {[...Array(8)].map((_, index) => (
            <option key={index + 1} value={index + 1}>{index + 1}</option>
          ))}
        </select>
        <button 
          onClick={fetchInstances}
          style={{
            padding: '10px',
            backgroundColor: '#add8e6', // Light blue color
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          List Instances
        </button>
      </div>

      {instances.length > 0 && (
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Course Instances</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {instances.map(instance => (
              <li 
                key={instance.id}
                style={{
                  marginBottom: '20px',
                  padding: '15px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                  {courses.find(course => course.id === instance.course)?.title || 'Unknown Course'}
                </h3>
                <p style={{ margin: '0 0 10px 0', color: '#777' }}>Code: {courses.find(course => course.id === instance.course)?.code || 'Unknown Code'}</p>
                <p style={{ margin: '0 0 10px 0', color: '#777' }}>Year: {instance.year}, Semester: {instance.semester}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => handleViewInstanceDetails(instance)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#add8e6', // Light blue color
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleDeleteInstance(instance.course, instance.year, instance.semester)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#add8e6', // Light blue color
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedInstance && (
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
          <p><strong>Title:</strong> {courses.find(course => course.id === selectedInstance.course)?.title || 'Unknown Title'}</p>
          <p><strong>Code:</strong> {courses.find(course => course.id === selectedInstance.course)?.code || 'Unknown Code'}</p>
          <p><strong>Year:</strong> {selectedInstance.year}</p>
          <p><strong>Semester:</strong> {selectedInstance.semester}</p>
          <button 
            onClick={handleCloseDetails}
            style={{
              padding: '10px',
              backgroundColor: '#add8e6', // Light blue color
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




