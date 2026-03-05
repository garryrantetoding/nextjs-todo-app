// "use client";
// import React, { useState, useEffect } from 'react';
// import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
// import DoneTaskButton from './buttons/donebutton';
// import RemoveTaskButton from './buttons/removebutton';
// import { LoadPermissionsAuth } from '@/data/services/usermanagement-service';
// import { toast } from 'sonner';
// import ExitModal from '../ExitModal';
// import { DoneTask } from '@/data/services/todo-service';


// export type ToDoTask = {
//   id: number;
//   task: string;
//   checklist: boolean; 
//   roles: string; //  will not be visible on the table but will be in the database
// };



// const columnHelper = createColumnHelper<ToDoTask>();

// interface ToDoListProps {
//   searchQuery: string;
//   roleFilter: string;
//   data: ToDoTask[];
//   setData: React.Dispatch<React.SetStateAction<ToDoTask[]>>;
//   selectedRows: Record<string, boolean>;  // Change to an object with row ids as keys
//   setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;  // Update state type to be an object
// //   onDone: (id: number) => void; // Prop for the delete function
//   onDelete: (id: number) => void; // Prop for the delete function
// }

// function ToDoList({ searchQuery, roleFilter, data, setData, selectedRows, setSelectedRows, onDelete }: ToDoListProps) {
//     const [taskToSwitch, setTaskToSwitch] = React.useState<ToDoTask | null>(null); // Store person for status switch
  



//   const filteredData = React.useMemo(() => {
//     let filtered = data;

//     if (searchQuery) {
//       filtered = filtered.filter(tasktodo =>
//         tasktodo.task.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (roleFilter) {
//       filtered = filtered.filter(tasktodo => tasktodo.roles === roleFilter);
//     }


//     return filtered;
//   }, [searchQuery, roleFilter, data]);

//   const columns = React.useMemo(() => [
//     // {
//     //   id: 'select',
//     //   header: ({ table }: { table: Table<any> }) => (
//     //     <input
//     //       type="checkbox"
//     //       checked={table.getIsAllRowsSelected()}
//     //       onChange={table.getToggleAllRowsSelectedHandler()}
//     //     />
//     //   ),
//     //   cell: ({ row }: { row: Row<any> }) => (
//     //     <input
//     //       type="checkbox"
//     //       checked={selectedRows[row.id] || false}  // Check selection based on selectedRows object
//     //       onChange={() => {
//     //         setSelectedRows(prev => {
//     //           const newSelectedRows = { ...prev };
//     //           if (newSelectedRows[row.id]) {
//     //             delete newSelectedRows[row.id];  // Deselect row
//     //           } else {
//     //             newSelectedRows[row.id] = true;  // Select row
//     //           }
//     //           return newSelectedRows;
//     //         });
//     //       }}
//     //     />
//     //   ),
//     // },
//     columnHelper.accessor('roles', {
//         cell: info => info.getValue(),
//         header: () => <span>Roles</span>,
//         footer: info => info.column.id,
//       }),
//     columnHelper.accessor('task', {
//         cell: info => info.getValue(),
//         header: () => <span>Task</span>,
//         footer: info => info.column.id,
//       }),
    
//     // {
//     //   id: 'Action',
//     //   header: () => 'Action',
//     //   cell: ({ row }: { row: Row<any> }) => (
//     //     <DoneTaskButton onClick={() => onDone(row.original)} />
//     //   ),
//     //   footer: (info: { column: { id: string } }) => info.column.id,
//     // },
    
//     // {
//     //     id: 'Action',
//     //     Header: 'Action',
//     //     // Conditionally render DoneTaskButton based on checklist status
//     //     Cell: ({ row }: { row: any }) => (
//     //       !row.original.checklist ? (
//     //         <DoneTaskButton onClick={() => onDone(row.original)} />
//     //       ) : null
//     //     ),
//     //     footer: (info: { column: { id: string } }) => info.column.id,
//     //   },

//     // {
//     //     id: 'Action',
//     //     Header: 'Action',
//     //     // Conditionally render DoneTaskButton based on checklist status
//     //     // Cell: ({ row }: { row: any }) => {
//     //     //   const isTaskDone = row.original.checklist;  // true if done, false if ongoing
//     //     //   console.log('Task:', row.original, 'Is Done:', isTaskDone);  // Debugging line
      
//     //     //   return !isTaskDone ? (
//     //     //     <DoneTaskButton onClick={() => onDone(row.original)} />
//     //     //   ) : null;
//     //     // },



//     //     cell: ({ row }: { row: any }) => {
//     //         // const taskisdone = info.getValue();  // Get the role name from the row data
//     //         const rowData = info.row.original;  // Get the full row data
//     //         const { checklist } = rowData;  // Destructure backgroundColor and textColor from the row data
        
//     //         if (checklist===false)
//     //         { return ( 
//     //                 <DoneTaskButton onClick={() => onDone(row.original)} />)

//     //         } else {
//     //             return null;
//     //         }
        
           
//     //       },
//     //     footer: (info: { column: { id: string } }) => info.column.id,
//     //   },


// //     {
// //         id: 'Action',
// //     Header: 'Action',
// //     // Conditionally render DoneTaskButton based on checklist status
// //     Cell: ({ row }: { row: any }) => {
// //       // Destructure checklist from row data
// //       const { checklist } = row.original;
  
// //       // Show DoneTaskButton only if checklist is false (ongoing task)
// //       if (checklist === true) {
// //         return <DoneTaskButton onClick={() => onDone(row.original)} />;
// //       } else {
// //         console.log("testboolean", checklist)
// //         return null; // Don't show anything if task is done
// //       }
// //     },
// //     footer: (info: { column: { id: string } }) => info.column.id,
// //   },

