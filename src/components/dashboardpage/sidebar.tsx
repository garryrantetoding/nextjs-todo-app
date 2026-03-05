// // // // // // // // // // components/Sidebar.tsx
// // // // // // // // // import React, { useState, useRef } from 'react';
// // // // // // // // // import Image from 'next/image';
// // // // // // // // // import styles from "src/components/sidebarpage.css";

// // // // // // // // // interface SidebarProps {
// // // // // // // // //   onTabClick: (tab: string) => void;
// // // // // // // // // }

// // // // // // // // // const Sidebar: React.FC<SidebarProps> = ({ onTabClick }) => {
// // // // // // // // //   const [sidebarWidth, setSidebarWidth] = useState(250); // Default width of the sidebar
// // // // // // // // //   const isResizing = useRef(false); // To track if resizing is in progress
// // // // // // // // //   const lastX = useRef(0); // To store the last X position of the mouse

// // // // // // // // //   const handleMouseMove = (e: MouseEvent) => {
// // // // // // // // //     if (!isResizing.current) return;
// // // // // // // // //     const diff = e.clientX - lastX.current;
// // // // // // // // //     setSidebarWidth((prevWidth) => prevWidth + diff);
// // // // // // // // //     lastX.current = e.clientX;
// // // // // // // // //   };

// // // // // // // // //   const handleMouseDown = (e: React.MouseEvent) => {
// // // // // // // // //     isResizing.current = true;
// // // // // // // // //     lastX.current = e.clientX;
// // // // // // // // //     document.addEventListener('mousemove', handleMouseMove);
// // // // // // // // //     document.addEventListener('mouseup', handleMouseUp);
// // // // // // // // //   };

// // // // // // // // //   const handleMouseUp = () => {
// // // // // // // // //     isResizing.current = false;
// // // // // // // // //     document.removeEventListener('mousemove', handleMouseMove);
// // // // // // // // //     document.removeEventListener('mouseup', handleMouseUp);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className={styles.sidebar} style={{ width: sidebarWidth }}>
// // // // // // // // //       {/* Add an image at the top of the sidebar */}
// // // // // // // // //       <div className={styles.sidebarHeader}>
// // // // // // // // //        <Image src = "/images/logo.png" alt="Logo"  width={100} height={50} className={styles.sidebarImage} />
// // // // // // // // //       </div>
      
// // // // // // // // //       <div className={styles.tabs}>
// // // // // // // // //         <button onClick={() => onTabClick('tab1')}>Tab 1</button>
// // // // // // // // //         <button onClick={() => onTabClick('tab2')}>Tab 2</button>
// // // // // // // // //         <button onClick={() => onTabClick('tab3')}>Tab 3</button>
// // // // // // // // //       </div>
      
// // // // // // // // //       <div className={styles.resizer} onMouseDown={handleMouseDown} />
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Sidebar;
// // // // // // // // // components/Sidebar.tsx
// // // // // // // // import React, { useState, useRef } from 'react';
// // // // // // // // import Image from 'next/image';
// // // // // // // // import TabButton from './sidebarbutton';
// // // // // // // // // import styles from "./sidebarpage.module.css";

// // // // // // // // interface SidebarProps {
// // // // // // // //   onTabClick: (tabId: string) => void;
// // // // // // // //   tabList: { id: string, name: string }[]; // Array of tab information
// // // // // // // // }

// // // // // // // // const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList }) => {
// // // // // // // //   const [sidebarWidth, setSidebarWidth] = useState(250); // Default width of the sidebar
// // // // // // // //   // const isResizing = useRef(false); // To track if resizing is in progress
// // // // // // // //   // const lastX = useRef(0); // To store the last X position of the mouse

// // // // // // // //   // const handleMouseMove = (e: MouseEvent) => {
// // // // // // // //   //   if (!isResizing.current) return;
// // // // // // // //   //   const diff = e.clientX - lastX.current;
// // // // // // // //   //   setSidebarWidth((prevWidth) => prevWidth + diff);
// // // // // // // //   //   lastX.current = e.clientX;
// // // // // // // //   // };

// // // // // // // //   // const handleMouseDown = (e: React.MouseEvent) => {
// // // // // // // //   //   isResizing.current = true;
// // // // // // // //   //   lastX.current = e.clientX;
// // // // // // // //   //   document.addEventListener('mousemove', handleMouseMove);
// // // // // // // //   //   document.addEventListener('mouseup', handleMouseUp);
// // // // // // // //   // };

// // // // // // // //   // const handleMouseUp = () => {
// // // // // // // //   //   isResizing.current = false;
// // // // // // // //   //   document.removeEventListener('mousemove', handleMouseMove);
// // // // // // // //   //   document.removeEventListener('mouseup', handleMouseUp);
// // // // // // // //   // };

// // // // // // // //   return (
// // // // // // // //     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden" style={{ width: sidebarWidth }}>
// // // // // // // //     <div className="pb-5 flex justify-center">
// // // // // // // //               <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto"/>
// // // // // // // //       </div>



