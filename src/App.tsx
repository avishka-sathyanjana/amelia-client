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
import SadPage from './pages/emotions/Sad/SadPage.tsx';
import Breadcrumb from './components/general/Breadcrumbs.tsx';
import EvaluationPage from './pages/EvaluationPage.tsx';
//add the global css file
import './App.css';
import HappyTest1 from './pages/emotions/Happy/HappyTest1.tsx';
import HappyTest2 from './pages/emotions/Happy/HappyTest2.tsx';
import HappyTest3 from './pages/emotions/Happy/HappyTest3.tsx';
import AngerTest1 from './pages/emotions/Anger/AngerTest1.tsx';
import AngerTest2 from './pages/emotions/Anger/AngerTest2.tsx';
import AngerTest3 from './pages/emotions/Anger/AngerTest3.tsx';
import SadTest1 from './pages/emotions/sad/SadTest1.tsx';
import SadTest2 from './pages/emotions/sad/SadTest2.tsx';
import SadTest3 from './pages/emotions/sad/SadTest3.tsx';

const App = () => {
  return (
    <Router>
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />

        <Route path="/tasks" element={<TaskPage />} />

        <Route path="/tasks/happy" element={<HappyPage />} />
        <Route path="/tasks/happy/test1" element={<HappyTest1/>} />
        <Route path="/tasks/happy/test2" element={<HappyTest2/>} />
        <Route path="/tasks/happy/test3" element={<HappyTest3/>} />

        <Route path="/tasks/anger" element={<AngerPage />} />
        <Route path="/tasks/anger/test1" element={<AngerTest1/>} />
        <Route path="/tasks/anger/test2" element={<AngerTest2/>} />
        <Route path="/tasks/anger/test3" element={<AngerTest3/>} />

        <Route path="/tasks/sad" element={<SadPage/>}/>
        <Route path="/tasks/sad/test1" element={<SadTest1/>} />
        <Route path="/tasks/sad/test2" element={<SadTest2/>} />
        <Route path="/tasks/sad/test3" element={<SadTest3/>} />


        <Route path="/tasks/excitement" element={<ExcitementPage />} />
        
        <Route path="/tasks/fear" element={<FearPage />} />
        <Route path="/tasks/boredom" element={<BoredomPage />} />
        <Route path="/tasks/calm" element={<CalmPage />} />

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