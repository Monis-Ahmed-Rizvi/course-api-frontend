import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, Typography, Button, Box, List, ListItem, ListItemText, Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
      setSnackbar({ open: true, message: 'Error fetching course details', severity: 'error' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (!course) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: '20px' }}>Course Details</Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">{course.title}</Typography>
        <Typography variant="subtitle1">Course Code: {course.courseCode}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>{course.description}</Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Course Instances</Typography>
        <List>
          {course.instances && course.instances.map((instance) => (
            <ListItem key={instance.id}>
              <ListItemText primary={`Year: ${instance.year}, Semester: ${instance.semester}`} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Button variant="contained" color="primary" onClick={() => navigate('/courses')} sx={{ mt: 2 }}>
        Back to Courses
      </Button>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CourseDetails;