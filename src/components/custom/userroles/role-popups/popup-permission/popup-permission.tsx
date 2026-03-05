// // import React, { useState, useEffect } from 'react';
// // import {  RoleUser } from '../../RoleList';
// // import { LoadPermission } from '@/data/services/userroles-service';
// // import DescriptionEditButton from '../../role-buttons/descriptionedit-button';

// // interface PermissionModalProps {
// //   isOpenPermission: boolean;
// //   onClose: () => void;
// //   selectedPermission: RoleUser | null;
// //   isEditingPermission: boolean;
// //   onEditPermission: () => void;
// //   permissionsList: string[];
// //   setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
// //   // onSave: () => void;
// //   // onCancel: () => void;
// //   setIsPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// //   allPermissions: string[];

// // }


// // const PermissionModal: React.FC<PermissionModalProps> = ({
// //   isOpenPermission,
// //   onClose,
// //   selectedPermission,
// //   isEditingPermission,
// //   onEditPermission,
// //   permissionsList,
// //   setPermissionsList,
// //   // onSave,
// //   // onCancel,
// //   setIsPermissionModalOpen,
// //   allPermissions,
// // }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [availablePermissions, setAvailablePermissions] = useState<string[]>([]);
   

// //   useEffect(() => {
// //     console.log("isOpenPermission:", isOpenPermission);
// //     console.log("selectedPermission:", selectedPermission);  // This should log the object
  
// //     if (isOpenPermission && selectedPermission && !isEditingPermission) {
// //       console.log("Fetching permissions...");
// //       const fetchPermissionsData = async () => {
// //         setLoading(true); // Move setLoading(true) here to avoid unnecessary re-renders
// //         try {
// //           console.log("Before API call");
// //           const fetchedPermissions = await LoadPermission(selectedPermission.id);
// //           console.log("Fetched permissions:", fetchedPermissions);
// //           setAvailablePermissions(fetchedPermissions);
// //           console.log("Available permissions:", availablePermissions);

// //         } catch (error) {
// //           console.error('Error fetching permissions:', error);
// //         } finally {
// //           setLoading(false);
// //         }
// //       };
  
// //       fetchPermissionsData(); // Ensure this is being called
// //     }
// //   }, [selectedPermission, isOpenPermission, isEditingPermission]);
  

// //   if (!isOpenPermission) {
// //     return null; // If modal is not open, don't render anything
// //   }

  

// //   return (

// //  <div
// //       className="fixed inset-0 flex justify-center items-center z-60"
// //       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// //       onClick={onClose}
// //     >
// //       <div
// //         className="bg-white p-6 rounded-lg shadow-lg w-1/2"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         {/* Header and buttons container */}
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl">Role Permissions</h2>
          
// //           <div className="flex items-center">
// //             {/* Show Edit button only after the details are loaded */}
// //             {availablePermissions && !loading && (
// //               <DescriptionEditButton onClick={onEditPermission} />
// //             )}
// //             <button
// //               onClick={onClose}
// //               className="text-gray-500 p-2 rounded ml-2"
// //             >
// //               X
// //             </button>
// //           </div>
// //         </div>

// //         {/* Display loading state while fetching data */}
// //         {loading && <p>Loading...</p>}

// //         {/* Display the user details */}
// //         {availablePermissions && !loading && (
// //           <>
// //             <div className="modal-overlay">
// //               <div className="modal-content">
               
// //                   <div>
// //                     {allPermissions.map((permission) => (
// //                       <div key={permission}>
// //                         <input
// //                           type="checkbox"
// //                           disabled
// //                           // Check if the permission is in the available permissions list or selected permissions list
// //                           checked={permissionsList.includes(permission) || availablePermissions.includes(permission)}
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
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PermissionModal;
// import React, { useState, useEffect } from 'react';
// import { RoleUser } from '../../RoleList';
// import { LoadPermission } from '@/data/services/userroles-service';
// import DescriptionEditButton from '../../role-buttons/descriptionedit-button';

