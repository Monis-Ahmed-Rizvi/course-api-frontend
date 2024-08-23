import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CourseInstanceList = () => {
  const [instances, setInstances] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newInstance, setNewInstance] = useState({ year: '', semester: '', courseId: '' });
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

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
    }
  };

  const fetchInstances = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/instances/${year}/${semester}`);
      setInstances(response.data);
    } catch (error) {
      console.error('Error fetching instances:', error);
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
    } catch (error) {
      console.error('Error creating instance:', error);
    }
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Course</InputLabel>
          <Select
            name="courseId"
            value={newInstance.courseId}
            onChange={handleInputChange}
            required
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>{course.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
          <ListItem key={instance.id}>
            <ListItemText 
              primary={`${instance.course.title} - Year: ${instance.year}, Semester: ${instance.semester}`} 
              secondary={`Course Code: ${instance.course.courseCode}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CourseInstanceList;