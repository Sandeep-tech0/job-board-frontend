import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Avatar,
} from '@mui/material';
import axios from 'axios';
import { getJobById } from '../services/jobApiCall';
import { toast } from 'react-toastify';

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={`https://ui-avatars.com/api/?name=${job.company}&background=random`}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="h4" component="h1">
              {job.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {job.company}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Chip
            label={job.type}
            color="primary"
            sx={{ mr: 1 }}
          />
          <Chip
            label={job.location}
            variant="outlined"
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          Job Description
        </Typography>
        <Typography variant="body1" paragraph>
          {job.description}
        </Typography>
      </Paper>
    </Container>
  );
}

export default JobDetailsPage; 