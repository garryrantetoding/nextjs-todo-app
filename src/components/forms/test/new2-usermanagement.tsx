// // "use client";
// // import React, { useState, useEffect } from 'react';
// // import App from '../custom/list'; // Import the App component
// // import RoleFilter from '../custom/filters/rolefilter'; // Import RoleFilter
// // import StatusFilter from '../custom/filters/statusfilter'; // Import StatusFilter
// // import AddUserButton from '../custom/buttons/add-user-button';
// // import DeleteUserButton from '../custom/buttons/delete-user-button';
// // import UserModal from '../custom/popups/popup-adduser';
// // import DiscardConfirmationModal from '../custom/popups/popup-discardadd'; // Import the DiscardConfirmationModal
// // import DeleteConfirmationModal from '../custom/popups/popup-deleteuser';
// // import { LoadList } from '@/data/services/usermanagement-service'; // Import the LoadList function
// // import { AddUser } from '@/data/services/usermanagement-service';
// // import { Role } from '@/data/services/enum'; // Make sure Role enum is imported
// // // import { DeleteUser } from '@/data/services/usermanagement-service';
// // import { getBackendURL } from '../../lib/utils';
// // import axios from 'axios';
// // import { Status } from '@/data/services/enum';

// // const baseUrl = getBackendURL();

// // interface User {
// //   name: string;
// //   email: string;
// //   // roles: Role;
// //   roles: string;

// //   password: string;
// // }

// // interface UserModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onAddUser: (name: string, email: string, roles: Role) => void;  // Ensure the role parameter is of type Role
// //   newUser: User;
// //   setNewUser: React.Dispatch<React.SetStateAction<User>>;
// //   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// // }

// // const Dashboard: React.FC = () => {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [roleFilter, setRoleFilter] = useState('');
// //   const [statusFilter, setStatusFilter] = useState<Status | undefined>(undefined);  // Update state to hold Status | undefined
// //   const [data, setData] = useState<any[]>([]); // Initially empty, will be populated by backend data

// //   // State to manage the selected rows
// //   const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  
// //   // State to manage modals visibility
// //   const [isModalOpen, setIsModalOpen] = useState(false); // For UserModal
// //   const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = useState(false); // For DiscardConfirmationModal
// //   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
// //   const [newUser, setNewUser] = useState<User>({
// //     name: '',
// //     email: '',
// //     // roles: Role.Staff, // Default role should be one of the enum values like Role.Staff
// //     roles: '', // Default role should be one of the enum values like Role.Staff

// //     password: ''
// //   });

// //   // Fetch data from backend on component mount
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const fetchedData = await LoadList();
// //         console.log("Fetched data:", fetchedData); // Add this log to check the data
// //         setData(fetchedData); // Set the fetched data to state
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };
    

// //     fetchData();
// //   }, []); // Empty dependency array to run this effect only once when the component mounts

// //   const handleStatusChange = (status: Status | undefined) => {
// //     setStatusFilter(status);
// //   };
  
// //   // Function to open the User Modal
// //   const openModal = () => {
// //     setIsModalOpen(true);
// //   };

// //   // Function to close the User Modal
// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //   };

// //   // Function to open the Discard Confirmation Modal
// //   const openDiscardConfirmationModal = () => {
// //     setIsDiscardConfirmationOpen(true);
// //   };

// //   // Function to close the Discard Confirmation Modal
// //   const closeDiscardConfirmationModal = () => {
// //     setIsDiscardConfirmationOpen(false);
// //   };

// //   // Function to discard changes and close the UserModal
// //   const discardChanges = () => {
// //     setNewUser({ name: '', email: '', roles: '', password: '' });  // Reset roles to empty string
// //     closeModal();
// //     closeDiscardConfirmationModal();
// //   };
  

// //   const handleAddUser = async (name: string, email: string, role: string) => {
// //     const roleEnumValue = Role[role as keyof typeof Role]; // Correctly map the string to the enum
    
// //     const newUser: User = {
// //       name,
// //       email,
// //       roles: roleEnumValue,
// //       password: '', // You may want to collect the password in your form
// //     };
  
