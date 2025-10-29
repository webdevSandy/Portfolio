/* eslint-disable react/no-unescaped-entities */
// // import React from "react";
import Typewriter from "typewriter-effect";
import { myinfo } from "./Data";

import profilephoto from "../assets/profile.png";

const AboutMe = () => {
  return (
    <section className="bg-slate-200 lg:pt-32  pb-20 min-h-screen">
      <div id="AboutMe" className="container mx-auto pt-28 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 tracking-wider">
          About me
        </h2>
        <div className="flex lg:flex-row flex-col items-center justify-around bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 py-16">
          <img
            className="lg:w-1/4 mb-6 rounded-full border"
            src={profilephoto}
            alt="Sandy Chaudhary"
          />

          <div className="lg:w-2/3 w-full">
            <h1 className="text-4xl font-bold text-gray-800">
              {myinfo.fname} {myinfo.sname}{" "}
              <span className="text-2xl">(Sandeep Kumar)</span>
            </h1>
            <p className="text-red-500 text-3xl mb-4">
              <Typewriter
                options={{ strings: myinfo.stack, autoStart: true, loop: true }}
              />
            </p>
            <p className="text-gray-600 text-xl mb-6">
              I'm a passionate software engineer specialized in crafting
              efficient and scalable solutions,
              <br /> deliver top-notch web applications. <br />
              Let's connect and create something amazing together!
            </p>
            {/* <a href="#" className="text-indigo-500 font-medium hover:underline">
              Learn More
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
