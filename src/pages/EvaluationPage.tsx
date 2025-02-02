// src/pages/EvaluationPage.tsx
import React, { useState } from 'react';
import { Box, Typography, Button, Slider, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

// Emotion options with emojis
const emotions = [
  { label: 'Happy', emoji: '😊' },
  { label: 'Sad', emoji: '😢' },
  { label: 'Angry', emoji: '😡' },
  { label: 'Surprised', emoji: '😮' },
  { label: 'Fearful', emoji: '😨' },
  { label: 'Disgusted', emoji: '🤢' }
];

const EvaluationPage = () => {
  const navigate = useNavigate();
  const { emotion } = useParams<{ emotion: string }>(); // Access the dynamic parameter
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<number>(5);

  // Handle emotion selection
  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  // Handle intensity change
  const handleIntensityChange = (event: Event, newValue: number | number[]) => {
    setIntensity(newValue as number);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (selectedEmotion) {
       // Extract the base path from the current URL
       const basePath = location.pathname.split('/').slice(0, 3).join('/');
       // Navigate to the base path
       navigate(basePath);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        gap: 4,
        backgroundColor: '#FFF8E7'
      }}
    >
      {/* Emotion Selection */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
        How are you feeling?
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {emotions.map((emotionOption) => (
          <Grid item key={emotionOption.label}>
            <Button
              variant={selectedEmotion === emotionOption.label ? 'contained' : 'outlined'}
              onClick={() => handleEmotionSelect(emotionOption.label)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                borderRadius: 2,
                width: '120px',
                backgroundColor: selectedEmotion === emotionOption.label ? '#00BCD4' : '#fff',
                color: selectedEmotion === emotionOption.label ? '#fff' : '#333',
                '&:hover': {
                  backgroundColor: selectedEmotion === emotionOption.label ? '#0097A7' : '#f5f5f5'
                }
              }}
            >
              <Typography variant="h4">{emotionOption.emoji}</Typography>
              <Typography variant="body1">{emotionOption.label}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Intensity Rating */}
      <Box sx={{ width: '100%', maxWidth: '400px', marginTop: 4 }}>
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#333' }}>
          Intensity: {intensity}
        </Typography>
        <Slider
          value={intensity}
          onChange={handleIntensityChange}
          min={1}
          max={10}
          step={1}
          sx={{ color: '#00BCD4' }}
        />
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!selectedEmotion}
        sx={{
          marginTop: 4,
          padding: '10px 20px',
          backgroundColor: '##00BCD4',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#0097A7'
          },
          '&:disabled': {
            backgroundColor: '#ccc'
          }
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default EvaluationPage;