import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [showPopup, setShowPopup] = useState(false); // State to control popup

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_c82rv97", "template_zrch63h", form.current, {
        publicKey: "aV60h4m31TEsYtwwI",
      })
      .then(
        () => {
          console.log("SUCCESS!");

          // Reset the form
          form.current.reset();

          // Delay showing the popup by 300ms (adjusted)
          setTimeout(() => {
            setShowPopup(true);
          }, 300);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const closePopup = () => {
    setShowPopup(false); // Close popup
  };

  return (
    <div id="Contact" className="min-h-screen mb-5 pt-20 pb-20 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 pb-10 tracking-widest">
        Get in Touch
      </h2>

      <div className="flex flex-col gap-8 lg:gap-0 md:flex-row justify-around ">
        {/* Contact Details */}
        <div className="md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Contact Information
          </h3>
          <ul className="space-y-4">
            <li>
              <strong>Email:</strong> contact.sandychaudhary@gmail.com <br />
              <strong>Email:</strong> developer.sandychaudhary@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> +91 7355511311
            </li>
            <li>
              <strong>Address:</strong> Jhansi, UP, India
            </li>
          </ul>
          <iframe
            className="mt-7 h-64 w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115293.28983751533!2d78.47988666110149!3d25.441094863793015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397776d458ba7703%3A0x96e9cda55c3481ca!2sJhansi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1725642702580!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="w-full max-w-lg bg-white shadow-md rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

          <div className="flex gap-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="from_name"
                required
                className="w-full shadow-lg px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mobile
              </label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                name="from_phone"
                required
                className="w-full shadow-lg px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your Mobile Number"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="from_email"
              required
              className="w-full shadow-lg px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              className="w-full shadow-lg px-3 py-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your message"
              rows="5"
            />
          </div>

          <div className="flex items-center justify-center">
            <input
              type="submit"
              value="Send"
              className="bg-red-500 shadow-lg text-white font-semibold w-full py-3 px-10 rounded-lg hover:bg-red-700 transition-colors focus:ring-2 focus:ring-offset-sky-600 cursor-pointer"
            />
          </div>
        </form>

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm text-center transform transition-all duration-300 ease-in-out scale-100">
              <svg
                className="mx-auto mb-4 w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m0 0a9 9 0 11-6.364-2.636 9 9 0 016.364 2.636z"
                ></path>
              </svg>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                Message Sent!
              </h3>
              <p className="text-gray-700 mb-4">
                Your message has been successfully sent.
              </p>
              <button
                onClick={closePopup}
                className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
