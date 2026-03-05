// "use client";
// import React, { useState, useEffect } from 'react';
// import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
// import PopupButton from './role-buttons/description-button';
// import DescriptionModal from './role-popups/popup-description/popup-description';
// import EditDescriptionModal from './role-popups/popup-description/popup-editdescription'; // Import the new EditModal component
// import ConfirmSaveModal from './role-popups/popup-description/popup-saveeditrole';
// import DiscardEditModal from './role-popups/popup-description/popup-discardeditrole';
// import { editPermission, editUserRole } from '@/data/services/userroles-service';
// // import EditPermissionModal from './role-popups/popup-permission/popup-editpermission';
// import PermissionButton from './role-buttons/permission-button';
// import PermissionModal from './role-popups/popup-permission/popup-permission';
// import ConfirmSavePermissionModal from './role-popups/popup-permission/popup-savepermission';
// import DiscardEditPermissionModal from './role-popups/popup-permission/popup-discardpermission';
// import { permission } from 'process';
// import EditPermissionModal from './role-popups/popup-permission/popup-editpermission';

// export type RoleUser = {
//   id: number;
//   roleName: string;
//   description: string; 
//   boxColor: string; //  will not be visible on the table but will be in the database
//   roleColor: string; //  will not be visible on the table but will be in the database
//   RolePermission: string[];
// };



// const columnHelper = createColumnHelper<RoleUser>();

// interface RoleListProps {
//   searchQuery: string;
//   roleFilter: string;
//   data: RoleUser[];
//   setData: React.Dispatch<React.SetStateAction<RoleUser[]>>;
//   selectedRows: Record<string, boolean>;  // Change to an object with row ids as keys
//   setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;  // Update state type to be an object
// }

// function RoleList({ searchQuery, roleFilter, data, setData, selectedRows, setSelectedRows }: RoleListProps) {
//   const [isModalOpen, setIsModalOpen] = React.useState(false);
//   const [selectedRole, setSelectedRole] = React.useState<RoleUser | null>(null);  // New state to store selected RoleUser
//   const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = React.useState(false);  // State for Edit Modal
//   const [editRole, setEditRole] = React.useState<RoleUser | null>(null); // Store the RoleUser to edit
//   const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = React.useState(false);
//   const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = React.useState(false);
//   const [isEditing, setIsEditing] = React.useState(false); // Add this state declaration

//   const [isPermissionModalOpen, setIsPermissionModalOpen] = React.useState(false);
//   const [selectedPermission, setSelectedPermission] = React.useState<RoleUser | null>(null);  // New state to store selected RoleUser

//   const [isEditPermissionModalOpen, setIsEditPermissionModalOpen] = React.useState(false);  // State for Edit Modal
//   const [PermissionEdit, setPermissionEdit] = React.useState<RoleUser | null>(null); // Store the RoleUser to edit
//   const [isSavePermissionConfirmationOpen, setIsSavePermissionConfirmationOpen] = React.useState(false);
//   const [isDiscardPermissionConfirmationOpen, setIsDiscardPermissionConfirmationOpen] = React.useState(false);
//   const [isEditingPermission, setIsEditingPermission] = React.useState(false); // Add this state declaration
// const [permissionslist, setPermissionsList] = React.useState<string[]>([]); // Store permissions here

//   const [allPermissions] = useState<string[]>([
//     "CREATE_USER",
//     "GETALL_USER",
//     "GET_USER",
//     "UPDATE_USERSTATUS",
//     "UPDATE_USERSDATA",
//     "DELETE_USER",
//     "ADD_ROLES",
//     "DELETE_ROLES",
//     "GET_ALLROLES",
//     "GET_ALLPERMISSIONS",
//     "GET_PERMISSIONS",
//     "UPDATE_PERMISSIONS",
//     "GET_ROLES",
//     "UPDATE_ROLESCOLOR",
//   ]);


