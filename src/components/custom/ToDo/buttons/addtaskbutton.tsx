// src/components/DeleteUserButton.tsx
import React, {useState} from 'react';


interface AddTaskButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;

}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick}) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  return (
    <button
      className={`rounded-md w-10 ml-2 text-xl bg-blue-500 text-white hover:text-blue-500 hover:bg-white border-2 border-blue-500 `}
      onClick={onClick}
//       style={{
//         color: isHovered ? 'rgba(158, 120, 207, 1)' : 'rgba(255, 255, 255, 1)', // Text color changes on hover
//         backgroundColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(158, 120, 207, 1)', // Text color changes on hover
//         border:  'solid 2px rgba(158, 120, 207, 1)', // Text color changes on hover

// }}
// onMouseEnter={handleMouseEnter}
// onMouseLeave={handleMouseLeave}
    >
      +
    </button>
  );
};

export default AddTaskButton;
