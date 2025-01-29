import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BoredomPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
  
    const testCards = [
      {
        title: 'Test 1',
        description: 'Basic Boredom assessment',
        path: '/tests/bored/test1'
      },
      {
        title: 'Test 2',
        description: 'Advanced Boredom evaluation',
        path: '/tests/bored/test2'
      },
      {
        title: 'Test 3',
        description: 'Comprehensive Bordem analysis',
        path: '/tests/bored/test3'
      }
    ];
  
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          backgroundColor: '#FFF8E7' // Light warm background
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          {testCards.map((test) => (
            <Card
              key={test.title}
              onClick={() => navigate(test.path)}
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: theme.shadows[10]
                },
                backgroundColor: '#808080',
                color: '#333'
              }}
            >
              <CardContent
                sx={{
                  padding: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {test.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    opacity: 0.9
                  }}
                >
                  {test.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
};

export default BoredomPage;