// // // // // // // //       <div className="flex flex-col items-end w-full pr-0 pl-5">        {/* Loop through tabList and render a button for each */}
// // // // // // // //         {tabList.map((tab) => (
// // // // // // // //           <TabButton 
// // // // // // // //           key={tab.id} 
// // // // // // // //           id={tab.id} 
// // // // // // // //           name={tab.name} 
// // // // // // // //           onClick={onTabClick} // Pass the onClick handler to the TabButton
// // // // // // // //         />
// // // // // // // //         ))}
// // // // // // // //       </div>

// // // // // // // //       {/* <div className="bg-gray-500 w-[3px] h-full cursor-ew-resize absolute top-0 right-0 z-60" onMouseDown={handleMouseDown} /> */}

      
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Sidebar;
// // // // // // // "use client";
// // // // // // // // export default Sidebar;
// // // // // // // import React, { useState } from 'react';
// // // // // // // import Image from 'next/image';
// // // // // // // import TabButton from './sidebarbutton';

// // // // // // // // Example of SVG as a React component
// // // // // // // const UserSVG = () => (
// // // // // // //   <svg width="24" height="16" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
// // // // // // // <path d="M13.3333 5.1665C14.7166 5.1665 15.8249 4.04984 15.8249 2.6665C15.8249 1.28317 14.7166 0.166504 13.3333 0.166504C11.9499 0.166504 10.8333 1.28317 10.8333 2.6665C10.8333 4.04984 11.9499 5.1665 13.3333 5.1665ZM6.66658 5.1665C8.04992 5.1665 9.15825 4.04984 9.15825 2.6665C9.15825 1.28317 8.04992 0.166504 6.66658 0.166504C5.28325 0.166504 4.16658 1.28317 4.16658 2.6665C4.16658 4.04984 5.28325 5.1665 6.66658 5.1665ZM6.66658 6.83317C4.72492 6.83317 0.833252 7.80817 0.833252 9.74984V11.8332H12.4999V9.74984C12.4999 7.80817 8.60825 6.83317 6.66658 6.83317ZM13.3333 6.83317C13.0916 6.83317 12.8166 6.84984 12.5249 6.87484C13.4916 7.57484 14.1666 8.5165 14.1666 9.74984V11.8332H19.1666V9.74984C19.1666 7.80817 15.2749 6.83317 13.3333 6.83317Z" fill="white"/>
// // // // // // // </svg>
// // // // // // // );

// // // // // // // const SettingsSVG = () => (
// // // // // // //   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // // // //     <path d="M12 8C13.104 8 14 7.104 14 6C14 4.896 13.104 4 12 4C10.896 4 10 4.896 10 6C10 7.104 10.896 8 12 8ZM6.293 6.707C5.902 7.098 5.902 7.731 6.293 8.121L8.586 10.414C8.977 10.805 9.609 10.805 9.999 10.414L12 8.414L14.001 10.414C14.392 10.805 15.024 10.805 15.414 10.414L17.707 8.121C18.098 7.731 18.098 7.098 17.707 6.707L15.414 4.414C15.024 4.023 14.392 4.023 13.999 4.414L12 6.414L9.999 4.414C9.609 4.023 8.977 4.023 8.586 4.414L6.293 6.707Z"></path>
// // // // // // //   </svg>
// // // // // // // );

// // // // // // // interface SidebarProps {
// // // // // // //   onTabClick: (tabId: string) => void;
// // // // // // //   tabList: { id: string; name: string; section: string }[]; // Array of tab information with section
// // // // // // //   sections: { id: string; name: string }[]; // Sections info
// // // // // // // }

// // // // // // // const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList, sections }) => {
// // // // // // //   const [activeSection, setActiveSection] = useState<string | null>(null);

// // // // // // //   // Handle section toggle
// // // // // // //   const toggleSection = (sectionId: string) => {
// // // // // // //     setActiveSection((prev) => (prev === sectionId ? null : sectionId));
// // // // // // //   };

// // // // // // //   // Filter tabs based on section
// // // // // // //   const getTabsForSection = (sectionId: string) => {
// // // // // // //     return tabList.filter(tab => tab.section === sectionId);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[250px]">
// // // // // // //       <div className="pb-5 flex justify-center">
// // // // // // //         <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto" />
// // // // // // //       </div>

// // // // // // //       {/* Loop through sections and display tabs
// // // // // // //       <div className="flex flex-col w-full pr-0 pl-5">
// // // // // // //         {sections.map((section) => (
// // // // // // //           <div key={section.id}>
// // // // // // //             <button
// // // // // // //               className="w-full py-3 mb-2 cursor-pointer text-neutral-400 text-left pl-5 hover:bg-gray-300"
// // // // // // //               onClick={() => toggleSection(section.id)}
// // // // // // //             >
// // // // // // //               {section.name}
// // // // // // //             </button>

