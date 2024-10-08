import {} from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-Ubuntu bg-slate-200">
      <Navbar />
      <Home />
      {/* <AboutMe /> */}
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
