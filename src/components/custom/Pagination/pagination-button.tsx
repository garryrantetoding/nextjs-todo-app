// // // // // // // // // components/Pagination.tsx
// // // // // // // // import React from 'react';

// // // // // // // // interface PaginationProps {
// // // // // // // //   page: number;
// // // // // // // //   totalPages: number;
// // // // // // // //   setPage: React.Dispatch<React.SetStateAction<number>>;
// // // // // // // // }

// // // // // // // // const Pagination: React.FC<PaginationProps> = ({ page, totalPages, setPage }) => {
// // // // // // // //   const handleNextPage = () => {
// // // // // // // //     if (page < totalPages) setPage(page + 1);
// // // // // // // //   };

// // // // // // // //   const handlePrevPage = () => {
// // // // // // // //     if (page > 1) setPage(page - 1);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="flex justify-between items-center mt-4">
// // // // // // // //       <button
// // // // // // // //         onClick={handlePrevPage}
// // // // // // // //         disabled={page === 1}
// // // // // // // //         className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200"
// // // // // // // //       >
// // // // // // // //         Previous
// // // // // // // //       </button>
// // // // // // // //       <span className="text-gray-700">
// // // // // // // //         Page {page} of {totalPages}
// // // // // // // //       </span>
// // // // // // // //       <button
// // // // // // // //         onClick={handleNextPage}
// // // // // // // //         disabled={page === totalPages}
// // // // // // // //         className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200"
// // // // // // // //       >
// // // // // // // //         Next
// // // // // // // //       </button>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Pagination;
// // // // // // // // src/components/Pagination.tsx
// // // // // // // import React, { useState } from 'react';

// // // // // // // interface PaginationProps {
// // // // // // //   currentPage: number;
// // // // // // //   totalPages: number;
// // // // // // //   onPageChange: (page: number) => void;
// // // // // // //   onPageSizeChange: (pageSize: number) => void;
// // // // // // //   pageSize: number;
// // // // // // // }

// // // // // // // const Pagination: React.FC<PaginationProps> = ({
// // // // // // //   currentPage,
// // // // // // //   totalPages,
// // // // // // //   onPageChange,
// // // // // // //   onPageSizeChange,
// // // // // // //   pageSize,
// // // // // // // }) => {
// // // // // // //   const [inputPage, setInputPage] = useState(currentPage);

// // // // // // //   const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     const value = Math.max(1, Math.min(totalPages, Number(event.target.value))); // Ensure page is within bounds
// // // // // // //     setInputPage(value);
// // // // // // //   };

