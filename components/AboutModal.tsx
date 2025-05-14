type AboutModalType = {
  isOpen: boolean;
  onClose: () => void;
};

const AboutModal = ({ isOpen, onClose }: AboutModalType) => {
  console.log("isOpen ", isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">About Amazon Scraper</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="mb-4">
            <p className="text-gray-700 mb-3">
              Amazon Scraper is designed to extract and display product
              information from Amazon in a clean, organized format.
            </p>
            <p className="text-gray-700">
              This tool is designed for educational and personal use only.
              Please ensure you adhere to Amazon&apos;s Terms of Service when
              using information obtained from this application.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
