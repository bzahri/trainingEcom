import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import Home from './Home';
import ContactForm from './ContactForm';
import Project from './Projet';
import FAQ from './Faq';


const RouteSwitcher = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/home-component" element={<Home />} />
      <Route path="/form-component" element={<ContactForm />} />
      <Route path="/project/:id" element={<Project />} />
      <Route path="/faq-component" element={<FAQ />} />
    </Routes>
  );
};

export default RouteSwitcher;