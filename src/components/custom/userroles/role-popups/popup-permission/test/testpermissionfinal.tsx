// import React, { useState, useEffect } from 'react';
// import {  RoleUser } from '../../RoleList';
// import { LoadPermission } from '@/data/services/userroles-service';
// import DescriptionEditButton from '../../role-buttons/descriptionedit-button';

// interface PermissionModalProps {
//   isOpenPermission: boolean;
//   onClose: () => void;
//   selectedPermission: RoleUser | null;
//   isEditingPermission: boolean;
//   onEditPermission: () => void;
//   permissionsList: string[];
//   setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
//   // onSave: () => void;
//   // onCancel: () => void;
//   setIsPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   allPermissions: string[];

// }


// const PermissionModal: React.FC<PermissionModalProps> = ({
//   isOpenPermission,
//   onClose,
//   selectedPermission,
//   isEditingPermission,
//   onEditPermission,
//   permissionsList,
//   setPermissionsList,
//   // onSave,
//   // onCancel,
//   setIsPermissionModalOpen,
//   allPermissions,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [availablePermissions, setAvailablePermissions] = useState<string[]>([]);
   

//   useEffect(() => {
//     console.log("isOpenPermission:", isOpenPermission);
//     console.log("selectedPermission:", selectedPermission);  // This should log the object
  
//     if (isOpenPermission && selectedPermission && !isEditingPermission) {
//       console.log("Fetching permissions...");
//       const fetchPermissionsData = async () => {
//         setLoading(true); // Move setLoading(true) here to avoid unnecessary re-renders
//         try {
//           console.log("Before API call");
//           const fetchedPermissions = await LoadPermission(selectedPermission.id);
//           console.log("Fetched permissions:", fetchedPermissions);
//           setAvailablePermissions(fetchedPermissions);
//           console.log("Available permissions:", availablePermissions);

//         } catch (error) {
//           console.error('Error fetching permissions:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchPermissionsData(); // Ensure this is being called
//     }
//   }, [selectedPermission, isOpenPermission, isEditingPermission]);
  

//   if (!isOpenPermission) {
//     return null; // If modal is not open, don't render anything
//   }

  

//   return (

//  <div
//       className="fixed inset-0 flex justify-center items-center z-60"
//       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg w-1/2"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header and buttons container */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl">Role Permissions</h2>
          
//           <div className="flex items-center">
//             {/* Show Edit button only after the details are loaded */}
//             {availablePermissions && !loading && (
//               <DescriptionEditButton onClick={onEditPermission} />
//             )}
//             <button
//               onClick={onClose}
//               className="text-gray-500 p-2 rounded ml-2"
//             >
//               X
//             </button>
//           </div>
//         </div>

//         {/* Display loading state while fetching data */}
//         {loading && <p>Loading...</p>}

//         {/* Display the user details */}
//         {availablePermissions && !loading && (
//           <>
//             <div className="modal-overlay">
//               <div className="modal-content">
               
//                   <div>
//                     {allPermissions.map((permission) => (
//                       <div key={permission}>
//                         <input
//                           type="checkbox"
//                           disabled
//                           // Check if the permission is in the available permissions list or selected permissions list
//                           checked={permissionsList.includes(permission) || availablePermissions.includes(permission)}
//                           onChange={() => {
//                             setPermissionsList((prevPermissions) => {
//                               if (prevPermissions.includes(permission)) {
//                                 return prevPermissions.filter((p) => p !== permission);
//                               } else {
//                                 return [...prevPermissions, permission];
//                               }
//                             });
//                           }}
//                         />
//                         {permission}
//                       </div>
//                     ))}
//                   </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PermissionModal;
