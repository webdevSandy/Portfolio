
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-2">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 hover:text-gray-400 transition duration-300"
          >
            <i className="fab fa-github text-2xl"></i>
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 hover:text-gray-400 transition duration-300"
          >
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 hover:text-gray-400 transition duration-300"
          >
            <i className="fab fa-twitter text-2xl"></i>
          </a>
        </div>
        <p className="text-sm text-gray-400 mb-2">
          &copy; {new Date().getFullYear()} 2023 webdevSandy. All rights reserved.
        </p>
        <p className="text-sm">
          Built with ❤️ by <span className="font-semibold">Sandy Chaudhary</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