// // // // // // //             {activeSection === section.id && (
// // // // // // //               <div className="pl-5">
// // // // // // //                 {getTabsForSection(section.id).map((tab) => (
// // // // // // //                   <button
// // // // // // //                     key={tab.id}
// // // // // // //                     onClick={() => onTabClick(tab.id)}
// // // // // // //                     className="w-full py-3 mb-2 cursor-pointer bg-blue-100 text-left pl-5 hover:bg-gray-300"
// // // // // // //                   >
// // // // // // //                     {tab.name}
// // // // // // //                   </button>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }; */}

// // // // // // // <div className="flex flex-col items-end w-full pr-0 pl-5">
// // // // // // //         {sections.map((section) => (
// // // // // // //           <div key={section.id} className="w-full">
// // // // // // //             <div className="text-neutral-400 font-semibold text-lg mb-2">{section.name}</div>

// // // // // // //             {tabList
// // // // // // //               .filter((tab) => tab.section === section.id)
// // // // // // //               .map((tab) => {
// // // // // // //                 // Select SVG based on the tab id or name
// // // // // // //                 let svg;
// // // // // // //                 if (tab.name === 'User') {
// // // // // // //                   svg = <UserSVG />;
// // // // // // //                 } else if (tab.name === 'Settings') {
// // // // // // //                   svg = <SettingsSVG />;
// // // // // // //                 }
                
// // // // // // //                 return (
// // // // // // //                   <TabButton
// // // // // // //                     key={tab.id}
// // // // // // //                     id={tab.id}
// // // // // // //                     name={tab.name}
// // // // // // //                     onClick={onTabClick}
// // // // // // //                     svg={svg} // Pass SVG to TabButton
// // // // // // //                   />
// // // // // // //                 );
// // // // // // //               })}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Sidebar;
// // // // // // // components/Sidebar.tsx
// // // // // // import React, { useState } from 'react';
// // // // // // import Image from 'next/image';
// // // // // // import TabButton from './sidebarbutton';
// // // // // // // Example of SVG as React components
// // // // // // const UserSVG = () => (
// // // // // //   <svg width="24" height="16" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
// // // // // //     <path
// // // // // //       d="M13.3333 5.1665C14.7166 5.1665 15.8249 4.04984 15.8249 2.6665C15.8249 1.28317 14.7166 0.166504 13.3333 0.166504C11.9499 0.166504 10.8333 1.28317 10.8333 2.6665C10.8333 4.04984 11.9499 5.1665 13.3333 5.1665ZM6.66658 5.1665C8.04992 5.1665 9.15825 4.04984 9.15825 2.6665C9.15825 1.28317 8.04992 0.166504 6.66658 0.166504C5.28325 0.166504 4.16658 1.28317 4.16658 2.6665C4.16658 4.04984 5.28325 5.1665 6.66658 5.1665ZM6.66658 6.83317C4.72492 6.83317 0.833252 7.80817 0.833252 9.74984V11.8332H12.4999V9.74984C12.4999 7.80817 8.60825 6.83317 6.66658 6.83317ZM13.3333 6.83317C13.0916 6.83317 12.8166 6.84984 12.5249 6.87484C13.4916 7.57484 14.1666 8.5165 14.1666 9.74984V11.8332H19.1666V9.74984C19.1666 7.80817 15.2749 6.83317 13.3333 6.83317Z"
// // // // // //       fill="white"
// // // // // //     />
// // // // // //   </svg>
// // // // // // );

// // // // // // const SettingsSVG = () => (
// // // // // //   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // // //     <path d="M12 8C13.104 8 14 7.104 14 6C14 4.896 13.104 4 12 4C10.896 4 10 4.896 10 6C10 7.104 10.896 8 12 8ZM6.293 6.707C5.902 7.098 5.902 7.731 6.293 8.121L8.586 10.414C8.977 10.805 9.609 10.805 9.999 10.414L12 8.414L14.001 10.414C14.392 10.805 15.024 10.805 15.414 10.414L17.707 8.121C18.098 7.731 18.098 7.098 17.707 6.707L15.414 4.414C15.024 4.023 14.392 4.023 13.999 4.414L12 6.414L9.999 4.414C9.609 4.023 8.977 4.023 8.586 4.414L6.293 6.707Z"></path>
// // // // // //   </svg>
// // // // // // );

// // // // // // interface SidebarProps {
// // // // // //   onTabClick: (tabId: string) => void;
// // // // // //   tabList: { id: string; name: string; section: string }[]; // Array of tab information with section
// // // // // //   sections: { id: string; name: string }[]; // Sections info
// // // // // // }

// // // // // // const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList, sections }) => {
// // // // // //   const [activeSection, setActiveSection] = useState<string | null>(null);

// // // // // //   // Handle section toggle
// // // // // //   const toggleSection = (sectionId: string) => {
// // // // // //     setActiveSection((prev) => (prev === sectionId ? null : sectionId));
// // // // // //   };

