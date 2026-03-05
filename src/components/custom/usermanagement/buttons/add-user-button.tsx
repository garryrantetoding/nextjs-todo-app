// components/AddUserButton.tsx
import React from 'react';

interface AddUserButtonProps {
  onClick: () => void;
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="border h-10 p-2 bg-blue-500 text-white rounded-md px-4">
      + Add User
    </button>
  );
};

export default AddUserButton;


