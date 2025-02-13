import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BoringTask = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // State for task control
  const [clickCount, setClickCount] = useState(0);
  const [isTaskStarted, setIsTaskStarted] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [canClick, setCanClick] = useState(false);

  // Ref for the boring background music
  const boringMusicRef = useRef<HTMLAudioElement | null>(null);

  // Start the task and the background music
  const handleStartTask = () => {
    setIsTaskStarted(true);
    if (boringMusicRef.current) {
      boringMusicRef.current.play();
    }
    startCountdown();
  };

  // Countdown timer
  const startCountdown = () => {
    setCountdown(5);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setCanClick(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle button click
  const handleButtonClick = () => {
    if (!isTaskStarted || isTaskCompleted || !canClick) return;

    setClickCount((prevCount) => prevCount + 1);
    setCanClick(false);
    startCountdown();
  };

  // Timer to track how long the user has been doing the task
  useEffect(() => {
    let timer: number;
    if (isTaskStarted && !isTaskCompleted) {
      timer = window.setInterval(() => {
        setTimeElapsed((prevTime) => {
          if (prevTime >= 60) {
            setIsTaskCompleted(true);
            if (boringMusicRef.current) {
              boringMusicRef.current.pause();
            }
            return 60;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTaskStarted, isTaskCompleted]);

  // Reset the task
  const resetTask = () => {
    setClickCount(0);
    setIsTaskStarted(false);
    setIsTaskCompleted(false);
    setTimeElapsed(0);
    setCanClick(false);
    setCountdown(5);
    if (boringMusicRef.current) {
      boringMusicRef.current.pause();
      boringMusicRef.current.currentTime = 0;
    }
  };

  // Get button text based on state
  const getButtonText = () => {
    if (isTaskCompleted) return "Done";
    if (!canClick && countdown > 0) return countdown.toString();
    return "Click Me";
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
        backgroundColor: '#F5F5F5',
        gap: 4,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
        Boring Repetitive Task
      </Typography>
      <Button
        variant="contained"
        onClick={handleButtonClick}
        disabled={!isTaskStarted || isTaskCompleted || !canClick}
        sx={{
          backgroundColor: '#808080',
          color: '#fff',
          height: '80px',
          width: '200px',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#696969',
          },
          '&:disabled': {
            backgroundColor: '#A9A9A9',
          },
        }}
      >
        {getButtonText()}
      </Button> 

      <Typography variant="h6" sx={{ color: '#555', textAlign: 'center' }}>
        {isTaskCompleted
          ? "Time's up! Task completed."
          : isTaskStarted
          ? "Click the button when available. You have 60 seconds."
          : "Click 'Start' to begin this mind-numbing task."}
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
        Clicks: {clickCount}
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
        Time Elapsed: {timeElapsed} seconds
      </Typography>

      
      <Box sx={{ display: 'flex', gap: 2 }}>

      <Button
        variant="contained"
        onClick={isTaskStarted ? resetTask : handleStartTask}
        sx={{
          backgroundColor: isTaskStarted ? '#FF6347' : '#32CD32',
          color: '#fff',
          height: '50px',
          width: '150px',
          fontWeight: 'bold',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: isTaskStarted ? '#FF4500' : '#228B22',
          },
        }}
      >
        {isTaskStarted ? 'Restart' : 'Start'}
      </Button>

      <Button
        variant="contained"
        onClick={() => navigate('/tasks/boredom/test1/evaluation')}
        sx={{
          height: '50px',
          width: '150px',
          padding: '10px 20px',
          backgroundColor: '#32CD32',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#228B22',
          },
        }}
      >
        Evaluate
      </Button>
      </Box>
      <audio ref={boringMusicRef} src="/ambient-noise.mp3" loop />
    </Box>
  );
};

export default BoringTask;