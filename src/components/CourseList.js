import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', courseCode: '', description: '' });
  const [editingCourse, setEditingCourse] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCourse) {
      setEditingCourse({ ...editingCourse, [name]: value });
    } else {
      setNewCourse({ ...newCourse, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await axios.put(`http://localhost:8081/api/courses/${editingCourse.id}`, editingCourse);
      } else {
        await axios.post('http://localhost:8081/api/courses', newCourse);
      }
      setNewCourse({ title: '', courseCode: '', description: '' });
      setEditingCourse(null);
      setIsDialogOpen(false);
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: '20px' }}>Courses</Typography>
      
      <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)} sx={{ mt: 2, mb: 2 }}>
        Add New Course
      </Button>

      <List>
        {courses.map((course) => (
          <ListItem key={course.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(course)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(course.id)}>
                <Delete />
              </IconButton>
            </>
          }>
            <ListItemText 
              primary={`${course.title} (${course.courseCode})`} 
              secondary={course.description} 
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={isDialogOpen} onClose={() => {
        setIsDialogOpen(false);
        setEditingCourse(null);
      }}>
        <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              name="title"
              label="Course Title"
              value={editingCourse ? editingCourse.title : newCourse.title}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              name="courseCode"
              label="Course Code"
              value={editingCourse ? editingCourse.courseCode : newCourse.courseCode}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Description"
              value={editingCourse ? editingCourse.description : newCourse.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsDialogOpen(false);
            setEditingCourse(null);
          }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingCourse ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseList;