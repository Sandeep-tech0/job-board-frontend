import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getJobs } from '../services/jobApiCall';
import { toast } from 'react-toastify';

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        job.title.toLowerCase().includes(searchTermLower) ||
        job.location.toLowerCase().includes(searchTermLower) ||
        job.company.toLowerCase().includes(searchTermLower)
      );
    });
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Available Jobs
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search jobs by title, company, or location..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
                '&:hover': {
                  '& > fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              },
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    width: 320,
                    height: 370,
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    boxShadow: 6,
                    borderRadius: 3,
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                      boxShadow: 12,
                    },
                  }}
                  onClick={() => navigate(`/job/${job._id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://ui-avatars.com/api/?name=${job.company}&background=random`}
                    alt={job.company}
                    sx={{
                      objectFit: 'cover',
                      width: '100%',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {job.company}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Typography variant="body2" color="text.secondary">
                        📍 {job.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ⏰ {job.type}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: 'background.default'
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  No jobs found matching your search criteria
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default HomePage; 