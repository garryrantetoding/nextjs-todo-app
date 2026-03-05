// popup-detail.tsx
import React from 'react';

// Define PopupButtonProps to accept an onClick handler
interface DescriptionEditButtonProps {
  onClick: () => void;
}

const DescriptionEditButton: React.FC<DescriptionEditButtonProps> = ({ onClick }) => {
  return (
    
    <button onClick={onClick} className="border-2 border-blue-500 bg-white text-blue-500 p-2 rounded-xl w-8/10">
       <div className=" flex items-center">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

 <div className='ml-2'>Edit</div>
 </div>
    </button>
  );            {/* <button onClick={onEdit} className="bg-blue-500 text-white p-2 rounded mt-4">Edit</button> */}

};

export default DescriptionEditButton;
