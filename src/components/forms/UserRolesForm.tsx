// export default Dashboard;
"use client";
import React, { useState, useEffect } from 'react';
import RoleList from '../custom/userroles/RoleList';
import RoleFilter from '../custom/userroles/role-filters/rolefilter';
import SearchBar from '../custom/userroles/role-filters/searchbar';
import AddRoleButton from '../custom/userroles/role-buttons/add-role-button';
import DeleteRoleButton from '../custom/userroles/role-buttons/delete-role-button';
import AddRoleModal from '../custom/userroles/role-popups/popup-add/popup-addrole';
import DiscardConfirmationModal from '../custom/userroles/role-popups/popup-add/popup-discardaddrole';
import DeleteRoleConfirmationModal from '../custom/userroles/role-popups/popup-deleterole';
import { deleteRole, LoadRole, addRole } from '@/data/services/userroles-service';
import { toast } from 'sonner';
import { LoadPermissionsAuth } from '@/data/services/usermanagement-service';
import ExitModal from '../custom/ExitModal';
import Pagination from '../custom/Pagination/pagination-button';
import PageSizeInput from '../custom/Pagination/pagesizeinput';
import { Loader2 } from 'lucide-react';
import { topbarHeight } from './DashboardPage';

interface Roles {
  roleName: string;
  description: string;
  boxColor: string;
  roleColor: string;
  RolePermission: string[];
}

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (roleName: string, description: string) => void;  // Ensure the role parameter is of type Role
  newRole: Roles;
  setNewUser: React.Dispatch<React.SetStateAction<Roles>>;
  setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


interface BackendErrorRole  {
  roleName: string;
}


const UserRolesDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [data, setData] = useState<any[]>([]); // Initially empty, will be populated by backend data
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state

  // State to manage the selected rows
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  
  // State to manage modals visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // For UserModal
  const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = useState(false); // For DiscardConfirmationModal
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [newRole, setNewRole] = useState<Roles>({
    roleName: '',
    description: '',
    boxColor: '',
    roleColor: '',
    RolePermission:[],
  });

   
const [backendError, setBackendError] = useState<BackendErrorRole>({
  roleName: '',

});

const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [pageSize,setPageSize] = useState(5);
const scaleValue = 1; // Adjust this value to control the scale

  const [loading, setLoading] = useState(true); // Loading state


