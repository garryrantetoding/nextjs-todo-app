// // // components/SectionToggleButton.tsx
// // import React from 'react';

// // interface SectionButtonProps {
// //   sectionId: string;
// //   sectionName: string;
// //   isOpen: boolean;
// //   onToggle: (sectionId: string) => void;
// // }

// // const SectionButton: React.FC<SectionButtonProps> = ({ sectionId, sectionName, isOpen, onToggle }) => {
// //   return (
// //     <button
// //       className="w-full py-3 mb-2 cursor-pointer text-neutral-400 text-left pl-5 hover:bg-gray-300 flex justify-between items-center"
// //       onClick={() => onToggle(sectionId)}
// //     >
// //       {sectionName}
// //       {/* Conditional rendering of the SVG based on whether the section is open */}
// //       {isOpen ? (
// //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
// //           <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
// //         </svg>
// //       ) : (
// //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
// //           <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
// //         </svg>
// //       )}
// //     </button>
// //   );
// // };

// // export default SectionButton;
// import React from 'react';

// interface SectionButtonProps {
//   sectionId: string;
//   sectionName: string;
//   isOpen: boolean;
//   onToggle: (sectionId: string) => void;
//   isActive: boolean;
// }

// const SectionButton: React.FC<SectionButtonProps> = ({ sectionId, sectionName, isOpen, onToggle, isActive }) => {
//   return (
//     <div>
//       <button
//         className={`w-full py-3 mb-2 cursor-pointer text-left pl-5 hover:bg-gray-300 transition-colors ${
//           isOpen ? 'bg-gray-200' : '' // Highlight the button if the section is open
//         } ${isActive ? 'bg-blue-500 text-white' : ''}`} // Highlight active section
//         onClick={() => onToggle(sectionId)}
//       >
//         {sectionName}
//         <span className="ml-2">
//           {isOpen ? (
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
//             </svg>
//           ) : (
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
//             </svg>
//           )}
//         </span>
//       </button>
//     </div>
//   );
// };

import React from 'react';

interface SectionButtonProps {
  sectionId: string;
  sectionName: string;
  isOpen: boolean;
  onToggle: (sectionId: string) => void;
  isActive: boolean; // Pass this prop to highlight the active section
}

const SectionButton: React.FC<SectionButtonProps> = ({ sectionId, sectionName, isOpen, onToggle, isActive }) => {
  return (
    <div>
      <button
        className={`w-full py-3 rounded-l-md mb-2 cursor-pointer text-left pl-5 hover:bg-gray-300 transition-colors group ${
          isOpen ? 'bg-white group' : '' // Highlight the button if the section is open
        } ${isActive ? 'bg-gray-200 text-black group' : ''}`} // Highlight active section
        onClick={() => onToggle(sectionId)}
      >
                  <div className="flex justify-between items-center w-full">
<div className='text-black'>
        {sectionName}
        </div>
        <span className="ml-2">
          {isOpen ? (
            // <div className={` text-white hover:text-red-900`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                 className={`w-6 h-6 text-white transition-colors ${
              isActive ? 'text-gray-200' : 'text-black'
            } group-hover:text-black`}
>

              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className={`w-6 h-6 transition-colors ${
              isActive ? 'text-gray-200' : 'text-white'
            } group-hover:text-black`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          )}
        </span>
        </div>
      </button>
    </div>
  );
};

export default SectionButton;
