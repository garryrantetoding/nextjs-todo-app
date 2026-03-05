// components/Loading.tsx
import React from 'react';

const Reloading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="text-white text-2xl">Loading...</div> {/* Loading spinner or message */}
    </div>
  );
};

export default Reloading;



//   const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state

// if (responsepermission===undefined){
          
//   setIsExitModalOpen(true); // Open the modal when the token is expired
//   toast.error(`Session Expired`, {
//     style: { backgroundColor: '#FF4D4D', color: 'white' },
//     position: 'top-center',
//     duration: 5000,
//   }); 

// const closeExitModal = () => {
//   setIsExitModalOpen(false);

// };

// <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />
