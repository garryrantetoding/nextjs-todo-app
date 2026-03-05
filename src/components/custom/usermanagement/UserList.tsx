"use client";
import React, {useState} from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
import CheckboxToggle from './buttons/toggle-button'; // Ensure this is correct path
import PopupButton from './buttons/detail-button';
import Modal from './popups/popup-detail';
import StatusSwitchConfirmationModal from './popups/popup-togglestatus'; // Import the new modal
import EditModal from './popups/popup-edit'; // Import the new EditModal component
import ConfirmSaveModal from './popups/popup-saveedit';
import DiscardEditModal from './popups/popup-discardedit';
import { EditUser } from '@/data/services/usermanagement-service';
import { Role, Status } from '@/data/services/enum';
import { ChangeStatus } from '@/data/services/usermanagement-service';
import ExitModal from '../ExitModal';
import { LoadPermissionsAuth } from '@/data/services/usermanagement-service';
import { toast } from 'sonner';



export type Person = {
  id: number;
  name: string; // Name will not be visible on the table but will be in the database
  email: string;
  // roles: Role;
  roles: string;
  status: Status;
  boxColor: string;
  roleColor: string;
};

interface EditBackendErrorUser  {
  name: string;
}

const columnHelper = createColumnHelper<Person>();

interface UserListProps {
  searchQuery: string;
  roleFilter: string;
  statusFilter: Status | undefined;
  data: Person[];
  setData: React.Dispatch<React.SetStateAction<Person[]>>;
  selectedRows: Record<string, boolean>;  // Change to an object with row ids as keys
  setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;  // Update state type to be an object
}