// interface PermissionModalProps {
//   isOpenPermission: boolean;
//   onClose: () => void;
//   selectedPermission: RoleUser | null;
//   isEditingPermission: boolean;
//   onEditPermission: () => void;
//   onSave: (updatedPermissions: string[]) => void;
//   onCancel: () => void;
//   permissionsList: string[];
//   setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
//   setIsPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   allPermissions: string[];
// }

// const PermissionModal: React.FC<PermissionModalProps> = ({
//   isOpenPermission,
//   onClose,
//   selectedPermission,
//   isEditingPermission,
//   onEditPermission,
//   onSave,
//   onCancel,
//   permissionsList,
//   setPermissionsList,
//   setIsPermissionModalOpen,
//   allPermissions,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [availablePermissions, setAvailablePermissions] = useState<string[]>([]);
//   const [editMode, setEditMode] = useState(isEditingPermission); // Track if we are in edit mode

//   const [initialPermissionsList, setInitialPermissionsList] = useState<string[]>([]); // Store initial state of permissions
//   const [checkedList, setCheckedList] = useState<string[]>([]); // Store initial state of permissions

//   useEffect(() => {
//     console.log("isOpenPermission:", isOpenPermission);
//     console.log("selectedPermission:", selectedPermission); // This should log the object

//     if (isOpenPermission && selectedPermission && !editMode) {
//       console.log("Fetching permissions...");
//       const fetchPermissionsData = async () => {
//         setLoading(true); // Move setLoading(true) here to avoid unnecessary re-renders
//         try {
//           console.log("Before API call");
//           const fetchedPermissions = await LoadPermission(selectedPermission.id);
//           console.log("Fetched permissions:", fetchedPermissions);
//           setAvailablePermissions(fetchedPermissions);
//           setCheckedList(availablePermissions)
//           setInitialPermissionsList(fetchedPermissions); // Store the initial state
//           console.log("Available permissions:", availablePermissions);
//         } catch (error) {
//           console.error('Error fetching permissions:', error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchPermissionsData(); // Ensure this is being called
//     }
//   }, [selectedPermission, isOpenPermission, editMode]);

//   // Handle enabling/disabling edit mode when Edit button is clicked
//   const handleEditButtonClick = () => {
//     setEditMode(true); // Set to edit mode
//     onEditPermission(); // Notify the parent if necessary
//   };

//   const handleSaveButtonClick = () => {
//     // Implement your save logic here (for example, sending data to an API)
//     console.log("Saving permissions:", permissionsList);
//     // Combine availablePermissions with permissionsList to ensure all are saved
//     const combinedPermissions = [...new Set([...permissionsList, ...availablePermissions])];
//     // Call onSave to pass the combined permissions up to the parent component (rolelist.tsx)
//     onSave(combinedPermissions); // Trigger confirmation popup in parent
//     // After saving, you can switch back to non-edit mode
//     setEditMode(false);
//   };

//   const handleCheckboxChange = (permission: string) => {
//     setPermissionsList((prevPermissions) => {
//       const updatedPermissions = prevPermissions.includes(permission)
//         ? prevPermissions.filter((p) => p !== permission)
//         : [...prevPermissions, permission];
//       return updatedPermissions;
//     });
//   };

//   const handleCheckedChange = (permission: string) => {
//     setCheckedList((prevChecked) => {
//       const updatedChecked = prevChecked.includes(permission)
//         ? prevChecked.filter((c) => c !== permission)
//         : [...prevChecked, permission];
//       return updatedChecked;
//     });
//   };

//   const handleCancelButtonClick = () => {
//     // Revert to the initial permissions state
//     setPermissionsList(initialPermissionsList);
//     setEditMode(false); // Exit edit mode
//   };

//   if (!isOpenPermission) {
//     return null; // If modal is not open, don't render anything
//   }

