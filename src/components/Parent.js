import React from 'react';
import CreateCourse from './CreateCourse';
import CourseList from './CourseList';
import CreateCourseInstance from './CreateCourseInstance';
import CourseInstanceList from './CourseInstanceList';

const Parent = () => {
  
  return (
    <div style={styles.appContainer}>
      <div style={styles.appGrid}>
        <div style={styles.gridItem}>
          <CreateCourse />
        </div>
        <div style={styles.gridItem}>
          <CreateCourseInstance />
        </div>
        <div style={styles.gridItem}>
          <CourseList />
        </div>
        <div style={styles.gridItem}>
          <CourseInstanceList />
        </div>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    overflowY: 'auto', 
  },
  appGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  gridItem: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '100%', 
    overflowY: 'auto', 
  },
  '@media (max-width: 768px)': {
    appGrid: {
      gridTemplateColumns: '1fr', 
      gap: '15px',
    },
  },
};

export default Parent;