// //     try {
// //       const response = await AddUser(newUser);
// //       if (response) {
// //         console.log('User added successfully');
// //         // Fetch updated list of users after adding a new user
// //         const updatedData = await LoadList();
// //         setData(updatedData); // Update state with the newly fetched data
// //         setNewUser({ name: '', email: '', roles: '', password: '' });
// //         closeModal(); // Close modal directly here after adding user
// //       }
// //     } catch (error) {
// //       console.error('Error adding user:', error);
// //     }
// //   };
 
  

// //   // Function to open the delete confirmation modal
// //   const openDeleteConfirmationModal = () => {
// //     setIsDeleteConfirmationOpen(true);
// //   };

// //   // Function to close the delete confirmation modal
// //   const closeDeleteConfirmationModal = () => {
// //     setIsDeleteConfirmationOpen(false);
// //   };

  

// // const handleDeleteUsers = async () => {
// //   const usersToDelete: number[] = []; // Collect userIds to delete

// //   // Iterate over selectedRows to get the userIds to delete
// //   for (const rowId in selectedRows) {
// //     if (selectedRows[rowId]) {
// //       const userId = data[+rowId].id; // Get userId from selected rows
// //       usersToDelete.push(userId);
// //     }
// //   }

// //   if (usersToDelete.length === 0) return; // If no users are selected, do nothing

// //   try {
// //     // Perform deletion for each selected user
// //     const deleteResponses = await Promise.all(
// //       usersToDelete.map(async (userId) => {
// //         const url = `${baseUrl}/user/${userId}`;
// //         const response = await axios.delete(url);
// //         return { userId, response };
        
   
// //       })
// //     );

// //     // Process responses and filter out deleted users
// //     const successfulDeletions = deleteResponses.filter(({ response }) => response.status === 200);

// //     successfulDeletions.forEach(({ userId }) => {
// //       console.log(`User with ID ${userId} deleted successfully`);
// //     });

// //     // Update the data to reflect the deletions (without the successfully deleted users)
// //     const filteredData = data.filter((user) => !successfulDeletions.some(({ userId }) => userId === user.id));
// //     setData(filteredData); // Update state with filtered data

// //     // Reset selected rows and close the modal
// //     setSelectedRows({});
// //     closeDeleteConfirmationModal();
    
// //   } catch (error) {
// //     console.error("Error deleting users:", error);
// //   }
// // };


// //   return (
// //     <div>
// //       {Object.keys(selectedRows).length === 0 ? (
// //         <>
// //           {/* Search Bar */}
// //           <div>
// //             <label htmlFor="search">Search:</label>
// //             <input
// //               type="text"
// //               id="search"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               placeholder="Search by Email"
// //             />
// //           </div>

// //           {/* Role and Status Filters */}
// //           <RoleFilter onRoleChange={setRoleFilter} />
// //           <StatusFilter onStatusChange={handleStatusChange} />
          
// //           {/* Add User Button */}
// //           <AddUserButton onClick={openModal} />
// //         </>
// //       ) : (
// //         <DeleteUserButton onClick={openDeleteConfirmationModal} />
        
// //       )}

// //       {/* Pass searchQuery, roleFilter, and statusFilter to the App component */}
// //       <App
// //         searchQuery={searchQuery}
// //         roleFilter={roleFilter}
// //         statusFilter={statusFilter}
// //         data={data}
// //         setData={setData}
// //         selectedRows={selectedRows}
// //         setSelectedRows={setSelectedRows}
// //       />

// //       {/* User Modal component */}
// //       <UserModal 
// //         isOpen={isModalOpen} 
// //         onClose={openDiscardConfirmationModal}  // Open discard confirmation on cancel
// //         onAddUser={handleAddUser} 
// //         newUser={newUser}
// //         setNewUser={setNewUser}
// //         setDiscardConfirmationOpen={setIsDiscardConfirmationOpen}  // Pass this function here
// //       />

