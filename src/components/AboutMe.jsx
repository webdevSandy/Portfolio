// // import React from "react";

const AboutMe = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-center">
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500"
            src="your-image-url.jpg"
            alt="Your Name"
          />
          <h2 className="text-2xl font-semibold text-gray-800">[Your Name]</h2>
          <p className="text-gray-500 mb-4">[Your Profession or Role]</p>
          <p className="text-gray-600 mb-6">
            Passionate about creating meaningful experiences through design and
            technology. I love coding, exploring new ideas, and building
            projects that make a difference. Let`&apos;`s connect and
            collaborate!
          </p>
          <a href="#" className="text-indigo-500 font-medium hover:underline">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
