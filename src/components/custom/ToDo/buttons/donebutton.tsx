// src/components/DeleteUserButton.tsx
import React, {useState} from 'react';

interface DoneTaskButtonProps {
  onClick: () => void; // Function to handle the click event
  // isDone: boolean; // Status of the task (whether it's done or not)
}

const DoneTaskButton: React.FC<DoneTaskButtonProps> = ({ onClick }) => {
    // if (isDone===true) {
    //     return null;
    //   }

    const [isHovered, setIsHovered] = useState(false);

const handleMouseEnter = () => {
  setIsHovered(true);
};

const handleMouseLeave = () => {
  setIsHovered(false);
};
  return (
        <button
            className="  rounded-md px-4 text-blue-500 hover:text-blue-900"
            onClick={onClick}
    //         style={{ 
    //         //     color: 'rgba(158, 120, 207, 1)' 
    //         //   } }  
    

    //           color: isHovered ? 'rgba(62, 22, 113, 1)' : 'rgba(158, 120, 207, 1)', // Text color changes on hover
    // }}
    // onMouseEnter={handleMouseEnter}
    // onMouseLeave={handleMouseLeave}
        >
            <div className='flex items-center'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </div>
        </button>
    );
};

export default DoneTaskButton;

// // export default CheckboxToggle;
// "use client";
// import React, {useState} from 'react';
// import { ChangeStatus } from '@/data/services/usermanagement-service'; // Import the ChangeStatus function
// import { Status } from '@/data/services/enum'; // Assuming Status is an enum with 'Active' and 'Inactive'
// import { LoadPermissionsAuth } from '@/data/services/usermanagement-service';
// import { toast } from 'sonner';
// // import { logoutAction } from '@/data/actions/auth-actions';
// // import { useRouter } from 'next/navigation'; // Ensure you have access to the router
// import ExitModal from '../../ExitModal';

// interface DoneTaskButtonProps {
//   isActive: boolean; // This should be the enum value: Status.Active or Status.Inactive
//   userId: number; // Add userId prop to identify the user
//   // onToggle: (newStatus: Status) => void; // Change to Status, as the toggle works with enum values
//   onClick: (userId: number, newStatus: boolean) => void;  // Update the type here to accept two arguments

// }

// const DoneTaskButton: React.FC<DoneTaskButtonProps> = ({ isActive, userId, onClick }) => {
//   const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
//   const handleToggle = async () => {
//     try{
//    const response = await LoadPermissionsAuth()
//    console.log("testresponse",response)
    
// // const router = useRouter();

//   //  if (response===undefined){
//   //   return null
//   //  }
//   if (response===undefined){
//     // await logoutAction();
//     // localStorage.clear();
//     // router.push("/login");


//     setIsExitModalOpen(true); // Open the modal when the token is expired
//     toast.error(`Session Expired`, {
//       style: { backgroundColor: '#FF4D4D', color: 'white' },
//       position: 'top-center',
//       duration: 5000,
//     }); 

//  }
//    if (response.includes("UPDATE_USERSTATUS")){

//     // console.log(`Toggling status from ${isActive} to ${isActive === Status.Active ? Status.Inactive : Status.Active}`);
//     onClick(userId, isActive === true ? false : true);

//    }
   
//    else{ 
//     toast.error(`You dont have the permission to change status`, {
//       style: { backgroundColor: '#FF4D4D', color: 'white' },
//       position: 'top-center',
//       duration: 5000,
//     });
   

//     return null}
//   }catch(error){
//     console.log("testerror",error)
//   }
   
//   };

//   const closeExitModal = () => {
//     setIsExitModalOpen(false);
//     // You can also perform other actions, like redirecting to the login page
//   //  <ul>
//   //  <LogoutButton />
//   //        </ul>
//   };

//   return (
// //     <label className="inline-flex items-center cursor-pointer">
// //       <input
// //         type="checkbox"
// //         checked={isActive === true} // This ensures the checkbox is checked for 'Active' status
// //         onChange={handleToggle}
// //         className="sr-only peer"
// //       />
// //       <div className="relative w-11 h-4 bg-neutral-200 
// //       peer-focus:outline-none 
// //      rounded-full peer dark:bg-gray-700 
// //       peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] 
// //       after:absolute after:top-[calc(25%-0.5rem)] 
// //       after:start-[calc(-0.125rem)] 
// //       after:bg-neutral-300 
// //        after:rounded-full after:h-6 after:w-6 after:transition-all 
// //       peer-checked:bg-blue-100 peer-checked:after:bg-blue-500 
// //  "></div>
      
      
    
// //       <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />
// //     </label>
// <>
//       {isActive && ( // Only render if isActive is true
//         <label className="inline-flex items-center cursor-pointer">
//           <div onClick={handleToggle} className="text-violet-500 hover:text-violet-950 rounded-md">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
//             </svg>
//           </div>
//         </label>
//       )}
//       <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />
//     </>

//   );
// };

// export default DoneTaskButton;