// //       {/* Discard Confirmation Modal */}
// //       <DiscardConfirmationModal
// //         isOpen={isDiscardConfirmationOpen}
// //         onCancel={closeDiscardConfirmationModal}
// //         onDiscard={discardChanges}
// //       />
// //       {/* Delete Confirmation Modal */}
// //       <DeleteConfirmationModal
// //         isOpen={isDeleteConfirmationOpen}
// //         onCancel={closeDeleteConfirmationModal}
// //         onDelete={handleDeleteUsers}
// //       />
// //     </div>
// //   );
// // };

// // export default Dashboard;
// "use client";
// import React, { useState, useEffect } from 'react';
// import UserList from '../custom/usermanagement/UserList'; // Import the App component
// import RoleFilter from '../custom/usermanagement/filters/rolefilter'; // Import RoleFilter
// import StatusFilter from '../custom/usermanagement/filters/statusfilter'; // Import StatusFilter
// import SearchBar from '../custom/usermanagement/filters/searchbar';
// import AddUserButton from '../custom/usermanagement/buttons/add-user-button';
// import DeleteUserButton from '../custom/usermanagement/buttons/delete-user-button';
// import UserModal from '../custom/usermanagement/popups/popup-adduser';
// import DiscardConfirmationModal from '../custom/usermanagement/popups/popup-discardadd'; // Import the DiscardConfirmationModal
// import DeleteConfirmationModal from '../custom/usermanagement/popups/popup-deleteuser';
// import { DeleteUser, LoadList } from '@/data/services/usermanagement-service'; // Import the LoadList function
// import { AddUser } from '@/data/services/usermanagement-service';
// import { Role } from '@/data/services/enum'; // Make sure Role enum is imported
// // import { DeleteUser } from '@/data/services/usermanagement-service';
// import { getBackendURL } from '../../lib/utils';
// import axios from 'axios';
// import { Status } from '@/data/services/enum';
// import { getAccessTokenFromCookies } from '@/data/services/get-token';
// import CryptoJS from "crypto-js";
// import { toast } from 'sonner';
// import { LoadPermissionsAuth } from '@/data/services/usermanagement-service';
// import ExitModal from '../custom/ExitModal';

// const baseUrl = getBackendURL();

// interface User {
//   name: string;
//   email: string;
//   roles: string;
//   password: string;
// }

// interface BackendErrorUser  {
//   name: string;
//   email: string;
// }

// interface UserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddUser: (name: string, email: string, roles: string) => void;  // Ensure the role parameter is of type Role
//   newUser: User;
//   setNewUser: React.Dispatch<React.SetStateAction<User>>;
//   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const UserManagementDashboard: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [roleFilter, setRoleFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState<Status | undefined>(undefined);  // Update state to hold Status | undefined
//   const [data, setData] = useState<any[]>([]); // Initially empty, will be populated by backend data
//   // const [permissionauth, setPermissionauth] = useState<any[]>([]); // Initially empty, will be populated by backend data
//   const [backendError, setBackendError] = useState<BackendErrorUser>({
//     name: '',
//     email: '',
//   });
//   // State to manage the selected rows
//   const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  
//   // State to manage modals visibility
//   const [isModalOpen, setIsModalOpen] = useState(false); // For UserModal
//   const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = useState(false); // For DiscardConfirmationModal
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
//   const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
// const [page, setPage] = useState(1);
// const [totalPages, setTotalPages] = useState(1);
// const pageSize = 5;
//   const [newUser, setNewUser] = useState<User>({
//     name: '',
//     email: '',
//     roles: '', // Default role should be one of the enum values like Role.Staff
//     password: ''
//   });

//   const secretKey = CryptoJS.enc.Utf8.parse("0123456789abcdef0123456789abcdef"); // 32-byte key
//   const iv = CryptoJS.enc.Utf8.parse("abcdef9876543210"); // 16-byte IV
  
//   function encryptPassword(password: string) {
//     const encrypted = CryptoJS.AES.encrypt(password, secretKey, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });
  
//     return encrypted.toString(); // Returns Base64 string
//   }
    
  
   
  

//   // // Fetch data from backend on component mount
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const responsepermission = await LoadPermissionsAuth()
//   //     setPermissionauth(responsepermission)
      
