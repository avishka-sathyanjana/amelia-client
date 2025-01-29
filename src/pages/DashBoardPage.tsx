// src/pages/DashboardPage.tsx
import { Box, Grid, Card, CardContent, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';

const DashboardPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const navigationTiles = [
    {
      title: 'Personalizing Test',
      description: 'Take emotion evaluation tasks and provide responses',
      icon: <AssignmentIcon sx={{ fontSize: 60 }}/>,
      path: '/tasks'
    },
    {
      title: 'Chatbot',
      description: 'Interact with our AI chatbot with Emotional Intelligence',
      icon: <ChatIcon sx={{ fontSize: 60 }}/>,
      path: '/chatbot'
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
      <Grid
        container
        spacing={4}
        justifyContent="center"
        maxWidth="md"
      >
        {navigationTiles.map((tile) => (
          <Grid item xs={12} sm={6} key={tile.title}>
            <Card
              onClick={() => navigate(tile.path)}
              sx={{
                height: '300px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: theme.shadows[10]
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 3
              }}
            >
              <CardContent>
                <Box mb={2} color="primary.main">
                  {tile.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {tile.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {tile.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage;