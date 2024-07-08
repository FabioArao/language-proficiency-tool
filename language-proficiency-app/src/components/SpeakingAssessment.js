import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import api from '../services/api';

const SpeakingAssessment = () => {
  const [transcription, setTranscription] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (exception) => {
      console.error(exception);
      setError("Failed to access microphone. Please check your permissions.");
    }
  );

  useEffect(() => {
    if (recorderControls.isRecording && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            recorderControls.stopRecording();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!recorderControls.isRecording) {
      clearInterval(timerRef.current);
      setTimeLeft(10);
    }

    return () => clearInterval(timerRef.current);
  }, [recorderControls.isRecording]);

  const handleRecordingComplete = async (blob) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Sending blob to server:', blob);
      const result = await api.submitSpeakingAssessment(blob);
      console.log('Server response:', result);
      
      if (result.transcription) {
        setTranscription(result.transcription);
        // Placeholder evaluation logic
        setEvaluation({
          level: "Intermediate",
          feedback: "This is placeholder feedback. Implement actual evaluation logic."
        });
      } else {
        throw new Error('No transcription received from the server');
      }
    } catch (err) {
      console.error('Error details:', err);
      setError(`Failed to process recording: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Speaking Assessment
      </Typography>
      <Typography variant="h5" gutterBottom>
        Tell me about your day?
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <AudioRecorder 
          onRecordingComplete={handleRecordingComplete}
          recorderControls={recorderControls}
          downloadOnSavePress={false}
          showVisualizer={true}
        />
        {recorderControls.isRecording && (
          <Typography variant="h6" mt={2}>
            Time left: {timeLeft}s
          </Typography>
        )}
      </Box>
      {isLoading && <CircularProgress sx={{ mt: 2 }} />}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
          {error.includes('Failed to fetch') && (
            <Typography>
              This might be due to CORS issues or the server being unreachable. 
              Please check that your backend is running and accessible.
            </Typography>
          )}
        </Alert>
      )}
      {transcription && (
        <Box mt={3}>
          <Typography variant="h6">Transcription:</Typography>
          <Typography>{transcription}</Typography>
        </Box>
      )}
      {evaluation && (
        <Box mt={3}>
          <Typography variant="h6">Evaluation:</Typography>
          <Typography>Level: {evaluation.level}</Typography>
          <Typography>Feedback: {evaluation.feedback}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default SpeakingAssessment;