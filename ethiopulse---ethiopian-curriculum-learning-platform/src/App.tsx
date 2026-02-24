import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './MainLayout'; // Fixed path
import { Home } from './Home';
import { Classes } from './Classes';
import { Materials } from './Materials';
import { Quizzes } from './Quizzes';
import { Profile } from './Profile';
import { Chat } from './Chat';
import { Settings } from './Settings';

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
