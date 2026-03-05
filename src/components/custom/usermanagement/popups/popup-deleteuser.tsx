import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onDelete,
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
        <h2 className="text-xl mb-4">Are you sure you want to delete the selected users?</h2>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
