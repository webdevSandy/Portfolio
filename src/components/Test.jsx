import React, { useEffect, useState, useRef } from "react";

const sections = ["Home", "About", "Services", "Contact"];

const App = () => {
  const [activeSection, setActiveSection] = useState("");

  // Refs for each section
  const sectionRefs = useRef(sections.map(() => React.createRef()));

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div>
      <nav className="fixed top-0 w-full bg-white shadow-md">
        <ul className="flex justify-center space-x-8 p-4">
          {sections.map((section) => (
            <li
              key={section}
              className={`cursor-pointer font-medium ${
                activeSection === section
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-800"
              }`}
            >
              {section}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-20">
        {sections.map((section, index) => (
          <section
            key={section}
            id={section}
            ref={sectionRefs.current[index]}
            className="h-screen flex items-center justify-center border-b-2 border-gray-200"
          >
            <h2 className="text-4xl font-bold">{section}</h2>
          </section>
        ))}
      </div>
    </div>
  );
};

export default App;
