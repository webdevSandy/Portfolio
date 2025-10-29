import portfolio from "/src/assets/projects/portfolio.png";
import dss from "/src/assets/projects/dss.png";
import tasko from "/src/assets/projects/tasko.png";

export const myinfo = {
  fname: "Sandy",
  sname: "Chaudhary",
  stack: ["Frontend Developer", "React Enthusiast", "UI/UX Designer"],
};

// Skills
export const skills = [
  {
    role: "Development",
    skills: [
      {
        name: "React.js",
        level: "Intermediate",
        percentage: 70,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        percentage: 80,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Node.js",
        level: "Intermediate",
        percentage: 65,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "HTML",
        level: "Advanced",
        percentage: 90,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        level: "Advanced",
        percentage: 85,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        level: "Advanced",
        percentage: 85,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Bootstrap5",
        level: "Basic",
        percentage: 55,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      },
    ],
  },
  {
    role: "Design",
    skills: [
      {
        name: "Figma",
        level: "Intermediate",
        percentage: 75,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        name: "Canva",
        level: "Intermediate",
        percentage: 70,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
      },
      {
        name: "Adobe XD",
        level: "Basic",
        percentage: 60,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg",
      },
      {
        name: "Adobe Photoshop",
        level: "Intermediate",
        percentage: 75,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
      },
      {
        name: "Adobe Illustrator",
        level: "Basic",
        percentage: 60,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
      },
      // Add more design skills here
    ],
  },
];

// Projects
export const projects = [
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio built with React and Tailwind CSS, featuring a modern UI.",
    image: portfolio,
    demoLink: "https://webdevsandy.vercl.app/",
    codeLink: "#",
    role: "Development",
  },
  {
    title: "Document Submission System",
    description:
      "A project for Documents Submission platform built with React, Tailwind CSS, Node.js and MySQL.",
    image: dss,
    demoLink: "#",
    codeLink:
      "https://github.com/webdevSandy/DSS-Document-Submission-System-.git",
    role: "Development",
  },
  {
    title: "Tasko - Task Management App",
    description: "A real-time task management App.",
    image: tasko,
    demoLink: "https://taskosandy.vercel.app/",
    codeLink: "https://github.com/webdevSandy/Tasko",
    role: "Development",
  },

  {
    title: "Natraj Book Depot",
    description:
      "Delivering trusted educational and office supplies with competitive pricing, fast service, and 25+ years of excellence.",
    image:
      "https://drive.google.com/file/d/1Ngehmlp8NXdZT4KnAXdDsPxg26YsE-VT/view?usp=sharing",
    demoLink: "#",
    // Remove: codeLink
    role: "Design",
    designImages: [
      "https://drive.google.com/file/d/1Ngehmlp8NXdZT4KnAXdDsPxg26YsE-VT/view?usp=sharing",
      "https://via.placeholder.com/400x700?text=Mobile+Screen+2",
    ],
  },
  // {
  //   title: "UI Design for Webapsdsdsp",
  //   description: "A modern mobile app UI design created in Figma and Adobe XD.",
  //   image: "https://via.placeholder.com/400x250?text=UI+Design",
  //   demoLink: "#",
  //   role: "Design",
  //   designImages: [
  //     "https://via.placeholder.com/400x700?text=Web+App+1",
  //     "https://via.placeholder.com/400x700?text=Web+App+2",
  //   ],
  // },
  // Add more projects similarly
];
