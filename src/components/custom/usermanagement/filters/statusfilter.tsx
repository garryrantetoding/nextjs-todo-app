// // // src/components/custom/status-filter.tsx
// // import React from 'react';

// // interface StatusFilterProps {
// //   onStatusChange: (status: boolean | undefined) => void; // Allow undefined for "All Status"
// // }

// // const StatusFilter: React.FC<StatusFilterProps> = ({ onStatusChange }) => {
// //   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// //     const status = event.target.value === 'active' ? true : event.target.value === 'inactive' ? false : undefined;
// //     onStatusChange(status);
// //   };

// //   return (
// //     <div>
// //       <label htmlFor="status-filter">Filter by Status:</label>
// //       <select id="status-filter" onChange={handleChange}>
// //         <option value="">All Status</option>
// //         <option value="active">Active</option>
// //         <option value="inactive">Inactive</option>
// //       </select>
// //     </div>
// //   );
// // };

// // export default StatusFilter;
// import React from 'react';
// import { Status } from '@/data/services/enum'; // Import your enum

// interface StatusFilterProps {
//   onStatusChange: (status: Status | undefined) => void; // Change to use Status enum
// }

// const StatusFilter: React.FC<StatusFilterProps> = ({ onStatusChange }) => {
//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const status = event.target.value === 'active'
//       ? Status.Active
//       : event.target.value === 'inactive'
//       ? Status.Inactive
//       : undefined; // Return undefined for "All Status"
//     onStatusChange(status);
//   };

  

//   return (
//     <div>
//       <label htmlFor="status-filter"></label>
//       <select id="status-filter" onChange={handleChange} className="border h-10  after:text-black bg-white p-2 rounded-md">
//         <option value="">Status</option>
//         <option value="active">Active</option>
//         <option value="inactive">Inactive</option>
//       </select>
//     </div>
//   );
// };

// export default StatusFilter;


// // import React, { useState } from 'react';
// // import { Status } from '@/data/services/enum'; // Import your enum

// // interface StatusFilterProps {
// //   onStatusChange: (status: Status | undefined) => void;
// // }

// // const StatusFilter: React.FC<StatusFilterProps> = ({ onStatusChange }) => {
// //   const [selectedValue, setSelectedValue] = useState<string | undefined>(''); // Track selected value
// //   const [isOpen, setIsOpen] = useState(false); // Track whether the dropdown is open

// //   const handleSelectChange = (value: string | undefined) => {
// //     setSelectedValue(value);
// //     const status = value === 'active'
// //       ? Status.Active
// //       : value === 'inactive'
// //       ? Status.Inactive
// //       : undefined;
// //     onStatusChange(status);
// //   };

// //   return (
// //     <div className="relative">
// //       <button
// //         className="w-full text-black border h-10 bg-white p-2 rounded-md flex justify-between items-center"
// //         onClick={() => setIsOpen(!isOpen)}
// //       >
// //         <span className={selectedValue === '' ? 'text-red-900' : ''}>
// //           {selectedValue || 'Status'}
// //         </span>
// //         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" className="ml-2">
// //           <path fill="none" stroke="currentColor" d="M2 4l4 4 4-4" />
// //         </svg>
// //       </button>
      
// //       {isOpen && (
// //         <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
// //           <div
// //             className="text-black p-2 cursor-pointer hover:bg-gray-100"
// //             onClick={() => handleSelectChange('active')}
// //           >
// //             Active
// //           </div>
// //           <div
// //             className="text-gray-500 p-2 cursor-pointer hover:bg-gray-100"
// //             onClick={() => handleSelectChange('inactive')}
// //           >
// //             Inactive
// //           </div>
// //           <div
// //             className="text-red-900 p-2 cursor-pointer hover:bg-gray-100"
// //             onClick={() => handleSelectChange('')}
// //           >
// //             Status
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default StatusFilter;

// export default StatusFilter;
import React, {useState} from 'react';
import { Status } from '@/data/services/enum'; // Import your enum

interface StatusFilterProps {
  onStatusChange: (status: Status ) => void; // Change to use Status enum
}

const StatusFilter: React.FC<StatusFilterProps> = ({ onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(''); // Track the selected status

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value === 'active'
      ? Status.Active
      : event.target.value === 'inactive'
      ? Status.Inactive
      : Status.undefined; // Return undefined for "All Status"

    setSelectedStatus(event.target.value); // Update selectedStatus state
    onStatusChange(status); // Notify parent of the status change
  };

  // Define styles for conditional text color
  const selectStyle = {
    color: selectedStatus === "" ? '#adadad' : 'black', // Apply red color if no status is selected
  };


  return (
    <div>
      <label htmlFor="status-filter"></label>
      <select id="status-filter" onChange={handleChange} 
      className="border h-10   bg-white p-2 rounded-md"
      value={selectedStatus} // Bind to selected status state
      style={selectStyle} // Apply the conditional style for text color
      >
        <option value="">Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default StatusFilter;