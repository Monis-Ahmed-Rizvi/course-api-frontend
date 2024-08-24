import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Typography, TextField, Button, Box, List, ListItem, 
  ListItemText, IconButton, Dialog, DialogTitle, DialogContent, 
  DialogActions, Snackbar, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Delete, Edit, Add } from '@mui/icons-material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', courseCode: '', description: '' });
  const [editingCourse, setEditingCourse] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setSnackbar({ open: true, message: 'Error fetching courses', severity: 'error' });
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
        setSnackbar({ open: true, message: 'Course updated successfully', severity: 'success' });
      } else {
        await axios.post('http://localhost:8081/api/courses', newCourse);
        setSnackbar({ open: true, message: 'Course created successfully', severity: 'success' });
      }
      setIsDialogOpen(false);
      setEditingCourse(null);
      setNewCourse({ title: '', courseCode: '', description: '' });
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      setSnackbar({ open: true, message: 'Error saving course', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/courses/${id}`);
      fetchCourses();
      setSnackbar({ open: true, message: 'Course deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting course:', error);
      setSnackbar({ open: true, message: 'Error deleting course', severity: 'error' });
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsDialogOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredCourses = courses
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: '20px' }}>Course Management</Typography>
      
      <Box sx={{ mt: 3, mb: 2 }}>
        <TextField
          label="Search Courses"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="courseCode">Course Code</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<Add />}
        onClick={() => setIsDialogOpen(true)}
        sx={{ mb: 2 }}
      >
        Add New Course
      </Button>

      <List>
        {filteredCourses.map((course) => (
          <ListItem key={course.id} 
            secondaryAction={
              <Box>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(course)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(course.id)}>
                  <Delete />
                </IconButton>
              </Box>
            }
          >
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
          <TextField
            name="title"
            label="Course Title"
            value={editingCourse ? editingCourse.title : newCourse.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="courseCode"
            label="Course Code"
            value={editingCourse ? editingCourse.courseCode : newCourse.courseCode}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={editingCourse ? editingCourse.description : newCourse.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
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

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CourseList;