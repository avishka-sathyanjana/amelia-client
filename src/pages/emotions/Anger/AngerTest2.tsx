import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AngerTest2 = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // State for game control
  const [numbers, setNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30-second countdown
  const [isAnnoyingMode, setIsAnnoyingMode] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // Track if the game has started
  const [isTimerCritical, setIsTimerCritical] = useState(false); // Track if timer is low

  // Ref for the beep sound
  const beepSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize the game with random numbers
  useEffect(() => {
    initializeGame();
  }, []);

  // Countdown timer
  useEffect(() => {
    let timer: number;
    if (isStarted && timeLeft > 0 && !isGameOver) {
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
  }, [timeLeft, isGameOver, isStarted]);

  // Handle timer critical state (10 seconds or less)
//   useEffect(() => {
//     if (timeLeft <= 10) {
//       setIsTimerCritical(true);
//       if(timeLeft == 0){
//         setIsTimerCritical(false);
//         if (beepSoundRef.current) {
//           beepSoundRef.current.pause(); // Pause beep sound
//         }
//       }
//       if (beepSoundRef.current) {
//         //reduce sound
//         beepSoundRef.current.play(); // Play beep sound
//       }
//     } else {
//       setIsTimerCritical(false);
//       if (beepSoundRef.current) {
//         beepSoundRef.current.pause(); // Pause beep sound
//         beepSoundRef.current.currentTime = 0; // Reset sound
//       }
//     }
//   }, [timeLeft]);
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

  const initializeGame = () => {
    const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setNumbers(randomNumbers);
    setSelectedNumbers([]);
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setIsAnnoyingMode(false);
    setIsStarted(false); // Reset start state
    setIsTimerCritical(false); // Reset critical timer state
  };

  // Handle number selection
  const handleNumberClick = (number: number) => {
    if (!isStarted || isGameOver || timeLeft <= 0) return;

    // Check if the clicked number is the next in sequence
    const nextNumber = Math.min(...numbers.filter((n) => !selectedNumbers.includes(n)));
    if (number === nextNumber) {
      setSelectedNumbers([...selectedNumbers, number]);
      setScore(score + 1);

      // Enable annoying mode after 3 correct clicks
      if (score >= 2 && !isAnnoyingMode) {
        setIsAnnoyingMode(true);
      }

      // Random redirection in annoying mode
      if (isAnnoyingMode && Math.random() < 0.3 + score * 0.1) {
        window.open('https://www.amazon.com', '_blank'); // Open a shopping site in a new tab
      }
    } else {
      // Penalty for wrong click: reduce time by 3 seconds
      setTimeLeft((prevTime) => Math.max(0, prevTime - 3));
    }
  };

  // Handle start button click
  const handleStart = () => {
    setIsStarted(true);
  };

  // Negative response on failure
  const getFailureMessage = () => {
    const messages = [
      "Wow, you really messed that up!",
      "Did you even try?",
      "That was pathetic...",
      "You call that an effort?",
      "Better luck next time... if there is a next time.",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
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
        Number Matching Game
      </Typography>

      {/* Game Instructions */}
      <Typography variant="h6" sx={{ color: '#555', textAlign: 'center' }}>
        {isGameOver
          ? getFailureMessage()
          : isAnnoyingMode
          ? "Seriously? You're still trying? Click the numbers... if you can!"
          : isStarted
          ? "Click on the numbers in ascending order without repeating any. Hurry up!"
          : "Click 'Start' to begin. Good luck... you'll need it!"}
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

      {/* Number Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 2,
          maxWidth: '500px',
        }}
      >
        {numbers.map((number, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleNumberClick(number)}
            sx={{
              width: '80px',
              height: '80px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              backgroundColor: selectedNumbers.includes(number)
                ? '#32CD32'
                : '#FF6347',
              color: '#fff',
              '&:hover': {
                backgroundColor: selectedNumbers.includes(number)
                  ? '#228B22'
                  : '#FF4500',
              },
            }}
          >
            {number}
          </Button>
        ))}
      </Box>

      {/* Score Display */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
        Score: {score}
      </Typography>

      {/* Start/Restart Button */}
      <Button
        variant="contained"
        onClick={isStarted ? initializeGame : handleStart}
        sx={{
          backgroundColor: isStarted ? '#FF6347' : '#32CD32', // Red for restart, green for start
          color: '#fff',
          height: '50px',
          width: '150px',
          fontWeight: 'bold',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: isStarted ? '#FF4500' : '#228B22',
          },
        }}
      >
        {isStarted ? 'Restart' : 'Start'}
      </Button>

      {/* Evaluate Button */}
      <Button
        variant="contained"
        onClick={() => navigate('/tasks/anger/test2/evaluation')} // Navigate to evaluation page
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

      {/* Beep Sound */}
      <audio ref={beepSoundRef} src="/beep-01a.mp3" loop />
    </Box>
  );
};

export default AngerTest2;