import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard';
import AdaptiveAssessment from './components/AdaptiveAssessment';
import SpeakingAssessment from './components/SpeakingAssessment';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/speaking" element={<SpeakingAssessment />} />
          <Route path="/listening" element={<AdaptiveAssessment skill="Listening" />} />
          <Route path="/reading" element={<AdaptiveAssessment skill="Reading" />} />
          <Route path="/writing" element={<AdaptiveAssessment skill="Writing" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;