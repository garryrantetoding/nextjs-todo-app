"use client";
import React, { useState, useEffect } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
import DoneTaskButton from './buttons/donebutton';
import RemoveTaskButton from './buttons/removebutton';
import { LoadPermissionsAuth } from '@/data/services/usermanagement-service';
import { toast } from 'sonner';
import ExitModal from '../ExitModal';
import { DoneTask } from '@/data/services/todo-service';


export type ToDoDoneTask = {
  id: number;
  task: string;
  checklist: boolean; 
  roles: string; //  will not be visible on the table but will be in the database
  users: string;
};



const columnHelper = createColumnHelper<ToDoDoneTask>();

interface ToDoDoneListProps {
  searchQuery: string;
  roleFilter: string;
  Filteruser: string;
  data: ToDoDoneTask[];
  setData: React.Dispatch<React.SetStateAction<ToDoDoneTask[]>>;
  selectedRows: Record<string, boolean>;  // Change to an object with row ids as keys
  setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;  // Update state type to be an object
  onDone: (id: number) => void; // Prop for the delete function
  onDelete: (id: number) => void; // Prop for the delete function
}

function ToDoDoneList({ searchQuery, roleFilter,Filteruser, data, setData, selectedRows, setSelectedRows, onDelete, onDone }: ToDoDoneListProps) {
    // const [taskToSwitch, setTaskToSwitch] = React.useState<ToDoDoneTask | null>(null); // Store person for status switch
  



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
   
  // {
  //   id: 'Action',
  //   header: () => 'Action',
  //   cell: ({ row }: { row: Row<any> }) => (
  //     // <PermissionButton onClick={() => openDescriptionModal(row.original)} />
  //     <DoneTaskButton onClick={() => onDone(row.original)} />

  //     // <button onClick={() => setIsPermissionModalOpen(true)}>Edit Permissions</button>

  //   ),
  //   footer: (info: { column: { id: string } }) => info.column.id,
  // },


    {
      id: 'Remove',
      header: () => 'Remove',
      cell: ({ row }: { row: Row<any> }) => (
        // <PermissionButton onClick={() => openDescriptionModal(row.original)} />
        <RemoveTaskButton onClick={() => onDelete(row.original.id)} />

        // <button onClick={() => setIsPermissionModalOpen(true)}>Edit Permissions</button>

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
  
  <div className="py-2 mx-8 ">
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
                   ${header.column.id === 'roles' ? 'w-30 px-4 py-2 text-left' : ''}
                    ${header.column.id === 'task' ? 'w-200 px-4 py-2 text-left' : ''}
                    ${header.column.id === 'Remove' ? 'w-20 px-4 py-2 text-center' : ''}
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
                    ${cell.column.id === 'users' ? 'w-30 pl-2 py-4 text-left' : ''}
                    ${cell.column.id === 'task' ? 'w-170 px-4 py-4 text-left line-through break-words overflow-x-auto whitespace-nowrap' : ''}
                    ${cell.column.id === 'Remove' ? 'w-20 px-4 py-4 text-center' : ''}
                   `}
                   style={{ 
                    color: 'rgba(120, 207, 176, 1)' 
                  

                  } }  // RGBA color applied to cell text
            

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

export default ToDoDoneList;

