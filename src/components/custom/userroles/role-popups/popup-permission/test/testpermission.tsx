// // // // // export default Modal;
// // // // import React, { useEffect, useState } from 'react';
// // // // import { RoleUser } from '../../RoleList'; // Adjust the path if necessary
// // // // import { UserDetail } from '@/data/services/usermanagement-service'; // Assuming this is where the UserDetail function is located
// // // // import DescriptionEditButton from '../../role-buttons/descriptionedit-button';







// // // //   interface EditDescriptionModalProps {
// // // //     isOpen: boolean;
// // // //     onClose: () => void;
// // // //     editRole: RoleUser | null;
// // // //     setEditRole: React.Dispatch<React.SetStateAction<RoleUser | null>>;
// // // //     onSave: () => void;
// // // //     onCancel: () => void;
// // // //   }
  

// // // //  isOpen: boolean;
// // // //   onClose: () => void;
// // // //   editRole: RoleUser | null;
// // // //   setEditRole: React.Dispatch<React.SetStateAction<RoleUser | null>>;
// // // //   onSavepermission: (selectedItems: string[]) => void;
// // // //   onCancelpermission: () => void;
// // // //   items: string[];
// // // //   selectedPermissions: string[];

  
// // //   interface PermissionModalProps {


// // //     isOpen: boolean;
// // //     onClose: () => void;
// // //     selectedRole: RoleUser | null;
// // //     isEditingPermission: boolean;
// // //     onEditPermission: () => void;
// // //     editRole?: RoleUser | null;  // Optional property
// // //     setEditRole?: React.Dispatch<React.SetStateAction<RoleUser | null>>;  // Optional property
// // //     setIsPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

// // //   }



// // // const PermissionModal: React.FC<PermissionModalProps> = ({
// // // //   isOpen,
// // // //   onClose,
// // // //   selectedRole,
// // // //   isEditing,
// // // //   onEdit,
// // // //   editRole,
// // // //   setEditRole,
// // // //   onSave,
// // // //   onCancel
// // // // }) => {
// // // //   const [roleDetails, setPersonDetails] = useState<RoleUser | null>(null);
// // // //   const [loading, setLoading] = useState<boolean>(false);  // To handle loading state for fetching details

// // // //   // Fetch user details when the modal opens
// // // //   useEffect(() => {
// // // //     const fetchUserDetails = async () => {
// // // //       if (isOpen && selectedRole && !isEditing) {
// // // //         setLoading(true);  // Set loading state to true
// // // //         try {
// // // //           const response = await UserDetail(selectedRole.id);  // Make sure selectedPerson has a valid email
// // // //           // console.log("test", response);
// // // //           setPersonDetails({
// // // //             id: selectedRole.id,  // Assume selectedPerson already has `id`
// // // //             roleName: response.roleName,
// // // //             description: response.description,
// // // //             boxColor: response.boxColor,
// // // //             roleColor: response.roleColor
// // // //           });
// // // //         } catch (error) {
// // // //           console.error("Error fetching user details:", error);
// // // //         } finally {
// // // //           setLoading(false);  // Set loading state to false once data is fetched
// // // //         }
// // // //       }
// // // //     };

// // // //     fetchUserDetails();
// // // //   }, [isOpen, selectedRole, isEditing]); // Re-run when modal opens or when selectedPerson changes

// // // //   // Update editPerson state when user starts editing
// // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof RoleUser) => {
// // // //     if (editRole && setEditRole) {
// // // //       setEditRole({
// // // //         ...editRole,
// // // //         [field]: e.target.value,
// // // //       });
// // // //     }
// // // //   };

// // // //   if (!isOpen) return null;

// // // //   return (
// // // //     <div
// // // //   className="fixed inset-0 flex justify-center items-center z-10"
// // // //   style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// // // //   onClick={onClose}
// // // // >
// // // //   <div
// // // //     className="bg-white p-6 rounded-lg shadow-lg w-1/2"
// // // //     onClick={(e) => e.stopPropagation()}
// // // //   >
// // // //     {/* Header and buttons container */}
// // // //     <div className="flex justify-between items-center mb-4">
// // // //       <h2 className="text-xl">Role description</h2>

// // // //       {/* Buttons container (Edit and Close buttons) */}
// // // //       <div className="flex items-center">
// // // //         {/* Show Edit button only after the details are loaded */}
// // // //         {roleDetails && !loading && (
// // // //           <DescriptionEditButton onClick={onEdit} />
// // // //         )}

