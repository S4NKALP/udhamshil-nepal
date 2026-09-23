import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import About from './pages/About';
import CareerDetail from './pages/CareerDetail';
import CareerLayout from './pages/Career';
import CareerIndex from './pages/CareerIndex';
import Contact from './pages/Contact';
import Index from './pages/Home';
import Products from './pages/Products';
import ProjectsEvents from './pages/Projects-events';
import Team from './pages/Team';

export default function App() {
  const basename = import.meta.env.VITE_ROUTER_BASENAME || (window.location.pathname.startsWith('/static/frontend') ? '/static/frontend' : '/');
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="about" element={<About />} />
          <Route path="career" element={<CareerLayout />}>
            <Route index element={<CareerIndex />} />
            <Route path=":slug" element={<CareerDetail />} />
          </Route>
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<Products />} />
          <Route path="projects-events" element={<ProjectsEvents />} />
          <Route path="team" element={<Team />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