//   //     try {
//   //       const fetchedData = await LoadList();
//   //       // console.log("Fetched data:", fetchedData); // Add this log to check the data
//   //       setData(fetchedData); // Set the fetched data to state
   
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };
    

//   //   fetchData();
//   // }, []); // Empty dependency array to run this effect only once when the component mounts

//   // // useEffect(() => {
//   // //   const fetchData = async () => {
//   // //     try {
//   // //       // Fetch permissions
//   // //       const responsepermission = await LoadPermissionsAuth();
        
//   // //       // Check if the user has the DELETE_USER permission
//   // //       if (responsepermission.includes("DELETE_USER")) {
//   // //         try {
//   // //           // Fetch the list of data if the user has permission
//   // //           const fetchedData = await LoadList();
//   // //           setData(fetchedData); // Set the fetched data to state
//   // //         } catch (error) {
//   // //           console.error("Error fetching data:", error);
//   // //           toast.error("Error fetching data", {
//   // //             style: { backgroundColor: '#FF4D4D', color: 'white' },
//   // //             position: 'top-center',
//   // //             duration: 5000,
//   // //           });
//   // //         }
//   // //       } else {
//   // //         setData([]); // Clear the data if no permission to delete
//   // //         toast.error("You don't have the permission to delete data", {
//   // //           style: { backgroundColor: '#FF4D4D', color: 'white' },
//   // //           position: 'top-center',
//   // //           duration: 5000,
//   // //         });
//   // //       }
//   // //     } catch (error) {
//   // //       // Error when fetching permissions
//   // //       console.error("Error fetching permissions:", error);
//   // //       toast.error("Error fetching permissions", {
//   // //         style: { backgroundColor: '#FF4D4D', color: 'white' },
//   // //         position: 'top-center',
//   // //         duration: 5000,
//   // //       });
//   // //     }
//   // //   };
  
//   // //   fetchData();
//   // // }, []); // Empty dependency array to run this effect only once when the component mounts.
  
//   // useEffect(() => {
//   //   const fetchPermission = async () => {
//   //     try {
//   //       // Fetch permissions
//   //       const responsepermission = await LoadPermissionsAuth();
//   //       // setPermissionauth(responsepermission);
//   //       // console.log("testauth",responsepermission);
//   //       // Check if the user has the DELETE_USER permission
        
//   //       if (responsepermission===undefined) {
//   //         return <SessionOver />
//   //       } 
//   //     } catch (error) {
//   //       // Error when fetching permissions
//   //       console.error("Error fetching permissions:", error);
//   //       toast.error("Error fetching permissions", {
//   //         style: { backgroundColor: '#FF4D4D', color: 'white' },
//   //         position: 'top-center',
//   //         duration: 5000,
//   //       });
//   //     }
//   //   };
  
//   //   fetchPermission();
//   // }, []); // Empty dependency array to run this effect only once when the component mounts.
  

  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch permissions
//         const responsepermission = await LoadPermissionsAuth();
//         // setPermissionauth(responsepermission);
//         // console.log("testauth",responsepermission);
//         // Check if the user has the DELETE_USER permission
//          if (responsepermission===undefined){
          
//               setIsExitModalOpen(true); // Open the modal when the token is expired
//               toast.error(`Session Expired`, {
//                 style: { backgroundColor: '#FF4D4D', color: 'white' },
//                 position: 'top-center',
//                 duration: 5000,
//               }); 
//         } else if (responsepermission.includes("GETALL_USER")) {
//           try {
//             // Fetch the list of data if the user has permission
//             const fetchedData = await LoadList(page,pageSize);
//             console.log("testdata",fetchedData)
//             setData(fetchedData.data); // Set the fetched data to state
//             setTotalPages(fetchedData.totalPages)
//             console.log("testdata 2",data)

