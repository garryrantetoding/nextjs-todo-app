// "use client";
// import React, { useState, useEffect } from 'react';
// import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
// import PopupButton from './role-buttons/description-button';
// import DescriptionModal from './role-popups/popup-description/popup-description';
// import EditDescriptionModal from './role-popups/popup-description/popup-editdescription'; // Import the new EditModal component
// import ConfirmSaveModal from './role-popups/popup-description/popup-saveeditrole';
// import DiscardEditModal from './role-popups/popup-description/popup-discardeditrole';
// import { editUserRole } from '@/data/services/userroles-service';
// import EditPermissionModal from './role-popups/popup-permission/popup-editpermission';
// import PermissionButton from './role-buttons/permission-button';
//  import { editPermission } from '@/data/services/userroles-service';
// import { LoadPermission } from '@/data/services/userroles-service';

// export type RoleUser = {
//   id: number;
//   roleName: string;
//   description: string;
//   boxColor: string; // Will not be visible on the table but will be in the database
//   roleColor: string; // Will not be visible on the table but will be in the database
// };

// const columnHelper = createColumnHelper<RoleUser>();

// interface RoleListProps {
//   searchQuery: string;
//   roleFilter: string;
//   data: RoleUser[];
//   setData: React.Dispatch<React.SetStateAction<RoleUser[]>>;
//   selectedRows: Record<string, boolean>;
//   setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
// }

// function RoleList({ searchQuery, roleFilter, data, setData, selectedRows, setSelectedRows }: RoleListProps) {
//   const [isModalOpen, setIsModalOpen] = React.useState(false);
//   const [selectedRole, setSelectedRole] = React.useState<RoleUser | null>(null);
//   const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = React.useState(false);
//   const [editRole, setEditRole] = React.useState<RoleUser | null>(null);
//   const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = React.useState(false);
//   const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = React.useState(false);
//   const [isEditing, setIsEditing] = React.useState(false);
//   const [isPermissionModalOpen, setIsPermissionModalOpen] = React.useState(false);
// // Fetch permissions when the Permission modal is opened
// useEffect(() => {
//   if (isPermissionModalOpen && editRole) {
//     const fetchPermissions = async () => {
//       const data = await LoadPermission(editRole.id); // Fetch permissions from the backend
//       setPermissions(data.actions || []); // Assuming the response has a field `actions` which is an array of permissions
//     };
//     fetchPermissions();
//   }
// }, [isPermissionModalOpen, editRole]);
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
//           checked={selectedRows[row.id] || false}
//           onChange={() => {
//             setSelectedRows(prev => {
//               const newSelectedRows = { ...prev };
//               if (newSelectedRows[row.id]) {
//                 delete newSelectedRows[row.id];
//               } else {
//                 newSelectedRows[row.id] = true;
//               }
//               return newSelectedRows;
//             });
//           }}
//         />
//       ),
//     },
//     columnHelper.accessor('roleName', {
//       cell: info => {
//         const role = info.getValue();
//         const rowData = info.row.original;
//         const { boxColor, roleColor } = rowData;

//         const roleboxColor = boxColor || '#FFFFFF';
//         const rolenameColor = roleColor || '#000000';

