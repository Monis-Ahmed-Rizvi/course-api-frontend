import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, Typography, Button, Box, Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CourseInstanceDetails = () => {
  const [instance, setInstance] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { year, semester, courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstance();
  }, [year, semester, courseId]);

  const fetchInstance = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/instances/${year}/${semester}/${courseId}`);
      setInstance(response.data);
    } catch (error) {
      console.error('Error fetching course instance details:', error);
      setSnackbar({ open: true, message: 'Error fetching course instance details', severity: 'error' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (!instance) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: '20px' }}>Course Instance Details</Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">{instance.course.title}</Typography>
        <Typography variant="subtitle1">Course Code: {instance.course.courseCode}</Typography>
        <Typography variant="body1">Year: {instance.year}</Typography>
        <Typography variant="body1">Semester: {instance.semester}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>{instance.course.description}</Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={() => navigate('/instances')} sx={{ mt: 2 }}>
        Back to Instances
      </Button>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CourseInstanceDetails;