// // // // // // //   const handleGoToPage = () => {
// // // // // // //     if (inputPage !== currentPage) {
// // // // // // //       onPageChange(inputPage); // Update page when the input is confirmed
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const generatePageNumbers = () => {
// // // // // // //     const pageNumbers = [];
// // // // // // //     const range = 2; // Number of pages before and after the current page to show

// // // // // // //     // Start from the first page
// // // // // // //     let startPage = Math.max(1, currentPage - range);
// // // // // // //     let endPage = Math.min(totalPages, currentPage + range);

// // // // // // //     // Always show the first page and last page
// // // // // // //     if (startPage > 1) {
// // // // // // //       pageNumbers.push(1); // Add first page
// // // // // // //     }

// // // // // // //     for (let i = startPage; i <= endPage; i++) {
// // // // // // //       pageNumbers.push(i);
// // // // // // //     }

// // // // // // //     if (endPage < totalPages) {
// // // // // // //       pageNumbers.push(totalPages); // Add last page if it's not already included
// // // // // // //     }

// // // // // // //     return pageNumbers;
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="flex justify-center mt-4 items-center space-x-2">
// // // // // // //       {/* Previous Button */}
// // // // // // //       <button
// // // // // // //         onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
// // // // // // //         disabled={currentPage <= 1}
// // // // // // //         className="bg-blue-500 text-white px-4 py-2 rounded"
// // // // // // //       >
// // // // // // //         Prev
// // // // // // //       </button>

// // // // // // //       {/* Page Numbers */}
// // // // // // //       {generatePageNumbers().map((pageNumber) => (
// // // // // // //         <button
// // // // // // //           key={pageNumber}
// // // // // // //           onClick={() => onPageChange(pageNumber)}
// // // // // // //           className={`px-4 py-2 rounded ${
// // // // // // //             pageNumber === currentPage
// // // // // // //               ? 'bg-blue-500 text-white'
// // // // // // //               : 'bg-white border border-gray-300'
// // // // // // //           }`}
// // // // // // //         >
// // // // // // //           {pageNumber}
// // // // // // //         </button>
// // // // // // //       ))}

// // // // // // //       {/* Page Input */}
// // // // // // //       <input
// // // // // // //         type="number"
// // // // // // //         value={inputPage}
// // // // // // //         onChange={handlePageInputChange}
// // // // // // //         onBlur={handleGoToPage}
// // // // // // //         className="border border-gray-300 rounded p-2 w-20"
// // // // // // //         min="1"
// // // // // // //         max={totalPages}
// // // // // // //       />

// // // // // // //       {/* Total Pages */}
// // // // // // //       <span> / {totalPages}</span>

// // // // // // //       {/* Next Button */}
// // // // // // //       <button
// // // // // // //         onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
// // // // // // //         disabled={currentPage >= totalPages}
// // // // // // //         className="bg-blue-500 text-white px-4 py-2 rounded"
// // // // // // //       >
// // // // // // //         Next
// // // // // // //       </button>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Pagination;
// // // // // // // src/components/Pagination.tsx
// // // // // // import React, { useState } from 'react';

// // // // // // interface PaginationProps {
// // // // // //   currentPage: number;
// // // // // //   totalPages: number;
// // // // // //   onPageChange: (page: number) => void;
// // // // // //   onPageSizeChange: (pageSize: number) => void;
// // // // // //   pageSize: number;
// // // // // // }
// // // // // // const Pagination: React.FC<PaginationProps> = ({
// // // // // //     currentPage,
// // // // // //     totalPages,
// // // // // //     onPageChange,
// // // // // //     onPageSizeChange,
// // // // // //     pageSize,
// // // // // //   }) => {
// // // // // //     const [inputPage, setInputPage] = useState(currentPage);

// // // // // //     const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //       const value = Math.max(1, Math.min(totalPages, Number(event.target.value))); // Ensure page is within bounds
// // // // // //       setInputPage(value);
// // // // // //     };

// // // // // //     const handleGoToPage = () => {
// // // // // //       if (inputPage !== currentPage) {
// // // // // //         onPageChange(inputPage); // Update page when the input is confirmed
// // // // // //       }
// // // // // //     };

// // // // // //     const generatePageNumbers = () => {
// // // // // //       const pageNumbers = [];
// // // // // //       const range = 2; // Number of pages before and after the current page to show

// // // // // //       // Start from the first page
// // // // // //       let startPage = Math.max(1, currentPage - range);
// // // // // //       let endPage = Math.min(totalPages, currentPage + range);

// // // // // //       // Always show the first two pages
// // // // // //       pageNumbers.push(1);
// // // // // //       if (startPage > 2) {
// // // // // //         pageNumbers.push('...'); // Show ellipsis if there's a gap
// // // // // //       }

// // // // // //       for (let i = startPage; i <= endPage; i++) {
// // // // // //         pageNumbers.push(i);
// // // // // //       }

// // // // // //       if (endPage < totalPages - 1) {
// // // // // //         pageNumbers.push('...'); // Show ellipsis if there's a gap
// // // // // //       }

// // // // // //       // Always show the last two pages
// // // // // //       if (totalPages > 1) {
// // // // // //         pageNumbers.push(totalPages);
// // // // // //       }

// // // // // //       return pageNumbers;
// // // // // //     };

// // // // // //     return (
// // // // // //       <div className="flex justify-center mt-4 items-center space-x-2">
// // // // // //         {/* Previous Button */}
// // // // // //         <button
// // // // // //           onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
// // // // // //           disabled={currentPage <= 1}
// // // // // //           className="bg-blue-500 text-white px-4 py-2 rounded"
// // // // // //         >
// // // // // //           Prev
// // // // // //         </button>

// // // // // //         {/* First two pages, ellipses (if applicable), and input box */}
// // // // // //         {generatePageNumbers().map((pageNumber, index) => {
// // // // // //           // Use the index in the key to ensure uniqueness
// // // // // //           if (pageNumber === '...') {
// // // // // //             return (
// // // // // //               <span key={`ellipsis-${index}`} className="px-4 py-2">...</span>
// // // // // //             );
// // // // // //           }

// // // // // //           if (totalPages > 4 && pageNumber !== currentPage && typeof pageNumber === 'number' && pageNumber > 2 && pageNumber < totalPages - 1) {
// // // // // //             return (
// // // // // //               <input
// // // // // //                 key={`input-${index}`}
// // // // // //                 type="number"
// // // // // //                 value={inputPage}
// // // // // //                 onChange={handlePageInputChange}
// // // // // //                 onBlur={handleGoToPage}
// // // // // //                 className="border border-gray-300 rounded p-2 w-20 mx-2"
// // // // // //                 min="1"
// // // // // //                 max={totalPages}
// // // // // //               />
// // // // // //             );
// // // // // //           }

// // // // // //           return (
// // // // // //             <button
// // // // // //               key={`page-${pageNumber}-${index}`} // Added index to ensure uniqueness
// // // // // //               onClick={() => onPageChange(Number(pageNumber))}
// // // // // //               className={`px-4 py-2 rounded ${
// // // // // //                 pageNumber === currentPage
// // // // // //                   ? 'bg-blue-500 text-white'
// // // // // //                   : 'bg-white border border-gray-300'
// // // // // //               }`}
// // // // // //             >
// // // // // //               {pageNumber}
// // // // // //             </button>
// // // // // //           );
// // // // // //         })}

// // // // // //         {/* Next Button */}
// // // // // //         <button
// // // // // //           onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
// // // // // //           disabled={currentPage >= totalPages}
// // // // // //           className="bg-blue-500 text-white px-4 py-2 rounded"
// // // // // //         >
// // // // // //           Next
// // // // // //         </button>
// // // // // //       </div>
// // // // // //     );
// // // // // //   };
// // // // // //   export default Pagination;
// // // // // import React, { useState } from 'react';
// // // // // import PageInputModal from '../popups/popup-pageinput';

// // // // // interface PaginationProps {
// // // // //   currentPage: number;
// // // // //   totalPages: number;
// // // // //   onPageChange: (page: number) => void;
// // // // // }

// // // // // const Pagination: React.FC<PaginationProps> = ({
// // // // //   currentPage,
// // // // //   totalPages,
// // // // //   onPageChange,
// // // // // }) => {
// // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // //   const [inputPage, setInputPage] = useState<number>(currentPage);

// // // // //   // Open the modal when "..." is clicked
// // // // //   const openModal = () => setIsModalOpen(true);

// // // // //   // Close the modal
// // // // //   const closeModal = () => setIsModalOpen(false);

// // // // //   // Handle page change from input modal
// // // // //   const handlePageSubmit = (page: number) => {
// // // // //     if (page !== currentPage) {
// // // // //       onPageChange(page);
// // // // //     }
// // // // //     closeModal();
// // // // //   };

// // // // //   const generatePageNumbers = () => {
// // // // //     const pageNumbers = [];
// // // // //     const range = 2; // Number of pages before and after the current page to show

// // // // //     // Show first two pages
// // // // //     pageNumbers.push(1);

// // // // //     if (currentPage - range > 2) {
// // // // //       pageNumbers.push('...');
// // // // //     }

// // // // //     // Generate range of page numbers around currentPage
// // // // //     for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
// // // // //       pageNumbers.push(i);
// // // // //     }

// // // // //     if (currentPage + range < totalPages - 1) {
// // // // //       pageNumbers.push('...');
// // // // //     }

// // // // //     // Show last two pages if totalPages > 3
// // // // //     if (totalPages > 3) {
// // // // //       pageNumbers.push(totalPages);
// // // // //     }

// // // // //     return pageNumbers;
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex justify-center mt-4 items-center space-x-2">
// // // // //       {/* Previous Button */}
// // // // //       <button
// // // // //         onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
// // // // //         disabled={currentPage <= 1}
// // // // //         className="bg-blue-500 text-white px-4 py-2 rounded"
// // // // //       >
// // // // //         Prev
// // // // //       </button>

// // // // //       {/* First two pages, ellipses (if applicable) */}
// // // // //       {generatePageNumbers().map((pageNumber, index) => {
// // // // //         if (pageNumber === '...') {
// // // // //           return (
// // // // //             <span key={`ellipsis-${index}`} className="px-4 py-2 cursor-pointer" onClick={openModal}>
// // // // //               ...
// // // // //             </span>
// // // // //           );
// // // // //         }

// // // // //         return (
// // // // //           <button
// // // // //             key={`page-${pageNumber}-${index}`}
// // // // //             onClick={() => onPageChange(Number(pageNumber))}
// // // // //             className={`px-4 py-2 rounded ${
// // // // //               pageNumber === currentPage
// // // // //                 ? 'bg-blue-500 text-white'
// // // // //                 : 'bg-white border border-gray-300'
// // // // //             }`}
// // // // //           >
// // // // //             {pageNumber}
// // // // //           </button>
// // // // //         );
// // // // //       })}

// // // // //       {/* Next Button */}
// // // // //       <button
// // // // //         onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
// // // // //         disabled={currentPage >= totalPages}
// // // // //         className="bg-blue-500 text-white px-4 py-2 rounded"
// // // // //       >
// // // // //         Next
// // // // //       </button>

// // // // //       {/* Modal */}
// // // // //       <PageInputModal
// // // // //         isOpen={isModalOpen}
// // // // //         onClose={closeModal}
// // // // //         onSubmit={handlePageSubmit}
// // // // //         currentPage={currentPage}
// // // // //         totalPages={totalPages}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Pagination;
// // // // import React, { useState } from 'react';
// // // // import PageInputModal from '../popups/popup-pageinput';

// // // // interface PaginationProps {
// // // //   currentPage: number;
// // // //   totalPages: number;
// // // //   onPageChange: (page: number) => void;
// // // // }

// // // // const Pagination: React.FC<PaginationProps> = ({
// // // //   currentPage,
// // // //   totalPages,
// // // //   onPageChange,
// // // // }) => {
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const [inputPage, setInputPage] = useState<number>(currentPage);

// // // //   // Open the modal when "..." is clicked
// // // //   const openModal = () => setIsModalOpen(true);

// // // //   // Close the modal
// // // //   const closeModal = () => setIsModalOpen(false);

// // // //   // Handle page change from input modal
// // // //   const handlePageSubmit = (page: number) => {
// // // //     if (page !== currentPage) {
// // // //       onPageChange(page);
// // // //     }
// // // //     closeModal();
// // // //   };

// // // //   const generatePageNumbers = () => {
// // // //     const pageNumbers: (number | string)[] = [];

// // // //     // Case 1: When totalPages is 4 or less, show all page numbers
// // // //     if (totalPages <= 4) {
// // // //       for (let i = 1; i <= totalPages; i++) {
// // // //         pageNumbers.push(i);
// // // //       }
// // // //     } else {
// // // //       // Case 2: When totalPages is greater than 5, show first 2, second-to-last, and last page
// // // //       pageNumbers.push(1); // Always show page 1

// // // //       // Always show page 2 if totalPages > 1
// // // //       if (totalPages > 1) pageNumbers.push(2);

// // // //       // Add ellipsis (...) if currentPage is far from page 2
// // // //       if (currentPage > 3) pageNumbers.push('...');

// // // //     //   if (currentPage > 2) //remove page 1 & 2



// // // //       // Show pages in range around the current page (including second-to-last and last page)
// // // //       const start = Math.max(3, currentPage - 1);
// // // //       const end = Math.min(totalPages - 1, currentPage + 1);

// // // //       // Add pages within the range
// // // //       for (let i = start; i <= end; i++) {
// // // //         if (i !== 2 && i !== totalPages - 1) {
// // // //           pageNumbers.push(i);
// // // //         }
// // // //       }

// // // //       // Add ellipsis (...) before the last two pages
// // // //       if (currentPage < totalPages - 3) pageNumbers.push('...');

// // // //       // Show second to last page
// // // //       if (totalPages > 5) pageNumbers.push(totalPages - 1);

// // // //       // Always show last page if totalPages > 5
// // // //       pageNumbers.push(totalPages);
// // // //     }

// // // //     return pageNumbers;
// // // //   };

// // // //   return (
// // // //     <div className="flex justify-center mt-4 items-center space-x-2">
// // // //       {/* Previous Button */}
// // // //       <button
// // // //         onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
// // // //         disabled={currentPage <= 1}
// // // //         className="bg-blue-500 text-white px-4 py-2 rounded"
// // // //       >
// // // //         Prev
// // // //       </button>

// // // //       {/* Page Numbers */}
// // // //       {generatePageNumbers().map((pageNumber, index) => {
// // // //         if (pageNumber === '...') {
// // // //           return (
// // // //             <span key={`ellipsis-${index}`} className="px-4 py-2 cursor-pointer" onClick={openModal}>
// // // //               ...
// // // //             </span>
// // // //           );
// // // //         }

// // // //         return (
// // // //           <button
// // // //             key={`page-${pageNumber}-${index}`}
// // // //             onClick={() => onPageChange(Number(pageNumber))}
// // // //             className={`px-4 py-2 rounded ${
// // // //               pageNumber === currentPage
// // // //                 ? 'bg-blue-500 text-white'
// // // //                 : 'bg-white border border-gray-300'
// // // //             }`}
// // // //           >
// // // //             {pageNumber}
// // // //           </button>
// // // //         );
// // // //       })}

// // // //       {/* Next Button */}
// // // //       <button
// // // //         onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
// // // //         disabled={currentPage >= totalPages}
// // // //         className="bg-blue-500 text-white px-4 py-2 rounded"
// // // //       >
// // // //         Next
// // // //       </button>

// // // //       {/* Modal */}
// // // //       <PageInputModal
// // // //         isOpen={isModalOpen}
// // // //         onClose={closeModal}
// // // //         onSubmit={handlePageSubmit}
// // // //         currentPage={currentPage}
// // // //         totalPages={totalPages}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Pagination;


// // // import React, { useState } from 'react';
// // // import PageInputModal from '../popups/popup-pageinput';

// // // interface PaginationProps {
// // //   currentPage: number;
// // //   totalPages: number;
// // //   onPageChange: (page: number) => void;
// // // }

// // // const Pagination: React.FC<PaginationProps> = ({
// // //   currentPage,
// // //   totalPages,
// // //   onPageChange,
// // // }) => {
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [inputPage, setInputPage] = useState<number>(currentPage);

// // //   // Open the modal when "..." is clicked
// // //   const openModal = () => setIsModalOpen(true);

// // //   // Close the modal
// // //   const closeModal = () => setIsModalOpen(false);

// // //   // Handle page change from input modal
// // //   const handlePageSubmit = (page: number) => {
// // //     if (page !== currentPage) {
// // //       onPageChange(page);
// // //     }
// // //     closeModal();
// // //   };

// // //   const generatePageNumbers = () => {
// // //     const pageNumbers: (number | string)[] = [];

// // //     // Case 1: When totalPages is 4 or less, show all page numbers
// // //     if (totalPages <= 4) {
// // //       for (let i = 1; i <= totalPages; i++) {
// // //         pageNumbers.push(i);
// // //       }
// // //     } else {
// // //       // Case 2: When totalPages is greater than 5, show first 2, second-to-last, and last page
// // //       // Only show page 1 and 2 if currentPage is less than 3
// // //       if (currentPage < 3) {
// // //         pageNumbers.push(1); // Always show page 1 if currentPage < 3
// // //         pageNumbers.push(2); // Always show page 2 if currentPage < 3
// // //       } else if (currentPage === 3) {
// // //         pageNumbers.push(1);
// // //         pageNumbers.push(2); // Always show page 2 if currentPage = 3

// // //       } else{
// // //         pageNumbers.push(1);
// // //         pageNumbers.push(2);

// // //       }

// // //       // Add ellipsis (...) if currentPage is far from page 2
// // //       if (totalPages >= 8) {
// // //       if (currentPage > 3) {  
// // //         // pageNumbers.push(1);
// // //         // pageNumbers.push(2);
// // //         pageNumbers.push('...');
// // //       }
// // //     }else {

// // //       if (currentPage-2 !>= 2 ) {  
// // //       // pageNumbers.push(1);
// // //       // pageNumbers.push(2);
// // //       pageNumbers.push('...');
// // //     }

// // //     }
// // //       // Show pages in range around the current page (including second-to-last and last page)
// // //       const start = Math.max(3, currentPage - 1);  // Start from page 3 if currentPage > 2
// // //       const end = Math.min(totalPages - 2, currentPage + 1);  // End at the last page minus 1

// // //       // Add pages within the range
// // //       for (let i = start; i <= end; i++) {

// // //         pageNumbers.push(i);
// // //       }
// // // //  // Add ellipsis (...) before the last two pages
// // // //  if (currentPage = totalPages - 3) {
// // // //     pageNumbers.push(totalPages - 2);

// // // //   }
// // //       // Add ellipsis (...) before the last two pages
// // //       if (currentPage < totalPages - 3) {pageNumbers.push('...');
// // //         // pageNumbers.push(totalPages - 1);

// // //       } 

// // //     //   else if (currentPage = totalPages - 3){     
// // //     //     // Show pages in range around the current page (including second-to-last and last page)
// // //     //   const start = Math.max(totalPages - 3, currentPage - 1);  // Start from page 3 if currentPage > 2
// // //     //   const end = Math.min(totalPages, currentPage + 1);  // End at the last page minus 1

// // //     //   // Add pages within the range
// // //     //   for (let i = start; i <= end; i++) {
// // //     //     pageNumbers.push('...');pageNumbers.push(i);
// // //     //   }


// // //     //     // pageNumbers.push(totalPages - 1);
// // //     //   }

// // // // // Add ellipsis (...) before the last two pages
// // // // if (currentPage = totalPages - 3) {
// // // //     pageNumbers.push(totalPages - 1);

// // // //   }

// // //     //   // Add ellipsis (...) before the last two pages
// // //     //   if (totalPages - 3 <= currentPage) pageNumbers.push('...');

// // //       // Show second to last page
// // //       if (totalPages > 5) {
// // //         // if (currentPage = totalPages-1){pageNumbers.push('...');
// // //         // }
// // //         // if(currentPage = totalPages){pageNumbers.push('...');pageNumbers.push(totalPages - 1);
// // //         // }

// // //         //     else {             
// // //         //         // pageNumbers.push(totalPages - 1);
// // //         //     }

// // //         pageNumbers.push(totalPages - 1);


// // //       }
// // //       // Always show last page if totalPages > 5
// // //       pageNumbers.push(totalPages);
// // //     }

// // //     return pageNumbers;
// // //   };

// // //   return (
// // //     <div className="flex justify-center mt-4 items-center space-x-2">
// // //       {/* Previous Button */}
// // //       <button
// // //         onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
// // //         disabled={currentPage <= 1}
// // //         className="bg-blue-500 text-white px-4 py-2 rounded"
// // //       >
// // //         Prev
// // //       </button>

// // //       {/* Page Numbers */}
// // //       {generatePageNumbers().map((pageNumber, index) => {
// // //         if (pageNumber === '...') {
// // //           return (
// // //             <span key={`ellipsis-${index}`} className="px-4 py-2 cursor-pointer" 
// // //             onClick={openModal}
// // //             >
// // //               ...
// // //             </span>
// // //           );
// // //         }

// // //         return (
// // //           <button
// // //             key={`page-${pageNumber}-${index}`}
// // //             onClick={() => onPageChange(Number(pageNumber))}
// // //             className={`px-4 py-2 rounded ${
// // //               pageNumber === currentPage
// // //                 ? 'bg-blue-500 text-white'
// // //                 : 'bg-white border border-gray-300'
// // //             }`}
// // //           >
// // //             {pageNumber}
// // //           </button>
// // //         );
// // //       })}

// // //       {/* Next Button */}
// // //       <button
// // //         onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
// // //         disabled={currentPage >= totalPages}
// // //         className="bg-blue-500 text-white px-4 py-2 rounded"
// // //       >
// // //         Next
// // //       </button>
// // //       <div>{currentPage}</div>

// // //       {/* Modal */}
// // //       <PageInputModal
// // //         isOpen={isModalOpen}
// // //         onClose={closeModal}
// // //         onSubmit={handlePageSubmit}
// // //         currentPage={currentPage}
// // //         totalPages={totalPages}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default Pagination;



// // import React, { useState } from 'react';

// // interface PaginationProps {
// //   currentPage: number;
// //   totalPages: number;
// //   onPageChange: (page: number) => void;
// // }

// // const Pagination: React.FC<PaginationProps> = ({
// //   currentPage,
// //   totalPages,
// //   onPageChange,
// // }) => {
// //   const [inputPage, setInputPage] = useState<number>(currentPage);

  
// //   // Handle page change from input modal
// //   const handlePageSubmit = (page: number) => {
// //     if (page !== currentPage) {
// //       onPageChange(page);
// //     }
// //     // closeModal();
// //   };

// //   // Handle the Enter key press to submit the page number
// //   const handleKeyDown = (event: React.KeyboardEvent) => {
// //     if (event.key === 'Enter') {
// //       handlePageSubmit(inputPage);
// //     }
// //   };

// //   const generatePageNumbers = () => {
// //     const pageNumbers: (number | string)[] = [];

// //     // Case 1: When totalPages is 4 or less, show all page numbers
// //     if (totalPages <= 4) {
// //       for (let i = 1; i <= totalPages; i++) {
// //         pageNumbers.push(i);
// //       }
// //     } else {
// //       // Case 2: When totalPages is greater than 5, show first 2, second-to-last, and last page
// //       // Only show page 1 and 2 if currentPage is less than 3
// //       if (currentPage < 3) {
// //         pageNumbers.push(1); // Always show page 1 if currentPage < 3
// //         pageNumbers.push(2); // Always show page 2 if currentPage < 3
// //       } else if (currentPage === 3) {
// //         pageNumbers.push(1);
// //         pageNumbers.push(2); // Always show page 2 if currentPage = 3

// //       } else {
// //         pageNumbers.push(1);
// //         pageNumbers.push(2);

// //       }

// //       // Add ellipsis (...) if currentPage is far from page 2
// //       if (totalPages >= 8) {
// //         if (currentPage > 3) {

// //           pageNumbers.push('...');
// //         }
// //       } else {

// //         if (currentPage - 2! >= 2) {

// //           pageNumbers.push('...');
// //         }

// //       }
// //       // Show pages in range around the current page (including second-to-last and last page)
// //       const start = Math.max(3, currentPage - 1);  // Start from page 3 if currentPage > 2
// //       const end = Math.min(totalPages - 2, currentPage + 1);  // End at the last page minus 1

// //       // Add pages within the range
// //       for (let i = start; i <= end; i++) {

// //         pageNumbers.push(i);
// //       }

// //       // Add ellipsis (...) before the last two pages
// //       if (currentPage < totalPages - 3) {
// //         pageNumbers.push('...');

// //       }

// //       // Show second to last page
// //       if (totalPages > 5) {

// //         pageNumbers.push(totalPages - 1);


// //       }
// //       // Always show last page if totalPages > 5
// //       pageNumbers.push(totalPages);
// //     }

// //     return pageNumbers;
// //   };

// //   return (
// //     <div className="flex justify-center mt-4 items-center space-x-2">
      
// //       {/* Previous Button */}
// //       <button
// //         onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
// //         disabled={currentPage <= 1}
// //         className="bg-blue-500 text-white px-4 py-2 rounded"
// //       >
// //         Prev
// //       </button>

// //       {/* Page Numbers */}
// //       {generatePageNumbers().map((pageNumber, index) => {
// //         if (pageNumber === '...') {
// //           return (
// //             <span key={`ellipsis-${index}`} className="px-4 py-2 cursor-pointer"
// //             >
// //               ...
// //             </span>
// //           );
// //         }

// //         return (
// //           <button
// //             key={`page-${pageNumber}-${index}`}
// //             onClick={() => onPageChange(Number(pageNumber))}
// //             className={`px-4 py-2 rounded ${pageNumber === currentPage
// //                 ? 'bg-blue-500 text-white'
// //                 : 'bg-white border border-gray-300'
// //               }`}
// //           >
// //             {pageNumber}
// //           </button>
// //         );
// //       })}

// //       {/* Next Button */}
// //       <button
// //         onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
// //         disabled={currentPage >= totalPages}
// //         className="bg-blue-500 text-white px-4 py-2 rounded"
// //       >
// //         Next
// //       </button>
// //       {/* Input Box for Page Number */}
// //       <div className="mt-2 flex items-center">
// //         <input
// //           type="text"
// //           value={inputPage}
// //           onChange={(e) => setInputPage(Number(e.target.value))}
// //           min={1}
// //           max={totalPages}
// //           onKeyDown={handleKeyDown}  // Listen for Enter key
// //           className="border border-gray-300 px-4 py-2 rounded"
// //           placeholder="Enter page"
// //         />
// //         <button
// //           onClick={() => handlePageSubmit(inputPage)}
// //           className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
// //         >
// //           Go
// //         </button>
// //       </div>


// //     </div>
// //   );
// // };

// // export default Pagination;

// import React, { useState } from 'react';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const [inputPage, setInputPage] = useState<number>(currentPage);

//   // Handle page change from input modal
//   const handlePageSubmit = (page: number) => {
//    // Validate page
//    if (page > totalPages || page < 1 || isNaN(page)) {
//     setInputPage(1); // Reset to 1 if invalid
//     onPageChange(1);  // Optionally, you can also navigate to page 1
//   } else if (page !== currentPage) {
//     onPageChange(page);
//   }


//   };

//   // Handle the Enter key press to submit the page number
//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     if (event.key === 'Enter') {
//       handlePageSubmit(inputPage);
//     }
//   };
  
//   // Handle the change in the input value
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputPage(Number(value));

//     // // Allow only numbers, and update inputPage
//     // if (value === '' || /^[0-9]+$/.test(value)) {
//     //   setInputPage(Number(value));
//     // }
//   };

//   const generatePageNumbers = () => {
//     const pageNumbers: (number | string)[] = [];

//     // Case 1: When totalPages is 4 or less, show all page numbers
//     if (totalPages <= 4) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       // Case 2: When totalPages is greater than 5, show first 2, second-to-last, and last page
//       if (currentPage < 3) {
//         pageNumbers.push(1, 2);
//       } else if (currentPage === 3) {
//         pageNumbers.push(1, 2);
//       } else {
//         pageNumbers.push(1, 2);
//       }

//       // Add ellipsis (...) if currentPage is far from page 2
//       if (totalPages >= 8 && currentPage > 3) {
//         pageNumbers.push('...');
//       } else if (currentPage - 2 >= 2) {
//         pageNumbers.push('...');
//       }

//       const start = Math.max(3, currentPage - 1);  // Start from page 3 if currentPage > 2
//       const end = Math.min(totalPages - 2, currentPage + 1);  // End at the last page minus 1

//       for (let i = start; i <= end; i++) {
//         pageNumbers.push(i);
//       }

//       // Add ellipsis (...) before the last two pages
//       if (currentPage < totalPages - 3) {
//         pageNumbers.push('...');
//       }

//       if (totalPages > 5) {
//         pageNumbers.push(totalPages - 1);
//       }

//       pageNumbers.push(totalPages);
//     }

//     return pageNumbers;
//   };

//   return (
//     <div className="flex flex-col justify-center items-center mt-4">
//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center space-x-2 mb-4">
//         {/* Previous Button */}
//         <button
//           onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//           disabled={currentPage <= 1}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Prev
//         </button>

//         {/* Page Numbers */}
//         {generatePageNumbers().map((pageNumber, index) => {
//           if (pageNumber === '...') {
//             return (
//               <span key={`ellipsis-${index}`} className="px-4 py-2 cursor-pointer">
//                 ...
//               </span>
//             );
//           }

//           return (
//             <button
//               key={`page-${pageNumber}-${index}`}
//               onClick={() => onPageChange(Number(pageNumber))}
//               className={`px-4 py-2 rounded ${
//                 pageNumber === currentPage
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-white border border-gray-300'
//               }`}
//             >
//               {pageNumber}
//             </button>
//           );
//         })}

//         {/* Next Button */}
//         <button
//           onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//           disabled={currentPage >= totalPages}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Next
//         </button>
//       </div>

//       {/* Input Box for Page Number */}
//       <div className="flex items-center mt-2">
//       <label className="w-full relative">

//         <input
//           type="text"
//           value={inputPage}
//           onChange={handleInputChange} // Update the inputPage state          min={1}
//           max={totalPages}
//           onKeyDown={handleKeyDown}  // Listen for Enter key
//           className="border border-gray-300 px-4 py-2 rounded w-15"
//           placeholder="Enter page"
//         />
//         <div    
//                     className="absolute right-2 bottom-2.25 z-10"// Apply dynamic color based on character length
//           >
//             /{totalPages} {/* Display character count */}
//           </div>
//         </label>

//         <button
//           onClick={() => handlePageSubmit(inputPage)}
//           className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
//         >
//           Go
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

import React, { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  scale: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  scale,
}) => {
  const [inputPage, setInputPage] = useState<number>(currentPage);

  //  // Sync the inputPage with the currentPage whenever currentPage changes
  //  useEffect(() => {
  //   setInputPage(currentPage);
  // }, [currentPage]);
   // Sync the inputPage with the currentPage whenever currentPage changes
   useEffect(() => {
    // Ensure currentPage doesn't exceed totalPages
    if (currentPage < 1) {
      onPageChange(totalPages); // Reset to the last page
    } else if (currentPage > totalPages) {
      onPageChange(totalPages); // Reset to the last page
    }  else {
      setInputPage(currentPage); // Sync inputPage with currentPage
    }
  }, [currentPage, totalPages, onPageChange]);

  // Handle page change from input modal
  const handlePageSubmit = (page: number) => {
    // Validate page
    if (page > totalPages || page < 1 || isNaN(page)) {
      setInputPage(1); // Reset to 1 if invalid
      onPageChange(1);  // Optionally, you can also navigate to page 1
    } else if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Handle the Enter key press to submit the page number
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handlePageSubmit(inputPage);
    }
  };

  // Handle the change in the input value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers, and update inputPage
    if (value === '' || /^[0-9]+$/.test(value)) {
      setInputPage(Number(value));
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    // if (totalPages <= 0) {
    //   pageNumbers.push(1); // Show only page 1 if there are no pages
    // } else if
    
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage < 3) {
        pageNumbers.push(1, 2);
      } else if (currentPage === 3) {
        pageNumbers.push(1, 2);
      } else {
        pageNumbers.push(1, 2);
      }

      if (totalPages >= 8 && currentPage > 4) {
        pageNumbers.push('...');
      } else if (currentPage - 2 >= 2 && currentPage > 4) {
        pageNumbers.push('...');
      }

      const start = Math.max(3, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 3) {
        pageNumbers.push('...');
      }

      if (totalPages > 5) {
        pageNumbers.push(totalPages - 1);
      }
    


      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (totalPages===0){
    return null
  }
  

  return (
    <div className="flex flex-col justify-center items-center mt-4 border-0" style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mb-4">
        {/* Previous Button */}
    
        {currentPage > 1 && (
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage <= 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Prev
        </button>
        )}

        {/* Page Numbers */}
        {generatePageNumbers().map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-4 py-2 cursor-pointer">
                ...
              </span>
            );
          }

          return (
            <button
              key={`page-${pageNumber}-${index}`}
              onClick={() => onPageChange(Number(pageNumber))}
              className={`px-4 py-2 rounded ${
                pageNumber === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-300'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next Button */}
        {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
        )}
      </div>

      {/* Input Box for Page Number */}
      <div className="flex items-center mt-2 ">
        <div className=" flex items-center justify-between border-2 border-black rounded-md px-2 py-2">
          <input
            type="text"
            value={isNaN(inputPage) ? '' : inputPage} // Convert to an empty string if NaN
            onChange={handleInputChange} // Update the inputPage state
            onKeyDown={handleKeyDown} // Listen for Enter key
            className=" text-right"
            placeholder="Enter page"
            style={{
              width: `${Math.min(Math.max(inputPage.toString().length, 1), 10)}ch`, // Dynamically adjust width between 2 and 10 characters
            }}
          />
          <div className="">
            /{totalPages} {/* Display the total pages */}
          </div>
        </div>

        <button
          onClick={() => handlePageSubmit(inputPage)}
          className="border-2 border-blue-500 border-solid hover:bg-blue-900 bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default Pagination;
