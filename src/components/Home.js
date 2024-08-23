import React from 'react';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Welcome to the Course Management System
      </Typography>
      <Typography variant="body1" style={{ marginTop: '10px' }}>
        Use the navigation bar to manage courses and course instances.
      </Typography>
    </Container>
  );
};

export default Home;