// // columnHelper.accessor('Action', {
// //     cell: info => {
// //       const role = info.getValue();  // Get the role name from the row data
// //       const rowData = info.row.original;  // Get the full row data
// //       const { boxColor, roleColor } = rowData;  // Destructure backgroundColor and textColor from the row data
  
// //       // Default styles
// //       const roleboxColor = boxColor || '#FFFFFF';  // Default to white if no color is provided
// //       const rolenameColor = roleColor || '#000000';  // Default to black if no color is provided
  
// //       // Inline styles for dynamic background and text color
// //       const roleStyle = {
// //         backgroundColor: roleboxColor,
// //         color: rolenameColor,
// //       };
  
// //       // Return the role name with inline styles
// //       return (
// //         <span
// //           className="px-4 py-2 w-8/10 inline-block text-center rounded-md"
// //           style={roleStyle}
// //         >
// //           {role}
// //         </span>
// //       );
// //     },
// //     header: () => <span>Role</span>,
// //     footer: info => info.column.id,
// //   }),
// // {
// //  id: 'Action',
// //       header: ({ table }: { table: Table<any> }) => <span>Action</span>,
// //       cell: ({ row }: { row: Row<any> }) => 
// //           { const rowData = info.row.original;  // Get the full row data

// //         <input
// //           type="checkbox"
// //           checked={selectedRows[row.id] || false}  // Check selection based on selectedRows object
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
// // }
// //       ,
// //     },

// // columnHelper.accessor('checklist', {
// //     cell: info => {
// //       const taskisdone = info.getValue();  // Get the role name from the row data
// //       const rowData = info.row.original;  // Get the full row data
// //       const { checklist } = rowData;  // Destructure backgroundColor and textColor from the row data
  
// //                 <DoneTaskButton onClick={() => onDone(row.original)} />
         
    
// //     },

    

    
// //     header: () => <span>Action</span>,
// //     footer: info => info.column.id,
// //   }),
  
// // {
// //     id: 'Action',
// //     header: 'Action',
// //     cell: ({ row }: { row: Row<any> }) => {
// //       const taskisdone = row.original.status === true;  // Correctly compare with Status enum
// //       const userId = row.original.id;
  

  
// //     //   return (
// //     //     <DoneTaskButton
// //     //     isDone={taskisdone ? true : false}  // Correctly pass the status as enum
// //     //       onClick={() => onDone(row.original)}
// //     //     />
// //     //   );
// //     // // return !taskisdone ? (
// //     // //     <DoneTaskButton
// //     // //       isDone={false} // Only show button if task is not done
// //     // //       onClick={() => onDone(row.original)}
// //     // //     />
// //     // //   ) : null; // Return null if task is done (no button will show)
  
// //     return (
// //         <DoneTaskButton
// //           isActive={taskisdone ? true : false}  // Correctly pass the status as enum
// //           userId={userId}
// //           onClick={() => onDone(row.original)}
// //     />
// //       );
    
// //     },
// //   },

// {
//     id: 'checklist',
//     header: 'Action',
//     cell: ({ row }: { row: Row<ToDoTask> }) => {
//       const isActive = row.original.checklist === true;  // Correctly compare with Status enum
//       const userId = row.original.id;
  
//       const handleToggleClick = (row: Row<ToDoTask>) => {
//         const task = row.original; // Get the task from the row
//         setTaskToSwitch(task); // Set the task in state if needed
//         handledone(task); // Mark the task as done
//       };
  
//       return (
//         <DoneTaskButton
//           isActive={isActive ? true : false}  // Correctly pass the status as enum
//           userId={userId}
//           onClick={() => handleToggleClick(row)} // Trigger the toggle action        
//           />
//       );
//     },
//   },


//     {
//       id: 'Remove',
//       header: () => 'Remove',
//       cell: ({ row }: { row: Row<any> }) => (
//         // <PermissionButton onClick={() => openDescriptionModal(row.original)} />
//         <RemoveTaskButton onClick={() => onDelete(row.original)} />

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



//   const handledone = async (taskToSwitch: ToDoTask) => {
//     if (taskToSwitch) {
//       try {
//         // Call the API or service to mark the task as "done"
//         const updatedTask = await DoneTask(taskToSwitch.id); // Update status of the task
  
//         // Optionally, update the local state (if needed)
//         setData(prevData =>
//           prevData.map(task =>
//             task.id === taskToSwitch.id ? { ...task, checklist: true } : task // Mark task as done
//           )
//         );
  
//         toast.success('Task marked as done!');
//       } catch (error) {
//         console.error('Error updating task status:', error);
//         toast.error('Failed to mark task as done.');
//       }
//     }
//   };
  
  
   
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
//                   ${header.id === 'roles' ? 'w-[5%] px-4 py-2 text-left' : ''}
//                   ${header.id === 'task' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                   ${header.id === 'Action' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                   ${header.id === 'Remove' ? 'w-[10%] px-4 py-2 text-left' : ''}
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
//                     ${cell.column.id === 'roles' ? 'w-[5%] px-4 py-2 text-left' : ''}
//                     ${cell.column.id === 'task' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                     ${cell.column.id === 'Action' ? 'w-[15%] px-4 py-2 text-left' : ''}
//                     ${cell.column.id === 'Remove' ? 'w-[10%] px-4 py-2 text-center' : ''}
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
     
//     </div>
//   );
// }

// export default ToDoList;

