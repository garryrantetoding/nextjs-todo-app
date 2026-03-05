// // // import React, { useState } from 'react';
// // // import { RoleUser } from '../../RoleList'; // Adjust the path if necessary
// // // import { Role } from '@/data/services/enum';

// // // interface EditPermissionModalProps {
// // //     isOpen: boolean;
// // //       onSave: () => void;
// // //       onCancel: () => void;
// // //       permissionsList: RoleUser ;
// // //       setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
// // //       allPermissions: string[];
// // // }



// // // const EditPermissionModal: React.FC<EditPermissionModalProps> = ({ isOpen, permissionsList, setPermissionsList, allPermissions, onSave, onCancel }) => {
// // //   const [availablePermissions, setAvailablePermissions] = useState<string[]>([]);
// // // //   setAvailablePermissions(permissionsList);

// // //     if (!isOpen || !permissionsList) return null; // Don't render the modal if not open or no person to edit

// // //     const handleCheckboxChange = (permission: string) => {
// // //             setPermissionsList(prevPermissions => {
// // //               if (prevPermissions.includes(permission)) {
// // //                 // Remove the permission if already selected (uncheck it)
// // //                 return prevPermissions.filter(p => p !== permission);
// // //               } else {
// // //                 // Add the permission if it's not selected (check it)
// // //                 return [...prevPermissions, permission];
// // //               }
// // //             });
// // //           };

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
// // //                     {allPermissions.map((permission) => (
// // //                       <div key={permission}>
// // //                         <input
// // //                           type="checkbox"
// // //                           disabled
// // //                           // Check if the permission is in the available permissions list or selected permissions list
// // //                           checked={allPermissions.includes(permission) || permissionsList.includes(permission)}
// // //                           onChange={() => {
// // //                             setPermissionsList((prevPermissions) => {
// // //                               if (prevPermissions.includes(permission)) {
// // //                                 return prevPermissions.filter((p) => p !== permission);
// // //                               } else {
// // //                                 return [...prevPermissions, permission];
// // //                               }
// // //                             });
// // //                           }}
// // //                         />
// // //                         {permission}
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //       </div>
      
// // //     </div>
// // //   );
// // // };

// // // export default EditPermissionModal;





// // // // import React, { useState, useEffect } from 'react';
// // // // import {  RoleUser } from '../../RoleList';
// // // // import { LoadPermission } from '@/data/services/userroles-service';
// // // // import DescriptionEditButton from '../../role-buttons/descriptionedit-button';

// // // // interface EditPermissionModalProps {
// // // //   isOpenPermission: boolean;
// // // //   onClose: () => void;
// // // //   selectedPermission: RoleUser | null;
// // // //   isEditingPermission: boolean;
// // // //   onEditPermission: () => void;
// // // //   permissionsList: string[];
// // // //   setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
// // // //   onSave: () => void;
// // // //   onCancel: () => void;
// // // //   setIsPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// // // //   allPermissions: string[];

// // // // }


// // // // const EditPermissionModal: React.FC<EditPermissionModalProps> = ({
// // // //   isOpenPermission,
// // // //   onClose,
// // // //   selectedPermission,
// // // //   isEditingPermission,
// // // //   onEditPermission,
// // // //   permissionsList,
// // // //   setPermissionsList,
// // // //   onSave,
// // // //   onCancel,
// // // //   setIsPermissionModalOpen,
// // // //   allPermissions,
// // // // }) => {
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [availablePermissions, setAvailablePermissions] = useState<string[]>([]);
   

// // // //   useEffect(() => {
// // // //     console.log("isOpenPermission:", isOpenPermission);
// // // //     console.log("selectedPermission:", selectedPermission);  // This should log the object
  
// // // //     if (isOpenPermission && selectedPermission && !isEditingPermission) {
// // // //       console.log("Fetching permissions...");
// // // //       const fetchPermissionsData = async () => {
// // // //         setLoading(true); // Move setLoading(true) here to avoid unnecessary re-renders
// // // //         try {
// // // //           console.log("Before API call");
// // // //           const fetchedPermissions = await LoadPermission(selectedPermission.id);
// // // //           console.log("Fetched permissions:", fetchedPermissions);
// // // //           setAvailablePermissions(fetchedPermissions);
// // // //           console.log("Available permissions:", availablePermissions);

// // // //         } catch (error) {
// // // //           console.error('Error fetching permissions:', error);
// // // //         } finally {
// // // //           setLoading(false);
// // // //         }
// // // //       };
  
// // // //       fetchPermissionsData(); // Ensure this is being called
// // // //     }
// // // //   }, [selectedPermission, isOpenPermission, isEditingPermission]);
  

// // // //   if (!isOpenPermission) {
// // // //     return null; // If modal is not open, don't render anything
// // // //   }

