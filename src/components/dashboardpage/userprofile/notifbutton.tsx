// import React from 'react';

// interface NotifButtonProps {
//   onClick: () => void;
// }

// const NotifButton: React.FC<NotifButtonProps> = ({ onClick }) => {
//   return (
//     <button onClick={onClick} className="ml-4 border-2 border-gray-500 bg-white text-gray-500 rounded-full">
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
// </svg>

//     </button>
//   );
// };

// export default NotifButton;

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Import toast from sonner

const NotifButton: React.FC = () => {

  const storedState = localStorage.getItem('notifButtonState');
  const initialState = storedState ? JSON.parse(storedState) : false;
  const [isClicked, setIsClicked] = useState(initialState); // Track button click state


  useEffect(() => {
    // Sync the state with localStorage
    localStorage.setItem('notifButtonState', JSON.stringify(isClicked));
  }, [isClicked]); // This effect runs every time isClicked changes

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle state on button click

    // Show toast notification based on the state
    if (isClicked) {
         // When clicked on the "Notification on" state
         toast.error('Notification off', { 
          style: { backgroundColor: '#FF4D4D', color: 'white' },

          duration: 3000, 
          position: 'top-center',
        });
      } else {
       
        // When clicked on the "Notification off" state
        toast.success('Notification on', { 
          style: { backgroundColor: '#33B640', color: 'white' }, 

          duration: 3000, // Duration of the toast in ms
          position: 'top-center', // You can change the position
        });
      }
  };

  return (
    <button onClick={handleClick} className="ml-4 bg-blue-100 p-4 text-blue-500 rounded-full">
      {isClicked ? (
        // New SVG when clicked
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
      ) : (
        // Default SVG
        
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
       </svg>
      )}
    </button>
  );
};

export default NotifButton;