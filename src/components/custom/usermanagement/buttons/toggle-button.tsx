// "use client";
// import React from 'react';

// // interface CheckboxToggleProps {
// //   isActive: boolean;
// //   onToggle: (newStatus: boolean) => void;
// // }

// // const CheckboxToggle: React.FC<CheckboxToggleProps> = ({ isActive, onToggle }) => {
// //   const handleToggle = () => {
// //     console.log(`Toggling status from ${isActive} to ${!isActive}`);
// //     onToggle(!isActive); // Toggle status
// //   };
// import { ChangeStatus } from '@/data/services/usermanagement-service'; // Import the ChangeStatus function
// import { Status } from '@/data/services/enum';

// interface CheckboxToggleProps {
//   isActive: Status;
//   userId: number; // Add userId prop to identify the user
//   onToggle: (newStatus: Status) => void;
// }

// const CheckboxToggle: React.FC<CheckboxToggleProps> = ({ isActive, userId, onToggle }) => {
//   const handleToggle = async () => {
//     console.log(`Toggling status from ${isActive} to ${!isActive}`);
//     onToggle(!isActive); // Toggle status

//     // Update status in the backend
//     try {
//       await ChangeStatus(userId, !isActive ? Status.Active : Status.Inactive);
//       console.log(`Status updated for user ${userId}`);
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   return (
//     <label className="inline-flex items-center cursor-pointer">
//       <input
//         type="checkbox"
//         // checked={isActive !== undefined ? isActive : Status.Inactive}  // Ensure it is always either true or false
//         checked={isActive === Status.Active}  // Ensure the checkbox reflects the correct boolean value
//         onChange={handleToggle}
//         className="sr-only peer"
//       />
// <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
// <span className="ms-3 text-sm font-medium text-black">{isActive ? Status.Active : Status.Inactive}</span>
//     </label>
//   );
// };

// export default CheckboxToggle;
"use client";
import React, {useState} from 'react';
import { ChangeStatus } from '@/data/services/usermanagement-service'; // Import the ChangeStatus function
import { Status } from '@/data/services/enum'; // Assuming Status is an enum with 'Active' and 'Inactive'
import { LoadPermissionsAuth } from '@/data/services/usermanagement-service';
import { toast } from 'sonner';
// import { logoutAction } from '@/data/actions/auth-actions';
// import { useRouter } from 'next/navigation'; // Ensure you have access to the router
import ExitModal from '../../ExitModal';

interface CheckboxToggleProps {
  isActive: Status; // This should be the enum value: Status.Active or Status.Inactive
  userId: number; // Add userId prop to identify the user
  // onToggle: (newStatus: Status) => void; // Change to Status, as the toggle works with enum values
  onToggle: (userId: number, newStatus: Status) => void;  // Update the type here to accept two arguments

}

const CheckboxToggle: React.FC<CheckboxToggleProps> = ({ isActive, userId, onToggle }) => {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
  const handleToggle = async () => {
    try{
   const response = await LoadPermissionsAuth()
   console.log("testresponse",response)
    
// const router = useRouter();

  //  if (response===undefined){
  //   return null
  //  }
  if (response===undefined){
    // await logoutAction();
    // localStorage.clear();
    // router.push("/login");


    setIsExitModalOpen(true); // Open the modal when the token is expired
    toast.error(`Session Expired`, {
      style: { backgroundColor: '#FF4D4D', color: 'white' },
      position: 'top-center',
      duration: 5000,
    }); 

 }
   if (response.includes("UPDATE_USERSTATUS")){

    // console.log(`Toggling status from ${isActive} to ${isActive === Status.Active ? Status.Inactive : Status.Active}`);
    onToggle(userId, isActive === Status.Active ? Status.Inactive : Status.Active);

   }
   
   else{ 
    toast.error(`You dont have the permission to change status`, {
      style: { backgroundColor: '#FF4D4D', color: 'white' },
      position: 'top-center',
      duration: 5000,
    });
   

    return null}
  }catch(error){
    console.log("testerror",error)
  }
   
  };

  const closeExitModal = () => {
    setIsExitModalOpen(false);
    // You can also perform other actions, like redirecting to the login page
  //  <ul>
  //  <LogoutButton />
  //        </ul>
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isActive === Status.Active} // This ensures the checkbox is checked for 'Active' status
        onChange={handleToggle}
        className="sr-only peer"
      />
      <div className="relative w-11 h-4 bg-neutral-200 
      peer-focus:outline-none 
     rounded-full peer dark:bg-gray-700 
      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] 
      after:absolute after:top-[calc(25%-0.5rem)] 
      after:start-[calc(-0.125rem)] 
      after:bg-neutral-300 
       after:rounded-full after:h-6 after:w-6 after:transition-all 
      peer-checked:bg-blue-100 peer-checked:after:bg-blue-500 
 "></div>
      
      
      <span className="ms-3 text-sm font-medium text-black">{isActive === Status.Active ? Status.Active : Status.Inactive}</span> {/* Displaying the correct text */}
    
      <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />
    </label>

  );
};

export default CheckboxToggle;