//   const filteredData = React.useMemo(() => {
//     let filtered = data;

//     if (searchQuery) {
//       filtered = filtered.filter(roleuser =>
//         roleuser.roleName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (roleFilter) {
//       filtered = filtered.filter(roleuser => roleuser.roleName === roleFilter);
//     }


//     return filtered;
//   }, [searchQuery, roleFilter, data]);

//   const columns = React.useMemo(() => [
//     {
//       id: 'select',
//       header: ({ table }: { table: Table<any> }) => (
//         <input
//           type="checkbox"
//           checked={table.getIsAllRowsSelected()}
//           onChange={table.getToggleAllRowsSelectedHandler()}
//         />
//       ),
//       cell: ({ row }: { row: Row<any> }) => (
//         <input
//           type="checkbox"
//           checked={selectedRows[row.id] || false}  // Check selection based on selectedRows object
//           onChange={() => {
//             setSelectedRows(prev => {
//               const newSelectedRows = { ...prev };
//               if (newSelectedRows[row.id]) {
//                 delete newSelectedRows[row.id];  // Deselect row
//               } else {
//                 newSelectedRows[row.id] = true;  // Select row
//               }
//               return newSelectedRows;
//             });
//           }}
//         />
//       ),
//     },
    
//     columnHelper.accessor('roleName', {
//       cell: info => {
//         const role = info.getValue();  // Get the role name from the row data
//         const rowData = info.row.original;  // Get the full row data
//         const { boxColor, roleColor } = rowData;  // Destructure backgroundColor and textColor from the row data
    
//         // Default styles
//         const roleboxColor = boxColor || '#FFFFFF';  // Default to white if no color is provided
//         const rolenameColor = roleColor || '#000000';  // Default to black if no color is provided
    
//         // Inline styles for dynamic background and text color
//         const roleStyle = {
//           backgroundColor: roleboxColor,
//           color: rolenameColor,
//         };
    
//         // Return the role name with inline styles
//         return (
//           <span
//             className="px-4 py-2 w-8/10 inline-block text-center rounded-md"
//             style={roleStyle}
//           >
//             {role}
//           </span>
//         );
//       },
//       header: () => <span>Role</span>,
//       footer: info => info.column.id,
//     }),
    
//     {
//       id: 'Action',
//       header: () => 'Action',
//       cell: ({ row }: { row: Row<any> }) => (
//         <PopupButton onClick={() => openDescriptionModal(row.original)} />
//       ),
//       footer: (info: { column: { id: string } }) => info.column.id,
//     },
    
//     {
//       id: 'Permission',
//       header: () => 'Permission',
//       cell: ({ row }: { row: Row<any> }) => (
//         // <PermissionButton onClick={() => openDescriptionModal(row.original)} />
//         <PermissionButton onClick={() => openPermissionModal(row.original)} />

//         // <button onClick={() => setIsPermissionModalOpen(true)}>Edit Permissions</button>

//       ),
//       footer: (info: { column: { id: string } }) => info.column.id,
//     },
//   ], [data, selectedRows]);