// // // // // //   // Filter tabs based on section
// // // // // //   const getTabsForSection = (sectionId: string) => {
// // // // // //     return tabList.filter(tab => tab.section === sectionId);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[250px]">
// // // // // //       <div className="pb-5 flex justify-center">
// // // // // //         <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto" />
// // // // // //       </div>

// // // // // //       {/* Loop through sections and display tabs */}
// // // // // //       <div className="flex flex-col w-full pr-0 pl-5">
// // // // // //         {sections.map((section) => (
// // // // // //           <div key={section.id}>
// // // // // //             <button
// // // // // //               className="w-full py-3 mb-2 cursor-pointer text-neutral-400 text-left pl-5 hover:bg-gray-300"
// // // // // //               onClick={() => toggleSection(section.id)}
// // // // // //             >
// // // // // //               {section.name}
// // // // // //             </button>

// // // // // //             {activeSection === section.id && (
// // // // // //               <div className="pl-5">
// // // // // //                 {getTabsForSection(section.id).map((tab) => {
// // // // // //                   // Select SVG based on the tab id or name
// // // // // //                   let svg;
// // // // // //                   if (tab.name === 'User') {
// // // // // //                     svg = <UserSVG />;
// // // // // //                   } else if (tab.name === 'Settings') {
// // // // // //                     svg = <SettingsSVG />;
// // // // // //                   }

// // // // // //                   return (
// // // // // //                     <TabButton
// // // // // //                       key={tab.id}
// // // // // //                       id={tab.id}
// // // // // //                       name={tab.name}
// // // // // //                       onClick={onTabClick}
// // // // // //                       svg={svg} // Pass the SVG to TabButton
// // // // // //                     />
// // // // // //                   );
// // // // // //                 })}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Sidebar;
// // // // // // components/Sidebar.tsx
// // // // // import React, { useState } from 'react';
// // // // // import Image from 'next/image';
// // // // // import TabButton from './sidebarbutton';

// // // // // interface SidebarProps {
// // // // //   onTabClick: (tabId: string) => void;
// // // // //   tabList: { id: string; name: string; section: string }[]; // Array of tab information with section
// // // // //   sections: { id: string; name: string }[]; // Sections info
// // // // // }

// // // // // const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList, sections }) => {
// // // // //   const [activeSection, setActiveSection] = useState<string | null>(null);

// // // // //   // Handle section toggle
// // // // //   const toggleSection = (sectionId: string) => {
// // // // //     setActiveSection((prev) => (prev === sectionId ? null : sectionId));
// // // // //   };

// // // // //   // Filter tabs based on section
// // // // //   const getTabsForSection = (sectionId: string) => {
// // // // //     return tabList.filter(tab => tab.section === sectionId);
// // // // //   };

// // // // //   return (
// // // // //     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[250px]">
// // // // //       <div className="pb-5 flex justify-center">
// // // // //         <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto" />
// // // // //       </div>

// // // // //       {/* Loop through sections and display tabs */}
// // // // //       <div className="flex flex-col w-full pr-0 pl-5">
// // // // //         {sections.map((section) => (
// // // // //           <div key={section.id}>
// // // // //             <button
// // // // //               className="w-full py-3 mb-2 cursor-pointer text-neutral-400 text-left pl-5 hover:bg-gray-300"
// // // // //               onClick={() => toggleSection(section.id)}
// // // // //             >
// // // // //               {section.name}
// // // // //             </button>

// // // // //             {activeSection === section.id && (
// // // // //               <div className="pl-5">
// // // // //                 {getTabsForSection(section.id).map((tab) => (
// // // // //                   <TabButton
// // // // //                     key={tab.id}
// // // // //                     id={tab.id}
// // // // //                     name={tab.name}
// // // // //                     onClick={onTabClick}
// // // // //                   />
// // // // //                 ))}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Sidebar;
// // // // import React, { useState, useEffect } from 'react';
// // // // import Image from 'next/image';
// // // // import TabButton from './tabbutton';
// // // // import SectionButton from './sectionbutton';

// // // // interface SidebarProps {
// // // //   onTabClick: (tabId: string) => void;
// // // //   tabList: { id: string; name: string; section: string }[]; // Array of tab information with section
// // // //   sections: { id: string; name: string }[]; // Sections info
// // // // }

// // // // const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList, sections }) => {
// // // //   const [openedSections, setOpenedSections] = useState<string[]>([]); // Track opened sections

// // // //   // Load the opened sections from localStorage or set to all sections as default
// // // //   useEffect(() => {
// // // //     const savedSections = JSON.parse(localStorage.getItem('openedSections') || '[]');
// // // //     if (savedSections.length === 0) {
// // // //       // If no saved state, open all sections by default
// // // //       setOpenedSections(sections.map((section) => section.id));
// // // //     } else {
// // // //       setOpenedSections(savedSections);
// // // //     }
// // // //   }, [sections]);


// // // //   // Handle section toggle
// // // //   const toggleSection = (sectionId: string) => {
// // // //     setOpenedSections((prev) => {
// // // //       const newSections = prev.includes(sectionId)
// // // //         ? prev.filter((id) => id !== sectionId) // If section is already open, close it
// // // //         : [...prev, sectionId]; // If section is closed, open it

