import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Snackbar,
  MenuItem
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CourseInstanceList = () => {
  const [instances, setInstances] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newInstance, setNewInstance] = useState({ year: '', semester: '', courseId: '' });
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (year && semester) {
      fetchInstances();
    }
  }, [year, semester]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setSnackbar({ open: true, message: 'Error fetching courses', severity: 'error' });
    }
  };

  const fetchInstances = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/instances/${year}/${semester}`);
      setInstances(response.data);
    } catch (error) {
      console.error('Error fetching instances:', error);
      setSnackbar({ open: true, message: 'Error fetching course instances', severity: 'error' });
    }
  };

  const handleInputChange = (e) => {
    setNewInstance({ ...newInstance, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8081/api/courses/${newInstance.courseId}/instances`, newInstance);
      setNewInstance({ year: '', semester: '', courseId: '' });
      if (year === newInstance.year && semester === newInstance.semester) {
        fetchInstances();
      }
      setSnackbar({ open: true, message: 'Course instance created successfully', severity: 'success' });
    } catch (error) {
      console.error('Error creating instance:', error);
      setSnackbar({ open: true, message: 'Error creating course instance', severity: 'error' });
    }
  };

  const handleDelete = async (instance) => {
    try {
      await axios.delete(`http://localhost:8081/api/instances/${instance.year}/${instance.semester}/${instance.course.id}`);
      fetchInstances();
      setSnackbar({ open: true, message: 'Course instance deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting instance:', error);
      setSnackbar({ open: true, message: 'Error deleting course instance', severity: 'error' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: '20px' }}>Course Instance Management</Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          name="year"
          label="Year"
          value={newInstance.year}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="semester"
          label="Semester"
          value={newInstance.semester}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          select
          name="courseId"
          label="Course"
          value={newInstance.courseId}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        >
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>{course.title}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Instance
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">List Instances</Typography>
        <TextField
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          margin="normal"
          sx={{ mr: 2 }}
        />
        <TextField
          label="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          margin="normal"
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={fetchInstances} sx={{ mt: 2 }}>
          List Instances
        </Button>
      </Box>

      <List sx={{ mt: 2 }}>
        {instances.map((instance) => (
          <ListItem 
            key={instance.id} 
            component={Link}
            to={`/instances/${instance.year}/${instance.semester}/${instance.course.id}`}
            secondaryAction={
              <IconButton 
                edge="end" 
                aria-label="delete" 
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(instance);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText 
              primary={`${instance.course.title} - Year: ${instance.year}, Semester: ${instance.semester}`} 
              secondary={`Course Code: ${instance.course.courseCode}`}
            />
          </ListItem>
        ))}
      </List>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CourseInstanceList;