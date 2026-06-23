import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Education from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import Achievements from "./components/sections/Achievements";
import Awards from "./components/sections/Awards";
import Memories from "./components/sections/Memories";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Projects />
      <Achievements />
      <Awards />
      <Memories />
      <Contact />
<Footer />
    </>
  );
}