// // // //       // Save the new state to localStorage
// // // //       localStorage.setItem('openedSections', JSON.stringify(newSections));
// // // //       return newSections;
// // // //     });
// // // //   };

// // // //   // Filter tabs based on section
// // // //   const getTabsForSection = (sectionId: string) => {
// // // //     return tabList.filter(tab => tab.section === sectionId);
// // // //   };

// // // //   return (
// // // //     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[250px]">
// // // //       <div className="pb-5 flex justify-center">
// // // //         <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto" />
// // // //       </div>

// // // //       {/* Loop through sections and display tabs */}
// // // //       <div className="flex flex-col w-full pr-0 pl-5">
// // // //         {sections.map((section) => (
// // // //           <div key={section.id}>
// // // //             <button
// // // //               className="w-full py-3 mb-2 cursor-pointer text-neutral-400 text-left pl-5 hover:bg-gray-300"
// // // //               onClick={() => toggleSection(section.id)}
// // // //             >
// // // //               {section.name}
// // // //             </button>

// // // //             {/* Show tabs for section if it is open */}
// // // //             {openedSections.includes(section.id) && (
// // // //               <div className="pl-5">
// // // //                 {getTabsForSection(section.id).map((tab) => (
// // // //                   <TabButton
// // // //                     key={tab.id}
// // // //                     id={tab.id}
// // // //                     name={tab.name}
// // // //                     onClick={onTabClick}
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Sidebar;
// // // // components/Sidebar.tsx
// // // import React, { useState, useEffect } from 'react';
// // // import Image from 'next/image';
// // // import TabButton from './tabbutton';
// // // import SectionButton from './sectionbutton';

// // // interface SidebarProps {
// // //   onTabClick: (tabId: string) => void;
// // //   tabList: { id: string; name: string; section: string }[]; // Array of tab information with section
// // //   sections: { id: string; name: string }[]; // Sections info
// // // }

// // // // const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList, sections }) => {
// // // //   const [openedSections, setOpenedSections] = useState<string[]>([]); // Track opened sections

// // // //   // Load the opened sections from localStorage or set to all sections as default
// // // //   useEffect(() => {
// // // //     const savedSections = JSON.parse(localStorage.getItem('openedSections') || '[]');
// // // //     if (savedSections.length === 0) {
// // // //       // If no saved state, open all sections by default
// // // //       setOpenedSections(sections.map((section) => section.id));
// // // //     } else {
// // // //       setOpenedSections(savedSections);
// // // //     }
// // // //   }, [sections]);

// // // //   // Handle section toggle
// // // //   const toggleSection = (sectionId: string) => {
// // // //     setOpenedSections((prev) => {
// // // //       const newSections = prev.includes(sectionId)
// // // //         ? prev.filter((id) => id !== sectionId) // If section is already open, close it
// // // //         : [...prev, sectionId]; // If section is closed, open it

// // // //       // Save the new state to localStorage
// // // //       localStorage.setItem('openedSections', JSON.stringify(newSections));
// // // //       return newSections;
// // // //     });
// // // //   };

// // // //   // Filter tabs based on section
// // // //   const getTabsForSection = (sectionId: string) => {
// // // //     return tabList.filter(tab => tab.section === sectionId);
// // // //   };

// // // //   return (
// // // //     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[250px]">
// // // //       <div className="pb-5 flex justify-center">
// // // //         <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto" />
// // // //       </div>

// // // //       {/* Loop through sections and display tabs */}
// // // //       <div className="flex flex-col w-full pr-0 pl-5">
// // // //         {sections.map((section) => (
// // // //           <div key={section.id}>
// // // //             {/* Use SectionToggleButton for each section */}
// // // //             <SectionButton
// // // //               sectionId={section.id}
// // // //               sectionName={section.name}
// // // //               isOpen={openedSections.includes(section.id)}
// // // //               onToggle={toggleSection}
// // // //             />

// // // //             {/* Show tabs for section if it is open */}
// // // //             {openedSections.includes(section.id) && (
// // // //               <div className="pl-5">
// // // //                 {getTabsForSection(section.id).map((tab) => (
// // // //                   <TabButton
// // // //                     key={tab.id}
// // // //                     id={tab.id}
// // // //                     name={tab.name}
// // // //                     onClick={onTabClick}
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Sidebar;

// // // const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList, sections }) => {
// // //   const [openedSections, setOpenedSections] = useState<string[]>([]); // Track opened sections

// // //   // Load the opened sections from localStorage or set to all sections open by default
// // //   useEffect(() => {
// // //     // Try to get the saved state from localStorage
// // //     const savedSections = JSON.parse(localStorage.getItem('openedSections') || '[]');

// // //     if (savedSections.length === 0) {
// // //       // If no saved sections exist, open all sections by default
// // //       setOpenedSections(sections.map(section => section.id));
// // //     } else {
// // //       // If there are saved sections in localStorage, use that as the opened state
// // //       setOpenedSections(savedSections);
// // //     }
// // //   }, [sections]); // Effect depends on sections to ensure it initializes on first render

