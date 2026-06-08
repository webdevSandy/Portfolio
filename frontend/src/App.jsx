import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import ProfileTab from './admin/ProfileTab';
import ProjectsTab from './admin/ProjectsTab';
import SkillsTab from './admin/SkillsTab';
import ExperienceTab from './admin/ExperienceTab';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProfileTab />} />
          <Route path="projects" element={<ProjectsTab />} />
          <Route path="skills" element={<SkillsTab />} />
          <Route path="experience" element={<ExperienceTab />} />
        </Route>
      </Routes>
    </Router>
  );
}
