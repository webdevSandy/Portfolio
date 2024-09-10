import { useState, useEffect } from "react";
import portfolio from "/src/assets/projects/portfolio.png";
import dss from "/src/assets/projects/dss.png";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio built with React and Tailwind CSS, featuring a modern UI.",
    image: portfolio,
    demoLink: "https://webdevsandy.vercl.app/",
    codeLink: "#",
  },
  {
    title: "Document Submission System",
    description:
      "A project for Documents Submission platform built with React, Tailwind CSS, Node.js and MySQL.",
    image: dss,
    demoLink: "#",
    codeLink:
      "https://github.com/webdevSandy/DSS-Document-Submission-System-.git",
  },
  {
    title: "Project 3",
    description:
      "A project for Documents Submission platform built with React, Tailwind CSS, Node.js and MySQL.",
    image: "https://via.placeholder.com/400",
    demoLink: "#",
    codeLink: "#",
  },

  // Add more projects as needed
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(3);

  // Automatic slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!viewAll) {
        setCurrentIndex((prevIndex) =>
          prevIndex === projects.length - visibleProjects ? 0 : prevIndex + 1
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [viewAll, visibleProjects]);

  const handleViewAll = () => {
    setViewAll(true);
    setVisibleProjects(projects.length);
  };

  const handleViewLess = () => {
    setViewAll(false);
    setVisibleProjects(3);
    setCurrentIndex(2); // Reset index when switching back
  };

  return (
    <section id="Projects" className="bg-slate-200 pt-32 py-12 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          My Projects
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {projects
              .slice(currentIndex, currentIndex + visibleProjects)
              .map((project, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity duration-300"
                  />
                  <hr className="shadow-lg" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex justify-between">
                      <a
                        href={project.demoLink}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Demo
                      </a>
                      <a
                        href={project.codeLink}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* View All or View Less Button */}
          <div className="flex justify-center mt-8">
            {!viewAll ? (
              <button
                onClick={handleViewAll}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
              >
                View All
              </button>
            ) : (
              <button
                onClick={handleViewLess}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
              >
                View Less
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
