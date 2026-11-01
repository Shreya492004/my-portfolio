import React, { useState } from "react";
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
import CustomCursor from "./components/CustomCursor";
import Marquee from "./components/Marquee";
import FloatingSkillBackground from "./components/FloatingSkillBackground";
import { useScrollReveal } from "./hooks/useScrollReveal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

const MainContent: React.FC = () => {
  const [pageReady, setPageReady] = useState(false);
  useScrollReveal(pageReady);

  return (
    <>
      <Preloader onFinish={() => setPageReady(true)} />
      <CustomCursor />
      <Navbar />
      <main
        id="main"
        className={`main-flow-wrapper ${pageReady ? "page-angle-enter" : "page-angle-initial"}`}
      >
        <FloatingSkillBackground />
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