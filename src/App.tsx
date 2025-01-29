// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashBoardPage';
import TaskPage from './pages/TaskPage.tsx';
import ChatbotPage from './pages/ChatbotPage';
import AngerPage from './pages/emotions/AngerPage';
import HappyPage from './pages/emotions/HappyPage';
import ExcitementPage from './pages/emotions/ExcitementPage';
import FearPage from './pages/emotions/FearPage';
import BoredomPage from './pages/emotions/BoredomPage';
import CalmPage from './pages/emotions/CalmPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/tasks/anger" element={<AngerPage />} />
        <Route path="/tasks/happy" element={<HappyPage />} />
        <Route path="/tasks/excitement" element={<ExcitementPage />} />
        <Route path="/tasks/fear" element={<FearPage />} />
        <Route path="/tasks/boredom" element={<BoredomPage />} />
        <Route path="/tasks/calm" element={<CalmPage />} />
      </Routes>
    </Router>
  );
};

export default App;