//   return (
//     <div
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
//             {/* Show Edit button when not in edit mode */}
//             {!editMode && availablePermissions && !loading && (
//               <DescriptionEditButton onClick={handleEditButtonClick} />
//             )}

//             {/* Show Save and Cancel buttons when in edit mode */}
//             {editMode && (
//               <>
//                 <button
//                   onClick={handleSaveButtonClick}
//                   className="text-green-500 p-2 rounded ml-2"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={handleCancelButtonClick}
//                   className="text-red-500 p-2 rounded ml-2"
//                 >
//                   Cancel
//                 </button>
//               </>
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
//                 <div>
//                   {allPermissions.map((permission) => (
//                     <div key={permission}>
//                       <input
//                         type="checkbox"
//                         disabled={!editMode} // Disable checkboxes when not in edit mode
//                         // checked={permissionsList.includes(permission) || availablePermissions.includes(permission)}
//                         checked={permissionsList.includes(permission) || checkedList.includes(permission)} 
//                         onChange={() =>{handleCheckboxChange(permission); handleCheckedChange(permission)}} 

//                       />
//                       {permission}
//                     </div>
//                   ))}
//                 </div> 
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PermissionModal;
import React, { useState, useEffect } from 'react';
import { RoleUser } from '../../RoleList';
import { LoadPermission } from '@/data/services/userroles-service';
import DescriptionEditButton from '../../role-buttons/descriptionedit-button';
import DiscardEditPermissionModal from './popup-discardpermission';
import ConfirmSavePermissionModal from './popup-savepermission';
import { editPermission } from '@/data/services/userroles-service';
import { Loader2 } from "lucide-react";
import { LoadPermissionsAuth } from '@/data/services/usermanagement-service';
import { toast } from 'sonner';
import ExitModal from '@/components/custom/ExitModal';

interface PermissionModalProps {
  isOpenPermission: boolean;
  onClose: () => void;
  selectedPermission: RoleUser | null;
  isEditingPermission: boolean;
  onEditPermission: () => void;
  // onSave: (updatedPermissions: string[]) => void;
  // onCancel: () => void;
  permissionsList: string[];
  setPermissionsList: React.Dispatch<React.SetStateAction<string[]>>;
  setIsPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allPermissions: string[];
}

const permissionDescriptions: Record<string, string> = {
  CREATE_USER: 'Add user to list',
  GETALL_USER: 'View all users',
  GET_USER: 'View user details',
  UPDATE_USERSTATUS: 'Update user status',
  UPDATE_USERSDATA: 'Update user data',
  DELETE_USER: 'Remove user from list',
  ADD_ROLES: 'Assign roles to users',
  DELETE_ROLES: 'Remove roles from users',
  GET_ALLROLES: 'View all roles',
  GET_ROLES: 'View user roles',
  UPDATE_ROLESCOLOR: 'Change role color',
  GET_PERMISSIONS: 'View permissions',
  UPDATE_PERMISSIONS: 'Edit permissions',
  GET_ALLPERMISSIONS: 'View all permissions',
};



