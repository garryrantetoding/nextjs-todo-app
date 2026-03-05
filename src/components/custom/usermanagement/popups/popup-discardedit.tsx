// src/custom/popups/popup-discardedit.tsx
import React from 'react';

interface DiscardEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
}

const DiscardEditModal: React.FC<DiscardEditModalProps> = ({ isOpen, onClose, onDiscard }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-70" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/11">
        <h2 className="text-xl mb-4">Discard Edits?</h2>
        <p>Edit you've made will not be saved if you exit?</p>
          

          <div className="flex justify-between items-center mt-4 w-full">
            <div className="ml-auto">
            
          <button onClick={onClose} className="bg-white text-red-500 p-2 rounded">
            Cancel
          </button>
          <button onClick={onDiscard} className="bg-white text-blue-500 p-2 rounded ml-2">
            Discard
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DiscardEditModal;
