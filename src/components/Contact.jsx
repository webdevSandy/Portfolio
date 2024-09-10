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

          // Delay showing the popup by 500ms (adjust as needed)
          setTimeout(() => {
            setShowPopup(true);
          }, 500);
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
    <div id="Contact" className="min-h-screen pt-28 bg-slate-200 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 pb-10">
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
              <strong>Email:</strong> contact.sandychaudhary@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> +91 7355511311
            </li>
            <li>
              <strong>Address:</strong> Jhansi, UP, India
            </li>
          </ul>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115293.28983751533!2d78.47988666110149!3d25.441094863793015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397776d458ba7703%3A0x96e9cda55c3481ca!2sJhansi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1725642702580!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            className="mt-7 w-96"
          ></iframe>
        </div>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="w-full max-w-lg bg-white shadow-md rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

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
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
              <h3 className="text-lg font-bold mb-4">Message Sent!</h3>
              <p className="text-gray-700 mb-4">
                Your message has been successfully sent.
              </p>
              <button
                onClick={closePopup}
                className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
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