//           } catch (error) {
//             console.error("Error fetching data:", error);
//             toast.error("Error fetching data", {
//               style: { backgroundColor: '#FF4D4D', color: 'white' },
//               position: 'top-center',
//               duration: 5000,
//             });
//           }
//         } else {
//           setData([]); // Clear the data if no permission to delete
//         }
//       } catch (error) {
//         // Error when fetching permissions
//         console.error("Error fetching permissions:", error);
//         toast.error("Error fetching permissions", {
//           style: { backgroundColor: '#FF4D4D', color: 'white' },
//           position: 'top-center',
//           duration: 5000,
//         });
//       }
//     };
  
//     fetchData();
//   }, [page]); // Empty dependency array to run this effect only once when the component mounts.
  
//   const handleStatusChange = (status: Status | undefined) => {
//     setStatusFilter(status);
//   };
  
//   // Function to open the User Modal
//   const openModal = async () => {
//     const responsepermission = await LoadPermissionsAuth();

//     if (responsepermission===undefined){
          
//       setIsExitModalOpen(true); // Open the modal when the token is expired
//       toast.error(`Session Expired`, {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       }); }
//       else if (responsepermission.includes("CREATE_USER")){

//       setIsModalOpen(true);

//      }
//      else{ 
//       toast.error(`You dont have the permission to add user`, {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       });

//       return null}
//   };

//   // Function to close the User Modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // Function to open the Discard Confirmation Modal
//   const openDiscardConfirmationModal = () => {
//     setIsDiscardConfirmationOpen(true);
//   };

//   // Function to close the Discard Confirmation Modal
//   const closeDiscardConfirmationModal = () => {
//     setIsDiscardConfirmationOpen(false);
//   };

//   // Function to discard changes and close the UserModal
//   const discardChanges = () => {
//     setNewUser({ name: '', email: '', roles: '', password: '' });  // Reset roles to a default value
//     closeModal();
//     closeDiscardConfirmationModal();
//   };

//   const handleAddUser = async (name: string, email: string, roles: string, password: string) => {
//     // Convert the string role to a Role enum value
//    // Encrypt the password here
//    const encryptedPassword = encryptPassword(password);
//     const newUser: User = {
//       name,
//       email,
//       roles,  // Use the Role enum value
//       password: encryptedPassword,
//     };
//     // console.log("testing3",newUser)

//     try {
//       const response = await AddUser(newUser);
//       // console.log("testing4",response)

//       if (response?.message) {
//         // console.log('User added successfully');
//         // Fetch updated list of users after adding a new user
//         const updatedData = await LoadList(page, pageSize);
//         // console.log("testing1",updatedData)
//         setData(updatedData); // Update state with the freshly fetched data
//         setNewUser({ name: '', email: '', roles: Role.Empty, password: '' });
//         // console.log("testing2",updatedData)
//         // console.log("Data updated. Closing modal...");
//         setTimeout(() => {
//           // console.log("Closing modal...");
//           closeModal();
//           // console.log("Closed modal...");

//         }, 0); // Ensure modal closes after everything else

//         toast.success('New Data successfully added', {
//           style: { backgroundColor: '#33B640', color: 'white' }, 
          
//           position: 'top-center',
//           duration: 3000 ,
//     //       icon: (
//     //         <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//     // <path d="M4.49992 12.6667C4.49992 13.4 5.09992 14 5.83325 14H11.1666C11.8999 14 12.4999 13.4 12.4999 12.6667V4.66667H4.49992V12.6667ZM13.1666 2.66667H10.8333L10.1666 2H6.83325L6.16659 2.66667H3.83325V4H13.1666V2.66667Z" fill="#FEF8EC"/>
//     // </svg>
    
//     //       ),
//         })

//       } else {
//         // Handle errors from the backend (e.g., validation or database errors)
//        // Handle backend errors
//        const errorMessageUsername = Array.isArray(response?.zodErrorsusername)
//        ? response?.zodErrorsusername.join(', ')  // Join the array into a string
//        : response?.zodErrorsusername || '';
     
//      const errorMessageEmail = Array.isArray(response?.zodErrorsemail)
//        ? response?.zodErrorsemail.join(', ')  // Join the array into a string
//        : response?.zodErrorsemail || '';
//        console.log("Email Error Message:", errorMessageEmail); // Log email error message
//         setBackendError({ name: errorMessageUsername, email: errorMessageEmail });
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };
  