// // //   // Handle section toggle
// // //   const toggleSection = (sectionId: string) => {
// // //     setOpenedSections((prev) => {
// // //       const newSections = prev.includes(sectionId)
// // //         ? prev.filter((id) => id !== sectionId) // If section is already open, close it
// // //         : [...prev, sectionId]; // If section is closed, open it

// // //       // Save the new state to localStorage
// // //       localStorage.setItem('openedSections', JSON.stringify(newSections));
// // //       return newSections;
// // //     });
// // //   };

// // //   // Filter tabs based on section
// // //   const getTabsForSection = (sectionId: string) => {
// // //     return tabList.filter(tab => tab.section === sectionId);
// // //   };


// // //   return (
// // //     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[250px]">
// // //       <div className="pb-5 flex justify-center">
// // //         <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto" />
// // //       </div>

// // //       {/* Loop through sections and display tabs */}
// // //       <div className="flex flex-col w-full pr-0 pl-5">
// // //         {sections.map((section) => (
// // //           <div key={section.id}>
// // //             {/* Use SectionToggleButton for each section */}
// // //             <SectionButton
// // //               sectionId={section.id}
// // //               sectionName={section.name}
// // //               isOpen={openedSections.includes(section.id)}
// // //               onToggle={toggleSection}
// // //             />

// // //             {/* Show tabs for section if it is open */}
// // //             {openedSections.includes(section.id) && (
// // //               <div className="pl-5">
// // //                 {getTabsForSection(section.id).map((tab) => (
// // //                   <TabButton
// // //                     key={tab.id}
// // //                     id={tab.id}
// // //                     name={tab.name}
// // //                     onClick={onTabClick}
// // //                   />
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Sidebar;
// // import React, { useState, useEffect } from 'react';
// // import Image from 'next/image';
// // import TabButton from './tabbutton';
// // import SectionButton from './sectionbutton'; // Assuming you have a SectionButton component

// // interface SidebarProps {
// //   onTabClick: (tabId: string) => void;
// //   tabList: { id: string; name: string; section: string }[]; // Array of tab information with section
// //   sections: { id: string; name: string }[]; // Sections info
// //   activeTab: string; // Added activeTab prop to highlight the active section
// // }

// // const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList, sections, activeTab }) => {
// //   const [openedSections, setOpenedSections] = useState<string[]>([]); // Track opened sections

// //   // Load the opened sections from localStorage or set to all sections open by default
// //   useEffect(() => {
// //     // Try to get the saved state from localStorage
// //     const savedSections = JSON.parse(localStorage.getItem('openedSections') || '[]');

// //     if (savedSections.length === 0) {
// //       // If no saved sections exist, open all sections by default
// //       setOpenedSections(sections.map(section => section.id));
// //     } else {
// //       // If there are saved sections in localStorage, use that as the opened state
// //       setOpenedSections(savedSections);
// //     }
// //   }, [sections]); // Effect depends on sections to ensure it initializes on first render

// //   // Handle section toggle
// //   const toggleSection = (sectionId: string) => {
// //     setOpenedSections((prev) => {
// //       const newSections = prev.includes(sectionId)
// //         ? prev.filter((id) => id !== sectionId) // If section is already open, close it
// //         : [...prev, sectionId]; // If section is closed, open it

// //       // Save the new state to localStorage
// //       localStorage.setItem('openedSections', JSON.stringify(newSections));
// //       return newSections;
// //     });
// //   };

// //   // Filter tabs based on section
// //   const getTabsForSection = (sectionId: string) => {
// //     return tabList.filter(tab => tab.section === sectionId);
// //   };

// //   // Determine if the section is active based on the current activeTab
// //   const isSectionActive = (sectionId: string) => {
// //     // Check if any tab within the section is the active one
// //     return tabList.some((tab) => tab.section === sectionId && tab.id === activeTab);
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
// //             {/* Use SectionToggleButton for each section */}
// //             <SectionButton
// //               sectionId={section.id}
// //               sectionName={section.name}
// //               isOpen={openedSections.includes(section.id)}
// //               onToggle={toggleSection}
// //               isActive={isSectionActive(section.id)} // Pass isActive prop to highlight active section
// //             />

// //             {/* Show tabs for section if it is open */}
// //             {openedSections.includes(section.id) && (
// //               <div className="pl-5">
// //                 {getTabsForSection(section.id).map((tab) => (
// //                   <TabButton
// //                     key={tab.id}
// //                     id={tab.id}
// //                     name={tab.name}
// //                     onClick={onTabClick}
// //                   />
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import TabButton from './tabbutton';
// import SectionButton from './sectionbutton'; // Assuming you have a SectionButton component

// interface SidebarProps {
//   onTabClick: (tabId: string) => void;
//   tabList: { id: string; name: string; section: string }[]; // Array of tab information with section
//   sections: { id: string; name: string }[]; // Sections info
//   activeTab: string; // Added activeTab prop to highlight the active section
// }

