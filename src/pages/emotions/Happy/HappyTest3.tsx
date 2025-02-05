import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Cell class (adapted from cell.js)
class Cell {
  row: number;
  col: number;
  bomb: boolean;
  revealed: boolean;
  flagged: boolean;
  adjBombs: number;
  board: Cell[][];

  constructor(row: number, col: number, board: Cell[][]) {
    this.row = row;
    this.col = col;
    this.bomb = false;
    this.revealed = false;
    this.flagged = false;
    this.adjBombs = 0;
    this.board = board;
  }

  getAdjCells(): Cell[] {
    const adj = [];
    const lastRow = this.board.length - 1;
    const lastCol = this.board[0].length - 1;

    if (this.row > 0 && this.col > 0) adj.push(this.board[this.row - 1][this.col - 1]);
    if (this.row > 0) adj.push(this.board[this.row - 1][this.col]);
    if (this.row > 0 && this.col < lastCol) adj.push(this.board[this.row - 1][this.col + 1]);
    if (this.col < lastCol) adj.push(this.board[this.row][this.col + 1]);
    if (this.row < lastRow && this.col < lastCol) adj.push(this.board[this.row + 1][this.col + 1]);
    if (this.row < lastRow) adj.push(this.board[this.row + 1][this.col]);
    if (this.row < lastRow && this.col > 0) adj.push(this.board[this.row + 1][this.col - 1]);
    if (this.col > 0) adj.push(this.board[this.row][this.col - 1]);

    return adj;
  }

  calcAdjBombs(): void {
    const adjCells = this.getAdjCells();
    this.adjBombs = adjCells.reduce((acc, cell) => acc + (cell.bomb ? 1 : 0), 0);
  }

  flag(): boolean {
    if (!this.revealed) {
      this.flagged = !this.flagged;
    }
    return this.flagged;
  }

  reveal(): boolean {
    if (this.revealed) return false;
    this.revealed = true;
    if (this.bomb) return true; // Hit a bomb
    if (this.adjBombs === 0) {
      this.getAdjCells().forEach((cell) => {
        if (!cell.revealed) cell.reveal();
      });
    }
    return false;
  }
}

// Main component
const HappyTest3 = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<Cell[][]>([]);
  const [bombCount, setBombCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hitBomb, setHitBomb] = useState(false);
  const [winner, setWinner] = useState(false);
  const timerRef = useRef<number | null>(null);

  const size = 9; // Default board size
  const totalBombs = 10; // Number of bombs

  // Initialize the board
  useEffect(() => {
    initBoard();
  }, []);

  // Timer logic
  useEffect(() => {
    if (isPlaying && !hitBomb && !winner) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, hitBomb, winner]);

  // Initialize the board
  const initBoard = () => {
    const newBoard = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => new Cell(row, col, []))
    );

    // Set the board reference for each cell
    newBoard.forEach((row) => row.forEach((cell) => (cell.board = newBoard)));

    // Add bombs
    let bombsPlaced = 0;
    while (bombsPlaced < totalBombs) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (!newBoard[row][col].bomb) {
        newBoard[row][col].bomb = true;
        bombsPlaced++;
      }
    }

    // Calculate adjacent bombs
    newBoard.forEach((row) => row.forEach((cell) => cell.calcAdjBombs()));

    setBoard(newBoard);
    setBombCount(totalBombs);
    setHitBomb(false);
    setWinner(false);
    setTimeElapsed(0);
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number, isShift: boolean) => {
    if (hitBomb || winner) return;

    const cell = board[row][col];
    if (isShift && !cell.revealed) {
      const flagged = cell.flag();
      setBombCount((prev) => prev + (flagged ? -1 : 1));
    } else {
      const hit = cell.reveal();
      if (hit) {
        setHitBomb(true);
      } else if (checkWinner()) {
        setWinner(true);
      }
    }
    setBoard([...board]); // Trigger re-render
  };

  // Check if the player has won
  const checkWinner = (): boolean => {
    return board.every((row) =>
      row.every((cell) => cell.revealed || cell.bomb)
    );
  };

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Start/Stop handler
  const handleStartStop = () => {
    setIsPlaying((prev) => !prev);
  };

  // Evaluate handler
  const handleEvaluate = () => {
    navigate('/tasks/happy/test3/evaluation');
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
        backgroundColor: '#FFF8E7',
      }}
    >
      {/* Minesweeper Game */}
      <Box
        sx={{
          backgroundColor: 'lightgray',
          padding: 2,
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
          Minesweeper
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${size}, 20px)`,
            gap: '1.5px',
            margin: '0 auto',
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Box
                key={`${rowIndex}-${colIndex}`}
                onClick={(e) => handleCellClick(rowIndex, colIndex, e.shiftKey)}
                sx={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: cell.revealed ? '#C0C0C0' : '#C0C0C0',
                  border: '1.5px solid',
                  borderTopColor: cell.revealed ? '#7B7B7B' : '#ffffff',
                  borderRightColor: cell.revealed ? '#7B7B7B' : '#7B7B7B',
                  borderBottomColor: cell.revealed ? '#7B7B7B' : '#7B7B7B',
                  borderLeftColor: cell.revealed ? '#7B7B7B' : '#ffffff',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  color: cell.revealed ? '#000' : 'transparent',
                }}
              >
                {cell.revealed
                  ? cell.bomb
                    ? '💣'
                    : cell.adjBombs > 0
                    ? cell.adjBombs
                    : ''
                  : cell.flagged
                  ? '🚩'
                  : ''}
              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* Timer Display */}
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Time: {formatTime(timeElapsed)}
      </Typography>

      {/* Start/Stop Button */}
      <Button
        variant="contained"
        onClick={handleStartStop}
        sx={{
          backgroundColor: isPlaying ? '#FF6347' : '#32CD32',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: isPlaying ? '#FF4500' : '#228B22',
          },
        }}
      >
        {isPlaying ? 'Stop' : 'Start'}
      </Button>

      {/* Evaluate Button */}
      <Button
        variant="contained"
        onClick={handleEvaluate}
        sx={{
          backgroundColor: '#32CD32',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: '#228B22',
          },
        }}
      >
        Evaluate
      </Button>
    </Box>
  );
};

export default HappyTest3;