//   const table = useReactTable({
//     data: filteredData, // Use filtered data
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     state: {
//       rowSelection: selectedRows,  // Pass the selected rows state (updated format)
//     },
//     onRowSelectionChange: setSelectedRows,  // Update selected rows when changed
//   });

  

//   const openDescriptionModal = (roleuser: RoleUser) => {
//     // console.log('Selected person:', person); 
//     setSelectedRole(roleuser);  // Set the selected person in the state
//     console.log("select12345", selectedRole)

//     setIsModalOpen(true);        // Open the modal
//     setIsEditing(false);  // Initially, it's not editing

//   };

//   const closeDescriptionModal = () => {
//     setIsModalOpen(false);       // Close the modal
//     setSelectedRole(null);     // Reset the selected person
//   };


  
//   // Handle saving the changes
// const handleSaveClick = () => {
//   setIsSaveConfirmationOpen(true); // Show the confirmation modal for saving
// };

// // Handle discarding the changes
// const handleCancelClick = () => {
//   setIsDiscardConfirmationOpen(true); // Show the confirmation modal for discarding
// };

// const handleSaveConfirm = async () => {
//   if (editRole) {
//     try {
//       // Update the user on the backend
//       const updatedRole = await editUserRole(editRole.roleName, editRole.description);
//       // console.log("The new data:", updatedUser);

//       // Update the local data state with the new user information
//       const updatedData = data.map(roleuser =>
//         roleuser.id === updatedRole.id ? { ...roleuser, ...updatedRole } : roleuser
//       );
      
//       setData(updatedData); // Update the data state
//       // console.log(updatedData);

//       setEditRole(null); // Clear the edit state
//       setIsEditDescriptionModalOpen(false); // Close the Edit Modal

//       // Reopen the Detail Modal with the updated data
//       setTimeout(() => {
//         setIsModalOpen(true); // Reopen the detail modal
//         setSelectedRole(updatedRole); // Set the updated user to detail modal
//       }, 100); // A short delay to ensure the modal closes and reopens with updated state

//     } catch (error) {
//       console.error('Error saving user:', error);
//     }
//   }

//   setIsSaveConfirmationOpen(false); // Close the save confirmation modal
// };


// // Confirm Discard changes
// const handleDiscardConfirm = () => {
//   setEditRole(null); // Clear the edit state
//   setIsEditDescriptionModalOpen(false); // Close the Edit Modal
//   setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal
// };


// const openPermissionModal = (rolepermission: RoleUser) => {
//   // console.log('Selected person:', person); 
//   setSelectedPermission(rolepermission);  // Set the selected person in the state
//   console.log("select123", selectedPermission)
//   setIsPermissionModalOpen(true);        // Open the modal
//   setIsEditingPermission(false);  // Initially, it's not editing

// };

// const closePermissionModal = () => {
//   setIsModalOpen(false);       // Close the modal
//   setSelectedRole(null);     // Reset the selected person
// };

// const [combinedPermissions, setCombinedPermissions] = useState<string[]>([]); // Permissions to save


// // Handle saving the changes
// const handleSavePermissionClick = (updatedPermissions: string[]) => {
//   setCombinedPermissions(updatedPermissions);

// setIsSavePermissionConfirmationOpen(true); // Show the confirmation modal for saving


// };

// // Handle discarding the changes
// const handleCancelPermissionClick = () => {
// setIsDiscardPermissionConfirmationOpen(true); // Show the confirmation modal for discarding
// };

// // const handleSavePermissionConfirm = async () => {
// // if (editRole) {
// //   try {
// //     // Update the user on the backend
// //     const updatedPermission = await editPermission(editRole.id, editRole.RolePermission);
// //     // console.log("The new data:", updatedUser);

// //     // Update the local data state with the new user information
// //     const updatedData = data.map(roleuser =>
// //       roleuser.id === updatedPermission.id ? { ...roleuser, ...updatedPermission } : roleuser
// //     );
    
// //     setData(updatedData); // Update the data state
// //     // console.log(updatedData);

// //     setEditRole(null); // Clear the edit state
// //     setIsEditPermissionModalOpen(false); // Close the Edit Modal

// //     // Reopen the Detail Modal with the updated data
// //     setTimeout(() => {
// //       setIsPermissionModalOpen(true); // Reopen the detail modal
// //       setSelectedRole(updatedPermission); // Set the updated user to detail modal
// //     }, 100); // A short delay to ensure the modal closes and reopens with updated state

// //   } catch (error) {
// //     console.error('Error saving user:', error);
// //   }
// // }

// // setIsSavePermissionConfirmationOpen(false); // Close the save confirmation modal
// // };

// const handleSavePermissionConfirm = async () => {
//   if (selectedPermission) {
//     try {
//       console.log("testsend", combinedPermissions)

//       // Update the role permissions on the backend
//       const updatedPermissions = await editPermission(selectedPermission.id, combinedPermissions);
// console.log("testresponse", updatedPermissions)
//       // Update the local data state with the new role permissions
//       const updatedData = data.map(roleuser =>
//         roleuser.id === updatedPermissions.id
//           ? { ...roleuser, RolePermission: updatedPermissions.RolePermission }
//           : roleuser
//       );

//       setData(updatedData); // Update the data state with the new role permissions
//       setIsEditPermissionModalOpen(false); // Close the Edit Permissions Modal

     
//     // Reopen the Detail Modal with the updated data
//     setTimeout(() => {
//       setIsPermissionModalOpen(true); // Reopen the detail modal
//  // Optionally, you can refresh the selected permission data after the update
//  setSelectedPermission(updatedPermissions);     }, 100); // A short delay to ensure the modal closes and reopens with updated state

//   } catch (error) {
//     console.error('Error saving user:', error);
//   }
// }

//   setIsSavePermissionConfirmationOpen(false); // Close the save confirmation modal
// };


// // Confirm Discard changes
// const handleDiscardPermissionConfirm = () => {
// setEditRole(null); // Clear the edit state
// setIsEditPermissionModalOpen(false); // Close the Edit Modal
// setIsDiscardPermissionConfirmationOpen(false); // Close the discard confirmation modal
// };





//   return (
  
//   <div className="py-4 px-4 bg-white border rounded-md">
//   {/* Table wrapper */}
//   <div className="overflow-hidden">
//     <table className="w-full table-auto table-layout-fixed">
//       <thead className="border-b-2 pb-2 sticky top-0 bg-white z-10">
//         {/* Header rows */}
//         {table.getHeaderGroups().map(headerGroup => (
//           <tr key={headerGroup.id}>
//             {headerGroup.headers.map(header => (
//               <th
//                 key={header.id}
//                 className={`
//                   ${header.id === 'select' ? 'w-[5%] px-4 py-2 text-left' : ''}
//                   ${header.id === 'roleName' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                   ${header.id === 'Action' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                   ${header.id === 'Permission' ? 'w-[10%] px-4 py-2 text-left' : ''}
//                 `}
//               >
//                 {header.isPlaceholder
//                   ? null
//                   : flexRender(header.column.columnDef.header, header.getContext())}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//     </table>

//     {/* Scrollable tbody wrapper */}
//     <div className="max-h-96 overflow-y-auto">
//       <table className="w-full table-auto table-layout-fixed">
//         <tbody>
//           {/* Body rows */}
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id} className="border-b-2">
//               {row.getVisibleCells().map(cell => (
//                 <td
//                   key={cell.id}
//                   className={`
//                     ${cell.column.id === 'select' ? 'w-[5%] px-4 py-2 text-left' : ''}
//                     ${cell.column.id === 'roleName' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                     ${cell.column.id === 'Action' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                     ${cell.column.id === 'Permission' ? 'w-[10%] px-4 py-2 text-center' : ''}
//                   `}
//                 >
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>