// const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList, sections, activeTab }) => {
//   const [openedSections, setOpenedSections] = useState<string[]>([]); // Track opened sections

//   // // Load the opened sections from localStorage or set to all sections open by default
//   // useEffect(() => {
//   //   // Try to get the saved state from localStorage
//   //   const savedSections = JSON.parse(localStorage.getItem('openedSections') || '[]');

//   //   if (savedSections.length === 0) {
//   //     // If no saved sections exist, open all sections by default
//   //     setOpenedSections(sections.map(section => section.id));
//   //   } else {
//   //     // If there are saved sections in localStorage, use that as the opened state
//   //     setOpenedSections(savedSections);
//   //   }
//   // }, [sections]); // Effect depends on sections to ensure it initializes on first render

//  // Load the opened sections from localStorage or set to all sections open by default
//  useEffect(() => {
//   // Try to get the saved state from localStorage
//   const savedSections = localStorage.getItem('openedSections');
//   if (savedSections) {
//     try {
//       const parsedSections = JSON.parse(savedSections);
//       if (Array.isArray(parsedSections)) {
//         setOpenedSections(parsedSections);
//       }
//     } catch (e) {
//       console.error('Error parsing saved opened sections:', e);
//     }
//   } else {
//     // If no saved sections exist, open all sections by default
//     setOpenedSections(sections.map((section) => section.id));
//   }
// }, [sections]); // Effect depends on sections to ensure it initializes on first render


//   // Handle section toggle
//   const toggleSection = (sectionId: string) => {
//     setOpenedSections((prev) => {
//       const newSections = prev.includes(sectionId)
//         ? prev.filter((id) => id !== sectionId) // If section is already open, close it
//         : [...prev, sectionId]; // If section is closed, open it

//       // Save the new state to localStorage
//       localStorage.setItem('openedSections', JSON.stringify(newSections));
//       return newSections;
//     });
//   };

//   // Filter tabs based on section
//   const getTabsForSection = (sectionId: string) => {
//     return tabList.filter(tab => tab.section === sectionId);
//   };

//   // Determine if the section has an active tab
//   const isSectionActive = (sectionId: string) => {
//     // Check if any tab within the section is the active one
//     return tabList.some((tab) => tab.section === sectionId && tab.id === activeTab);
//   };

//   return (
// // //     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[250px]">
// // //       <div className="pb-5 flex justify-center">
// // //         <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto" />
// // //       </div>

// // //       {/* Loop through sections and display tabs */}
// // //       <div className="flex flex-col w-full pr-0 pl-5">
// // //         {sections.map((section) => (
// // //           <div key={section.id}>
// // //             {/* Use SectionToggleButton for each section */}
// // //             <SectionButton
// // //               sectionId={section.id}
// // //               sectionName={section.name}
// // //               isOpen={openedSections.includes(section.id)}
// // //               onToggle={toggleSection}
// // //               isActive={isSectionActive(section.id)} // Pass isActive prop to highlight active section
// // //             />

// // //             {/* Show tabs for section if it is open */}
// // //             {openedSections.includes(section.id) && (
// // //               <div className="pl-5">
// // //                 {getTabsForSection(section.id).map((tab) => (
// // //                   <TabButton
// // //                     key={tab.id}
// // //                     id={tab.id}
// // //                     name={tab.name}
// // //                     onClick={onTabClick}
// // //                   />
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // // //     <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[250px]">
// // // //   <div className="pb-5 flex justify-center">
// // // //     <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto" />
// // // //   </div>

// // // //   {/* Loop through sections and display tabs */}
// // // //   <div className="flex flex-col w-full pr-0 pl-5">
// // // //     {sections.map((section) => (
// // // //       <div key={section.id}>
// // // //         {/* Use SectionToggleButton for each section */}
// // // //         <SectionButton
// // // //           sectionId={section.id}
// // // //           sectionName={section.name}
// // // //           isOpen={openedSections.includes(section.id)}
// // // //           onToggle={toggleSection}
// // // //           isActive={isSectionActive(section.id)} // Pass isActive prop to highlight active section
// // // //         />

// // // //         {/* Show tabs for section if it is open */}
// // // //         <div
// // // //            className={`pl-5 overflow-hidden transition-all duration-500 ease-in-out transform ${
// // // //             openedSections.includes(section.id) ? 'translate-y-0' : '-translate-y-full'
// // // //           }`}
// // // //         >
// // // //           {openedSections.includes(section.id) &&
// // // //             getTabsForSection(section.id).map((tab) => (
// // // //               <TabButton
// // // //                 key={tab.id}
// // // //                 id={tab.id}
// // // //                 name={tab.name}
// // // //                 onClick={onTabClick}
// // // //               />
// // // //             ))}
// // // //         </div>
// // // //       </div>
// // // //     ))}
// // // //   </div>
// // // // </div>
// <div className="h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[250px]">
//   <div className="pb-5 flex justify-center">
//     <Image
//       src="/images/logo.png"
//       alt="Logo"
//       width={100}
//       height={50}
//       className="w-4/5 max-w-[200px] h-auto"
//     />
//   </div>

