import React, { useState, useRef } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HappyTest2 = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to start the front camera
  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }, // Front camera
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
      alert('Failed to access the camera. Please ensure permissions are granted.');
    }
  };

  // Function to stop the camera
  const handleStopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraOn(false);
    }
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
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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