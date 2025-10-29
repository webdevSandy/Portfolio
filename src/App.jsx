import {} from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

import Contact from "./components/Contact";
import Footer from "./components/Footer";
// import Test from  './components/Test'

function App() {
  return (
    <div className="font-Ubuntu bg-slate-50">
      <Navbar />
      <Hero />
      {/* <AboutMe /> */}
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      {/* <Test/> */}

    </div>
  );
}

export default App;
