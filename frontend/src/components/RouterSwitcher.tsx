import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ContactForm from './contact/ContactForm';
import Project from './projects/Project';
import ProjectManager from './projects/ProjectManager';
import FAQ from './pages/Faq';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import Profile from './profile/Profile';
import AboutMe from './pages/Apropos';
import Chatbot from './chatbot/Chatbot';
import NotFound from './common/NotFound';


const RouteSwitcher = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home-component" element={<Home />} />
      <Route path="/form-component" element={<ContactForm />} />
      <Route path="/project-manager" element={<ProjectManager />} />
      <Route path="/project-manager/:slug" element={<Project />} />
      <Route path="/a-propos" element={<AboutMe />} />
      <Route path="/faq-component" element={<FAQ />} />
      <Route path="/signup-component" element={<SignUp />} />
      <Route path="/login-component" element={<Login />} />
      <Route path="/profile-component" element={<Profile />} />
      <Route path="/chat-bot" element={<Chatbot />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default RouteSwitcher;