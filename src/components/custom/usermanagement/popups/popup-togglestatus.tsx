import React from 'react';

interface StatusSwitchConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSwitch: () => void;
}

const StatusSwitchConfirmationModal: React.FC<StatusSwitchConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onSwitch,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-60"
      style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl mb-4">Do you want to switch the status?</h2>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSwitch}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Switch
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusSwitchConfirmationModal;
