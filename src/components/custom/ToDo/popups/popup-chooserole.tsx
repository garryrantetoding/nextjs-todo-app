// // // src/components/custom/role-filter.tsx

// // import React, { useState, useEffect } from 'react';
// // import { LoadRole } from '@/data/services/userroles-service';

// // interface ChooseRoleProps {
// //   onRoleChange: (roles: string) => void;
// // }

// // const ChooseRole: React.FC<ChooseRoleProps> = ({ onRoleChange }) => {
// //     const [TaskRoles, setTaskRoles] = useState<any[]>([]); // State to store roles
  
// //   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// //     onRoleChange(event.target.value);
// //   };


// //     // Fetch roles from the backend API
// //     useEffect(() => {
// //       const fetchRoles = async () => {
// //         try {
// //           const response = await LoadRole(); // API function to load roles
// //           const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
// //           setTaskRoles(data); // Set the roles in state
// //         } catch (error) {
// //           console.error('Error fetching roles:', error);
// //         }
// //       };
  
// //       fetchRoles();
// //     }, []); // Empty dependency array to run only once on component mount
  
   
// //   return (
// //     <div>
// //       <label htmlFor="role-filter"></label>
// //       {TaskRoles && (<select id="role-filter" onChange={handleChange} className="border h-10 p-2 bg-white rounded-md"
// //       >
// //         {/* <option value="">Role</option>
// //         <option value="Owner">Owner</option>
// //         <option value="Approver">Approver</option>
// //         <option value="Staff">Staff</option> */}

// // <option value="">Role</option>
// //               {TaskRoles.length > 0 ? (
// //                 TaskRoles.map((role) => (
// //                   <option key={role.id} value={role.roleName}>
// //                     {role.roleName}
// //                   </option>
// //                 ))
// //               ) : (
// //                 <option value="" disabled>
// //                   Loading roles...
// //                 </option>
// //               )}
// //         {/* Add more roles if needed */}
// //       </select>)}

      
// //     </div>
// //   );
// // };

// // export default ChooseRole;
// import React, { useState, useEffect } from 'react';
// import { LoadRole } from '@/data/services/userroles-service'; // Assuming LoadRoleDetails is a function that fetches role-specific data

// interface ChooseRoleProps {
//   onRoleChange: (roles: string) => void;
// }

// const ChooseRole: React.FC<ChooseRoleProps> = ({ onRoleChange }) => {
//   const [TaskRoles, setTaskRoles] = useState<any[]>([]); // State to store roles
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to manage modal visibility
//   const [selectedRole, setSelectedRole] = useState<string | null>(null); // State to store selected role
//   const [roleDetails, setRoleDetails] = useState<any | null>(null); // State to store role-specific data
//   const [loading, setLoading] = useState<boolean>(false); // State to manage loading state for fetching role details

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     onRoleChange(event.target.value);
//   };

//   // Fetch roles from the backend API
//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const response = await LoadRole(); // API function to load roles
//         const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
//         setTaskRoles(data); // Set the roles in state
//       } catch (error) {
//         console.error('Error fetching roles:', error);
//       }
//     };

//     fetchRoles();
//   }, []); // Empty dependency array to run only once on component mount

// //   // Function to fetch role-specific details
// //   const fetchRoleDetails = async (roleName: string) => {
// //     setLoading(true);
// //     try {
// //       const response = await LoadRoleDetails(roleName); // Assuming LoadRoleDetails fetches data for the selected role
// //       setRoleDetails(response); // Set the role-specific data in state
// //     } catch (error) {
// //       console.error('Error fetching role details:', error);
// //     } finally {
// //       setLoading(false); // Set loading to false when the data is fetched
// //     }
// //   };

//   // Function to open modal for the selected role
//   const openModal = (roleName: string) => {
//     setSelectedRole(roleName);
//     // fetchRoleDetails(roleName); // Fetch data for the selected role
//     setIsModalOpen(true); // Open the modal when a role is selected
//   };

//   // Function to close modal
//   const closeModal = () => {
//     setIsModalOpen(false); // Close the modal
//     setSelectedRole(null); // Clear the selected role
//     setRoleDetails(null); // Clear the role details
//   };

//   return (
//     <div>
//       <label htmlFor="role-filter"></label>
//       <select
//         id="role-filter"
//         onChange={handleChange}
//         className="border h-10 p-2 bg-white rounded-md"
//       >
//         <option value="">Role</option>
//         {TaskRoles.length > 0 ? (
//           TaskRoles.map((role) => (
//             <option key={role.id} value={role.roleName} onClick={() => openModal(role.roleName)}>
//               {role.roleName}
//             </option>
//           ))
//         ) : (
//           <option value="" disabled>
//             Loading roles...
//           </option>
//         )}
//       </select>

//       {/* Modal for role details */}
//       {isModalOpen && selectedRole && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-md w-1/3">
//             <h2 className="text-xl mb-4">Role: {selectedRole}</h2>
//             {loading ? (
//               <p>Loading role details...</p>
//             ) : (
//               roleDetails ? (
//                 <div>
//                   {/* Render role-specific data here */}
//                   <p>{roleDetails.description}</p> {/* Example: Displaying role description */}
//                   {/* Add more role-specific details as needed */}
//                 </div>
//               ) : (
//                 <p>No details available for this role.</p>
//               )
//             )}
//             <button
//               onClick={closeModal}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChooseRole;