//   // Function to open the delete confirmation modal
//   const openDeleteConfirmationModal = async () => {
//     const responsepermission = await LoadPermissionsAuth();

//     if (responsepermission===undefined){
          
//       setIsExitModalOpen(true); // Open the modal when the token is expired
//       toast.error(`Session Expired`, {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       }); 
//     } else  if (responsepermission.includes("DELETE_USER")){

//         setIsDeleteConfirmationOpen(true);

//        }
//        else{ 
//         toast.error(`You dont have the permission to delete data`, {
//           style: { backgroundColor: '#FF4D4D', color: 'white' },
//           position: 'top-center',
//           duration: 5000,
//         });

//         return null}
//   };

//   // Function to close the delete confirmation modal
//   const closeDeleteConfirmationModal = () => {
//     setIsDeleteConfirmationOpen(false);
//   };

  

// // // const handleDeleteUsers = async () => {
// // //   const usersToDelete: number[] = []; // Collect userIds to delete

// // //   // Iterate over selectedRows to get the userIds to delete
// // //   Object.keys(selectedRows).forEach((rowId) => {
// // //     if (selectedRows[rowId]) {
// // //       const userId = data[+rowId].id; // Get userId from selected rows
// // //       usersToDelete.push(userId);
// // //     }
// // //   });

// // //   if (usersToDelete.length === 0) return; // If no users are selected, do nothing

// // //   try {
// // //     // Perform deletion for each selected user
// // //     const deleteResponses = await Promise.all(
// // //       usersToDelete.map(async (userId) => {
// // //         try {
// // //            await DeleteUser(userId);
// // //           return { userId }; // Return response with userId
          
// // //         } catch (error: any) {
// // //           // Handle error per user here if necessary, e.g., log or store failed deletions
// // //           console.error(`Failed to delete user with ID ${userId}`, error);
          
// // //           return { userId, response: error?.response?.data?.message || error?.message || 'Unknown error'  };
// // //         }
// // //       })
// // //     );

// // //        // Log the deleted user IDs for debugging
// // //       // console.log('Deleted User IDs:', usersToDelete);

// // //       // Log the original data for debugging
// // //       // console.log('Original Data:', data);

// // //       const filteredData = data.filter((user) => !usersToDelete.includes(user.id)); 
// // //       setData(filteredData);

// // //         // const filteredData = data.filter((user) => !usersToDelete => userId === user.id));

    
// // //     // Log filtered data to check if deletion was successful
// // //     // console.log('Filtered Data abcde:', filteredData);

// // //     toast.success('Data successfully deleted', {
// // //       style: { backgroundColor: '#EC7C15', color: 'white' }, 
// // //       position: 'top-center',
// // //       duration: 3000 ,
// // //       icon: (
// // //         <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// // // <path d="M4.49992 12.6667C4.49992 13.4 5.09992 14 5.83325 14H11.1666C11.8999 14 12.4999 13.4 12.4999 12.6667V4.66667H4.49992V12.6667ZM13.1666 2.66667H10.8333L10.1666 2H6.83325L6.16659 2.66667H3.83325V4H13.1666V2.66667Z" fill="#FEF8EC"/>
// // // </svg>

// // //       ),
// // //     })
    
// // //     // Reset selected rows and close the modal
// // //     setSelectedRows({});
// // //     closeDeleteConfirmationModal();
    
// // //   } catch (error) {
    
// // //     console.error("Error deleting users:", error);
// // //   }
// // // };

// // const handleDeleteUsers = async () => {
// //   const usersToDelete: number[] = []; // Collect userIds to delete

// //   // Iterate over selectedRows to get the userIds to delete
// //   Object.keys(selectedRows).forEach((rowId) => {
// //     if (selectedRows[rowId]) {
// //       const userId = data[+rowId].id; // Get userId from selected rows
// //       usersToDelete.push(userId);
// //     }
// //   });

// //   if (usersToDelete.length === 0) return; // If no users are selected, do nothing

