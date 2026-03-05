// "use client";
// import React, { useState } from 'react';
// import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
// import PopupButton from './role-buttons/description-button';
// import DescriptionModal from './role-popups/popup-description/popup-description';
// import EditDescriptionModal from './role-popups/popup-description/popup-editdescription'; // Import the new EditModal component
// import ConfirmSaveModal from './role-popups/popup-description/popup-saveeditrole';
// import DiscardEditModal from './role-popups/popup-description/popup-discardeditrole';
// import { editUserRole } from '@/data/services/userroles-service';
// import EditPermissionModal from './role-popups/popup-permission/popup-editpermission';
// import PermissionButton from './role-buttons/permission-button';

// export type RoleUser = {
//   id: number;
//   roleName: string;
//   description: string; 
//   boxColor: string; //  will not be visible on the table but will be in the database
//   roleColor: string; //  will not be visible on the table but will be in the database
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
//     // columnHelper.accessor('roleName', {
//     //   cell: info => {
//     //     const role = info.getValue();  // Get the role value
    
//     //     // Map roles to colors and styling
//     //     let roleClass = 'px-4 py-2 w-8/10 inline-block  text-center rounded-md';  // Common styles for rounded container and padding
    
//     //     switch (role) {
//     //       case 'Owner':
//     //         roleClass += ' bg-blue-50 text-blue-500';  // Red background for Admin
//     //         break;
//     //       case 'Approver':
//     //         roleClass += ' bg-amber-50 text-amber-500';  // Blue background for User
//     //         break;
//     //       case 'Staff':
//     //         roleClass += ' bg-green-100 text-green-500';  // Green background for Guest
//     //     }
    
//     //     return <span className={roleClass}>{role}</span>;  // Render role inside a colored container
//     //   },
//     //   header: () => <span>Role</span>,
//     //   footer: info => info.column.id,

      
//     // }),


  
//     // columnHelper.accessor('roleName', {
//     //   cell: info => {
//     //     const role = info.getValue();  // Get the role name from the row data
//     //     const rowData = info.row.original;  // Get the full row data
//     //     const { boxColor, roleColor } = rowData;  // Destructure backgroundColor and textColor from the row data
  
//     //     // Default styles
//     //     const roleboxColor = boxColor || '#FFFFFF';  // Default to white if no color is provided
//     //     const rolenameColor = roleColor || '#000000';  // Default to black if no color is provided
  
//     //     // Dynamically create Tailwind classes using bgColor and textColor
//     //     const roleClass = `px-4 py-2 w-8/10 inline-block text-center rounded-md bg-[${roleboxColor}] text-[${rolenameColor}]`;
  
//     //     return <span className={roleClass}>{role}</span>;  // Render roleName inside a colored container
//     //   },
//     //   header: () => <span>Role</span>,
//     //   footer: info => info.column.id,
//     // }),
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
//     },{
//       id: 'Permission',
//       header: () => 'Permission',
//       cell: ({ row }: { row: Row<any> }) => (
//         // <PermissionButton onClick={() => openDescriptionModal(row.original)} />
//         <PermissionButton onClick={() => openDescriptionModal(row.original)} />

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
// {/* <EditPermissionModal
//         isOpen={isPermissionModalOpen}
//         onClose={() => setIsPermissionModalOpen(false)}
//         editRole={editRole}
//         setEditRole={setEditRole}
//         onSavepermission={handleSavePermission}
//         onCancelpermission={handleCancelPermission}
//         items={items}
//       /> */}
      

//     </div>
//   );
// }

// export default RoleList;


// // "use client";
// // import React, { useState } from 'react';
// // import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
// // import PopupButton from './role-buttons/description-button';
// // import DescriptionModal from './role-popups/popup-description/popup-description';
// // import EditDescriptionModal from './role-popups/popup-description/popup-editdescription'; // Import the new EditModal component
// // import ConfirmSaveModal from './role-popups/popup-description/popup-saveeditrole';
// // import DiscardEditModal from './role-popups/popup-description/popup-discardeditrole';
// // import { editUserRole } from '@/data/services/userroles-service';
// // import EditPermissionModal from './role-popups/popup-permission/popup-editpermission';
// // import PermissionButton from './role-buttons/permission-button';
// // import { editPermission } from '@/data/services/userroles-service';

// // export type RoleUser = {
// //   id: number;
// //   roleName: string;
// //   description: string;
// //   boxColor: string; // Will not be visible on the table but will be in the database
// //   roleColor: string; // Will not be visible on the table but will be in the database
// // };

// // const columnHelper = createColumnHelper<RoleUser>();

// // interface RoleListProps {
// //   searchQuery: string;
// //   roleFilter: string;
// //   data: RoleUser[];
// //   setData: React.Dispatch<React.SetStateAction<RoleUser[]>>;
// //   selectedRows: Record<string, boolean>;
// //   setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
// // }