const PermissionModal: React.FC<PermissionModalProps> = ({
  isOpenPermission,
  onClose,
  selectedPermission,
  isEditingPermission,
  onEditPermission,
  // onSave,
  // onCancel,
  permissionsList,
  setPermissionsList,
  setIsPermissionModalOpen,
  allPermissions,
  
}) => {
  const [loading, setLoading] = useState(false);
  const [availablePermissions, setAvailablePermissions] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(isEditingPermission); // Track if we are in edit mode
 const [isSavePermissionConfirmationOpen, setIsSavePermissionConfirmationOpen] = React.useState(false);
  const [isDiscardPermissionConfirmationOpen, setIsDiscardPermissionConfirmationOpen] = React.useState(false);
  const [empty, setEmpty] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state


  // useEffect(() => {
  //   if (isOpenPermission && selectedPermission && !editMode) {
  //     const fetchPermissionsData = async () => {
  //       setLoading(true);
  //       try {
  //         const fetchedPermissions = await LoadPermission(selectedPermission.id);
  //         setAvailablePermissions(fetchedPermissions);
  //         setPermissionsList(fetchedPermissions); // Set permissionsList initially to availablePermissions
  //       } catch (error) {
  //         console.error('Error fetching permissions:', error);

  //       } finally {
  //         setLoading(false);
  //       }
        
  //     };

  //     fetchPermissionsData(); // Fetch the data when modal opens
  //   }
  // }, [selectedPermission, isOpenPermission, editMode, setPermissionsList]);

  useEffect(() => {
    if (isOpenPermission && selectedPermission && !editMode) {
      const fetchPermissionsData = async () => {
        setLoading(true);
      
try{
        // Fetch permissions
        const responsepermission = await LoadPermissionsAuth();
        // setPermissionauth(responsepermission);
        // console.log("testauth",responsepermission);
        // Check if the user has the DELETE_USER permission
        if (responsepermission.includes("GET_PERMISSIONS")) {
          try {
          const fetchedPermissions = await LoadPermission(selectedPermission.id);
          setAvailablePermissions(fetchedPermissions);
          setPermissionsList(fetchedPermissions); // Set permissionsList initially to availablePermissions
        } catch (error) {
          console.error("Error fetching permissions:", error);
          toast.error("Error fetching data", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          });
        } finally {
          setLoading(false);
        }
          
        } else {
          setAvailablePermissions([]);
          setPermissionsList([]); // Set permissionsList initially to availablePermissions 
          setLoading(false);
          setEmpty(true);
          toast.error("You dont have access to view permissions", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          });
         }
      } catch (error) {
        // Error when fetching permissions
        console.error("Error fetching permissions:", error);
        toast.error("Error fetching permissions", {
          style: { backgroundColor: '#FF4D4D', color: 'white' },
          position: 'top-center',
          duration: 5000,
        });
      }



      };

      fetchPermissionsData(); // Fetch the data when modal opens
    }
  }, [selectedPermission, isOpenPermission, editMode, setPermissionsList]);




  const handleEditButtonClick = async () => {
    const responsepermission = await LoadPermissionsAuth();
    
    if (responsepermission===undefined){
          
      setIsExitModalOpen(true); // Open the modal when the token is expired
      toast.error(`Session Expired`, {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      }); 
} else  if (responsepermission.includes("UPDATE_PERMISSIONS")){


      setEditMode(true); // Set to edit mode
      onEditPermission(); // Notify the parent if necessary
    }
    else{ 
     toast.error(`You dont have the permission to edit data`, {
       style: { backgroundColor: '#FF4D4D', color: 'white' },
       position: 'top-center',
       duration: 5000,
     });

     return null}
    
  };

  const closeExitModal = () => {
    setIsExitModalOpen(false);
  
  };

  // const handleSaveButtonClick = () => {
  //   onSave(permissionsList); // Save the current permissions list
  //   // setEditMode(false);
  // };

  const handleCheckboxChange = (permission: string) => {
    setPermissionsList((prevPermissions) => {
      const updatedPermissions = prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission) // Remove if already in list
        : [...prevPermissions, permission]; // Add if not in list
      return updatedPermissions;
    });
  };

  // const handleCancelButtonClick = () => {
  //   setPermissionsList(availablePermissions); // Reset to initial permissions list (availablePermissions)
  //   setEditMode(false); // Exit edit mode
  // };

  if (!isOpenPermission) {
    return null; // If modal is not open, don't render anything
  }



