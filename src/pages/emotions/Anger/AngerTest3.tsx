import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FlappyBirdGame = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // State for game control
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30-second countdown
  const [isGameOver, setIsGameOver] = useState(false);
  const [isTimerCritical, setIsTimerCritical] = useState(false); // Track if timer is low

  // Refs for game elements
  const birdRef = useRef<HTMLDivElement | null>(null);
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const obstacleRef = useRef<HTMLDivElement | null>(null);
  const beepSoundRef = useRef<HTMLAudioElement | null>(null);

  // Bird position and gravity
  const [birdPosition, setBirdPosition] = useState(200); // Initial vertical position
  const gravity = 4; // Gravity effect
  const jumpHeight = 50; // Height of each jump

  // Obstacle settings
  const [obstacleHeight, setObstacleHeight] = useState(150); // Height of the gap
  const [obstaclePosition, setObstaclePosition] = useState(500); // Horizontal position of the obstacle

  // Countdown timer
  useEffect(() => {
    let timer: number;
    if (isPlaying && timeLeft > 0 && !isGameOver) {
      timer = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsGameOver(true);
      if (beepSoundRef.current) {
        beepSoundRef.current.pause();
        beepSoundRef.current.currentTime = 0;
      }
    }
    return () => clearInterval(timer);
  }, [timeLeft, isGameOver, isPlaying]);

  // Handle timer critical state (10 seconds or less)
  useEffect(() => {
    if (timeLeft <= 10 && timeLeft > 0) {
      setIsTimerCritical(true);
      if (beepSoundRef.current) {
        beepSoundRef.current.play(); // Play beep sound
      }
    } else {
      setIsTimerCritical(false);
      if (beepSoundRef.current) {
        beepSoundRef.current.pause(); // Pause beep sound
        beepSoundRef.current.currentTime = 0; // Reset sound
      }
    }
  }, [timeLeft]);

  // Handle bird gravity
  useEffect(() => {
    let gravityInterval: number;
    if (isPlaying && !isGameOver) {
      gravityInterval = window.setInterval(() => {
        setBirdPosition((prevPosition) => Math.min(prevPosition + gravity, 400)); // Limit bird's fall
      }, 50);
    }
    return () => clearInterval(gravityInterval);
  }, [isPlaying, isGameOver]);

  // Handle obstacle movement
  useEffect(() => {
    let obstacleInterval: number;
    if (isPlaying && !isGameOver) {
      obstacleInterval = window.setInterval(() => {
        setObstaclePosition((prevPosition) => {
          if (prevPosition <= -50) {
            // Reset obstacle position and randomize height
            setObstacleHeight(Math.floor(Math.random() * 200) + 100);
            setScore((prevScore) => prevScore + 1); // Increment score
            return 500;
          }
          return prevPosition - 5; // Move obstacle left
        });
      }, 50);
    }
    return () => clearInterval(obstacleInterval);
  }, [isPlaying, isGameOver]);

  // Handle collision detection
  useEffect(() => {
    if (isPlaying && !isGameOver) {
      const bird = birdRef.current;
      const obstacle = obstacleRef.current;

      if (bird && obstacle) {
        const birdRect = bird.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        // Check for collision
        if (
          birdRect.left < obstacleRect.right &&
          birdRect.right > obstacleRect.left &&
          (birdRect.top < obstacleRect.top || birdRect.bottom > obstacleRect.bottom)
        ) {
          setIsGameOver(true); // End game on collision
        }
      }
    }
  }, [birdPosition, obstaclePosition, isPlaying, isGameOver]);

  // Handle bird jump
  const handleJump = () => {
    if (isPlaying && !isGameOver) {
      setBirdPosition((prevPosition) => Math.max(prevPosition - jumpHeight, 0)); // Limit bird's rise
    }
  };

  // Handle spacebar key press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, isGameOver]);

  // Pause game when window loses focus
  useEffect(() => {
    const handleBlur = () => {
      if (isPlaying && !isGameOver) {
        setIsPlaying(false);
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [isPlaying, isGameOver]);

  // Handle start button click
  const handleStart = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setBirdPosition(200);
    setObstaclePosition(500);
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
        backgroundColor: '#FFF8E7', // Light warm background
        gap: 4,
      }}
    >
      {/* Game Title */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
        Flappy Bird Game
      </Typography>

      {/* Game Instructions */}
      <Typography variant="h6" sx={{ color: '#555', textAlign: 'center' }}>
        {isGameOver
          ? "Game Over! Try again."
          : isPlaying
          ? "Press Spacebar or Click to Flap!"
          : "Click 'Start' to begin. Avoid the obstacles!"}
      </Typography>

      {/* Timer Display */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: isTimerCritical ? '#FF0000' : '#333', // Red color when critical
          fontSize: isTimerCritical ? '2.5rem' : '2rem', // Larger font when critical
          animation: isTimerCritical ? 'pulse 1s infinite' : 'none', // Pulsating effect
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.2)' },
            '100%': { transform: 'scale(1)' },
          },
        }}
      >
        Time Left: {timeLeft} seconds
      </Typography>

      {/* Score Display */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
        Score: {score}
      </Typography>

      {/* Game Container */}
      <Box
        ref={gameContainerRef}
        sx={{
          position: 'relative',
          width: '500px',
          height: '400px',
          backgroundColor: '#87CEEB', // Sky blue background
          border: '2px solid #333',
          overflow: 'hidden',
        }}
      >
        {/* Bird */}
        <Box
          ref={birdRef}
          sx={{
            position: 'absolute',
            left: '50px',
            top: `${birdPosition}px`,
            width: '40px',
            height: '40px',
            backgroundColor: '#FFD700', // Gold color
            borderRadius: '50%',
            transition: 'top 0.1s ease',
          }}
        />

        {/* Obstacle */}
        <Box
          ref={obstacleRef}
          sx={{
            position: 'absolute',
            left: `${obstaclePosition}px`,
            top: '0',
            width: '50px',
            height: `${obstacleHeight}px`,
            backgroundColor: '#228B22', // Green color
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: `${obstaclePosition}px`,
            top: `${obstacleHeight + 150}px`,
            width: '50px',
            height: `400px`,
            backgroundColor: '#228B22', // Green color
          }}
        />
      </Box>

      {/* Start/Restart Button */}
      <Button
        variant="contained"
        onClick={isPlaying ? () => window.location.reload() : handleStart}
        sx={{
          backgroundColor: isPlaying ? '#FF6347' : '#32CD32', // Red for restart, green for start
          color: '#fff',
          height: '50px',
          width: '150px',
          fontWeight: 'bold',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: isPlaying ? '#FF4500' : '#228B22',
          },
        }}
      >
        {isPlaying ? 'Restart' : 'Start'}
      </Button>

      {/* Beep Sound */}
      <audio ref={beepSoundRef} src="/beep-01a.mp3" loop />
    </Box>
  );
};

export default FlappyBirdGame;