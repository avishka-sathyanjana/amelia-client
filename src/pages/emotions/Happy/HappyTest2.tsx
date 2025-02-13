import React, { useState, useRef } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useRecording from '@/components/hooks/useRecording';
import Webcam from 'react-webcam';

const HappyTest2 = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const {webcamRef, startRecording, stopRecording } = useRecording();

  // Function to start the front camera
  const handleStartCamera = () => {
    setIsCameraOn(true);
    startRecording();
  };

  // Function to stop the camera
  const handleStopCamera = () => {
    setIsCameraOn(false);
    stopRecording();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 4,
        padding: 4,
      }}
    >
      {/* Prompt */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' , color: '#333'}}>
        Tell us about the most recent happiest event that you experienced
      </Typography>

      {/* Video element for camera feed */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          height: '300px',
          border: '2px solid #ccc',
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
         <Webcam
          audio={false} // Enable audio recording
          ref={webcamRef}
          width="100%"
          height="100%"
          videoConstraints={{
            facingMode: 'user', // Front camera
          }}
          mirrored={true} // Mirror the video for a more natural feel
          style={{ objectFit: 'cover' }}
        />
      </Box>

      {/* Start/Stop Camera Button */}
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        variant="contained"
        onClick={isCameraOn ? handleStopCamera : handleStartCamera}
        sx={{
          backgroundColor: isCameraOn ? '#FF6347' : '#32CD32', // Red for stop, green for start
          color: '#fff',
          fontWeight: 'bold',
          height: '50px',
          width: '150px',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: isCameraOn ? '#FF4500' : '#228B22',
          },
        }}
      >
        {isCameraOn ? 'Stop Camera' : 'Start Camera'}
      </Button>

      {/* Evaluate Button */}
      <Button
        variant="contained"
        onClick={() => navigate('/tasks/happy/test2/evaluation')}
        sx={{
          backgroundColor: '#32CD32',
          color: '#fff',
          fontWeight: 'bold',
          height: '50px',
          width: '150px',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: '#228B22',
          },
        }}
      >
        Evaluate
      </Button>
      </Box>
    </Box>
  );
};

export default HappyTest2;