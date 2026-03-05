import React from 'react';

interface ConfirmSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ConfirmSaveModal: React.FC<ConfirmSaveModalProps> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="fixed inset-0 flex justify-center items-center z-70" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Save Edit?</h2>
        <p>Do you want to save changes to this data?</p>
          

          <div className="flex justify-between items-center mb-4 w-full">
            <div className="ml-auto">
          <button onClick={onClose} className="bg-white text-blue-500 p-2 rounded-md">
            Cancel
          </button>     
          <button onClick={onSave} className="bg-blue-500 text-white p-2 rounded-md ml-2">
            Save
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSaveModal;
