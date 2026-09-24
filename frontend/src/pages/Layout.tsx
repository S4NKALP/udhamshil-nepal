
import { Outlet } from "react-router-dom";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { FloatingActionButtons } from "../components/site/FloatingActionButtons";

export default function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
}
