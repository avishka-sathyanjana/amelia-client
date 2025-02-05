// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashBoardPage';
import TaskPage from './pages/TaskPage.tsx';
import ChatbotPage from './pages/ChatbotPage';
import AngerPage from './pages/emotions/Anger/AngerPage.tsx';
import HappyPage from './pages/emotions/Happy/HappyPage.tsx';
import ExcitementPage from './pages/emotions/ExcitementPage';
import FearPage from './pages/emotions/FearPage';
import BoredomPage from './pages/emotions/BoredomPage';
import CalmPage from './pages/emotions/CalmPage';
import SadPage from './pages/emotions/SadPage.tsx';
import HappyTest3 from './pages/emotions/Happy/HappyTest3.tsx';
import HappyTest1 from './pages/emotions/Happy/HappyTest1.tsx';
import Breadcrumb from './components/general/Breadcrumbs.tsx';
import EvaluationPage from './pages/EvaluationPage.tsx';
import HappyTest2 from './pages/emotions/Happy/HappyTest2.tsx';
//add the global css file
import './App.css';
import AngerTest1 from './pages/emotions/Anger/AngerTest1.tsx';
import AngerTest2 from './pages/emotions/Anger/AngerTest2.tsx';

const App = () => {
  return (
    <Router>
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/tasks/anger" element={<AngerPage />} />
        <Route path="/tasks/happy" element={<HappyPage />} />
        <Route path="/tasks/happy/test1" element={<HappyTest1/>} />
        <Route path="/tasks/happy/test2" element={<HappyTest2/>} />
        <Route path="/tasks/happy/test3" element={<HappyTest3/>} />
        <Route path="/tasks/anger/test1" element={<AngerTest1/>} />
        <Route path="/tasks/anger/test2" element={<AngerTest2/>} />

        <Route path="/tasks/excitement" element={<ExcitementPage />} />
        
        <Route path="/tasks/fear" element={<FearPage />} />
        <Route path="/tasks/boredom" element={<BoredomPage />} />
        <Route path="/tasks/calm" element={<CalmPage />} />
        <Route path="/tasks/sad" element={<SadPage/>}/>

        {/* Dynamic Route for Evaluation Page */}
        <Route
          path="/tasks/:emotion/:testno/evaluation"
          element={<EvaluationPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;