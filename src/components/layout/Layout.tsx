
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CompareBar from "@/components/tools/CompareBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
      <CompareBar />
    </div>
  );
};

export default Layout;