const handlePageChange = (pageNumber: number) => {
  setPage(pageNumber);  // Update page and fetch new data
};

  // // Fetch data from backend on component mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const fetchedData = await LoadRole();
  //       console.log("Fetched data:", fetchedData); // Add this log to check the data
  //       setData(fetchedData); // Set the fetched data to state
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
    

  //   fetchData();
  // }, []); // Empty dependency array to run this effect only once when the component mounts


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch permissions
        const responsepermission = await LoadPermissionsAuth();
        // setPermissionauth(responsepermission);
        // console.log("testauth",responsepermission);
        // Check if the user has the DELETE_USER permission
         if (responsepermission===undefined){
          
              setIsExitModalOpen(true); // Open the modal when the token is expired
              toast.error(`Session Expired`, {
                style: { backgroundColor: '#FF4D4D', color: 'white' },
                position: 'top-center',
                duration: 5000,
              }); 
        } else if (responsepermission.includes("GETALL_USER")) {
          try {
        const fetchedData = await LoadRole(page,pageSize);
        console.log("Fetched data:", fetchedData); // Add this log to check the data
        setData(fetchedData.data); // Set the fetched data to state
            setTotalPages(fetchedData.totalPages); // Update total pages
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    
        } else {
          setData([]); // Clear the data if no permission to delete
        }
      } catch (error) {
        // Error when fetching permissions
        console.error("Error fetching permissions:", error);
        toast.error("Error fetching permissions", {
          style: { backgroundColor: '#FF4D4D', color: 'white' },
          position: 'top-center',
          duration: 5000,
        });
      } finally {
        setLoading(false)
      }
    };
  
    fetchData();
  }, [page,pageSize]); // Empty dependency array to run this effect only once when the component mounts.
  



  // Function to open the User Modal
  const openModal = async () => {
    const responsepermission = await LoadPermissionsAuth();
    
if (responsepermission===undefined){
          
  setIsExitModalOpen(true); // Open the modal when the token is expired
  toast.error(`Session Expired`, {
    style: { backgroundColor: '#FF4D4D', color: 'white' },
    position: 'top-center',
    duration: 5000,
  }); 
} else if (responsepermission.includes("ADD_ROLES")){

      setIsModalOpen(true);

    }
    else{ 
     toast.error(`You dont have the permission to add role`, {
       style: { backgroundColor: '#FF4D4D', color: 'white' },
       position: 'top-center',
       duration: 5000,
     });

     return null}
    
  };

  const closeExitModal = () => {
    setIsExitModalOpen(false);
  
  };
  
  // Function to close the User Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to open the Discard Confirmation Modal
  const openDiscardConfirmationModal = () => {
    setIsDiscardConfirmationOpen(true);
  };

  // Function to close the Discard Confirmation Modal
  const closeDiscardConfirmationModal = () => {
    setIsDiscardConfirmationOpen(false);
  };

  // Function to discard changes and close the UserModal
  const discardChanges = () => {
    setNewRole({ roleName: '', description: '' ,boxColor: '', roleColor: '', RolePermission:[],
    });  // Reset roles to a default value
    closeModal();
    closeDiscardConfirmationModal();
  };

  const handleAddRole= async (roleName: string, description: string, boxColor: string, roleColor: string, RolePermission:string[],
  ) => {
    const newRole: Roles = {
      roleName,
      description,
      boxColor,
      roleColor,
      RolePermission,

    };
    // console.log("testing3",newUser)

    try {
      const response = await addRole(newRole);
      // console.log("testing4",response)

      if (response?.message) {
        // console.log('User added successfully');
        // Fetch updated list of users after adding a new user
        const updatedData = await LoadRole(page,pageSize);
        // console.log("testing1",updatedData)
        setData(updatedData.data); // Update state with the freshly fetched data
             setTotalPages(updatedData.totalPages); // Update total pages
        setNewRole({ roleName: '', description: '', boxColor: '', roleColor: '',    RolePermission:[],        });  // Reset roles to a default value
        // console.log("testing2",updatedData)
        // console.log("Data updated. Closing modal...");
        setTimeout(() => {
          // console.log("Closing modal...");
          closeModal();
          // console.log("Closed modal...");

        }, 0); // Ensure modal closes after everything else

        toast.success('New Data successfully added', {
          style: { backgroundColor: '#33B640', color: 'white' }, 
          
          position: 'top-center',
          duration: 3000 ,
    //       icon: (
    //         <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <path d="M4.49992 12.6667C4.49992 13.4 5.09992 14 5.83325 14H11.1666C11.8999 14 12.4999 13.4 12.4999 12.6667V4.66667H4.49992V12.6667ZM13.1666 2.66667H10.8333L10.1666 2H6.83325L6.16659 2.66667H3.83325V4H13.1666V2.66667Z" fill="#FEF8EC"/>
    // </svg>
    
    //       ),
        })

      }else {
        // Handle errors from the backend (e.g., validation or database errors)
       // Handle backend errors
       const errorMessageRoleName = Array.isArray(response?.zodErrorsRoleName)
       ? response?.zodErrorsRoleName.join(', ')  // Join the array into a string
       : response?.zodErrorsRoleName || '';
     
    
        setBackendError({ roleName: errorMessageRoleName });
      }
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };
  

  // Function to open the delete confirmation modal
  const openDeleteConfirmationModal = async () => {

    const responsepermission = await LoadPermissionsAuth();
    if (responsepermission===undefined){
          
      setIsExitModalOpen(true); // Open the modal when the token is expired
      toast.error(`Session Expired`, {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      }); 
    } else if (responsepermission.includes("DELETE_ROLES")){
    
            setIsDeleteConfirmationOpen(true);
    
           }
           else{ 
            toast.error(`You dont have the permission to delete data`, {
              style: { backgroundColor: '#FF4D4D', color: 'white' },
              position: 'top-center',
              duration: 5000,
            });
    
            return null}
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(false);
  };

  

const handleDeleteUsers = async () => {
  const usersToDelete: number[] = []; // Collect userIds to delete

  // Iterate over selectedRows to get the userIds to delete
  Object.keys(selectedRows).forEach((rowId) => {
    if (selectedRows[rowId]) {
      const userId = data[+rowId].id; // Get userId from selected rows
      usersToDelete.push(userId);
    }
  });

  if (usersToDelete.length === 0) return; // If no users are selected, do nothing

  try {
    // Perform deletion for each selected user
    const deleteResponses = await Promise.all(
      usersToDelete.map(async (userId) => {
        try {
           await deleteRole(userId);
          return { userId }; // Return response with userId
          
        } catch (error: any) {
          // Handle error per user here if necessary, e.g., log or store failed deletions
          console.error(`Failed to delete user with ID ${userId}`, error);
          return { userId, response: null };
        }
      })
    );

    //    // Log the deleted user IDs for debugging
    //   // console.log('Deleted User IDs:', usersToDelete);

    //   // Log the original data for debugging
    //   // console.log('Original Data:', data);

    //   const filteredData = data.filter((user) => !usersToDelete.includes(user.id)); 
    //   setData(filteredData);
    const fetchedData = await LoadRole(page,pageSize);
    console.log("Fetched data:", fetchedData); // Add this log to check the data
    setData(fetchedData.data); 
        setTotalPages(fetchedData.totalPages); // Update total pages
    //     // const filteredData = data.filter((user) => !usersToDelete => userId === user.id));

    
    // // Log filtered data to check if deletion was successful
    // // console.log('Filtered Data abcde:', filteredData);

    toast.success('Data successfully deleted', {
      style: { backgroundColor: '#EC7C15', color: 'white' }, 
      position: 'top-center',
      duration: 3000 ,
      icon: (
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.49992 12.6667C4.49992 13.4 5.09992 14 5.83325 14H11.1666C11.8999 14 12.4999 13.4 12.4999 12.6667V4.66667H4.49992V12.6667ZM13.1666 2.66667H10.8333L10.1666 2H6.83325L6.16659 2.66667H3.83325V4H13.1666V2.66667Z" fill="#FEF8EC"/>
</svg>

      ),
    })
    
    // Reset selected rows and close the modal
    setSelectedRows({});
    closeDeleteConfirmationModal();
    
  } catch (error) {
    console.error("Error deleting users:", error);
  }
};



if (loading) {
  return (
    <div className={`h-screen flex justify-center items-center bg-neutral-100 translate-y-[-${topbarHeight}px]`}>
      <Loader2 className="mr-2 h-12 w-12 animate-spin" />

      <div className="text-2xl text-gray-500">Loading...</div>
    </div>
  ); // Display loading message or spinner while fetching userroles
}

  return (
    <div className='bg-neutral-100 p-5'>
      {Object.keys(selectedRows).length === 0 ? (
        <>
          <div className="flex justify-between items-center mb-4 w-full">
            {/* Search Bar */}
            <div className="flex space-x-4">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              {/* Role and Status Filters */}
              {/* <RoleFilter onRoleChange={setRoleFilter} /> */}
              <PageSizeInput 
            pageSize={pageSize}
            setPageSize={setPageSize}
            text="page"
            // onPageSizeSubmit={handlePageSizeSubmit}  // Pass the submit handler
          />
            </div>
            {/* Add User Button */}
            <div className="flex-none">
              <AddRoleButton onClick={openModal} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center mb-4 w-full">
            <div className="ml-auto">
        <DeleteRoleButton onClick={openDeleteConfirmationModal} />
        </div>
        </div>
      )}

      {/* Pass searchQuery, roleFilter, and statusFilter to the App component */}
      <RoleList
        searchQuery={searchQuery}
        roleFilter={roleFilter}
        data={data}
        setData={setData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />

<Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        scale={scaleValue}
        // onPageSizeChange={setPageSize}  // You may use this for future enhancements if needed
        // pageSize={pageSize}
      />

      {/* User Modal component */}
      <AddRoleModal 
        isOpen={isModalOpen} 
        onClose={openDiscardConfirmationModal}  // Open discard confirmation on cancel
        onAddRole={handleAddRole} 
        newRole={newRole}
        setNewRole={setNewRole}
        setDiscardRoleConfirmationOpen={setIsDiscardConfirmationOpen}  // Pass this function here
        backendError={backendError}  // Pass backend error
        setBackendError={setBackendError}  // Pass function to reset the error
      />

      {/* Discard Confirmation Modal */}
      <DiscardConfirmationModal
        isOpen={isDiscardConfirmationOpen}
        onCancel={closeDiscardConfirmationModal}
        onDiscard={discardChanges}
      />
      {/* Delete Confirmation Modal */}
      <DeleteRoleConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onCancel={closeDeleteConfirmationModal}
        onDelete={handleDeleteUsers}
      />
      <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />
    </div>
  );
};

export default UserRolesDashboard;