// // function RoleList({ searchQuery, roleFilter, data, setData, selectedRows, setSelectedRows }: RoleListProps) {
// //   const [isModalOpen, setIsModalOpen] = React.useState(false);
// //   const [selectedRole, setSelectedRole] = React.useState<RoleUser | null>(null);  // New state to store selected RoleUser
// //   const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = React.useState(false);  // State for Edit Modal
// //   const [editRole, setEditRole] = React.useState<RoleUser | null>(null); // Store the RoleUser to edit
// //   const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = React.useState(false);
// //   const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = React.useState(false);
// //   const [isEditing, setIsEditing] = React.useState(false); // Add this state declaration

// //   // State to manage permission modal
// //   const [isPermissionModalOpen, setIsPermissionModalOpen] = React.useState(false);
// //   const [selectedRoleForPermission, setSelectedRoleForPermission] = React.useState<RoleUser | null>(null);

// //   const filteredData = React.useMemo(() => {
// //     let filtered = data;

// //     if (searchQuery) {
// //       filtered = filtered.filter(roleuser =>
// //         roleuser.roleName.toLowerCase().includes(searchQuery.toLowerCase())
// //       );
// //     }

// //     if (roleFilter) {
// //       filtered = filtered.filter(roleuser => roleuser.roleName === roleFilter);
// //     }

// //     return filtered;
// //   }, [searchQuery, roleFilter, data]);

// //   const columns = React.useMemo(() => [
// //     {
// //       id: 'select',
// //       header: ({ table }: { table: Table<any> }) => (
// //         <input
// //           type="checkbox"
// //           checked={table.getIsAllRowsSelected()}
// //           onChange={table.getToggleAllRowsSelectedHandler()}
// //         />
// //       ),
// //       cell: ({ row }: { row: Row<any> }) => (
// //         <input
// //           type="checkbox"
// //           checked={selectedRows[row.id] || false}
// //           onChange={() => {
// //             setSelectedRows(prev => {
// //               const newSelectedRows = { ...prev };
// //               if (newSelectedRows[row.id]) {
// //                 delete newSelectedRows[row.id];  // Deselect row
// //               } else {
// //                 newSelectedRows[row.id] = true;  // Select row
// //               }
// //               return newSelectedRows;
// //             });
// //           }}
// //         />
// //       ),
// //     },
// //     {
// //       id: 'roleName',
// //       header: () => 'Role',
// //       cell: ({ row }: { row: Row<any> }) => (
// //         <span className="px-4 py-2 w-8/10 inline-block text-center rounded-md">
// //           {row.original.roleName}
// //         </span>
// //       ),
// //     },
    
// //     //     {
// //     //       id: 'Action',
// //     //       header: () => 'Action',
// //     //       cell: ({ row }: { row: Row<any> }) => (
// //     //         <PopupButton onClick={() => openDescriptionModal(row.original)} />
// //     //       ),
// //     //       footer: (info: { column: { id: string } }) => info.column.id,
// //     //     },
// //     {
// //       id: 'Permission',
// //       header: () => 'Permission',
// //       cell: ({ row }: { row: Row<any> }) => (
// //         <PermissionButton onClick={() => PermissionModalOpen(row.original)} />
// //       ),
// //     },
// //   ], [data, selectedRows]);

// //   const table = useReactTable({
// //     data: filteredData,
// //     columns,
// //     getCoreRowModel: getCoreRowModel(),
// //     state: {
// //       rowSelection: selectedRows,
// //     },
// //     onRowSelectionChange: setSelectedRows,
// //   });

// //   // Open permission modal and pass role data
// //   const PermissionModalOpen = (roleuser: RoleUser) => {
// //     setSelectedRoleForPermission(roleuser);
// //     setIsPermissionModalOpen(true);
// //   };

// //   // Handle saving changes
// //   const handleSaveClick = () => {
// //     setIsSaveConfirmationOpen(true); // Show the confirmation modal for saving
// //   };

// //   // Handle discarding changes
// //   const handleCancelClick = () => {
// //     setIsDiscardConfirmationOpen(true); // Show the confirmation modal for discarding
// //   };

// //   // Save confirmation logic
// //   const handleSaveConfirm = async () => {
// //     if (editRole) {
// //       try {
// //         const updatedRole = await editUserRole(editRole.roleName, editRole.description);

// //         const updatedData = data.map(roleuser =>
// //           roleuser.id === updatedRole.id ? { ...roleuser, ...updatedRole } : roleuser
// //         );

// //         setData(updatedData); // Update the data state

// //         setEditRole(null);
// //         setIsEditDescriptionModalOpen(false);

// //         setTimeout(() => {
// //           setIsModalOpen(true); // Reopen the detail modal
// //           setSelectedRole(updatedRole); // Set the updated user to detail modal
// //         }, 100);
// //       } catch (error) {
// //         console.error('Error saving user:', error);
// //       }
// //     }

// //     setIsSaveConfirmationOpen(false);
// //   };