//       {/* Modal for person details */}
     
// <DescriptionModal
//   isOpen={isModalOpen}
//   onClose={() => setIsModalOpen(false)}
//   selectedRole={selectedRole}
//   isEditing={false}  // Not in edit mode
//   onEdit={() => {
//     setEditRole(selectedRole);  // Set the person to edit
//     setIsEditDescriptionModalOpen(true);        // Open the edit modal
//   }}
//   onSave={handleSaveConfirm}
//   onCancel={handleDiscardConfirm}
//   setIsModalOpen={setIsModalOpen}  // Pass the setIsModalOpen function
// />



//       {/* Edit Modal for editing user details */}
//       <EditDescriptionModal
//   isOpen={isEditDescriptionModalOpen}
//   onClose={closeDescriptionModal}
//   editRole={editRole}
//   setEditRole={setEditRole}
//   onSave={handleSaveClick} // Show Save confirmation modal
//   onCancel={handleCancelClick} // Show Discard confirmation modal
// />
// {/* Confirm Save Modal */}
// <ConfirmSaveModal
//   isOpen={isSaveConfirmationOpen}
//   onClose={() => setIsSaveConfirmationOpen(false)} // Close the modal
//   onSave={handleSaveConfirm} // Save the changes
// />

// {/* Discard Edit Modal */}
// <DiscardEditModal
//   isOpen={isDiscardConfirmationOpen}
//   onClose={() => setIsDiscardConfirmationOpen(false)} // Close the modal
//   onDiscard={handleDiscardConfirm} // Discard the changes
// />



