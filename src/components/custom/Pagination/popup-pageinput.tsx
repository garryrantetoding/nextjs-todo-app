import React, { useState } from 'react';

interface PageInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const PageInputModal: React.FC<PageInputModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentPage,
  totalPages,
}) => {
  const [inputPage, setInputPage] = useState<number>(currentPage);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(totalPages, Number(event.target.value))); // Ensure page is within bounds
    setInputPage(value);
  };

  const handleSubmit = () => {
    if (inputPage !== currentPage && inputPage >= 1 && inputPage <= totalPages) {
      onSubmit(inputPage);
    }
  };

  if (!isOpen) return null; // Don't render modal if it's closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Go to Page</h2>
        <input
          type="number"
          value={inputPage}
          onChange={handleChange}
          min="1"
          max={totalPages}
          className="border border-gray-300 rounded p-2 mb-4 w-20"
        />
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageInputModal;
