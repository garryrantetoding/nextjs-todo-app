// // // export default Modal;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Person } from '../list';  // Adjust the path if necessary
// // import { UserDetail } from '@/data/services/usermanagement-service'; // Assuming this is where the UserDetail function is located
// // import { Status } from '@/data/services/enum';

// // interface ModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   selectedPerson: Person | null;
// //   isEditing: boolean;
// //   onEdit: () => void;
// //   editPerson?: Person | null;  // Optional property
// //   setEditPerson?: React.Dispatch<React.SetStateAction<Person | null>>;  // Optional property
// //   onSave: () => void;
// //   onCancel: () => void;
// //   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// // }



// // const Modal: React.FC<ModalProps> = ({
// //   isOpen,
// //   onClose,
// //   selectedPerson,
// //   isEditing,
// //   onEdit,
// //   editPerson,
// //   setEditPerson,
// //   onSave,
// //   onCancel
// // }) => {
// //   const [personDetails, setPersonDetails] = useState<Person | null>(null);

// //   // Fetch the latest user details when the modal opens
// //   useEffect(() => {
// //     if (isOpen && selectedPerson) {
// //       const fetchUserDetails = async () => {
// //         try {
// //           // Make sure to pass the email or id of the selected person
// //           const response = await UserDetail(selectedPerson.Email);

// //           // Assuming data is returned as { Name, Email, Role }
// //           setPersonDetails({
// //             id: selectedPerson.id, // Assume the selectedPerson already has `id`
// //             Status: Status.Active, // Provide a default value for `Status` if missing
// //             Name: response.Name,
// //             Email: response.Email,
// //             Role: response.Role
// //           });
// //         } catch (error) {
// //           console.error('Error fetching user details:', error);
// //         }
// //       };

// //       fetchUserDetails();
// //     }
// //   }, [isOpen, selectedPerson]); // Re-run the effect when modal opens or selectedPerson changes

// //   // Update editPerson state when user starts editing
// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Person) => {
// //     if (editPerson) {
// //       setEditPerson({
// //         ...editPerson,
// //         [field]: e.target.value,
// //       });
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div
// //       className="fixed inset-0 flex justify-center items-center z-10"
// //       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// //       onClick={onClose}
// //     >
// //       <div
// //         className="bg-white p-6 rounded-lg shadow-lg w-1/3"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <h2 className="text-xl mb-4">Details for user</h2>

// //         {/* Display the user details */}
// //         {personDetails && (
// //           <>
// //             <div className="mb-4 flex justify-between">
// //               <div className="w-1/2">
// //                 <div className="mb-2">
// //                   <strong>Name:</strong>
// //                 </div>
// //                 <div className="overflow-x-auto">
// //                   <p className="whitespace-nowrap">{personDetails.Name}</p>
// //                 </div>
// //               </div>
// //               <div className="w-1/2">
// //                 <div className="mb-2">
// //                   <strong>Email:</strong>
// //                 </div>
// //                 <div className="overflow-x-auto">
// //                   <p className="whitespace-nowrap">{personDetails.Email}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Role Section */}
// //             <div className="mb-4">
// //               <div className="mb-2">
// //                 <strong>Role:</strong>
// //               </div>
// //               <p>{personDetails.Role}</p>
// //             </div>

// //             <button onClick={onEdit} className="bg-blue-500 text-white p-2 rounded mt-4">Edit</button>
// //           </>
// //         )}

// //         <button onClick={onClose} className="bg-red-500 text-white p-2 rounded mt-4">Close</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Modal;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Person } from '../list';  // Adjust the path if necessary
// import { UserDetail } from '@/data/services/usermanagement-service'; // Assuming this is where the UserDetail function is located
// import { Status } from '@/data/services/enum';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedPerson: Person | null;
//   isEditing: boolean;
//   onEdit: () => void;
//   editPerson?: Person | null;  // Optional property
//   setEditPerson?: React.Dispatch<React.SetStateAction<Person | null>>;  // Optional property
//   onSave: () => void;
//   onCancel: () => void;
//   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }




// // export default Modal;
// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   selectedPerson,
//   isEditing,
//   onEdit,
//   editPerson,
//   setEditPerson,
//   onSave,
//   onCancel
// }) => {
//   const [personDetails, setPersonDetails] = useState<Person | null>(null);

//   // Fetch the latest user details when the modal opens
//   useEffect(() => {
//     if (isOpen && selectedPerson) {
//       const fetchUserDetails = async () => {
//         if (!selectedPerson?.Email) {
//           console.error('Invalid email:', selectedPerson?.Email);
//           return;
//       }
//       try {
//           const response = await UserDetail(selectedPerson.Email);
//           // handle response
//       } catch (error) {
//           console.error("Error fetching user details:", error);
//       }
//         try {
//           // Make sure to pass the email or id of the selected person
//           const response = await UserDetail(selectedPerson.Email);

//           // Assuming data is returned as { Name, Email, Role }
//           setPersonDetails({
//             id: selectedPerson.id, // Assume the selectedPerson already has `id`
//             Status: Status.Active, // Provide a default value for `Status` if missing
//             Name: response.Name,
//             Email: response.Email,
//             Role: response.Role
//           });
//         } catch (error) {
//           console.error('Error fetching user details:', error);
//         }
//       };

//       fetchUserDetails();
//     }
//   }, [isOpen, selectedPerson]); // Re-run the effect when modal opens or selectedPerson changes

