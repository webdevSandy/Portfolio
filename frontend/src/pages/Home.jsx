import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Projects from "../components/Projects.jsx";
import Skills from "../components/Skills.jsx";
import Experience from "../components/Experience.jsx";
import AboutMe from "../components/AboutMe.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/profile').then(res => res.json()),
      fetch('http://localhost:5000/api/projects').then(res => res.json()),
      fetch('http://localhost:5000/api/skills').then(res => res.json()),
      fetch('http://localhost:5000/api/experience').then(res => res.json()),
    ]).then(([profile, projects, skills, experience]) => {
      setData({ profile, projects, skills, experience });
    });
  }, []);

  if (!data) return <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center text-xl text-neutral-500 animate-pulse">Loading data...</div>;

  return (
    <>
      <Navbar profile={data.profile} />
      <main>
        <Hero profile={data.profile} />
        <Projects items={data.projects} />
        <Skills groups={data.skills} />
        <Experience items={data.experience} />
        <AboutMe profile={data.profile} />
        <Contact profile={data.profile} />
      </main>
      <Footer />
    </>
  );
}
