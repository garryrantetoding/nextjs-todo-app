// // // // // // import React, { useState } from 'react';
// // // // // // import { RoleUser } from '../RoleList'; // Adjust the path if necessary
// // // // // // import { Role } from '@/data/services/enum';

// // // // // // interface EditPermissionModalProps {
// // // // // //   isOpen: boolean;
// // // // // //   onClose: () => void;
// // // // // //   editRole: RoleUser | null;
// // // // // //   setEditRole: React.Dispatch<React.SetStateAction<RoleUser | null>>;
// // // // // //   onSavepermission: () => void;
// // // // // //   onCancelpermission: () => void;
// // // // // //   items: any;
// // // // // // }

// // // // // // const EditPermissionModal: React.FC<EditPermissionModalProps> = ({ isOpen, onClose, editRole, setEditRole, onSavepermission, onCancelpermission, items}) => {

// // // // // //      if (!isOpen || !editRole) return null; // Don't render the modal if not open or no person to edit

// // // // // //     const [selectedItems, setSelectedItems] = useState([]);

// // // // // //   const handleCheckboxChange = (item, checked) => {
// // // // // //     if (checked) {
// // // // // //       setSelectedItems((prev) => [...prev, item]);
// // // // // //     } else {
// // // // // //       setSelectedItems((prev) => prev.filter((i) => i !== item));
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = () => {
// // // // // //     onSubmit(selectedItems);
// // // // // //     onClose();
// // // // // //   };

 


// // // // // //   return (


// // // // // // <div className="fixed inset-0 flex justify-center items-center z-20" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
// // // // // //       <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
// // // // // //        <div className="flex justify-between items-center mb-4">
// // // // // //        <h2 className="text-xl mb-4">Edit Permission</h2> 
// // // // // //        <div className="flex items-center">
// // // // // //           <button onClick={onSavepermission} className="bg-blue-500 text-white  rounded-md mr-2 h-8 w-20">
// // // // // //              Save
// // // // // //            </button>
// // // // // //            <button onClick={onCancelpermission} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
// // // // // //              Cancel
// // // // // //            </button>
// // // // // //          </div>
// // // // // //          </div>
// // // // // //         <ul>
// // // // // //           {items.map((item, index) => (
// // // // // //             <li key={index}>
// // // // // //               <label>
// // // // // //                 <input
// // // // // //                   type="checkbox"
// // // // // //                   onChange={(e) => handleCheckboxChange(item, e.target.checked)}
// // // // // //                 />
// // // // // //                 {item}
// // // // // //               </label>
// // // // // //             </li>
// // // // // //           ))}
// // // // // //         </ul>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default EditPermissionModal;

// // // // // import React, { useState } from 'react';
// // // // // import { RoleUser } from '../../RoleList'; // Adjust the path if necessary
// // // // // import { Role } from '@/data/services/enum';
// // // // // import SavePermissionModal from './popup-savepermission';

// // // // // interface EditPermissionModalProps {
// // // // //   isOpen: boolean;
// // // // //   onClose: () => void;
// // // // //   editRole: RoleUser | null;
// // // // //   setEditRole: React.Dispatch<React.SetStateAction<RoleUser | null>>;
// // // // //   onSavepermission: (selectedItems: string[]) => void;
// // // // //   onCancelpermission: () => void;
// // // // //   items: string[];
// // // // // }

// // // // // const EditPermissionModal: React.FC<EditPermissionModalProps> = ({
// // // // //   isOpen,
// // // // //   onClose,
// // // // //   editRole,
// // // // //   setEditRole,
// // // // //   onSavepermission,
// // // // //   onCancelpermission,
// // // // //   items
// // // // // }) => {
// // // // //   if (!isOpen || !editRole) return null;

// // // // //   const [selectedItems, setSelectedItems] = useState<string[]>([]);
// // // // //   const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false); // State for confirmation modal

// // // // //   const handleCheckboxChange = (item: string, checked: boolean) => {
// // // // //     if (checked) {
// // // // //       setSelectedItems((prev) => [...prev, item]);
// // // // //     } else {
// // // // //       setSelectedItems((prev) => prev.filter((i) => i !== item));
// // // // //     }
// // // // //   };

// // // // //   const handleSaveClick = () => {
// // // // //     // Show the confirmation modal when the user clicks "Save"
// // // // //     setIsConfirmationOpen(true);
// // // // //   };

// // // // //   const handleConfirmSave = () => {
// // // // //     // Proceed with saving the selected items when the user confirms
// // // // //     onSavepermission(selectedItems);
// // // // //     setIsConfirmationOpen(false); // Close the confirmation modal
// // // // //     onClose(); // Close the main modal
// // // // //   };

// // // // //   const handleCancelSave = () => {
// // // // //     // Close the confirmation modal without saving
// // // // //     setIsConfirmationOpen(false);
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <div className="fixed inset-0 flex justify-center items-center z-20" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
// // // // //         <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
// // // // //           <div className="flex justify-between items-center mb-4">
// // // // //             <h2 className="text-xl mb-4">Edit Permission</h2>
// // // // //             <div className="flex items-center">
// // // // //               <button onClick={handleSaveClick} className="bg-blue-500 text-white rounded-md mr-2 h-8 w-20">
// // // // //                 Save
// // // // //               </button>
// // // // //               <button onClick={onCancelpermission} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
// // // // //                 Cancel
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //           <ul>
// // // // //             {items.map((item, index) => (
// // // // //               <li key={index}>
// // // // //                 <label>
// // // // //                   <input
// // // // //                     type="checkbox"
// // // // //                     checked={selectedItems.includes(item)}
// // // // //                     onChange={(e) => handleCheckboxChange(item, e.target.checked)}
// // // // //                   />
// // // // //                   {item}
// // // // //                 </label>
// // // // //               </li>
// // // // //             ))}
// // // // //           </ul>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Show the confirmation modal */}
// // // // //       <SavePermissionModal
// // // // //         isOpen={isConfirmationOpen}
// // // // //         onClose={handleCancelSave}
// // // // //         onConfirm={handleConfirmSave}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default EditPermissionModal;


// // // // import React, { useState, useEffect } from 'react';
// // // // import { RoleUser } from '../../RoleList';
// // // // import { Role } from '@/data/services/enum';
// // // // import SavePermissionModal from './popup-savepermission';
// // // // import DiscardPermissionModal from './popup-discardpermission';
// // // // import { RolePermission } from '../../RoleList';

// // // // interface EditPermissionModalProps {
// // // //   isOpen: boolean;
// // // //   onClose: () => void;
// // // //   // editRole: RoleUser | null;
// // // //   // setEditRole: React.Dispatch<React.SetStateAction<RoleUser | null>>;
// // // //   // onSavepermission: (selectedItems: string[]) => void;
// // // //   // onCancelpermission: () => void;
// // // //   // items: string[];
// // // //   selectedPermissions: string[];
// // // //  PermissionEdit: RolePermission | null;
// // // //  setPermissionEdit: React.Dispatch<React.SetStateAction<RolePermission | null>>;


// // // //    onSave: () => void;
// // // //    onCancel: () => void;
// // // // }

// // // // const EditPermissionModal: React.FC<EditPermissionModalProps> = ({
// // // //   isOpen,
// // // //   onClose,
// // // //   // editRole,
// // // //   // setEditRole,
// // // //   // onSavepermission,
// // // //   // onCancelpermission,
// // // //   // items,
// // // //   selectedPermissions,
// // // //   onSave,
// // // //   onCancel
// // // // }) => {
// // // //   if (!isOpen || !selectedPermissions) return null;

// // // //   const [selectedItems, setSelectedItems] = useState<string[]>([]);
// // // //   const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = useState<boolean>(false); // For Save confirmation
// // // //   const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] = useState<boolean>(false); // For Cancel confirmation

// // // //   // const handleCheckboxChange = (item: string, checked: boolean) => {
// // // //   //   if (checked) {
// // // //   //     setSelectedItems((prev) => [...prev, item]);
// // // //   //   } else {
// // // //   //     setSelectedItems((prev) => prev.filter((i) => i !== item));
// // // //   //   }
// // // //   // };
// // // // // Set initial selected items when the modal opens
// // // // useEffect(() => {
// // // //   setSelectedItems(selectedPermissions); // Pre-check the permissions that exist for the role
// // // // }, [isOpen, selectedPermissions]);

// // // // const handleCheckboxChange = (permission: string) => {
// // // //   setSelectedItems((prev) =>
// // // //     prev.includes(permission)
// // // //       ? prev.filter((item) => item !== permission)
// // // //       : [...prev, permission]
// // // //   );
// // // // };
// // // //   // const handleSaveClick = () => {
// // // //   //   // Show the Save confirmation modal when the user clicks "Save"
// // // //   //   setIsSaveConfirmationOpen(true);
// // // //   // };

// // // //   // const handleConfirmSave = () => {
// // // //   //   // Proceed with saving the selected items when the user confirms
// // // //   //   onSavepermission(selectedItems);
// // // //   //   setIsSaveConfirmationOpen(false); // Close the Save confirmation modal
// // // //   //   onClose(); // Close the main modal
// // // //   // };

// // // //   // const handleCancelSave = () => {
// // // //   //   // Close the Save confirmation modal without saving
// // // //   //   setIsSaveConfirmationOpen(false);
// // // //   // };

// // // //   // const handleCancelClick = () => {
// // // //   //   // Show the Cancel confirmation modal when the user clicks "Cancel"
// // // //   //   setIsCancelConfirmationOpen(true);
// // // //   // };

// // // //   // const handleConfirmCancel = () => {
// // // //   //   // Proceed with canceling the changes
// // // //   //   setIsCancelConfirmationOpen(false); // Close the Cancel confirmation modal
// // // //   //   onCancelpermission(); // Call the onCancelpermission callback to handle cancel logic
// // // //   //   onClose(); // Close the main modal
// // // //   // };

// // // //   // const handleCancelCancel = () => {
// // // //   //   // Close the Cancel confirmation modal without discarding changes
// // // //   //   setIsCancelConfirmationOpen(false);
// // // //   // };

// // // //   return (
// // // //     <div>
// // // //       <div className="fixed inset-0 flex justify-center items-center z-20" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
// // // //         <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
// // // //           <div className="flex justify-between items-center mb-4">
// // // //             <h2 className="text-xl mb-4">Edit Permission</h2>
// // // //             <div className="flex items-center">
// // // //               <button onClick={onSave} className="bg-blue-500 text-white rounded-md mr-2 h-8 w-20">
// // // //                 Save
// // // //               </button>
// // // //               <button onClick={handleCancelClick} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
// // // //                 Cancel
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //           {/* <ul>
// // // //             {items.map((item, index) => (
// // // //               <li key={index}>
// // // //                 <label>
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={selectedItems.includes(item)}
// // // //                     onChange={(e) => handleCheckboxChange(item, e.target.checked)}
// // // //                   />
// // // //                   {item}
// // // //                 </label>
// // // //               </li>
// // // //             ))}
// // // //           </ul> */}
// // // //           <div>
// // // //           {items.map((permission) => (
// // // //             <label key={permission}>
// // // //               <input
// // // //                 type="checkbox"
// // // //                 checked={selectedItems.includes(permission)}
// // // //                 onChange={() => handleCheckboxChange(permission)}
// // // //               />
// // // //               {permission}
// // // //             </label>
// // // //           ))}
// // // //         </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Save Confirmation Modal */}
// // // //       {/* <SavePermissionModal
// // // //         isOpen={isSaveConfirmationOpen}
// // // //         onClose={handleCancelSave}
// // // //         onConfirm={handleConfirmSave}
// // // //       /> */}

// // // //       {/* Cancel Confirmation Modal */}
// // // //       {/* <DiscardPermissionModal
// // // //         isOpen={isCancelConfirmationOpen}
// // // //         onClose={handleCancelCancel}
// // // //         onConfirm={handleConfirmCancel}
// // // //       /> */}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default EditPermissionModal;
// // // // EditPermissionModal.tsx
// // // import React from 'react';

// // // interface EditPermissionModalProps {
// // //   isOpen: boolean;
// // //   onSave: () => void;

// // //   onCancel: () => void;
// // //   permissionsList: string[];
// // //   setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
// // //   allPermissions: string[];
// // // }

// // // const EditPermissionModal: React.FC<EditPermissionModalProps> = ({
// // //   isOpen,
// // //   onSave,
// // //   onCancel,
// // //   permissionsList,
// // //   setPermissionsList,
// // //   allPermissions,
// // // }) => {
// // //   if (!isOpen) return null; // Return null if modal is not open



  
// // //   return (
// // //     <div className="fixed inset-0 flex justify-center items-center z-20" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
// // //       <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
// // //       <div className="flex justify-between items-center mb-4">
// // //       <h2 className="text-xl mb-4">Edit User</h2> 
// // //       <div className="flex items-center">
// // //           <button onClick={onSave} className="bg-blue-500 text-white  rounded-md mr-2 h-8 w-20">
// // //             Save
// // //           </button>
// // //           <button onClick={onCancel} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
// // //             Cancel
// // //           </button>
// // //         </div>
// // //         </div>

// // //         <div>
// // //           {allPermissions.map((permission) => (
// // //             <div key={permission}>
// // //               <input
// // //                 type="checkbox"
// // //                 checked={permissionsList.includes(permission)}
// // //                 onChange={() => {
// // //                   setPermissionsList((prevPermissions) => {
// // //                     if (prevPermissions.includes(permission)) {
// // //                       return prevPermissions.filter((p) => p !== permission);
// // //                     } else {
// // //                       return [...prevPermissions, permission];
// // //                     }
// // //                   });
// // //                 }}
// // //               />
// // //               {permission}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default EditPermissionModal;


// // // // const PermissionModal = ({
// // // //     isOpenPermission,
// // // //     onClose,
// // // //     selectedPermission,
// // // //     isEditingPermission,
// // // //     onEditPermission,
// // // //     onSave,
// // // //     onCancel,
// // // //     setIsPermissionModalOpen,
// // // //     permissionsList,
// // // //     setPermissionsList,
// // // //     allPermissions,
// // // //   }) => {
  
// // // //     const handleCheckboxChange = (permission: string) => {
// // // //       setPermissionsList(prevPermissions => {
// // // //         if (prevPermissions.includes(permission)) {
// // // //           // Remove the permission if already selected (uncheck it)
// // // //           return prevPermissions.filter(p => p !== permission);
// // // //         } else {
// // // //           // Add the permission if it's not selected (check it)
// // // //           return [...prevPermissions, permission];
// // // //         }
// // // //       });
// // // //     };
  
// // // //     return (
// // // //         <div>
// // // //             {isOpenPermission && (
// // // //                 <div className="flex justify-between items-center mb-4">
// // // //                     <h2>Edit Permissions for {selectedPermission?.roleName}</h2>
// // // //                     <div className="flex items-center">
// // // //                         <button onClick={onSave} className="bg-blue-500 text-white  rounded-md mr-2 h-8 w-20">
// // // //                             Save
// // // //                         </button>
// // // //                         <button onClick={onCancel} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
// // // //                             Cancel
// // // //                         </button>
// // // //                     </div>
// // // //                     <div className="permissions-list">
// // // //                         {allPermissions.map(permission => (
// // // //                             <label key={permission}>
// // // //                                 <input
// // // //                                     type="checkbox"
// // // //                                     checked={permissionsList.includes(permission)}  // Check if the permission is in the list
// // // //                                     onChange={() => handleCheckboxChange(permission)}  // Toggle the permission
// // // //                                 />
// // // //                                 {permission}
// // // //                             </label>
// // // //                         ))}
// // // //                     </div>

// // // //                 </div>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // };



// // import React from 'react';

// // interface EditPermissionModalProps {
// //   isOpen: boolean;
// //   onSave: () => void;

// //   onCancel: () => void;
// //   permissionsList: string[];
// //   setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
// //   allPermissions: string[];
// // }

// // const EditPermissionModal: React.FC<EditPermissionModalProps> = ({
// //   isOpen,
// //   onSave,
// //   onCancel,
// //   permissionsList,
// //   setPermissionsList,
// //   allPermissions,
// // }) => {
// //   if (!isOpen) return null; // Return null if modal is not open

// //   const handleCheckboxChange = (permission: string) => {
// //     setPermissionsList(prevPermissions => {
// //       if (prevPermissions.includes(permission)) {
// //         // Remove the permission if already selected (uncheck it)
// //         return prevPermissions.filter(p => p !== permission);
// //       } else {
// //         // Add the permission if it's not selected (check it)
// //         return [...prevPermissions, permission];
// //       }
// //     });
// //   };

  
// //   return (
// //     <div className="fixed inset-0 flex justify-center items-center z-20" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
// //       <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
// //       <div>
// //             {isOpenPermission && (
// //                 <div className="flex justify-between items-center mb-4">
// //                     <h2>Edit Permissions for {selectedPermission?.roleName}</h2>
// //                     <div className="flex items-center">
// //                         <button onClick={onSave} className="bg-blue-500 text-white  rounded-md mr-2 h-8 w-20">
// //                             Save
// //                         </button>
// //                         <button onClick={onCancel} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
// //                             Cancel
// //                         </button>
// //                     </div>
// //                     <div className="permissions-list">
// //                         {allPermissions.map(permission => (
// //                             <label key={permission}>
// //                                 <input
// //                                     type="checkbox"
// //                                     checked={permissionsList.includes(permission)}  // Check if the permission is in the list
// //                                     onChange={() => handleCheckboxChange(permission)}  // Toggle the permission
// //                                 />
// //                                 {permission}
// //                             </label>
// //                         ))}
// //                     </div>

// //                 </div>
// //             )}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default EditPermissionModal;


// import React, { useState } from 'react';
// import { RoleUser } from '../../RoleList'; // Adjust the path if necessary
// import { Role } from '@/data/services/enum';

// interface EditPermissionModalProps {
//     isOpen: boolean;
//       onSave: () => void;
    
//       onCancel: () => void;
//       permissionsList: string[];
//       setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
//       allPermissions: string[];
// }



// const EditPermissionModal: React.FC<EditPermissionModalProps> = ({ isOpen, permissionsList, setPermissionsList, allPermissions, onSave, onCancel }) => {

//     if (!isOpen || !permissionsList) return null; // Don't render the modal if not open or no person to edit

//     const handleCheckboxChange = (permission: string) => {
//             setPermissionsList(prevPermissions => {
//               if (prevPermissions.includes(permission)) {
//                 // Remove the permission if already selected (uncheck it)
//                 return prevPermissions.filter(p => p !== permission);
//               } else {
//                 // Add the permission if it's not selected (check it)
//                 return [...prevPermissions, permission];
//               }
//             });
//           };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center z-20" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
//       <div className="flex justify-between items-center mb-4">
//       <h2 className="text-xl mb-4">Edit User</h2> 
//       <div className="flex items-center">
//           <button onClick={onSave} className="bg-blue-500 text-white  rounded-md mr-2 h-8 w-20">
//             Save
//           </button>
//           <button onClick={onCancel} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
//             Cancel
//           </button>
//         </div>
//         </div>
       
//         <div className="permissions-list">
//                        {allPermissions.map(permission => (
//                            <div key={permission}>
//                                <input
//                                    type="checkbox"
//                                  checked={permissionsList.includes(permission)}  // Check if the permission is in the list
//                                    onChange={() => handleCheckboxChange(permission)}  // Toggle the permission
//                               />
//                             {permission}
//                            </div>
//                      ))}
//               </div>

//       </div>
      
//     </div>
//   );
// };

// export default EditPermissionModal;





