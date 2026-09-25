import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import Layout from "./pages/Layout";
import About from "./pages/About";
import CareerDetail from "./pages/CareerDetail";
import CareerLayout from "./pages/Career";
import CareerIndex from "./pages/CareerIndex";
import Contact from "./pages/Contact";
import Index from "./pages/Home";
import Products from "./pages/Products";
import ProjectsEvents from "./pages/Projects-events";
import Team from "./pages/Team";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If Lenis is active, use its scrollTo method to prevent conflicts
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis();
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return null;
}

import { AnimatePresence } from "framer-motion";

export default function App() {
  const basename =
    import.meta.env.VITE_ROUTER_BASENAME ||
    (window.location.pathname.startsWith("/static/frontend") ? "/static/frontend" : "/");
  return (
    <BrowserRouter basename={basename}>
      <SmoothScroll />
      <ScrollToTop />
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
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
