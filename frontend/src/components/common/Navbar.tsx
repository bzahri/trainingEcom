import { AppShell, NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 🔥 Utilisation du contexte

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // 🔥 Récupérer l'utilisateur depuis le contexte
  return (
    <>
      <AppShell.Navbar p="md" style={{ gap: '10px' }}>
        <NavLink label="Home Component" onClick={() => navigate('/home-component')} />
        <NavLink label="Students/Teachers Component" onClick={() => navigate('/listes-users-component')} />
        {/* <NavLink label="Form Component" onClick={() => navigate('/form-component')} /> */}
        {/* <NavLink label="Services Component" onClick={() => navigate('/services-component')} /> */}
        {/* <NavLink label="Project Manager Component" onClick={() => navigate('/project-manager')} /> */}
        {/* <NavLink label="FAQ Component" onClick={() => navigate('/Faq-component')} /> */}
        {/* <NavLink label="A Propos" onClick={() => navigate('/a-propos')} /> */}
        {/* <NavLink label="ChatBot" onClick={() => navigate('/chat-bot')} /> */}
        <NavLink label="Course Component" onClick={() => navigate('/course-component')} />

        {user ? (
          <NavLink label="Profile Component" onClick={() => navigate('/profile-component')} />
        ) : (
          <>
            <NavLink label="Login Component" onClick={() => navigate('/login-component')} />
            <NavLink label="SignUp Component" onClick={() => navigate('/signup-component')} />
          </>
        )}

      </AppShell.Navbar>

    </>
  );
};

export default Navbar;