import { useState } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import PropTypes from "prop-types";
import "react-circular-progressbar/dist/styles.css";
import { skills } from "./Data";

// Animated circular bar only on hover
const AnimatedProgressbar = ({ percentage }) => {
  const [progress, setProgress] = useState(percentage);

  const animateBar = () => {
    let start = 0;
    let end = percentage;
    setProgress(0);
    let timer = setInterval(() => {
      start += 1;
      if (start <= end) setProgress(start);
      if (start >= end) clearInterval(timer);
    }, 12);
  };

  const resetBar = () => {
    setProgress(percentage);
  };

  return (
    <div
      className="w-16 h-16"
      onMouseEnter={animateBar}
      onMouseLeave={resetBar}
    >
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: `rgba(185, 28, 28, ${progress / 100})`, // #DC2626
          textColor: "#DC2626",
          trailColor: "#E5E7EB",
        })}
      />
    </div>
  );
};

AnimatedProgressbar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 85 } },
};

const Skills = () => (
  <section id="Skills" className="pt-24 pb-20 min-h-screen">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12 tracking-widest">
        My Skills
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((roleGroup, idx) => (
          <div key={idx} >
            <h3 className="text-2xl border font-medium mb-10 text-center text-red-800 tracking-wide drop-shadow-lg hover:text-red-700 transition-colors ">
              {roleGroup.role}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 drop-shadow-lg">
              {roleGroup.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-3 cursor-pointer pt-2 pb-4"
                  variants={itemVariants}
                >
                  {/* Skill Logo */}
                  {skill.logo && (
                    <img
                      src={skill.logo}
                      alt={skill.name + " logo"}
                      className="w-16 h-16 mb-1 object-contain"
                      loading="lazy"
                    />
                  )}

                  {/* <AnimatedProgressbar percentage={skill.percentage} />    */}
                  <h4 className="text-lg font-semibold text-center text-gray-700">
                    {skill.name}
                  </h4>
                  <p className="text-sm text-gray-500">{skill.level}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Skills;
