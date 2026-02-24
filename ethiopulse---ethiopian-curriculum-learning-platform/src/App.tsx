import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { Classes } from './pages/Classes';
import { Materials } from './pages/Materials';
import { Quizzes } from './pages/Quizzes';
import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
