import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AngerTest1 = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // State for timer and game control
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const gameRef = useRef<HTMLIFrameElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Timer logic
  useEffect(() => {
    let timer: number; // Use `number` for browser environment
    if (isPlaying) {
      timer = window.setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Automatically stop after 2 minutes (120 seconds)
    if (timeElapsed >= 120) {
      handleStop();
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeElapsed]);

  // Start button handler
  const handleStart = () => {
    setIsPlaying(true);
    if (gameRef.current) {
      gameRef.current.src += "?autoplay=1"; // Autoplay the game
    }
    if (audioRef.current) {
      audioRef.current.loop = true; // Enable looping
      audioRef.current.play(); // Start playing the audio
    }
  };

  // Stop button handler
  const handleStop = () => {
    setIsPlaying(false);
    setTimeElapsed(0);
    if (gameRef.current) {
      gameRef.current.src = gameRef.current.src.replace("?autoplay=1", ""); // Stop the game
    }
    if (audioRef.current) {
      audioRef.current.pause(); // Stop the audio
      audioRef.current.currentTime = 0; // Reset audio to the beginning
    }
  };

  // Format time to display as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        backgroundColor: "#FFF8E7", // Light warm background
        gap: 4,
      }}
    >
      {/* Dino Game Embed */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          height: "450px",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: theme.shadows[10],
        }}
      >
        <iframe
          ref={gameRef}
          width="100%"
          height="100%"
          src="https://chromedino.com/" // Open-source Dino game
          title="Dino Game"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>

      {/* Timer Display */}
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
        {formatTime(timeElapsed)}
      </Typography>

      {/* Start/Stop Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={isPlaying ? handleStop : handleStart}
          sx={{
            backgroundColor: isPlaying ? "#FF6347" : "#32CD32", // Red for stop, green for start
            color: "#fff",
            height: "50px",
            width: "150px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: isPlaying ? "#FF4500" : "#228B22",
            },
          }}
        >
          {isPlaying ? "Stop" : "Start"}
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/tasks/anger/test1/evaluation")} // Navigate to evaluation page
          sx={{
            height: "50px",
            width: "150px",
            padding: "10px 20px",
            backgroundColor: "#32CD32",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#228B22",
            },
          }}
        >
          Evaluate
        </Button>
      </Box>

      {/* Audio element for distractive sound */}
      <audio ref={audioRef} src="/traffic_horn_noise.mp3" />
    </Box>
  );
};

export default AngerTest1;
