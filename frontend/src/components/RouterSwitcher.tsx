import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import Home from './Home';
import ContactForm from './ContactForm';
import Project from './Project';
import ProjectManager from './ProjectManager';
import FAQ from './Faq';
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import AboutMe from './Apropos';


const RouteSwitcher = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/home-component" element={<Home />} />
      <Route path="/form-component" element={<ContactForm />} />
      <Route path="/project-manager" element={<ProjectManager />} />
      <Route path="/project-manager/:slug" element={<Project />} />
      <Route path="/a-propos" element={<AboutMe />} />
      <Route path="/faq-component" element={<FAQ />} />
      <Route path="/signup-component" element={<SignUp />} />
      <Route path="/login-component" element={<Login />} />
      <Route path="/profile-component" element={<Profile />} />

    </Routes>
  );
};

export default RouteSwitcher;