const handleSavePermissionConfirm = async () => {
  if (selectedPermission) {
    try {
      console.log("testsend", permissionsList)

      // Update the role permissions on the backend
      const updatedPermissions = await editPermission(selectedPermission.id, permissionsList);
console.log("testresponse", updatedPermissions)
      // // Update the local data state with the new role permissions
      // const updatedData = data.map(roleuser =>
      //   roleuser.id === updatedPermissions.id
      //     ? { ...roleuser, RolePermission: updatedPermissions.RolePermission }
      //     : roleuser
      // );

      // setData(updatedData); // Update the data state with the new role permissions
     setEditMode(false);
     
//     // Reopen the Detail Modal with the updated data
//     setTimeout(() => {
//       setIsPermissionModalOpen(true); // Reopen the detail modal
//  // Optionally, you can refresh the selected permission data after the update
//  setSelectedPermission(updatedPermissions);     }, 100); // A short delay to ensure the modal closes and reopens with updated state

  } catch (error) {
    console.error('Error saving user:', error);
  }
}

  setIsSavePermissionConfirmationOpen(false); // Close the save confirmation modal
};


// Confirm Discard changes
const handleDiscardPermissionConfirm = () => {
setPermissionsList(availablePermissions); // Reset to initial permissions list (availablePermissions)
setEditMode(false); // Exit edit mode
setIsDiscardPermissionConfirmationOpen(false); // Close the discard confirmation modal

};


// Handle saving the changes
const handleSavePermissionClick = () => {
  // setCombinedPermissions(updatedPermissions);

setIsSavePermissionConfirmationOpen(true); // Show the confirmation modal for saving


};

// Handle discarding the changes
const handleCancelPermissionClick = () => {
setIsDiscardPermissionConfirmationOpen(true); // Show the confirmation modal for discarding
};



  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-60"
      style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
      // onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg h-[440px] w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
        {!editMode && availablePermissions && !loading && (
               <h2 className="text-xl">Role Permissions for {selectedPermission?.roleName}</h2>
            )}
            {editMode && (
               <h2 className="text-xl">Edit Permissions for {selectedPermission?.roleName}</h2>
            )}
        
          <div className="flex items-center">
            {!editMode && availablePermissions && !loading && (
              <>
              <DescriptionEditButton onClick={handleEditButtonClick} />
              <button
              onClick={onClose}
              className="text-gray-500 p-2 rounded ml-2"
            >
              X
            </button>
            </>
            )}
            {editMode && (
              <>
                <button
                  onClick={handleSavePermissionClick}
                  className="text-green-500 p-2 rounded ml-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelPermissionClick}
                  className="text-red-500 p-2 rounded ml-2"
                >
                  Cancel
                </button>
              </>
            )}
           
          </div>
        </div>
        

        {loading && 
        <>
        <div className='flex justify-center items-center'>
        <Loader2 className="mr-2 h-12 w-12 animate-spin" />
      <p className='text-4xl'>Loading...</p></div>
      </>}

      {empty && 
        <>
        <div className='flex justify-center items-center'>
        
      <p className='text-4xl'></p></div>
      </>}

        {availablePermissions && !loading && !empty && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div>
                {allPermissions.map((permission) => (
                  <div key={permission}>
                    <input
                      type="checkbox"
                      disabled={!editMode} // Disable when not in edit mode
                      checked={permissionsList.includes(permission)} // Only check if in permissionsList
                      onChange={() => handleCheckboxChange(permission)} // Toggle permission in permissionsList
                    />
                    {/* {permission} */}
                    <label className="ml-2">{permissionDescriptions[permission] || permission}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

<ConfirmSavePermissionModal
  isOpen={isSavePermissionConfirmationOpen}
  onClosesave={() => setIsSavePermissionConfirmationOpen(false)} // Close the modal
  onConfirm={handleSavePermissionConfirm} // Save the changes
/>

<DiscardEditPermissionModal
  isOpen={isDiscardPermissionConfirmationOpen}
  onClosediscard={() => setIsDiscardPermissionConfirmationOpen(false)} // Close the modal
  onDiscard={handleDiscardPermissionConfirm} // Discard the changes
/>

<ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

    </div>
  );
};

export default PermissionModal;
