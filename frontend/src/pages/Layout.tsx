import { useLocation, useOutlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { FloatingActionButtons } from "../components/site/FloatingActionButtons";

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col min-h-full"
        >
          {outlet}
        </motion.div>
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
}
