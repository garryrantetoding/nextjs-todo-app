import React from 'react';

interface DiscardPermissionModalProps {
  isOpen: boolean;
  onClosediscard: () => void;
  onDiscard: () => void;
}

const DiscardEditPermissionModal: React.FC<DiscardPermissionModalProps> = ({ isOpen, onClosediscard, onDiscard }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-70" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Are you sure you want to discard the changes?</h2>
        <div className="flex justify-between">
          <button onClick={onDiscard} className="bg-blue-500 text-white rounded-md mr-2 h-8 w-20">
            Discard
          </button>
          <button onClick={onClosediscard} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscardEditPermissionModal;
