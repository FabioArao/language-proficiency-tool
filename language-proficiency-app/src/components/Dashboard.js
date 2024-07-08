// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';

function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Language Proficiency Evaluation
      </Typography>
      <Grid container spacing={3}>
        {['Speaking', 'Listening', 'Reading', 'Writing'].map((skill) => (
          <Grid item xs={12} sm={6} md={3} key={skill}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">{skill}</Typography>
              <Button
                component={Link}
                to={`/${skill.toLowerCase()}`}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Start Assessment
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;