// // // //         {/* Close button on the right */}
// // // //         <button
// // // //           onClick={onClose}
// // // //           className="text-gray-500 p-2 rounded ml-2"  
// // // //         >
// // // //           X
// // // //         </button>
// // // //       </div>
// // // //     </div>

// // // //     {/* Display loading state while fetching data */}
// // // //     {loading && <p>Loading...</p>}

// // // //     {/* Display the user details */}
// // // //     {roleDetails && !loading && (
// // // //       <>
// // // //         <div className="mb-4 flex justify-between">
// // // //           <div className="w-1/2">
// // // //             <div className="mb-2">
// // // //               <strong>Role:</strong>
// // // //             </div>
// // // //             <div className="overflow-x-auto">
// // // //               <p className="whitespace-nowrap">{roleDetails.roleName}</p>
// // // //             </div>
// // // //           </div>
      
// // // //         </div>

// // // //         {/* Role Section */}
// // // //         <div className="mb-4">
// // // //           <div className="mb-2">
// // // //             <strong>Description:</strong>
// // // //           </div>
// // // //           <p>{roleDetails.description}</p>
// // // //         </div>

// // // //       </>
// // // //     )}

// // // //   </div>
// // // // </div>

// // // //   );
// // // // };

// // // // export default DescriptionModal;


// // // // import { useState } from "react";

// // // // const Popup = ({ data, onClose, onEdit }) => {
// // // //   const [checkedItems, setCheckedItems] = useState(data.map(() => false));

// // // //   const handleCheckboxChange = (index) => {
// // // //     const newCheckedItems = [...checkedItems];
// // // //     newCheckedItems[index] = !newCheckedItems[index];
// // // //     setCheckedItems(newCheckedItems);
// // // //   };

// // //   return (
// // // //     <div className="popup">
// // // //       <div className="popup-content">
// // // //         <h2>Checklist</h2>
// // // //         <ul>
// // // //           {data.map((item, index) => (
// // // //             <li key={index}>
// // // //               <input
// // // //                 type="checkbox"
// // // //                 checked={checkedItems[index]}
// // // //                 onChange={() => handleCheckboxChange(index)}
// // // //               />
// // // //               {item}
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //         <div className="buttons">
// // // //           <button onClick={onEdit}>Edit</button>
// // // //           <button onClick={onClose}>Close</button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // //   );
// // // };

// // // // export default Popup;

// // // export default PermissionModal;

// // // PermissionModal.tsx
// // import React from 'react';
// // import { RolePermission } from '../../RoleList';

// // interface PermissionModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   selectedPermission: RolePermission | null;
// //   isEditingPermission: boolean;
// //   onEditPermission: () => void;
// //   onSave: () => void;
// //   onCancel: () => void;
// //   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// //   permissions: string[];  // Receive the permissions array here
// //   setPermissions: React.Dispatch<React.SetStateAction<string[]>>;  // Function to update permissions
// // }

// // const PermissionModal: React.FC<PermissionModalProps> = ({
// //   isOpen,
// //   onClose,
// //   selectedPermission,
// //   isEditingPermission,
// //   onEditPermission,
// //   onSave,
// //   onCancel,
// //   setIsModalOpen,
// //   permissions,
// //   setPermissions,
// // }) => {

// //   const handleCheckboxChange = (permission: string) => {
// //     setPermissions((prevPermissions) => {
// //       if (prevPermissions.includes(permission)) {
// //         // Remove permission if already in array (uncheck)
// //         return prevPermissions.filter((perm) => perm !== permission);
// //       } else {
// //         // Add permission if not in array (check)
// //         return [...prevPermissions, permission];
// //       }
// //     });
// //   };

// //   if (!selectedPermission) return null;

// //   return (
// //     <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
// //       <div className="modal-content">
// //         <h3>Edit Permissions for {selectedPermission.roleName}</h3>
        
// //         <div className="permission-list">
// //           {allPermissions.map((permission) => (
// //             <div key={permission}>
// //               <input
// //                 type="checkbox"
// //                 checked={permissions.includes(permission)}
// //                 onChange={() => handleCheckboxChange(permission)}
// //               />
// //               <label>{permission}</label>
// //             </div>
// //           ))}
// //         </div>
        
