import React, { useCallback, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import Preloader from "./components/Preloader";
import Marquee from "./components/Marquee";
import BackgroundEffects from "./components/BackgroundEffects";
import CustomCursor from "./components/CustomCursor";
import { useScrollReveal } from "./hooks/useScrollReveal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

const MainContent: React.FC = () => {
  const [pageReady, setPageReady] = useState(false);
  const finishPreloader = useCallback(() => setPageReady(true), []);
  useScrollReveal(pageReady);

  return (
    <>
      <Preloader onFinish={finishPreloader} />
      <CustomCursor />
      <Navbar pageReady={pageReady} />
      <div className={`website-portal ${pageReady ? "page-reveal-active" : "page-reveal-initial"}`}>
        <main id="main" className="main-flow-wrapper">
          <BackgroundEffects />
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      <FloatingButtons />
    </>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <MainContent />
  </ThemeProvider>
);

export default App;