// // // //   const handleCheckboxChange = (permission: string) => {
// // // //                 setPermissionsList(prevPermissions => {
// // // //                   if (prevPermissions.includes(permission)) {
// // // //                     // Remove the permission if already selected (uncheck it)
// // // //                     return prevPermissions.filter(p => p !== permission);
// // // //                   } else {
// // // //                     // Add the permission if it's not selected (check it)
// // // //                     return [...prevPermissions, permission];
// // // //                   }
// // // //                 });
// // // //               };
    

// // // //   return (

// // // //  <div
// // // //       className="fixed inset-0 flex justify-center items-center z-10"
// // // //       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// // // //       onClick={onClose}
// // // //     >
// // // //       <div
// // // //         className="bg-white p-6 rounded-lg shadow-lg w-1/2"
// // // //         onClick={(e) => e.stopPropagation()}
// // // //       >
// // // //         {/* Header and buttons container */}
// // // //         <div className="flex justify-between items-center mb-4">
// // // //           <h2 className="text-xl">Role Permissions</h2>
          
// // // //           <div className="flex items-center">
// // // //             {/* Show Edit button only after the details are loaded */}
// // // //             {availablePermissions && !loading && (
// // // //               <DescriptionEditButton onClick={onEditPermission} />
// // // //             )}
// // // //             <button
// // // //               onClick={onClose}
// // // //               className="text-gray-500 p-2 rounded ml-2"
// // // //             >
// // // //               X
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Display loading state while fetching data */}
// // // //         {loading && <p>Loading...</p>}

// // // //         {/* Display the user details */}
// // // //         {availablePermissions && !loading && (
// // // //           <>
// // // //             <div className="modal-overlay">
// // // //               <div className="modal-content">
               
// // // //                   <div>
// // // //                     {allPermissions.map((permission) => (
// // // //                       <div key={permission}>
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           disabled
// // // //                           // Check if the permission is in the available permissions list or selected permissions list
// // // //                           checked={permissionsList.includes(permission) || availablePermissions.includes(permission)}
// // // //                           onChange={() => {
// // // //                             setPermissionsList((prevPermissions) => {
// // // //                               if (prevPermissions.includes(permission)) {
// // // //                                 return prevPermissions.filter((p) => p !== permission);
// // // //                               } else {
// // // //                                 return [...prevPermissions, permission];
// // // //                               }
// // // //                             });
// // // //                           }}
// // // //                         />
// // // //                         {permission}
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //               </div>
// // // //             </div>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default EditPermissionModal;
// // import React, { useState } from 'react';
// // import { RoleUser } from '../../RoleList'; // Adjust the path if necessary
// // import { Role } from '@/data/services/enum';

// // interface EditPermissionModalProps {
// //     isOpen: boolean;
// //       onSave: () => void;
// //       onCancel: () => void;
// //       permissionsList: string[];
// //       setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
// //       allPermissions: string[];
// // }



// // const EditPermissionModal: React.FC<EditPermissionModalProps> = ({ isOpen, permissionsList, setPermissionsList, allPermissions, onSave, onCancel }) => {
// // console.log("permissionsList", permissionsList)
// //     if (!isOpen || !permissionsList) return null; // Don't render the modal if not open or no person to edit

// //     const handleCheckboxChange = (permission: string) => {
// //             setPermissionsList(prevPermissions => {
// //               if (prevPermissions.includes(permission)) {
// //                 // Remove the permission if already selected (uncheck it)
// //                 return prevPermissions.filter(p => p !== permission);
// //               } else {
// //                 // Add the permission if it's not selected (check it)
// //                 return [...prevPermissions, permission];
// //               }
// //             });
// //           };

// //   return (
// //     <div className="fixed inset-0 flex justify-center items-center z-20" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
// //       <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
//     //   <div className="flex justify-between items-center mb-4">
//     //   <h2 className="text-xl mb-4">Edit User</h2> 
//     //   <div className="flex items-center">
//     //       <button onClick={onSave} className="bg-blue-500 text-white  rounded-md mr-2 h-8 w-20">
//     //         Save
//     //       </button>
//     //       <button onClick={onCancel} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
//     //         Cancel
//     //       </button>
//     //     </div>
//     //     </div>
       
// //         <div>
// //                     {allPermissions.map((permission) => (
// //                       <div key={permission}>
// //                         <input
// //                           type="checkbox"
// //                           disabled
// //                           // Check if the permission is in the available permissions list or selected permissions list
// //                           checked={allPermissions.includes(permission) || permissionsList.includes(permission)}
// //                           onChange={() => {
// //                             setPermissionsList((prevPermissions) => {
// //                               if (prevPermissions.includes(permission)) {
// //                                 return prevPermissions.filter((p) => p !== permission);
// //                               } else {
// //                                 return [...prevPermissions, permission];
// //                               }
// //                             });
// //                           }}
// //                         />
// //                         {permission}
// //                       </div>
// //                     ))}
// //                   </div>
// //       </div>
      