// //         <button onClick={onSave}>Save</button>
// //         <button onClick={onCancel}>Cancel</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PermissionModal;

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
//   onSave: () => void;
//   onCancel: () => void;
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
//   onSave,
//   onCancel,
//   setIsPermissionModalOpen,
//   allPermissions,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [availablePermissions, setAvailablePermissions] = useState<string[]>([]);
//     // const [allPermissions] = useState<string[]>([
//     //   "CREATE_USER",
//     //   "GETALL_USER",
//     //   "GET_USER",
//     //   "UPDATE_USERSTATUS",
//     //   "UPDATE_USERSDATA",
//     //   "DELETE_USER",
//     //   "ADD_ROLES",
//     //   "DELETE_ROLES",
//     //   "GET_ALLROLES",
//     //   "GET_ALLPERMISSIONS",
//     //   "GET_PERMISSIONS",
//     //   "UPDATE_PERMISSIONS",
//     //   "GET_ROLES",
//     //   "UPDATE_ROLESCOLOR",
//     // ]);

//   // // Fetch permissions data when the modal opens
//   // useEffect(() => {
//   //   // console.log("selectedPermission inside useEffect:", selectedPermission); // Debugging selectedPermission
//   //   console.log("isOpenPermission:", isOpenPermission);  // Debugging isOpenPermission
//   //   console.log("isEditingPermission:", isEditingPermission);  // Debugging isOpenPermission
//   //   console.log("permissionsList:", permissionsList);  // Debugging isOpenPermission

//   //   const fetchPermissionsData = async () => {
//   //       console.log("qwaszx 2", permissionsList)
//   //   if (isOpenPermission && selectedPermission && !isEditingPermission) {
//   //     setLoading(true);
//   //     // Simulate fetching permissions from the backend
//   //     console.log("selectedPermission inside useEffect:", selectedPermission);  // Debugging selectedPermission
//   //       try {
//   //         // Replace this with the real API call to fetch permissions for the selected role
//   //         const fetchedPermissions = await LoadPermission(selectedPermission.id);
//   //         setAvailablePermissions(fetchedPermissions);
//   //       } catch (error) {
//   //         console.error('Error fetching permissions:', error);
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     };

//   //     fetchPermissionsData();
//   //   }
//   // }, [selectedPermission, isOpenPermission, isEditingPermission]);

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

// //     <div
// //     className="fixed inset-0 flex justify-center items-center z-10"
// //     style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// //     onClick={onClose}
// //   >
// //     <div
// //       className="bg-white p-6 rounded-lg shadow-lg w-1/2"
// //       onClick={(e) => e.stopPropagation()}
// //     >
// //       {/* Header and buttons container */}
// //       <div className="flex justify-between items-center mb-4">
// //         <h2 className="text-xl">Role Permission</h2>
  
// //         {/* Buttons container (Edit and Close buttons) */}
// //         <div className="flex items-center">
// //           {/* Show Edit button only after the details are loaded */}
// //           {availablePermissions && !loading && (
// //             <DescriptionEditButton onClick={onEditPermission} />
// //           )}
  
// //           {/* Close button on the right */}
// //           <button
// //             onClick={onClose}
// //             className="text-gray-500 p-2 rounded ml-2"  
// //           >
// //             X
// //           </button>
// //         </div>
// //       </div>
  
// //       {/* Display loading state while fetching data */}
// //       {loading && <p>Loading...</p>}
  
// //       {/* Display the user details */}
// //       {availablePermissions && !loading && (
// //         <>

// //     <div className="modal-overlay">
// //       <div className="modal-content">
// //         <div>
// //           <h3>Available Permissions</h3>
// //           <div>
// //             {availablePermissions.map((permission) => (
// //               <label key={permission}>
// //                 <input
// //                   type="checkbox"
// //                   checked={permissionsList.includes(permission)}
// //                   onChange={() => {
// //                     setPermissionsList((prevPermissions) => {
// //                       if (prevPermissions.includes(permission)) {
// //                         return prevPermissions.filter(p => p !== permission);
// //                       } else {
// //                         return [...prevPermissions, permission];
// //                       }
// //                     });
// //                   }}
// //                 />
// //                 {permission}
// //               </label>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="modal-actions">
// //           <button onClick={onCancel}>Cancel</button>
// //           <button onClick={onSave}>Save</button>
// //         </div>
// //       </div>
// //     </div>
// //     </>
// //     )}

// //   </div>
// // </div>

// //   );
// // };

//  <div
//       className="fixed inset-0 flex justify-center items-center z-10"
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
             

//                 {/* <div className="modal-actions">
//                   <button onClick={onCancel}>Cancel</button>
//                   <button onClick={onSave}>Save</button>
//                 </div> */}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PermissionModal;
