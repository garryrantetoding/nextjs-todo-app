// // "use client";
// // // export default Sidebar;
// // import React, { useState } from 'react';
// // import Image from 'next/image';

// // interface SidebarProps {
// //   onTabClick: (tabId: string) => void;
// //   tabList: { id: string; name: string; section: string }[]; // Array of tab information with section
// //   sections: { id: string; name: string }[]; // Sections info
// // }

// // const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList, sections }) => {
// //   const [activeSection, setActiveSection] = useState<string | null>(null);

// //   // Handle section toggle
// //   const toggleSection = (sectionId: string) => {
// //     setActiveSection((prev) => (prev === sectionId ? null : sectionId));
// //   };

// //   // Filter tabs based on section
// //   const getTabsForSection = (sectionId: string) => {
// //     return tabList.filter(tab => tab.section === sectionId);
// //   };

// //   return (
// //     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[250px]">
// //       <div className="pb-5 flex justify-center">
// //         <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto" />
// //       </div>

// //       {/* Loop through sections and display tabs */}
// //       <div className="flex flex-col w-full pr-0 pl-5">
// //         {sections.map((section) => (
// //           <div key={section.id}>
// //             <button
// //               className="w-full py-3 mb-2 cursor-pointer bg-blue-200 text-left pl-5 hover:bg-gray-300"
// //               onClick={() => toggleSection(section.id)}
// //             >
// //               {section.name}
// //             </button>

// //             {activeSection === section.id && (
// //               <div className="pl-5">
// //                 {getTabsForSection(section.id).map((tab) => (
// //                   <button
// //                     key={tab.id}
// //                     onClick={() => onTabClick(tab.id)}
// //                     className="w-full py-3 mb-2 cursor-pointer bg-blue-100 text-left pl-5 hover:bg-gray-300"
// //                   >
// //                     {tab.name}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// // components/Sidebar.tsx
// import React, { useState, useRef } from 'react';
// import Image from 'next/image';
// import TabButton from './sidebarbutton';
// // import styles from "./sidebarpage.module.css";

// interface SidebarProps {
//   onTabClick: (tabId: string) => void;
//   tabList: { id: string, name: string }[]; // Array of tab information
// }

// const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList }) => {
//   const [sidebarWidth, setSidebarWidth] = useState(250); // Default width of the sidebar
//   // const isResizing = useRef(false); // To track if resizing is in progress
//   // const lastX = useRef(0); // To store the last X position of the mouse

//   // const handleMouseMove = (e: MouseEvent) => {
//   //   if (!isResizing.current) return;
//   //   const diff = e.clientX - lastX.current;
//   //   setSidebarWidth((prevWidth) => prevWidth + diff);
//   //   lastX.current = e.clientX;
//   // };

//   // const handleMouseDown = (e: React.MouseEvent) => {
//   //   isResizing.current = true;
//   //   lastX.current = e.clientX;
//   //   document.addEventListener('mousemove', handleMouseMove);
//   //   document.addEventListener('mouseup', handleMouseUp);
//   // };

//   // const handleMouseUp = () => {
//   //   isResizing.current = false;
//   //   document.removeEventListener('mousemove', handleMouseMove);
//   //   document.removeEventListener('mouseup', handleMouseUp);
//   // };

//   return (
//     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden" style={{ width: sidebarWidth }}>
//     <div className="pb-5 flex justify-center">
//               <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto"/>
//       </div>



//       <div className="flex flex-col items-end w-full pr-0 pl-5">        {/* Loop through tabList and render a button for each */}
//         {tabList.map((tab) => (
//           <TabButton 
//           key={tab.id} 
//           id={tab.id} 
//           name={tab.name} 
//           onClick={onTabClick} // Pass the onClick handler to the TabButton
//         />
//         ))}
//       </div>

//       {/* <div className="bg-gray-500 w-[3px] h-full cursor-ew-resize absolute top-0 right-0 z-60" onMouseDown={handleMouseDown} /> */}

      
//     </div>
//   );
// };

// export default Sidebar;