function UserList({ searchQuery, roleFilter, statusFilter, data, setData, selectedRows, setSelectedRows }: UserListProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPerson, setSelectedPerson] = React.useState<Person | null>(null);  // New state to store selected person
  const [isStatusSwitchModalOpen, setIsStatusSwitchModalOpen] = React.useState(false); // State for status switch modal
  const [personToSwitch, setPersonToSwitch] = React.useState<Person | null>(null); // Store person for status switch
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);  // State for Edit Modal
  const [editPerson, setEditPerson] = React.useState<Person | null>(null); // Store the person to edit
  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = React.useState(false);
  const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false); // Add this state declaration
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
const [backendError, setBackendError] = useState<EditBackendErrorUser>({
    name: '',

  });
  const filteredData = React.useMemo(() => {
    let filtered = data;

  //   if (searchQuery) {
  //     filtered = filtered.filter(person =>
  //       person.email.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   if (roleFilter) {
  //     filtered = filtered.filter(person => person.roles === roleFilter);
  //   }

  // // Filter by status
  // if (statusFilter !== undefined) {
  //   // Log the current value of statusFilter for debugging
  //   // console.log("statusFilter value:", statusFilter);

  //   // Determine the correct status based on the filter
  //   const statusToFilter = statusFilter === 'Active' ? Status.Active : Status.Inactive;

  //   // Log the status you want to filter by
  //   // console.log("Filtering by status:", statusToFilter);

  //   filtered = filtered.filter(person => {
  //     // console.log("person.Status:", person.status);  // Log the person's actual status
  //     return person.status === statusToFilter;
  //   });
  // }


    return filtered;
  }, [searchQuery, roleFilter, statusFilter, data]);

  const columns = React.useMemo(() => [
    {
      id: 'select',
      header: ({ table }: { table: Table<any> }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }: { row: Row<any> }) => (
        <input
          type="checkbox"
          checked={selectedRows[row.id] || false}  // Check selection based on selectedRows object
          onChange={() => {
            setSelectedRows(prev => {
              const newSelectedRows = { ...prev };
              if (newSelectedRows[row.id]) {
                delete newSelectedRows[row.id];  // Deselect row
              } else {
                newSelectedRows[row.id] = true;  // Select row
              }
              return newSelectedRows;
            });
          }}
        />
      ),
    },
    columnHelper.accessor('email', {
      cell: info => info.getValue(),
      header: () => <span>Email</span>,
      footer: info => info.column.id,
    }),
    // columnHelper.accessor('roles', {
    //   cell: info => {
    //     const role = info.getValue();  // Get the role value
    
    //     // Map roles to colors and styling
    //     let roleClass = 'px-4 py-2 w-8/10 inline-block  text-center rounded-md';  // Common styles for rounded container and padding
    
    //     switch (role) {
    //       case 'Owner':
    //         roleClass += ' bg-blue-50 text-blue-500';  // Red background for Admin
    //         break;
    //       case 'Approver':
    //         roleClass += ' bg-amber-50 text-amber-500';  // Blue background for User
    //         break;
    //       case 'Staff':
    //         roleClass += ' bg-green-100 text-green-500';  // Green background for Guest
    //     }
    
    //     return <span className={roleClass}>{role}</span>;  // Render role inside a colored container
    //   },
    //   header: () => <span>Role</span>,
    //   footer: info => info.column.id,

      
    // }),

    
    columnHelper.accessor('roles', {
      cell: info => {
        const role = info.getValue();  // Get the role name from the row data
        const rowData = info.row.original;  // Get the full row data
        const { boxColor, roleColor } = rowData;  // Destructure backgroundColor and textColor from the row data
    
        // Default styles
        const roleboxColor = boxColor || '#FFFFFF';  // Default to white if no color is provided
        const rolenameColor = roleColor || '#000000';  // Default to black if no color is provided
    
        // Inline styles for dynamic background and text color
        const roleStyle = {
          backgroundColor: roleboxColor,
          color: rolenameColor,
        };
    
        // Return the role name with inline styles
        return (
          <span
            className="px-4 py-2 w-8/10 inline-block text-center rounded-md"
            style={roleStyle}
          >
            {role}
          </span>
        );
      },
      header: () => <span>Role</span>,
      footer: info => info.column.id,
    }),

    
    {
      id: 'Status',
      header: 'Status',
      cell: ({ row }: { row: Row<Person> }) => {
        const isActive = row.original.status === Status.Active;  // Correctly compare with Status enum
        const userId = row.original.id;
    
        const handleToggleClick = () => {
          setPersonToSwitch(row.original);
          setIsStatusSwitchModalOpen(true);
        };
    
        return (
          <CheckboxToggle
            isActive={isActive ? Status.Active : Status.Inactive}  // Correctly pass the status as enum
            userId={userId}
            onToggle={handleToggleClick}
          />
        );
      },
    },
    
    {
      id: 'Action',
      header: () => 'Action',
      cell: ({ row }: { row: Row<any> }) => (
        <PopupButton onClick={() => openModal(row.original)} />
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

  const openModal = async (person: Person) => {
    // // console.log('Selected person:', person); 
    // setSelectedPerson(person);  // Set the selected person in the state
    // setIsModalOpen(true);        // Open the modal
    // setIsEditing(false);  // Initially, it's not editing

    const responsepermission = await LoadPermissionsAuth();
    if (responsepermission === undefined) {

      setIsExitModalOpen(true); // Open the modal when the token is expired
      toast.error(`Session Expired`, {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      });
    } else if (responsepermission.includes("GET_USER")) {

    setSelectedPerson(person);  // Set the selected person in the state
    setIsModalOpen(true);        // Open the modal
    setIsEditing(false);  // Initially, it's not editing   
     }
    else {
      toast.error(`You dont have the permission to view detail`, {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      });

      return null
    }
  

  };

  const closeExitModal = () => {
    setIsExitModalOpen(false);
  
  };

  const closeModal = () => {
    setIsModalOpen(false);       // Close the modal
    setSelectedPerson(null);     // Reset the selected person
  };

  const closeStatusSwitchModal = () => {
    setIsStatusSwitchModalOpen(false); // Close the status switch modal
    setPersonToSwitch(null);           // Reset the person
  };

  const switchStatus = async () => {
    if (personToSwitch) {
      // console.log("qwedws",personToSwitch)

      try {
        // Perform the status update on the backend
        const updatedPerson = await ChangeStatus(personToSwitch.id, personToSwitch.status);

        // Update the local data state with the updated person data
      const updatedData = data.map(person =>
        person.id === updatedPerson.id ? { ...person, status: updatedPerson.status } : person
      );

        setData(updatedData);  // Update the data state

        closeStatusSwitchModal();  // Close the modal after switching status

      } catch (error) {
        console.error('Error updating status:', error);
      }
    }

  };

  
  // Handle saving the changes
const handleSaveClick = () => {
  setIsSaveConfirmationOpen(true); // Show the confirmation modal for saving
};

// Handle discarding the changes
const handleCancelClick = () => {
  setIsDiscardConfirmationOpen(true); // Show the confirmation modal for discarding
};

const handleSaveConfirm = async () => {
  if (editPerson) {
    try {
      // Update the user on the backend
      const updatedUser = await EditUser(editPerson.email, editPerson.name, editPerson.roles);
      console.log("The new data:", updatedUser);

      //  // If backend response contains an error (e.g., invalid data), handle it
      //  if (updatedUser?.zodErrorsusername || updatedUser?.zodErrorsemail || updatedUser?.zodErrorsroles) {
      //   // Handle backend errors by setting the error state
      //   const errorMessageUsername = Array.isArray(updatedUser?.zodErrorsusername)
      //     ? updatedUser?.zodErrorsusername.join(', ') // Join array if multiple errors
      //     : updatedUser?.zodErrorsusername || '';
       
      //   // Set backend errors
      //   setBackendError({ name: errorMessageUsername,});
      //   return; // Stop further processing if there are backend errors
      // }

      if (updatedUser?.zodErrorsusername){
// Handle backend errors by setting the error state
        const errorMessageUsername = Array.isArray(updatedUser?.zodErrorsusername)
          ? updatedUser?.zodErrorsusername.join(', ') // Join array if multiple errors
          : updatedUser?.zodErrorsusername || '';

        // Set backend errors
        setBackendError({ name: errorMessageUsername,});
        setIsSaveConfirmationOpen(false); // Close the save confirmation modal

        return; // Stop further processing if there are backend errors
        
      } else{


      // Update the local data state with the new user information
      const updatedData = data.map(person =>
        person.id === updatedUser.id ? { ...person, ...updatedUser } : person
      );
      
      setData(updatedData); // Update the data state
      // console.log(updatedData);

      setEditPerson(null); // Clear the edit state
      setIsEditModalOpen(false); // Close the Edit Modal

      // Reopen the Detail Modal with the updated data
      setTimeout(() => {
        setIsModalOpen(true); // Reopen the detail modal
        setSelectedPerson(updatedUser); // Set the updated user to detail modal
      }, 100); // A short delay to ensure the modal closes and reopens with updated state
    }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  setIsSaveConfirmationOpen(false); // Close the save confirmation modal
};


// Confirm Discard changes
const handleDiscardConfirm = () => {
  setEditPerson(null); // Clear the edit state
  setIsEditModalOpen(false); // Close the Edit Modal
  setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal
};

const handleDiscardCancel = () => {
  setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal without any action
};




  return (
  
  <div className="py-4 px-4 bg-white border rounded-md">
  {/* Table wrapper */}
  <div className="overflow-hidden">
    <table className="w-full table-auto table-layout-fixed">
      <thead className="border-b-2 pb-2 sticky top-0 bg-white z-10">
        {/* Header rows */}
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className={`
                  ${header.id === 'select' ? 'w-[5%] px-4 py-2 text-left' : ''}
                  ${header.id === 'email' ? 'w-[25%] px-4 py-2 text-left' : ''}
                  ${header.id === 'roles' ? 'w-[15%] px-4 py-2 text-left' : ''}
                  ${header.id === 'Status' ? 'w-[15%] px-4 py-2 text-left' : ''}
                  ${header.id === 'Action' ? 'w-[10%] px-4 py-2 text-left' : ''}
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
    </table>

    {/* Scrollable tbody wrapper */}
    <div className="h-96 overflow-y-auto"
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
            <tr key={row.id} className="border-b-2">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={`
                    ${cell.column.id === 'select' ? 'w-[5%] px-4 py-2 text-left' : ''}
                    ${cell.column.id === 'email' ? 'w-[25%] px-4 py-2 text-left' : ''}
                    ${cell.column.id === 'roles' ? 'w-[15%] px-4 py-2 text-left' : ''}
                    ${cell.column.id === 'Status' ? 'w-[15%] px-4 py-2 pl-8 text-left' : ''}
                    ${cell.column.id === 'Action' ? 'w-[10%] px-4 py-2 text-center' : ''}
                  `}
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
     
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  selectedPerson={selectedPerson}
  isEditing={false}  // Not in edit mode
  onEdit={() => {
    setEditPerson(selectedPerson);  // Set the person to edit
    setIsEditModalOpen(true);        // Open the edit modal
  }}
  // onSave={handleSaveConfirm}
  // onCancel={handleDiscardConfirm}
  setIsModalOpen={setIsModalOpen}  // Pass the setIsModalOpen function
/>



      {/* Edit Modal for editing user details */}
      <EditModal
  isOpen={isEditModalOpen}
  onClose={closeModal}
  editPerson={editPerson}
  setEditPerson={setEditPerson}
  onSave={handleSaveClick} // Show Save confirmation modal
  onCancel={handleCancelClick} // Show Discard confirmation modal
  backendError={backendError}  // Pass backend error
  setBackendError={setBackendError}  // Pass function to reset the error
/>
{/* Confirm Save Modal */}
<ConfirmSaveModal
  isOpen={isSaveConfirmationOpen}
  onClose={() => setIsSaveConfirmationOpen(false)} // Close the modal
  onSave={handleSaveConfirm} // Save the changes
/>

{/* Discard Edit Modal */}
<DiscardEditModal
  isOpen={isDiscardConfirmationOpen}
  onClose={() => setIsDiscardConfirmationOpen(false)} // Close the modal
  onDiscard={handleDiscardConfirm} // Discard the changes
/>

      

      {/* Status Switch Confirmation Modal */}
      <StatusSwitchConfirmationModal
        isOpen={isStatusSwitchModalOpen}
        onCancel={closeStatusSwitchModal}
        onSwitch={switchStatus}
      />
<ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

    </div>
  );
}

export default UserList;
