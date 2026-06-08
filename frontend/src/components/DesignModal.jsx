import PropTypes from "prop-types";

const DesignModal = ({ images, showModal, onClose }) => {
  if (!showModal) return null;

  const imgs = Array.isArray(images) ? images : [images];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl max-w-2xl w-full relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-red-600"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div>
          {imgs.length > 1 ? (
            <div className="flex space-x-3 overflow-x-auto py-2">
              {imgs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Design ${i + 1}`}
                  className="w-72 h-auto rounded-lg shadow"
                />
              ))}
            </div>
          ) : (
            <img
              src={imgs[0]}
              alt="Design Preview"
              className="w-full h-auto rounded-lg shadow"
            />
          )}
        </div>
      </div>
    </div>
  );
};

DesignModal.propTypes = {
  images: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DesignModal;
