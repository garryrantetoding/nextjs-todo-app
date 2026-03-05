// popup-detail.tsx
import React from 'react';

// Define PopupButtonProps to accept an onClick handler
interface DescriptionButtonProps {
  onClick: () => void;
}

const DescriptionButton: React.FC<DescriptionButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="border-2 border-blue-500 bg-white text-blue-500 p-2 rounded-xl w-8/10">
       <div className=" flex items-center">
       <svg width="24" height="24" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 1.25C7.895 1.25 9.585 2.315 10.41 4C9.585 5.685 7.895 6.75 6 6.75C4.105 6.75 2.415 5.685 1.59 4C2.415 2.315 4.105 1.25 6 1.25ZM6 0.25C3.5 0.25 1.365 1.805 0.5 4C1.365 6.195 3.5 7.75 6 7.75C8.5 7.75 10.635 6.195 11.5 4C10.635 1.805 8.5 0.25 6 0.25ZM6 2.75C6.69 2.75 7.25 3.31 7.25 4C7.25 4.69 6.69 5.25 6 5.25C5.31 5.25 4.75 4.69 4.75 4C4.75 3.31 5.31 2.75 6 2.75ZM6 1.75C4.76 1.75 3.75 2.76 3.75 4C3.75 5.24 4.76 6.25 6 6.25C7.24 6.25 8.25 5.24 8.25 4C8.25 2.76 7.24 1.75 6 1.75Z" fill="#4285F4"/>
</svg>

 <div className='ml-2'>Description</div>
 </div>
    </button>
  );
};

export default DescriptionButton;