//         const roleStyle = {
//           backgroundColor: roleboxColor,
//           color: rolenameColor,
//         };

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
//         <PermissionButton onClick={() => PermissionModalOpen(row.original)} />
//       ),
//       footer: (info: { column: { id: string } }) => info.column.id,
//     },
//   ], [data, selectedRows]);

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     state: {
//       rowSelection: selectedRows,
//     },
//     onRowSelectionChange: setSelectedRows,
//   });

//   const openDescriptionModal = (roleuser: RoleUser) => {
//     setSelectedRole(roleuser);
//     setIsModalOpen(true);
//     setIsEditing(false);
//   };

//   const closeDescriptionModal = () => {
//     setIsModalOpen(false);
//     setSelectedRole(null);
//   };

//   // const PermissionModalOpen = (roleuser: RoleUser) => {
//   //   setEditRole(roleuser);
//   //   setIsPermissionModalOpen(true);
//   // };

//   const PermissionModalOpen = (roleuser: RoleUser) => {
//     // Set editRole asynchronously first, then open the modal
//     setEditRole(roleuser);
  
//     // Use a callback to ensure that the modal opens after setting the role
//     setTimeout(() => {
//       setIsPermissionModalOpen(true);
//     }, 0); // Using setTimeout to defer the second state update (open modal)
//   };
  

//   const handleSaveClick = () => {
//     setIsSaveConfirmationOpen(true);
//   };

//   const handleCancelClick = () => {
//     setIsDiscardConfirmationOpen(true);
//   };

//   const handleSaveConfirm = async () => {
//     if (editRole) {
//       try {
//         const updatedRole = await editUserRole(editRole.roleName, editRole.description);

//         const updatedData = data.map(roleuser =>
//           roleuser.id === updatedRole.id ? { ...roleuser, ...updatedRole } : roleuser
//         );

//         setData(updatedData);
//         setEditRole(null);
//         setIsEditDescriptionModalOpen(false);

//         setTimeout(() => {
//           setIsModalOpen(true);
//           setSelectedRole(updatedRole);
//         }, 100);
//       } catch (error) {
//         console.error('Error saving user:', error);
//       }
//     }

//     setIsSaveConfirmationOpen(false);
//   };

//   const handleDiscardConfirm = () => {
//     setEditRole(null);
//     setIsEditDescriptionModalOpen(false);
//     setIsDiscardConfirmationOpen(false);
//   };

//   const handleDiscardCancel = () => {
//     setIsDiscardConfirmationOpen(false);
//   };

//   //   const [items] = useState<string[]>([
//   //   "CREATE_USER",
//   //  "GETALL_USER",
//   //   "GET_USER",
//   //   "UPDATE_USERSTATUS",
//   //   "UPDATE_USERSDATA",
//   //   "DELETE_USER",
//   //   "ADD_ROLES",
//   //   "DELETE_ROLES",
//   //   "GET_ALLROLES", //new
//   //   "GET_ALLPERMISSIONS",
//   //   "GET_PERMISSIONS",
//   //   "UPDATE_PERMISSIONS",
//   //   "GET_ROLES",
//   //   "UPDATE_ROLESCOLOR"]);

//   const [permissions, setPermissions] = React.useState<string[]>([]); // Store permissions here
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

    
  

//   const handleSavePermission = async (selectedItems: string[]) => {
//     if (editRole) {
//     console.log("Selected Items:", selectedItems);
//     // Send selectedItems to your backend or save them
    
//           const response = await editPermission(editRole.id, selectedItems);
//     }
//   };

//   const handleCancelPermission = () => {
//     setIsPermissionModalOpen(false); // Close the modal
//   };

//   return (
//     <div className="py-4 px-4 bg-white border rounded-md">
//       {/* Table wrapper */}
//       <div className="overflow-hidden">
//         <table className="w-full table-auto table-layout-fixed">
//           <thead className="border-b-2 pb-2 sticky top-0 bg-white z-10">
//             {table.getHeaderGroups().map(headerGroup => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map(header => (
//                   <th
//                     key={header.id}
//                     className={`
//                       ${header.id === 'select' ? 'w-[5%] px-4 py-2 text-left' : ''}
//                       ${header.id === 'roleName' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                       ${header.id === 'Action' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                       ${header.id === 'Permission' ? 'w-[10%] px-4 py-2 text-center' : ''}
//                     `}
//                   >
//                     {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//         </table>

//         <div className="max-h-96 overflow-y-auto">
//           <table className="w-full table-auto table-layout-fixed">
//             <tbody>
//               {table.getRowModel().rows.map(row => (
//                 <tr key={row.id} className="border-b-2">
//                   {row.getVisibleCells().map(cell => (
//                     <td
//                       key={cell.id}
//                       className={`
//                         ${cell.column.id === 'select' ? 'w-[5%] px-4 py-2 text-left' : ''}
//                         ${cell.column.id === 'roleName' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                         ${cell.column.id === 'Action' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                         ${cell.column.id === 'Permission' ? 'w-[10%] px-4 py-2 text-center' : ''}
//                       `}
//                     >
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modals */}
//       <DescriptionModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         selectedRole={selectedRole}
//         isEditing={false}
//         onEdit={() => {
//           setEditRole(selectedRole);
//           setIsEditDescriptionModalOpen(true);
//         }}
//         onSave={handleSaveConfirm}
//         onCancel={handleDiscardConfirm}
//         setIsModalOpen={setIsModalOpen}
//       />

//       <EditDescriptionModal
//         isOpen={isEditDescriptionModalOpen}
//         onClose={closeDescriptionModal}
//         editRole={editRole}
//         setEditRole={setEditRole}
//         onSave={handleSaveClick}
//         onCancel={handleCancelClick}
//       />

//       <ConfirmSaveModal
//         isOpen={isSaveConfirmationOpen}
//         onClose={() => setIsSaveConfirmationOpen(false)}
//         onSave={handleSaveConfirm}
//       />

//       <DiscardEditModal
//         isOpen={isDiscardConfirmationOpen}
//         onClose={() => setIsDiscardConfirmationOpen(false)}
//         onDiscard={handleDiscardConfirm}
//       />

//       <EditPermissionModal
//         isOpen={isPermissionModalOpen}
//         onClose={() => setIsPermissionModalOpen(false)}
//         editRole={editRole}
//         setEditRole={setEditRole}
//         onSavepermission={handleSavePermission}
//         onCancelpermission={handleCancelPermission}
//         // items={items} // Replace with actual items
//         items={allPermissions}
//         selectedPermissions={permissions} // Pass the selected permissions to the modal

//       />


//     </div>
//   );
// }

// export default RoleList;

