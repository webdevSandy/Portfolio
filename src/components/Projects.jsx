import { useState } from "react";
import Slider from "react-slick";
import DesignModal from "./DesignModal";
import { projects } from "./Data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Projects = () => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalImages, setModalImages] = useState([]);

  const filteredProjects =
    selectedRole === "All"
      ? projects
      : projects.filter((project) => project.role === selectedRole);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleViewDesign = (images) => {
    setModalImages(Array.isArray(images) ? images : [images]);
    setShowModal(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="Projects" className="lg:pt-32 py-12 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 tracking-widest">
          My Projects
        </h2>
        <div className="flex justify-center gap-4 mb-8">
          {["All", "Development", "Design"].map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`py-2 px-6 rounded-full border-2 transition-all font-semibold text-sm md:text-base ${
                selectedRole === role
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-red-600 border-red-600 hover:bg-red-100"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        <Slider {...settings}>
          {filteredProjects.map((project, index) => (
            <div key={index} className="px-4 md:px-6">
              <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all relative">
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                    project.role === "Development"
                      ? "bg-blue-600"
                      : "bg-pink-500"
                  } shadow-lg`}
                >
                  {project.role}
                </span>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity duration-300"
                />
                <hr className="shadow-lg" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between">
                    <a
                      href={project.demoLink}
                      className="text-blue-500 hover:text-red-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Demo
                    </a>
                    {project.role === "Development" ? (
                      <a
                        href={project.codeLink}
                        className="text-blue-500 hover:text-red-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Code
                      </a>
                    ) : (
                      <button
                        className="text-blue-500 hover:text-red-600 transition-colors"
                        onClick={() =>
                          handleViewDesign(
                            project.designImages || project.image
                          )
                        }
                      >
                        View Design
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <DesignModal
        images={modalImages}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </section>
  );
};

export default Projects;