//   // Update editPerson state when user starts editing
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Person) => {
//     if (editPerson && setEditPerson) {
//       setEditPerson({
//         ...editPerson,
//         [field]: e.target.value,
//       });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 flex justify-center items-center z-10"
//       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg w-1/3"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2 className="text-xl mb-4">Details for user</h2>

//         {/* Display the user details */}
//         {personDetails && (
//           <>
//             <div className="mb-4 flex justify-between">
//               <div className="w-1/2">
//                 <div className="mb-2">
//                   <strong>Name:</strong>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <p className="whitespace-nowrap">{personDetails.Name}</p>
//                 </div>
//               </div>
//               <div className="w-1/2">
//                 <div className="mb-2">
//                   <strong>Email:</strong>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <p className="whitespace-nowrap">{personDetails.Email}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Role Section */}
//             <div className="mb-4">
//               <div className="mb-2">
//                 <strong>Role:</strong>
//               </div>
//               <p>{personDetails.Role}</p>
//             </div>

//             <button onClick={onEdit} className="bg-blue-500 text-white p-2 rounded mt-4">Edit</button>
//           </>
//         )}

//         <button onClick={onClose} className="bg-red-500 text-white p-2 rounded mt-4">Close</button>
//       </div>
//     </div>
//   );
// };

// export default Modal;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Person } from '../UserList';  // Adjust the path if necessary
import { UserDetail } from '@/data/services/usermanagement-service'; // Assuming this is where the UserDetail function is located
import { Status } from '@/data/services/enum';
import DetailEditButton from '../buttons/detailedit-button';
import { LoadPermissionsAuth } from '@/data/services/usermanagement-service';
import { toast } from 'sonner';
import ExitModal from '../../ExitModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPerson: Person | null;
  isEditing: boolean;
  onEdit: () => void;
  editPerson?: Person | null;  // Optional property
  setEditPerson?: React.Dispatch<React.SetStateAction<Person | null>>;  // Optional property
  // onSave: () => void;
  // onCancel: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedPerson,
  isEditing,
  onEdit,
  editPerson,
  setEditPerson,
  // onSave,
  // onCancel
}) => {
  const [personDetails, setPersonDetails] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);  // To handle loading state for fetching details
  const [permissionauth, setPermissionauth] = useState<any[]>([]); // Initially empty, will be populated by backend data
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state

  // Fetch user details when the modal opens
  useEffect(() => {
    const fetchUserDetails = async () => { 
    
            // console.log("testerauth",permissionauth)
      if (isOpen && selectedPerson && !isEditing) {
        setLoading(true);  // Set loading state to true
        try {
          const response = await UserDetail(selectedPerson.id);  // Make sure selectedPerson has a valid email
          // console.log("test", response);
          setPersonDetails({
            id: selectedPerson.id,  // Assume selectedPerson already has `id`
            status: Status.Active,  // Provide a default value for `Status` if missing
            name: response.name,
            email: response.email,
            roles: response.roles,
            boxColor: response.boxColor,
  roleColor: response.roleColor
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);  // Set loading state to false once data is fetched
        }
      }
    };

    fetchUserDetails();
  }, [isOpen, selectedPerson, isEditing]); // Re-run when modal opens or when selectedPerson changes

  // // Update editPerson state when user starts editing
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Person) => {
  //   if (editPerson && setEditPerson) {
  //     setEditPerson({
  //       ...editPerson,
  //       [field]: e.target.value,
  //     });
  //   }
  // };


  // Function to open the delete confirmation modal
  const openEditModal = async () => {
    const responsepermission = await LoadPermissionsAuth();
    if (responsepermission === undefined) {

      setIsExitModalOpen(true); // Open the modal when the token is expired
      toast.error(`Session Expired`, {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      });
    } else if (responsepermission.includes("UPDATE_USERSDATA")) {

      onEdit()
    }
    else {
      toast.error(`You dont have the permission to edit data`, {
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

  if (!isOpen) return null;

  return (
    <div
  className="fixed inset-0 flex justify-center items-center z-60"
  style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
  onClick={onClose}
>
  <div
    className="bg-white p-6 rounded-lg shadow-lg w-1/2"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header and buttons container */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl">Details User</h2>

      {/* Buttons container (Edit and Close buttons) */}
      <div className="flex items-center">
        {/* Show Edit button only after the details are loaded */}
        {personDetails && !loading && (
          <DetailEditButton onClick={openEditModal} />
        )}

        {/* Close button on the right */}
        <button
          onClick={onClose}
          className="text-gray-500 p-2 rounded ml-2"  
        >
          X
        </button>
      </div>
    </div>

    {/* Display loading state while fetching data */}
    {loading && <p>Loading...</p>}

    {/* Display the user details */}
    {personDetails && !loading && (
      <>
        <div className="mb-4 flex justify-between">
          <div className="w-1/2">
            <div className="mb-2">
              <strong>Name:</strong>
            </div>
            <div className="overflow-x-auto">
              <p className="whitespace-nowrap">{personDetails.name}</p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="mb-2">
              <strong>Email:</strong>
            </div>
            <div className="overflow-x-auto">
              <p className="whitespace-nowrap">{personDetails.email}</p>
            </div>
          </div>
        </div>

        {/* Role Section */}
        <div className="mb-4">
          <div className="mb-2">
            <strong>Role:</strong>
          </div>
          <p>{personDetails.roles}</p>
        </div>

      </>
    )}

  </div>
  <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

</div>

  );
};

export default Modal;
