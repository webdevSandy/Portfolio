// SkillsSection.jsx
// import React from "react";

const skills = [
  { name: "HTML", level: "Advanced", percentage: 90 },
  { name: "CSS", level: "Advanced", percentage: 85 },
  { name: "React.js", level: "Intermediate", percentage: 70 },
  { name: "Node.js", level: "Intermediate", percentage: 65 },
  { name: "Tailwind CSS", level: "Advanced", percentage: 80 },
  { name: "Bootstrap5", level: "Basic", percentage: 50 },
];

const Skills = () => {
  return (
    <section id="Skills" className="lg:pt-32 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 tracking-wider">
          My Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative p-8 border border-gray-200 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105"
              style={{ perspective: "1000px" }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center group-hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">
                {skill.name}
              </h3>
              <p className="text-gray-600 text-center mb-4">{skill.level}</p>

              {/* Animated Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
                <div
                  className="bg-red-500 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>

              {/* Bottom Accent Bar Animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-purple-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