// //     </div>
// //   );
// // };

// // export default EditPermissionModal;

// import React, { useState, useEffect } from 'react';
// import {  RoleUser } from '../../RoleList';
// import { LoadPermission } from '@/data/services/userroles-service';

// interface PermissionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedPermission: RoleUser | null;
// //   isEditingPermission: boolean;
// //   onEditPermission: () => void;
//   permissionsList: string[];
//   setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
//   onSave: () => void;
//   onCancel: () => void;
//   setIsEditPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   allPermissions: string[];

// }


// const EditPermissionModal: React.FC<PermissionModalProps> = ({
//   isOpen,
//   onClose,
//   selectedPermission,
// //   isEditingPermission,
// //   onEditPermission,
//   permissionsList,
//   setPermissionsList,
//   onSave,
//   onCancel,
//   setIsEditPermissionModalOpen,
//   allPermissions,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [availablePermissions, setAvailablePermissions] = useState<string[]>([]);
   

//   useEffect(() => {
//     console.log("isOpenPermission:", isOpen);
//     console.log("selectedPermission:", selectedPermission);  // This should log the object
  
//     if (isOpen && selectedPermission ) {
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
//   }, [selectedPermission, isOpen]);
  

//   if (!isOpen) {
//     return null; // If modal is not open, don't render anything
//   }

  
// // Permissions list checkbox handling
// const handleCheckboxChange = (permission: string) => {
//     setPermissionsList((prevPermissions) => {
//       const updatedPermissions = prevPermissions.includes(permission)
//         ? prevPermissions.filter((p) => p !== permission)
//         : [...prevPermissions, permission];
//       return updatedPermissions;
//     });
//   };

//   return (

//  <div
//       className="fixed inset-0 flex justify-center items-center z-10"
//       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg w-1/2"
//         onClick={(e) => e.stopPropagation()}
//       >

//            {/* Header and buttons container */}
//            <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl">Edit Permissions</h2>
          
//           <div className="flex items-center">
//             {/* Show Edit button only after the details are loaded */}
//             {availablePermissions && !loading && (
//                 <button onClick={onSave} className="bg-blue-500 text-white  rounded-md mr-2 h-8 w-20">
//             Save
//           </button>            )}
//           <button onClick={onCancel} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
//             Cancel
//           </button>
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

// export default EditPermissionModal;

import React, { useState, useEffect } from 'react';
import { RoleUser } from '../../RoleList';
import { LoadPermission } from '@/data/services/userroles-service';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPermission: RoleUser | null;
  permissionsList: string[];
  setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
  onSave: (updatedPermissions: string[]) => void;
  onCancel: () => void;
  setIsEditPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allPermissions: string[];
}

const EditPermissionModal: React.FC<PermissionModalProps> = ({
  isOpen,
  onClose,
  selectedPermission,
  permissionsList,
  setPermissionsList,
  onSave,
  onCancel,
  setIsEditPermissionModalOpen,
  allPermissions,
}) => {
  const [loading, setLoading] = useState(false);
  const [availablePermissions, setAvailablePermissions] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && selectedPermission) {
      setLoading(true);
      const fetchPermissionsData = async () => {
        try {
          const fetchedPermissions = await LoadPermission(selectedPermission.id);
          setAvailablePermissions(fetchedPermissions);
        } catch (error) {
          console.error('Error fetching permissions:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPermissionsData();
    }
  }, [selectedPermission, isOpen]);

  if (!isOpen) return null;

  const handleCheckboxChange = (permission: string) => {
    setPermissionsList((prevPermissions) => {
      const updatedPermissions = prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission];
      return updatedPermissions;
    });
  };
  const handleSaveClick = () => {
    // Combine availablePermissions with permissionsList to ensure all are saved
    const combinedPermissions = [...new Set([...permissionsList, ...availablePermissions])];
    // Call onSave to pass the combined permissions up to the parent component (rolelist.tsx)
    onSave(combinedPermissions); // Trigger confirmation popup in parent
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-65"
      style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
       onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Edit Permissions</h2>
          <div className="flex items-center">
            {availablePermissions && !loading && (
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white rounded-md mr-2 h-8 w-20"
              >
                Save
              </button>
            )}
            <button
              onClick={onCancel}
              className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>

        {loading && <p>Loading...</p>}

        {/* Show checkboxes only when available permissions are fetched */}
        {availablePermissions && !loading && (
          <>
            <div className="modal-overlay">
              <div className="modal-content">
                <div>
                  {/* Show the checkboxes for allPermissions */}
                  {allPermissions.map((permission) => (
                    <div key={permission}>
                      <input
                        type="checkbox"
                        // Check if permission is in either availablePermissions or permissionsList
                        checked={permissionsList.includes(permission) || availablePermissions.includes(permission)}
                        onChange={() => handleCheckboxChange(permission)} 
                      />
                      {permission}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditPermissionModal;



