import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import api from '../services/api';

const AdaptiveAssessment = ({ skill }) => {
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [finalEvaluation, setFinalEvaluation] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    getNextQuestion();
  }, []);

  const getNextQuestion = async () => {
    try {
      const response = await api.getQuestion(skill);
      setQuestion(response.question);
      setUserAnswer('');
      setEvaluation(null);
    } catch (error) {
      console.error('Error getting question:', error);
    }
  };

  const submitAnswer = async () => {
    try {
      const response = await api.evaluateAnswer(userAnswer, question, skill);
      setEvaluation(response);
      setQuestionCount(prevCount => prevCount + 1);

      if (questionCount >= 9) {  // Assuming 10 questions per assessment
        getFinalEvaluation();
      } else {
        setTimeout(getNextQuestion, 3000);  // Wait 3 seconds before next question
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const getFinalEvaluation = async () => {
    try {
      const response = await api.getFinalEvaluation();
      setFinalEvaluation(response);
    } catch (error) {
      console.error('Error getting final evaluation:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        {skill} Assessment
      </Typography>
      {finalEvaluation ? (
        <div>
          <Typography variant="h5">Final Evaluation</Typography>
          <Typography>Estimated Level: {finalEvaluation.estimated_level}</Typography>
          <Typography>Confidence: {(finalEvaluation.confidence * 100).toFixed(1)}%</Typography>
          <Typography>Range: {finalEvaluation.range}</Typography>
        </div>
      ) : (
        <div>
          <Typography variant="h6">Question {questionCount + 1}</Typography>
          <Typography>{question}</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={submitAnswer}>
            Submit Answer
          </Button>
          {evaluation && (
            <div>
              <Typography>Score: {evaluation.score}</Typography>
              <Typography>Feedback: {evaluation.feedback}</Typography>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default AdaptiveAssessment;