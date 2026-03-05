// import React from 'react';

// interface TabButtonProps {
//   id: string;
//   name: string;
//   onClick: (tabId: string) => void;
//   svg: React.ReactNode; // SVG passed as a React Node

// }

// const TabButton: React.FC<TabButtonProps> = ({ id, name, onClick, svg }) => {
//     return (
//         <button 
//           onClick={() => onClick(id)} 
//           className="w-full pb-6 h-10 cursor-pointer bg-blue-500 border-none text-white hover:bg-gray-300"
//         >
//           <div className="px-2 pt-2 flex items-center">
//           <svg width="24" height="16" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M13.3333 5.1665C14.7166 5.1665 15.8249 4.04984 15.8249 2.6665C15.8249 1.28317 14.7166 0.166504 13.3333 0.166504C11.9499 0.166504 10.8333 1.28317 10.8333 2.6665C10.8333 4.04984 11.9499 5.1665 13.3333 5.1665ZM6.66658 5.1665C8.04992 5.1665 9.15825 4.04984 9.15825 2.6665C9.15825 1.28317 8.04992 0.166504 6.66658 0.166504C5.28325 0.166504 4.16658 1.28317 4.16658 2.6665C4.16658 4.04984 5.28325 5.1665 6.66658 5.1665ZM6.66658 6.83317C4.72492 6.83317 0.833252 7.80817 0.833252 9.74984V11.8332H12.4999V9.74984C12.4999 7.80817 8.60825 6.83317 6.66658 6.83317ZM13.3333 6.83317C13.0916 6.83317 12.8166 6.84984 12.5249 6.87484C13.4916 7.57484 14.1666 8.5165 14.1666 9.74984V11.8332H19.1666V9.74984C19.1666 7.80817 15.2749 6.83317 13.3333 6.83317Z" fill="white"/>
// </svg>

//             <div className="ml-2">{name}</div>
//           </div>
//         </button>
//       );
      
      
// };

// export default TabButton;
// components/TabButton.tsx
import React from 'react';

// Define the SVG components directly inside TabButton
const UserSVG = () => (
  <svg width="24" height="16" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.3333 5.1665C14.7166 5.1665 15.8249 4.04984 15.8249 2.6665C15.8249 1.28317 14.7166 0.166504 13.3333 0.166504C11.9499 0.166504 10.8333 1.28317 10.8333 2.6665C10.8333 4.04984 11.9499 5.1665 13.3333 5.1665ZM6.66658 5.1665C8.04992 5.1665 9.15825 4.04984 9.15825 2.6665C9.15825 1.28317 8.04992 0.166504 6.66658 0.166504C5.28325 0.166504 4.16658 1.28317 4.16658 2.6665C4.16658 4.04984 5.28325 5.1665 6.66658 5.1665ZM6.66658 6.83317C4.72492 6.83317 0.833252 7.80817 0.833252 9.74984V11.8332H12.4999V9.74984C12.4999 7.80817 8.60825 6.83317 6.66658 6.83317ZM13.3333 6.83317C13.0916 6.83317 12.8166 6.84984 12.5249 6.87484C13.4916 7.57484 14.1666 8.5165 14.1666 9.74984V11.8332H19.1666V9.74984C19.1666 7.80817 15.2749 6.83317 13.3333 6.83317Z"
      fill="white"
    />
  </svg>
);

const SettingsSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8C13.104 8 14 7.104 14 6C14 4.896 13.104 4 12 4C10.896 4 10 4.896 10 6C10 7.104 10.896 8 12 8ZM6.293 6.707C5.902 7.098 5.902 7.731 6.293 8.121L8.586 10.414C8.977 10.805 9.609 10.805 9.999 10.414L12 8.414L14.001 10.414C14.392 10.805 15.024 10.805 15.414 10.414L17.707 8.121C18.098 7.731 18.098 7.098 17.707 6.707L15.414 4.414C15.024 4.023 14.392 4.023 13.999 4.414L12 6.414L9.999 4.414C9.609 4.023 8.977 4.023 8.586 4.414L6.293 6.707Z"></path>
  </svg>
);

interface TabButtonProps {
  id: string;
  name: string;
  onClick: (tabId: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, name, onClick }) => {
  // Choose the SVG to render based on the tab name or id
  let svg;
  if (name === 'User Management') {
    svg = <UserSVG />;
  } else if (name === 'Settings') {
    svg = <SettingsSVG />;
  }

  return (
    <button
      onClick={() => onClick(id)}
      className="w-full pb-6 mb-4 h-10 cursor-pointer bg-blue-500 border-none text-white hover:bg-gray-300 flex items-center rounded-l-sm"
    >
      <div className="px-2 pt-6 flex items-center">
        <span className="w-6 h-6 pt-1 flex-shrink-0">{svg}</span>
        <div className="ml-2">{name}</div>
      </div>
    </button>
  );
};

export default TabButton;
