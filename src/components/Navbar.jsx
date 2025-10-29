import { useState } from "react";
import logo from "../assets/logo.png";
import db from "../assets/db.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center gap-[270px] justify-between z-20 border rounded-full backdrop-blur-2xl my-2 px-2 lg:fixed lg:mx-7 shadow-lg lg:w-auto">
      <a href="#AboutMe">
        <div className="flex items-center lg:gap-2">
          <img src={logo} alt="logo" className="h-12 mt-2" />
          <h1 className="text-lg lg:text-2xl w-64 font-bold text-red-600 ">
            Sandy Chaudhary
          </h1>
        </div>
      </a>

      {/* Hamburger Menu Icon (Right-aligned on small screens) */}
      <div className="lg:hidden flex items-center">
        {/* Download CV Button (Centered on small screens) */}
        <a
          href="https://drive.google.com/file/d/1_92-AQeYF8RctZy9PbQrdqpuiSbvSuM8/view?usp=sharing"
          target="_blank"
          className="absolute flex gap-1 left-1/2 ml-28 w-fit p-1 transform -translate-x-1/2 border-2 border-red-500 rounded-full text-red-700"
        >
          <h2 className="font-Ubuntu font-bold">CV</h2>
          <img src={db} alt="" className="h-6 " />
        </a>

        <button
          onClick={toggleMenu}
          className="text-red-600 focus:outline-none ml-auto"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <ul
        className={`lg:flex gap-2 text-xl font-medium lg:static ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 right-0 bg-red-300 w-fit rounded-lg  lg:w-auto lg:bg-transparent lg:p-0`}
      >
        <a href="#Home">
          <li className="hover:text-red-700 cursor-pointer">Home</li>
        </a>
        <span className="hidden lg:inline">|</span>
        <a href="#Skills">
          <li className="hover:text-red-700 cursor-pointer">Skills</li>
        </a>
        <span className="hidden lg:inline">|</span>
        <a href="#Projects">
          <li className="hover:text-red-700 cursor-pointer">Projects</li>
        </a>
        <span>|</span>
        <a href="#Contact">
          <li className="hover:text-red-700 cursor-pointer">Contact</li>
        </a>
      </ul>

      {/* Buttons (Hide on small screens) */}
      <div className="hidden lg:flex">
        <a href="mailto:developer.sandychaudhary@gmail.com" target="_blank">
          <button className="px-3 py-1 rounded-full text-xl font-semibold text-red-600 border-2 border-red-600 hover:bg-red-500 hover:text-white ">
            Hire Me
          </button>
        </a>
        <a
          href="https://drive.google.com/file/d/1_92-AQeYF8RctZy9PbQrdqpuiSbvSuM8/view?usp=sharing"
          target="_blank"
        >
          <button className="px-3 lg:py-1 ml-4 rounded-full text-xl font-semibold text-red-600 border-2 border-red-600 hover:bg-red-500 hover:text-white">
            Download CV
          </button>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