// //   try {
// //     // Perform deletion for each selected user
// //     const deleteResponses = await Promise.all(
// //       usersToDelete.map(async (userId) => {
// //         try {
// //           await DeleteUser(userId); // Attempt deletion
// //           return { userId }; // Return response with userId if deletion is successful
// //         } catch (error: any) {
// //           // Handle error per user here if necessary
// //           console.error(`Failed to delete user with ID ${userId}`, error);

// //           // Return the error message from the backend (if available)
// //           return { userId, response: error?.response?.data?.message || error?.message || 'Unknown error' };
// //         }
// //       })
// //     );

// //     // Log the deleted user IDs for debugging
// //     // console.log('Deleted User IDs:', usersToDelete);

// //     // Log the original data for debugging
// //     // console.log('Original Data:', data);

   

// //     // Handle any errors and show a toast notification
// //     const failedDeletions = deleteResponses.filter((response) => response.response); // Get users that failed to delete
// //     if (failedDeletions.length > 0) {
// //       const errorMessages = failedDeletions.map(
// //         (response) => `Failed to delete user with ID ${response.userId}: ${response.response}`
// //       ).join('\n'); // Join all error messages

// //       toast.error(`Error deleting users:\n${errorMessages}`, {
// //         style: { backgroundColor: '#FF4D4D', color: 'white' },
// //         position: 'top-center',
// //         duration: 5000,
// //       });
// //     } else { 
// //       const filteredData = data.filter((user) => !usersToDelete.includes(user.id));

// //       setData(filteredData); // Update the data state
      
// //       toast.success('Data successfully deleted', {
// //         style: { backgroundColor: '#EC7C15', color: 'white' },
// //         position: 'top-center',
// //         duration: 3000,
// //         icon: (
// //           <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// //             <path
// //               d="M4.49992 12.6667C4.49992 13.4 5.09992 14 5.83325 14H11.1666C11.8999 14 12.4999 13.4 12.4999 12.6667V4.66667H4.49992V12.6667ZM13.1666 2.66667H10.8333L10.1666 2H6.83325L6.16659 2.66667H3.83325V4H13.1666V2.66667Z"
// //               fill="#FEF8EC"
// //             />
// //           </svg>
// //         ),
// //       });
// //     }

// //     // Reset selected rows and close the modal
// //     setSelectedRows({});
// //     closeDeleteConfirmationModal();
// //   } catch (error) {
// //     console.error("Error deleting users:", error);

// //     // Show a generic error if the whole delete operation failed
// //     toast.error('An error occurred while trying to delete users.', {
// //       style: { backgroundColor: '#FF4D4D', color: 'white' },
// //       position: 'top-center',
// //       duration: 5000,
// //     });
// //   }
// // };

//   const handleDeleteUsers = async () => {
//     const usersToDelete: number[] = []; // Collect userIds to delete

//     // Iterate over selectedRows to get the userIds to delete
//     Object.keys(selectedRows).forEach((rowId) => {
//       if (selectedRows[rowId]) {
//         const userId = data[+rowId].id; // Get userId from selected rows
//         usersToDelete.push(userId);
//       }
//     });

//     if (usersToDelete.length === 0) return; // If no users are selected, do nothing
   
//     try {
//       // Perform deletion for each selected user
//       const deleteResponses = await Promise.all(
//         usersToDelete.map(async (userId) => {
//           try {
//             const response = await DeleteUser(userId); // Attempt deletion

//             console.log("testresponse", response)
//             if (response.errormessage === "Forbidden: You do not have permission to delete this user.") {
//               toast.error(`forbidden`, {
//                 style: { backgroundColor: '#FF4D4D', color: 'white' },
//                 position: 'top-center',
//                 duration: 5000,
//               });
//             }

//             if (response.errormessage === "success") {
//               const filteredData = data.filter((user) => !usersToDelete.includes(user.id));
//               setData(filteredData); // Update the data state

