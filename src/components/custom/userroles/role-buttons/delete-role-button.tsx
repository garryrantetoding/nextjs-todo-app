// src/components/DeleteUserButton.tsx
import React from 'react';

interface DeleteUserButtonProps {
  onClick: () => void; // Function to handle the click event
}

const DeleteRoleButton: React.FC<DeleteUserButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-red-600 h-10 w-40 text-white p-2 rounded-md">
      <div className='flex items-center'>
      <svg width="16" height="20" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.50004 10.6667C1.50004 11.4 2.10004 12 2.83337 12H8.16671C8.90004 12 9.50004 11.4 9.50004 10.6667V2.66667H1.50004V10.6667ZM10.1667 0.666667H7.83337L7.16671 0H3.83337L3.16671 0.666667H0.833374V2H10.1667V0.666667Z" fill="white"/>
</svg>

<div className='ml-4'>
      Delete Data
      </div></div>
    </button>
  );
};

export default DeleteRoleButton;
