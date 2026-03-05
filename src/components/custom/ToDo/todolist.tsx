"use client";
import React, { useState, useEffect } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
import DoneTaskButton from './buttons/donebutton';
import RemoveTaskButton from './buttons/removebutton';
import { LoadPermissionsAuth } from '@/data/services/usermanagement-service';
import { toast } from 'sonner';
import ExitModal from '../ExitModal';
import { DoneTask } from '@/data/services/todo-service';


export type ToDoTask = {
  id: number;
  task: string;
  checklist: boolean; 
  roles: string; //  will not be visible on the table but will be in the database
  users: string;
};



const columnHelper = createColumnHelper<ToDoTask>();

interface ToDoListProps {
  searchQuery: string;
  roleFilter: string;
  Filteruser: string;

  data: ToDoTask[];
  setData: React.Dispatch<React.SetStateAction<ToDoTask[]>>;
  selectedRows: Record<string, boolean>;  // Change to an object with row ids as keys
  setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;  // Update state type to be an object
  onDone: (id: number) => void; // Prop for the delete function
  onDelete: (id: number) => void; // Prop for the delete function
}

function ToDoList({ searchQuery, roleFilter,Filteruser, data, setData, selectedRows, setSelectedRows, onDelete, onDone }: ToDoListProps) {
    // const [taskToSwitch, setTaskToSwitch] = React.useState<ToDoTask | null>(null); // Store person for status switch
  



  const filteredData = React.useMemo(() => {
    let filtered = data;

    // if (searchQuery) {
    //   filtered = filtered.filter(tasktodo =>
    //     tasktodo.task.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }

    // if (Filteruser) {
    //   filtered = filtered.filter(tasktodo => tasktodo.users === Filteruser);
    // }


    return filtered;
  }, [searchQuery, Filteruser, data]);

  const columns = React.useMemo(() => [
   
    columnHelper.accessor('roles', {
        cell: info => info.getValue(),
        header: () => <span>Roles</span>,
        footer: info => info.column.id,
      }),

      columnHelper.accessor('users', {
        cell: info => info.getValue(),
        header: () => <span>Users</span>,
        footer: info => info.column.id,
      }),
    columnHelper.accessor('task', {
        cell: info => info.getValue(),
        header: () => <span>Task</span>,
        footer: info => info.column.id,
      }),
   
{
  id: 'Action',
  header: () => 'Action',
  cell: ({ row }: { row: Row<any> }) => (
    // <PermissionButton onClick={() => openDescriptionModal(row.original)} />
    <DoneTaskButton onClick={() => onDone(row.original.id)} />


  ),
  footer: (info: { column: { id: string } }) => info.column.id,
},

    {
      id: 'Remove',
      header: () => 'Remove',
      cell: ({ row }: { row: Row<any> }) => (
        // <PermissionButton onClick={() => openDescriptionModal(row.original)} />
        <RemoveTaskButton onClick={() => onDelete(row.original.id)} />


      ),
      footer: (info: { column: { id: string } }) => info.column.id,
    },
  ], [data, selectedRows]);

  const table = useReactTable({
    data: filteredData, // Use filtered data
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selectedRows,  // Pass the selected rows state (updated format)
    },
    onRowSelectionChange: setSelectedRows,  // Update selected rows when changed
  });


  
  
   
  return (
  
  // <div className="py-4 px-4 bg-white border rounded-md">
  // {/* Table wrapper */}
  // <div className="overflow-hidden">
  //   <table className="w-full table-auto table-layout-fixed">
  //     <thead className="border-b-2 pb-2 sticky top-0 bg-white z-10">
  //       {/* Header rows */}
  //       {table.getHeaderGroups().map(headerGroup => (
  //         <tr key={headerGroup.id}>
  //           {headerGroup.headers.map(header => (
  //             <th
  //               key={header.id}
  //               className={`
  //                 ${header.id === 'roles' ? 'w-[5%] px-4 py-2 text-left' : ''}
  //                 ${header.id === 'task' ? 'w-[15%] px-4 py-2 text-left' : ''}
  //                 ${header.id === 'Action' ? 'w-[15%] px-4 py-2 text-left' : ''}
  //                 ${header.id === 'Remove' ? 'w-[10%] px-4 py-2 text-left' : ''}
  //               `}
  //             >
  //               {header.isPlaceholder
  //                 ? null
  //                 : flexRender(header.column.columnDef.header, header.getContext())}
  //             </th>
  //           ))}
  //         </tr>
  //       ))}
  //     </thead>
  //   </table>

  //   {/* Scrollable tbody wrapper */}
  //   <div className="max-h-96 overflow-y-auto">
  //     <table className="w-full table-auto table-layout-fixed">
  //       <tbody>
  //         {/* Body rows */}
  //         {table.getRowModel().rows.map(row => (
  //           <tr key={row.id} className="border-b-2">
  //             {row.getVisibleCells().map(cell => (
  //               <td
  //                 key={cell.id}
  //                 className={`
  //                   ${cell.column.id === 'roles' ? 'w-[5%] px-4 py-2 text-left' : ''}
  //                   ${cell.column.id === 'task' ? 'w-[15%] px-4 py-2 text-left' : ''}
  //                   ${cell.column.id === 'Action' ? 'w-[15%] px-4 py-2 text-left' : ''}
  //                   ${cell.column.id === 'Remove' ? 'w-[10%] px-4 py-2 text-center' : ''}
  //                 `}
  //               >
  //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //               </td>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // </div>



    <div className="py-2 mx-8">
    {/* Table wrapper */}
    <div className="overflow-hidden">
      {/* <table className="w-full table-auto table-layout-fixed">
        <thead className="border-b-2 pb-2 sticky top-0 bg-white z-10">
       {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={`
                     ${header.id === 'roles' ? 'w-30 px-4 py-2 text-left' : ''}
                 ${header.id === 'task' ? 'w-180 px-4 py-2 text-left' : ''}
                   ${header.id === 'Action' ? 'w-20 px-4 py-2 text-left' : ''}
                   ${header.id === 'Remove' ? 'w-20 px-4 py-2 text-left' : ''}
                 `}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))} 
        </thead>
      </table> */}
  
      {/* Scrollable tbody wrapper */}
      <div className="max-h-64 overflow-y-auto"
      style={{
        /* For Firefox */
        scrollbarWidth: 'none', 
    
        /* For Chrome, Safari, and Opera */
        WebkitOverflowScrolling: 'touch', 
      }}
      >
        <table className="w-full table-auto table-layout-fixed">
          <tbody>
            {/* Body rows */}
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b-16 border-solid border-white bg-neutral-100 "
              // style={{       
              //   backgroundColor: 'rgba(21, 16, 28, 1)',
              //   borderBottom: 'solid 16px rgba(29, 24, 37, 1)', 
              // } } 
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className={`
                      ${cell.column.id === 'roles' ? 'w-30 px-4 py-4 text-left' : ''}
                      ${cell.column.id === 'users' ? 'w-30 px-4 py-4 text-left break-words overflow-x-auto whitespace-nowrap' : ''}
                      ${cell.column.id === 'task' ? 'w-150 px-4 py-4 text-left break-words overflow-x-auto whitespace-nowrap' : ''}
                      ${cell.column.id === 'Action' ? 'w-20 px-4 py-2 text-left' : ''}
                      ${cell.column.id === 'Remove' ? 'w-20 px-4 py-4 text-center' : ''}
                     `}
                    //  style={{ 
                    //   color: 'rgba(158, 120, 207, 1)' 
                    // } }  // RGBA color applied to cell text
              
  
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

      {/* Modal for person details */}
     
    </div>
  );
}

export default ToDoList;