//               toast.success('Data successfully deleted', {
//                 style: { backgroundColor: '#EC7C15', color: 'white' },
//                 position: 'top-center',
//                 duration: 3000,
//                 icon: (
//                   <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M4.49992 12.6667C4.49992 13.4 5.09992 14 5.83325 14H11.1666C11.8999 14 12.4999 13.4 12.4999 12.6667V4.66667H4.49992V12.6667ZM13.1666 2.66667H10.8333L10.1666 2H6.83325L6.16659 2.66667H3.83325V4H13.1666V2.66667Z"
//                       fill="#FEF8EC"
//                     />
//                   </svg>
//                 ),
//               });


//             }
//             return { userId, response }; // Return response with userId if deletion is successful
//           } catch (error: any) {
//             // Handle error per user here if necessary
//             console.error(`Failed to delete user with ID ${userId}`, error);

//             // Check if error contains an errormessage and return it
//             const errorMessage = error?.errormessage || error?.response?.data?.message || error?.message || 'Unknown error';

//             // Return the error message for the failed user
//             return { userId, response: errorMessage };
//           }
//         })
//       );

//       // // Handle any errors and show a toast notification
//       // const failedDeletions = deleteResponses.filter((response) => response.response); // Get users that failed to delete
//       // if (failedDeletions.length > 0) {
//       //   const errorMessages = failedDeletions.map(
//       //     (response) => `Failed to delete user with ID ${response}`
//       //   )// Join all error messages

//       //   // toast.error(`Error deleting users ${errorMessages}`, {
//       //   //   style: { backgroundColor: '#FF4D4D', color: 'white' },
//       //   //   position: 'top-center',
//       //   //   duration: 5000,
//       //   // });
//       // } else { 


//       // Reset selected rows and close the modal
//       setSelectedRows({});
//       closeDeleteConfirmationModal();


//     } catch (error) {
//       console.error("Error deleting users:", error);

//       // Show a generic error if the whole delete operation failed
//       toast.error('An error occurred while trying to delete users.', {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       });
//     }
//   };

//   const closeExitModal = () => {
//     setIsExitModalOpen(false);
//   };


//   return (
//     <div className='bg-neutral-100 p-5'>
//       {Object.keys(selectedRows).length === 0 ? (
//         <>
//           <div className="flex justify-between items-center mb-4 w-full">
//             {/* Search Bar */}
//             <div className="flex space-x-4">
//               <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//               {/* Role and Status Filters */}
//               <RoleFilter onRoleChange={setRoleFilter} />
//               <StatusFilter onStatusChange={handleStatusChange} />
//             </div>
//             {/* Add User Button */}
//             <div className="flex-none">
//               <AddUserButton onClick={openModal} />
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="flex justify-between items-center mb-4 w-full">
//             <div className="ml-auto">
//         <DeleteUserButton onClick={openDeleteConfirmationModal} />
//         </div>
//         </div>
//       )}

//       {/* Pass searchQuery, roleFilter, and statusFilter to the App component */}
//       <UserList
//         searchQuery={searchQuery}
//         roleFilter={roleFilter}
//         statusFilter={statusFilter}
//         data={data}
//         setData={setData}
//         selectedRows={selectedRows}
//         setSelectedRows={setSelectedRows}
//       />

//       {/* User Modal component */}
//       <UserModal 
//         isOpen={isModalOpen} 
//         onClose={openDiscardConfirmationModal}  // Open discard confirmation on cancel
//         onAddUser={handleAddUser} 
//         newUser={newUser}
//         setNewUser={setNewUser}
//         setDiscardConfirmationOpen={setIsDiscardConfirmationOpen}  // Pass this function here
//         backendError={backendError}  // Pass backend error
//         setBackendError={setBackendError}  // Pass function to reset the error
//       />

//       {/* Discard Confirmation Modal */}
//       <DiscardConfirmationModal
//         isOpen={isDiscardConfirmationOpen}
//         onCancel={closeDiscardConfirmationModal}
//         onDiscard={discardChanges}
//       />
//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmationModal
//         isOpen={isDeleteConfirmationOpen}
//         onCancel={closeDeleteConfirmationModal}
//         onDelete={handleDeleteUsers}
//       />
//             <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

//     </div>
//   );
// };

// export default UserManagementDashboard;