//   {/* Loop through sections and display tabs */}
//   <div className="flex flex-col w-full pr-0 pl-5">
//     {sections.map((section) => (
//       <div key={section.id}>
//         {/* Use SectionToggleButton for each section */}
//         <SectionButton
//           sectionId={section.id}
//           sectionName={section.name}
//           isOpen={openedSections.includes(section.id)}
//           onToggle={toggleSection}
//           isActive={isSectionActive(section.id)} // Pass isActive prop to highlight active section
//         />

//         {/* Show tabs for section if it is open */}
//         <div
//           className={`pl-5 transition-all duration-500 ease-in-out overflow-hidden ${
//             openedSections.includes(section.id)
//               ? 'max-h-[1000px] translate-y-0' // When opened, show the tabs
//               : 'max-h-0 translate-y-[-20px]' // When closed, slide upwards
//           }`}
//         >
//           {openedSections.includes(section.id) &&
//             getTabsForSection(section.id).map((tab) => (
//               <TabButton
//                 key={tab.id}
//                 id={tab.id}
//                 name={tab.name}
//                 onClick={onTabClick}
//               />
//             ))}
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TabButton from './tabbutton';
import SectionButton from './sectionbutton'; // Assuming you have a SectionButton component

interface SidebarProps {
  onTabClick: (tabId: string) => void;
  tabList: { id: string; name: string; section: string }[]; // Array of tab information with section
  sections: { id: string; name: string }[]; // Sections info
  activeTab: string; // Added activeTab prop to highlight the active section
  sidebarWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabClick, tabList, sections, activeTab, sidebarWidth }) => {
  const [openedSections, setOpenedSections] = useState<string[]>([]); // Track opened sections

  // // Load the opened sections from localStorage or set to all sections open by default
  // useEffect(() => {
  //   // Try to get the saved state from localStorage
  //   const savedSections = JSON.parse(localStorage.getItem('openedSections') || '[]');

  //   if (savedSections.length === 0) {
  //     // If no saved sections exist, open all sections by default
  //     setOpenedSections(sections.map(section => section.id));
  //   } else {
  //     // If there are saved sections in localStorage, use that as the opened state
  //     setOpenedSections(savedSections);
  //   }
  // }, [sections]); // Effect depends on sections to ensure it initializes on first render

 // Load the opened sections from localStorage or set to all sections open by default
 useEffect(() => {
  // Try to get the saved state from localStorage
  const savedSections = localStorage.getItem('openedSections');
  if (savedSections) {
    try {
      const parsedSections = JSON.parse(savedSections);
      if (Array.isArray(parsedSections)) {
        setOpenedSections(parsedSections);
      }
    } catch (e) {
      console.error('Error parsing saved opened sections:', e);
    }
  } else {
    // If no saved sections exist, open all sections by default
    setOpenedSections(sections.map((section) => section.id));
  }
}, [sections]); // Effect depends on sections to ensure it initializes on first render


  // Handle section toggle
  const toggleSection = (sectionId: string) => {
    setOpenedSections((prev) => {
      const newSections = prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId) // If section is already open, close it
        : [...prev, sectionId]; // If section is closed, open it

      // Save the new state to localStorage
      localStorage.setItem('openedSections', JSON.stringify(newSections));
      return newSections;
    });
  };

  // Filter tabs based on section
  const getTabsForSection = (sectionId: string) => {
    return tabList.filter(tab => tab.section === sectionId);
  };

  // Determine if the section has an active tab
  const isSectionActive = (sectionId: string) => {
    // Check if any tab within the section is the active one
    return tabList.some((tab) => tab.section === sectionId && tab.id === activeTab);
  };

  return (
    <div className={`h-screen bg-white pt-5 fixed top-0 left-0 z-50 border-r-2 border-gray-300 flex flex-col transition-all overflow-x-hidden w-[${sidebarWidth}px]`}>
      <div className="pb-5 flex justify-center">
        <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="w-4/5 max-w-[200px] h-auto" />
      </div>

      {/* Loop through sections and display tabs */}
      <div className="flex flex-col w-full pr-0 pl-5">
        {sections.map((section) => (
          <div key={section.id}>
            {/* Use SectionToggleButton for each section */}
            <SectionButton
              sectionId={section.id}
              sectionName={section.name}
              isOpen={openedSections.includes(section.id)}
              onToggle={toggleSection}
              isActive={isSectionActive(section.id)} // Pass isActive prop to highlight active section
            />

            {/* Show tabs for section if it is open */}
            {openedSections.includes(section.id) && (
              <div className="pl-5">
                {getTabsForSection(section.id).map((tab) => (
                  <TabButton
                    key={tab.id}
                    id={tab.id}
                    name={tab.name}
                    onClick={onTabClick}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
