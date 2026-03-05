// components/AddUserButton.tsx
import React from 'react';

interface AddRoleButtonProps {
  onClick: () => void;
}

const AddRoleButton: React.FC<AddRoleButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="border h-10 p-2 bg-blue-500 text-white rounded-md px-4">
      + Add Role
    </button>
  );
};

export default AddRoleButton;