// //   // Discard changes logic
// //   const handleDiscardConfirm = () => {
// //     setEditRole(null); // Clear the edit state
// //     setIsEditDescriptionModalOpen(false);
// //     setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal
// //   };

// //   const handleDiscardCancel = () => {
// //     setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal without any action
// //   };

// //   const [items] = useState<string[]>([
// //     "CREATE_USER",
// //    "GETALL_USER",
// //     "GET_USER",
// //     "UPDATE_USERSTATUS",
// //     "UPDATE_USERSDATA",
// //     "DELETE_USER",
// //     "ADD_ROLES",
// //     "DELETE_ROLES",
// //     "GET_ALLROLES", //new
// //     "GET_ALLPERMISSIONS",
// //     "GET_PERMISSIONS",
// //     "UPDATE_PERMISSIONS",
// //     "GET_ROLES",
// //     "UPDATE_ROLESCOLOR"]);

// //   const handleSavePermission = async (selectedItems: string[]) => {
// //     if (editRole) {
// //     console.log("Selected Items:", selectedItems);
// //     // Send selectedItems to your backend or save them
    
// //           const response = await editPermission(editRole.id, selectedItems);
// //     }
// //   };

// //   const handleCancelPermission = () => {
// //     setIsPermissionModalOpen(false); // Close the modal
// //   };
// //   return (
// //     <div className="py-4 px-4 bg-white border rounded-md">
// //       <div className="overflow-hidden">
// //         <table className="w-full table-auto table-layout-fixed">
// //           <thead className="border-b-2 pb-2 sticky top-0 bg-white z-10">
// //             {table.getHeaderGroups().map(headerGroup => (
// //               <tr key={headerGroup.id}>
// //                 {headerGroup.headers.map(header => (
// //                   <th
// //                     key={header.id}
// //                     className={`${header.id === 'select' ? 'w-[5%] px-4 py-2 text-left' : ''}
// //                                 ${header.id === 'roleName' ? 'w-[15%] px-4 py-2 text-left' : ''}
// //                                 ${header.id === 'Permission' ? 'w-[10%] px-4 py-2 text-center' : ''}`}
// //                   >
// //                     {header.isPlaceholder
// //                       ? null
// //                       : flexRender(header.column.columnDef.header, header.getContext())}
// //                   </th>
// //                 ))}
// //               </tr>
// //             ))}
// //           </thead>
// //         </table>

// //         <div className="max-h-96 overflow-y-auto">
// //           <table className="w-full table-auto table-layout-fixed">
// //             <tbody>
// //               {table.getRowModel().rows.map(row => (
// //                 <tr key={row.id} className="border-b-2">
// //                   {row.getVisibleCells().map(cell => (
// //                     <td key={cell.id} className={`${cell.column.id === 'select' ? 'w-[5%] px-4 py-2 text-left' : ''}
// //                                                  ${cell.column.id === 'roleName' ? 'w-[15%] px-4 py-2 text-left' : ''}
// //                                                  ${cell.column.id === 'Permission' ? 'w-[10%] px-4 py-2 text-center' : ''}`}>
// //                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //                     </td>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Modals for user details */}
// //       <DescriptionModal
// //         isOpen={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //         selectedRole={selectedRole}
// //         isEditing={false}
// //         onEdit={() => {
// //           setEditRole(selectedRole);
// //           setIsEditDescriptionModalOpen(true);
// //         }}
// //         onSave={handleSaveConfirm}
// //         onCancel={handleDiscardConfirm}
// //         setIsModalOpen={setIsModalOpen}
// //       />

// //       {/* Edit Description Modal */}
// //       <EditDescriptionModal
// //         isOpen={isEditDescriptionModalOpen}
// //         onClose={() => setIsEditDescriptionModalOpen(false)}
// //         editRole={editRole}
// //         setEditRole={setEditRole}
// //         onSave={handleSaveClick}
// //         onCancel={handleCancelClick}
// //       />

// //       {/* Confirm Save Modal */}
// //       <ConfirmSaveModal
// //         isOpen={isSaveConfirmationOpen}
// //         onClose={() => setIsSaveConfirmationOpen(false)}
// //         onSave={handleSaveConfirm}
// //       />

// //       {/* Discard Edit Modal */}
// //       <DiscardEditModal
// //         isOpen={isDiscardConfirmationOpen}
// //         onClose={() => setIsDiscardConfirmationOpen(false)}
// //         onDiscard={handleDiscardConfirm}
// //       />

// //       {/* Edit Permission Modal */}
// //       <EditPermissionModal
// //         isOpen={isPermissionModalOpen}
// //         onClose={() => setIsPermissionModalOpen(false)}
// //         editRole={selectedRoleForPermission}
// //         setEditRole={setSelectedRoleForPermission}
// //         onSavepermission={handleSavePermission}
// //         onCancelpermission={handleCancelPermission}
// //         items={items} // You can adjust this as per your requirement
// //       />
// //     </div>
// //   );
// // }

// // export default RoleList;