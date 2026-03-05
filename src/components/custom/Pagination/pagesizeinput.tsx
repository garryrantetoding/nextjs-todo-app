// // components/PageSizeInput.tsx
// import React from 'react';

// interface PageSizeInputProps {
//   pageSize: number;
//   setPageSize: React.Dispatch<React.SetStateAction<number>>;
// }

// const PageSizeInput: React.FC<PageSizeInputProps> = ({ pageSize, setPageSize }) => {
//   const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newPageSize = parseInt(event.target.value, 10);
//     if (!isNaN(newPageSize) && newPageSize > 0) {
//       setPageSize(newPageSize);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="page-size" className="mr-2">
//         Items per page:
//       </label>
//       <input
//         id="page-size"
//         type="number"
//         value={pageSize}
//         onChange={handlePageSizeChange}
//         className="px-2 py-1 border rounded-md"
//         min="1"
//       />
//     </div>
//   );
// };

// export default PageSizeInput;
// PageSizeInput.tsx
import React, { useState } from 'react';

interface PageSizeInputProps {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  text: string;
//   onPageSizeSubmit: () => void;  // Add this prop to trigger the submission
}

const PageSizeInput: React.FC<PageSizeInputProps> = ({ pageSize, setPageSize, text }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    
    setPageSize(Number(event.target.value));
  };

//   const handleButtonClick = () => {
//     onPageSizeSubmit();  // Trigger the onPageSizeSubmit function when the button is clicked
//   };

  return (
    <div className="flex items-center space-x-2">
        <label htmlFor="page-size" className="mr-2">
        Items per {text}:
      </label>
      <input
        type="number"
        value={pageSize}
        onChange={handleInputChange}
        className="border border-gray-300 rounded p-2 w-20"
        min="1"
      />
      {/* <button 
        onClick={handleButtonClick} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Set
      </button> */}
    </div>
  );
};

export default PageSizeInput;
