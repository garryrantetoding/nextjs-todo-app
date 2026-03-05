import React from 'react';

interface UserButtonProps {
  onClick: () => void;
}

const UserButton: React.FC<UserButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="ml-4 border-2 border-gray-500 bg-white text-gray-500 rounded-full mr-1">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
    </button>
  );
};

export default UserButton;