//       <PermissionModal
//   isOpenPermission={isPermissionModalOpen}
//   onClose={() => setIsPermissionModalOpen(false)}
//   selectedPermission={selectedPermission}
//   isEditingPermission={false}  // Not in edit mode
//   onEditPermission={() => {
//     setPermissionEdit(selectedPermission);  // Set the person to edit
//     setIsEditPermissionModalOpen(true);        // Open the edit modal
//   }}
//   // onSave={handleSavePermissionConfirm}
//   // onCancel={handleDiscardPermissionConfirm}
//   setIsPermissionModalOpen={setIsPermissionModalOpen}  // Pass the setIsModalOpen function
//   permissionsList={permissionslist}  // Pass the permissions data
//   setPermissionsList={setPermissionsList}  // Pass the function to update permissions
//   allPermissions={allPermissions}

// />


//   {/* Edit Modal for editing user details */}
//   {/* <EditPermissionModal
//   isOpen={isEditPermissionModalOpen}
//   permissionsList={permissionslist}
//         setPermissionsList={setPermissionsList}
//         allPermissions={allPermissions}
//   onSave={handleSavePermissionClick} // Show Save confirmation modal
//   onCancel={handleCancelPermissionClick} // Show Discard confirmation modal
// /> */}
// <EditPermissionModal
//   isOpen={isEditPermissionModalOpen}
//   onClose={closePermissionModal}
//   selectedPermission={selectedPermission}
//   // isEditingPermission={false}  // Not in edit mode
//   // onEditPermission={() => {
//   //   setPermissionEdit(selectedPermission);  // Set the person to edit
//   //   setIsEditPermissionModalOpen(true);        // Open the edit modal
//   // }}
//   onSave={handleSavePermissionClick}
//   onCancel={handleCancelPermissionClick}
//   setIsEditPermissionModalOpen={setIsEditPermissionModalOpen}  // Pass the setIsModalOpen function
//   permissionsList={permissionslist}  // Pass the permissions data
//   setPermissionsList={setPermissionsList}  // Pass the function to update permissions
//   allPermissions={allPermissions}

// />

 


// {/*     
//       <EditPermissionModal
//   isOpen={isEditPermissionModalOpen}
//   onClose={closePermissionModal}
//   PermissionEdit={PermissionEdit}
//   setPermissionEdit={setPermissionEdit}
//   onSave={handleSavePermissionClick} // Show Save confirmation modal
//   onCancel={handleCancelPermissionClick} // Show Discard confirmation modal

// /> */}
// <ConfirmSavePermissionModal
//   isOpen={isSavePermissionConfirmationOpen}
//   onClose={() => setIsSavePermissionConfirmationOpen(false)} // Close the modal
//   onConfirm={handleSavePermissionConfirm} // Save the changes
// />

// <DiscardEditPermissionModal
//   isOpen={isDiscardPermissionConfirmationOpen}
//   onClose={() => setIsDiscardPermissionConfirmationOpen(false)} // Close the modal
//   onDiscard={handleDiscardPermissionConfirm} // Discard the changes
// />
//     </div>
//   );
// }

// export default RoleList;

