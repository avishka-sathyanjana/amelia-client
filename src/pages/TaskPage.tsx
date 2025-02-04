// src/pages/TaskPage.tsx
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TaskPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const emotionTiles = [
    {
      emotion: 'Happy',
      color: '#FFD700', // Gold
      path: '/tasks/happy'
    },
    // {
    //   emotion: 'Excitement',
    //   color: '#FF6B6B', // Coral
    //   path: '/tasks/excitement'
    // },
    // {
    //   emotion: 'Fear',
    //   color: '#800080', // Purple
    //   path: '/tasks/fear'
    // },
    {
      emotion: 'Anger',
      color: '#FF0000', // Red
      path: '/tasks/anger'
    },
    {
      emotion: 'Boredom',
      color: '#808080', // Gray
      path: '/tasks/boredom'
    },
    {
      emotion: 'Calm',
      color: '#87CEEB', // Sky Blue
      path: '/tasks/calm'
    }
    ,
    {
      emotion: 'Sad',
      color: '#89FC', // Sky Blue
      path: '/tasks/sad'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        {emotionTiles.map((tile) => (
          <Card
            key={tile.emotion}
            onClick={() => navigate(tile.path)}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: theme.shadows[10]
              },
              backgroundColor: tile.color,
              color: '#fff'
            }}
          >
            <CardContent
              sx={{
                padding: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                {tile.emotion}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TaskPage;